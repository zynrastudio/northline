# Northline Creative — Automation & Analytics Implementation (Phase G)

**Version:** 1.0  
**Status:** Phase G complete (G0–G6); operators use [ops/n8n/RUNBOOK.md](../ops/n8n/RUNBOOK.md)  
**Parent plan:** [redesign-implementation-plan.md](./redesign-implementation-plan.md) § Phase G  
**Strategy source:** [website-redesign-strategy.md](./website-redesign-strategy.md) — Automation Strategy + CRM Integration (fulfilled **without** a SaaS CRM)

---

## 1. Stack lock

| Concern | Choice | Explicit non-goals |
| --- | --- | --- |
| Orchestration | **n8n** self-hosted | n8n Cloud as primary production host for this case study |
| Hosting | **Docker Compose** only | Managed CRM hosts, Heroku one-click CRM, PaaS CRM add-ons |
| Lead / opportunity store | **n8n Data Tables** (Contact, Company, Opportunity) | HubSpot, Attio, Salesforce, Pipedrive, Close, etc. |
| Transactional email | **Resend** | Replacing Resend with CRM-native mail |
| Calendar (qualified path) | **Cal.com** (embed or redirect) | Calendly, fake in-app scheduler UI |
| Product analytics | **GA4** | Mixing event names with the before-site without a redirect map |
| Workflow authoring | Cursor **n8n MCP** (preferred) + n8n editor UI | Paid `@n8n/cli` API as a hard dependency |

**Principle:** The marketing site stays a Next.js brochure + qualification surface. All post-submit intelligence runs in n8n on Docker. Do not build a fake CRM UI on the site.

---

## 2. Architecture

```
┌─────────────────────────────────────────────────────────────┐
│  northline-after (Vercel / Next.js)                         │
│                                                             │
│  /book-consultation                                         │
│       │ multi-step form (Phase F)                           │
│       ▼                                                     │
│  submitConsultation (server action)                         │
│       │ 1. validate + honeypot + rate limit                 │
│       │ 2. compute lead score                               │
│       │ 3. POST signed webhook → n8n                        │
│       │ 4. (optional) Resend confirm if not deferred to n8n │
│       ▼                                                     │
│  GA4 client events (start / step / submit / branch)         │
└────────────────────────────┬────────────────────────────────┘
                             │ HTTPS webhook
                             ▼
┌─────────────────────────────────────────────────────────────┐
│  n8n (Docker Compose)                                       │
│                                                             │
│  Webhook Trigger                                            │
│       → Normalize payload                                   │
│       → Upsert Company / Contact / Opportunity (Data Tables)│
│       → Set automation status                               │
│       → Internal notify (email / Slack / Discord)           │
│       → Confirmation email (Resend node or HTTP)            │
│       → IF score ≥ threshold                                │
│            → Qualified: Cal.com booking link / embed        │
│            → Else: resource pack (case studies / process)   │
└─────────────────────────────────────────────────────────────┘
                             ▲
                             │ Cal.com booking webhook (optional)
                             │ → mark opportunity `booked`
                             │ → GA / n8n status update
```

### Why Docker n8n instead of a SaaS CRM

- Matches the after case study: **business automation** is a Northline pillar — dogfood the pattern.
- Avoids paid CRM API tiers and lock-in for a fictional agency site.
- Keeps Contact / Company / Opportunity / Lead Score / Sales Notes / Automation Status (strategy fields) as **first-class n8n records**, not HubSpot objects.
- MCP already connects to the n8n instance for workflow build/test without CLI API keys.

---

## 3. Docker hosting

**Compose** is the local/dev contract under `ops/n8n/`. **Railway** (`northline-n8n`) is the staging/production host — Railway does not run Compose directly; map image → service, volume → `/home/node/.n8n`, env → service variables.

### 3.1 Compose layout

```
ops/n8n/
  docker-compose.yml
  .env.example          # N8N_* only — never commit real secrets
  README.md             # start / Railway notes
  RUNBOOK.md            # restart / backup / incident fallback (G6)
  workflows/
    webhook-health.json
    consultation-intake.json
```

Minimal `docker-compose.yml` shape (see repo for the live file):

```yaml
services:
  n8n:
    image: docker.n8n.io/n8nio/n8n:latest
    restart: unless-stopped
    ports:
      - "5678:5678"
    env_file:
      - .env
    volumes:
      - n8n_data:/home/node/.n8n

volumes:
  n8n_data:
```

### 3.2 Railway staging / production

| Item | Guidance |
| --- | --- |
| Project | Railway project **`northline-n8n`** (separate from Vercel Next.js) |
| Image | `n8nio/n8n` (same family as Compose) |
| Domain | Public HTTPS `*.up.railway.app` for **n8n** — set `WEBHOOK_URL` / `N8N_HOST` to match. Future **marketing** site: `northlinecreative.online` (pending purchase); n8n stays on Railway until a custom n8n host is chosen |
| Persistence | Volume mounted at `/home/node/.n8n` |
| Volume permissions | Set `RAILWAY_RUN_UID=0` so the container can write the root-owned mount (n8n image otherwise hits `EACCES` on `config`) |
| Ports | `PORT=5678` and `N8N_PORT=5678` (align with public domain target port) |
| TLS | Railway terminates TLS; `N8N_PROTOCOL=https` |
| Auth | n8n owner account; restrict editor to operators |
| Webhook security | Shared secret header verified in n8n + Next.js (`N8N_WEBHOOK_SECRET`) — G2/G3 |
| Updates | Redeploy image; back up volume / export workflows before upgrades |

**Staging webhook base (G0):** `https://n8n-production-26316.up.railway.app/`

Health check path used in G0: `POST /webhook/northline-health` → `{ "ok": true, ... }`

**Consultation intake (G2):** `POST /webhook/consultation-intake` with header `X-Northline-Webhook-Secret`. Published on Railway staging **and** MCP cloud (`https://brightakolade.app.n8n.cloud/webhook/consultation-intake`). Sample payloads under `ops/n8n/workflows/g2-payload-*.json`.

### 3.3 Local

```bash
cd ops/n8n
cp .env.example .env
# Set N8N_ENCRYPTION_KEY, then:
docker compose up -d
```

| | Local | Railway staging |
| --- | --- | --- |
| Editor | `http://localhost:5678` | `https://n8n-production-26316.up.railway.app` |
| Webhook base | `http://localhost:5678/webhook/...` | `https://n8n-production-26316.up.railway.app/webhook/...` |

Vercel → local requires a tunnel; prefer Railway staging for Next.js integration (G3).

---

## 4. End-to-end workflow (canonical)

```
Visitor submits /book-consultation
        ↓
Lead score calculated (Next.js server)
        ↓
Webhook → n8n (Docker)
        ↓
Records: Company + Contact + Opportunity
        (+ score, notes, automation status)
        ↓
Internal notification
        ↓
Confirmation email (Resend)
        ↓
Qualification decision
        ├── Qualified     → Cal.com booking path
        └── Not yet       → resource recommendation (no dead end)
```

This is the strategy doc workflow with **n8n records** standing in for “CRM record created.”

---

## 5. Lead scoring

### 5.1 Inputs (from Phase F form)

| Field | Source | Scoring relevance |
| --- | --- | --- |
| `industry` | select | Fit to launch industries |
| `budget` | select | Capacity / deal size |
| `timeline` | select | Urgency |
| `decisionMaker` | select | Access to buyer |
| `scope` | select | Alignment to pillars |
| `goals` / `challenges` | text | Notes only (no NLP score v1) |
| `company` / `name` / `email` / `phone` | essentials | Identity; email domain optional soft signal later |

### 5.2 Point model (v1)

**Source of truth:** [`lib/lead-scoring.ts`](../lib/lead-scoring.ts) — keep this table in sync when tuning.

| Signal | Points |
| --- | ---: |
| Budget `$100k or more` | +40 |
| Budget `$50k to $100k` | +30 |
| Budget `$25k to $50k` | +20 |
| Budget `Under $25k` | +5 |
| Budget `Not sure yet` | +0 |
| Timeline `As soon as possible` | +25 |
| Timeline `1 to 3 months` | +20 |
| Timeline `3 to 6 months` | +10 |
| Timeline `6 months or later` / `Still exploring` | +0 |
| Decision maker `I own this decision` | +25 |
| Decision maker `I am part of the deciding team` | +15 |
| Decision maker `I am researching for a decision maker` | +5 |
| Industry in launch set (excl. Other) | +15 |
| Industry `Other` | +0 |
| Scope clearly mapped to pillars (not `Not sure yet`) | +10 |

**Qualified threshold (v1):** score ≥ **70** (`QUALIFIED_THRESHOLD`)  
**Nurture band:** 40–69 (`NURTURE_MIN` … threshold − 1)  
**Low / resources only:** &lt; 40  

Point values are multiples of 5, so totals like 69 / 39 are unreachable; band edges in fixtures use 70 / 65 / 40 / 35. Verify with `npm run test:lead-scoring`.

Tune after first real traffic; never hardcode secrets into score rules.

### 5.3 Payload shape to n8n

```ts
type ConsultationAutomationPayload = {
  source: "northline-after";
  submittedAt: string; // ISO
  score: number;
  band: "qualified" | "nurture" | "low";
  contact: {
    name: string;
    email: string;
    phone: string;
    company: string;
  };
  qualification: {
    industry: string;
    decisionMaker: string;
    challenges: string;
    budget: string;
    timeline: string;
    scope: string;
    goals: string;
  };
  utm?: Record<string, string>;
};
```

---

## 6. n8n record model (strategy “CRM” fields)

No external CRM. Use **n8n Data Tables** (or one table + JSON columns if simpler at first).

### 6.1 Company

| Column | Type | Notes |
| --- | --- | --- |
| `id` | string | n8n row id |
| `name` | string | from `company` |
| `industry` | string | |
| `createdAt` | datetime | |

### 6.2 Contact

| Column | Type | Notes |
| --- | --- | --- |
| `id` | string | |
| `companyId` | string | FK |
| `name` | string | |
| `email` | string | unique key for upsert |
| `phone` | string | optional |
| `decisionMaker` | string | |

### 6.3 Opportunity

| Column | Type | Notes |
| --- | --- | --- |
| `id` | string | |
| `companyId` | string | |
| `contactId` | string | |
| `leadScore` | number | |
| `band` | string | qualified / nurture / low |
| `scope` | string | |
| `budget` | string | |
| `timeline` | string | |
| `goals` | text | |
| `challenges` | text | |
| `salesNotes` | text | operator-filled later |
| `automationStatus` | string | see below |
| `winLoss` | string | open / won / lost / n/a |
| `createdAt` | datetime | |

### 6.4 Automation status values

| Status | Meaning |
| --- | --- |
| `received` | Webhook accepted |
| `scored` | Score persisted |
| `notified_internal` | Team ping sent |
| `confirm_sent` | Prospect confirmation sent |
| `calendar_offered` | Qualified path |
| `resources_sent` | Nurture / low path |
| `booked` | Calendar complete (if webhook from Cal) |
| `error` | Needs operator attention |

---

## 7. n8n workflow build order (MCP-friendly)

Use Cursor **n8n MCP** in this order (server: `user-n8n-mcp`):

1. `get_sdk_reference` + `get_workflow_best_practices` (webhook intake, triage / routing)
2. `search_nodes` → webhook, data table, IF, email/HTTP, Set
3. `get_node_types` for every node before writing code
4. `validate_workflow` → `create_workflow_from_code`
5. `publish_workflow` only after a successful test execution
6. Wire Next.js `N8N_WEBHOOK_URL` to the **production** webhook path

### 7.1 Suggested workflow name

`Northline — Consultation Intake`

Nodes (logical):

1. **Webhook** (POST) — verify secret header  
2. **Set** — normalize fields  
3. **Data table** — upsert Company by name  
4. **Data table** — upsert Contact by email  
5. **Data table** — insert Opportunity  
6. **IF** — `band === "qualified"`  
7a. **Notify + Cal.com CTA** (qualified)  
7b. **Notify + resource links** (nurture/low)  
8. **Resend / HTTP** — confirmation email  
9. **Respond to Webhook** — `{ ok: true, band, score }` so Next can shape the success UI

Optional companion workflow: **Northline — Cal.com Booking Complete** (Cal.com webhook → update Opportunity `automationStatus=booked` → optional internal notify).

### 7.2 Cal.com (qualified path)

**Lock:** Cal.com only — do not add Calendly or a second scheduler.

| Item | Guidance |
| --- | --- |
| Event type | One public event, e.g. “Strategy Consultation” (30–45 min) |
| Delivery | Prefer **redirect** to Cal.com event URL on qualified success — **done** (G4/G5). No iframe embed in v1 |
| Prefill | Pass `name`, `email` query params from the form so the prospect does not retype — **done** |
| Team / round-robin | Optional later; v1 can be a single host |
| Booking webhooks | Point Cal.com webhook at n8n for `BOOKING_CREATED` → set `automationStatus=booked` (deferred; optional companion) |
| Post-booking redirect | Cal.com **Redirect on booking** → `{NEXT_PUBLIC_SITE_URL}/book-consultation/booked` — fires `calendar_booking_complete` (G5) |
| GA | Fire `calendar_booking_complete` with `provider: "cal.com"` from thank-you route — **done** (G5) |

Env: `NEXT_PUBLIC_CAL_COM_URL` = full event URL (e.g. `https://cal.com/northlinecreative/strategy-consultation`).

### 7.3 Resource recommendation (unqualified path)
Never dead-end. Email + success UI should include:

- 1–2 relevant case studies (`/case-studies/...`)
- `/process`
- Optional insights piece
- Soft CTA: still welcome to book later

---

## 8. Next.js integration

### 8.1 Code touchpoints

| Area | Change |
| --- | --- |
| `lib/lead-scoring.ts` | New — pure score + band from `ConsultationPayload` |
| `app/actions/consultation.ts` | After validate: score → POST n8n → Resend (Mode A); soft-fail n8n — **done** (G3) |
| `lib/n8n.ts` | Webhook client + secret header + timeout/retry once — **done** (G3); soft-fails so Mode A Resend still runs |
| `.env.example` | `N8N_WEBHOOK_URL` / `N8N_WEBHOOK_SECRET` — Railway staging URL documented |
| Success UI on `/book-consultation` | Branch copy: Cal.com booking vs resources from `band` — **done** (G4) |
| Prospect + agency email | Mode A dual send: agency with band/score; prospect confirmation branched — **done** (G4) |
| GA4 §9 events | Client helpers in `lib/analytics.ts` + form/beacon wiring — **done** (G5). `NEXT_PUBLIC_GA_DEBUG=true` for DebugView |
| Cal.com land | `/book-consultation/booked` thank-you + `calendar_booking_complete` — **done** (G5) |

### 8.2 Email ownership (locked for v1)

| Mode | Confirm email sent by | Status |
| --- | --- | --- |
| **A (v1)** | Next.js Resend for prospect confirm + n8n for records / branch / internal notify | **Confirmed** — G4 sends agency notify + branched prospect confirmation; n8n internal notify remains stub until Resend-in-n8n |
| **B** | n8n only | Deferred / alternative |

Do not send duplicate confirmation emails.

### 8.3 Env vars

| Variable | Where | Notes |
| --- | --- | --- |
| `N8N_WEBHOOK_URL` | Next.js | Full production webhook URL — Railway: `https://n8n-production-26316.up.railway.app/webhook/consultation-intake` (G3) |
| `N8N_WEBHOOK_SECRET` | Next.js + n8n | Shared header `X-Northline-Webhook-Secret`; missing env soft-skips webhook |
| `AUTOMATION_FALLBACK_EMAIL` | Next.js | `true`/unset: soft-fail n8n + still Resend; `false`: hard-fail form (G6) |
| `NEXT_PUBLIC_SITE_URL` | Next.js | Future marketing origin `https://northlinecreative.online` (domain pending) |
| `RESEND_API_KEY` | Next and/or n8n | Existing |
| `CONTACT_TO_EMAIL` | Next / n8n | Internal notify target |
| `CONTACT_FROM_EMAIL` | Next / n8n | Verified sender |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | Next | Existing |
| `NEXT_PUBLIC_GA_DEBUG` | Next | `true` enables gtag `debug_mode` for GA4 DebugView (G5) |
| `NEXT_PUBLIC_CAL_COM_URL` | Next | Qualified CTA + prospect email — Cal.com event URL (G4). Prefill name/email. If unset, UI/email say booking link follows |
| `CAL_COM_WEBHOOK_SECRET` | n8n (optional) | Verify Cal.com → n8n booking webhooks |
| `N8N_ENCRYPTION_KEY` | Docker only | n8n credentials encryption |
| `WEBHOOK_URL` / `N8N_HOST` | Docker only | Public n8n base |

---

## 9. Analytics (GA4)

### 9.1 Existing / additive events

Prefer **additive** names; do not rename `generate_lead` if before-site reports exist.

| Event | When | Params (suggested) |
| --- | --- | --- |
| `consultation_start` | First interaction / step 1 view | — |
| `consultation_step_complete` | Step N validated | `step` (1\|2\|3) |
| `consultation_submit` | Server accepts + webhook ok | `band`, `score_bucket` |
| `generate_lead` | Same as submit (compat) | — |
| `lead_qualified` | `band === "qualified"` | `score_bucket` |
| `lead_nurture` | nurture or low | `band` |
| `case_study_view` | Case study detail (Phase E) | `slug` |
| `insight_view` | Insight detail (Phase E) | `slug` |
| `calendar_booking_complete` | Cal.com booking confirmed (thank-you, embed callback, or n8n) | `provider: "cal.com"` |

`score_bucket`: e.g. `0-39` / `40-69` / `70+` — never send raw PII in GA.

### 9.2 Implementation notes

- Client: extend `lib/analytics.ts` + form step handlers — **done** (G5)
- Server: optional Measurement Protocol later; v1 client events are enough  
- Success metrics map (parent plan §5) reads from these events + n8n status counts  
- **DebugView checklist:** set `NEXT_PUBLIC_GA_MEASUREMENT_ID` + `NEXT_PUBLIC_GA_DEBUG=true`, restart dev, walk `/book-consultation` (start → step_complete → submit / band), open `/book-consultation/booked`, open a case study + insight. Confirm events in GA4 Admin → DebugView.

### 9.3 Success metrics ↔ implementation

| Strategy metric | Implementation |
| --- | --- |
| Higher consultation requests | `consultation_start` + `consultation_submit` |
| Higher % qualified leads | `lead_qualified` / submit; n8n `band` counts |
| Case study engagement | `case_study_view` + engagement time |
| Strategic content engagement | `insight_view` + engagement time |
| Reduced manual qualification | Ops: % `calendar_offered` vs human review |
| Booking completion | `calendar_booking_complete` |
| Sales alignment | Opportunity `salesNotes` + `winLoss` in n8n |

---

## 10. Security & ops

- [x] Webhook secret required; reject missing/invalid (G2 intake IF + header)
- [x] Rate limit remains on consultation action
- [x] Honeypot still short-circuits as success without calling n8n
- [x] No secrets in git; Docker `.env` gitignored
- [x] n8n editor not exposed without auth (owner login on Compose / Railway)
- [x] Backup n8n volume on a schedule — documented in [`ops/n8n/RUNBOOK.md`](../ops/n8n/RUNBOOK.md) (G6)
- [x] Incident path if n8n is down: soft-fail + Resend when `AUTOMATION_FALLBACK_EMAIL` is true/unset; hard-fail when `false` — see runbook (G6)

---

## 11. Phased delivery inside G

| Step | Deliverable | Exit |
| --- | --- | --- |
| **G0** | `ops/n8n` Compose + Railway staging | Webhook URL reachable — **done** (local + `https://n8n-production-26316.up.railway.app/webhook/northline-health`) |
| **G1** | `lib/lead-scoring.ts` + fixtures | Scores match table — **done** (`npm run test:lead-scoring`) |
| **G2** | Intake workflow in n8n (records + notify stub) | Manual webhook test creates rows — **done** (MCP cloud + Railway; Mode A notify stub) |
| **G3** | Wire `submitConsultation` → n8n | Form submit creates Opportunity — **done** (`lib/n8n.ts` + Mode A soft-fail) |
| **G4** | Branch UX + emails (qualified vs resources) | Both paths verified — **done** (`lib/consultation-branch.ts` + Mode A prospect email) |
| **G5** | GA4 events + Cal.com event URL / land | Events in DebugView; booking thank-you — **done** (`lib/analytics.ts` + `/book-consultation/booked`) |
| **G6** | Runbook + backup + fallback | Operator can restart Compose — **done** ([`ops/n8n/RUNBOOK.md`](../ops/n8n/RUNBOOK.md) + `AUTOMATION_FALLBACK_EMAIL`) |

---

## 12. Acceptance criteria (Phase G exit)

- [x] n8n runs via **Docker Compose**; documented under `ops/n8n/` (G0)
- [x] Railway staging up with public webhook (`https://n8n-production-26316.up.railway.app/`) (G0)
- [x] No HubSpot / Attio / Salesforce / other SaaS CRM in architecture or env
- [x] E2E: submit → score → n8n Contact/Company/Opportunity → notify → confirm → branch (G1–G4; soft-fail documented G6)
- [x] Qualified path offers **Cal.com** booking; unqualified path offers resources (G4; set real `NEXT_PUBLIC_CAL_COM_URL` when event exists)
- [x] No Calendly (or other scheduler) in the stack
- [x] GA4 events listed in §9 wired (G5); enable measurement ID + DebugView to confirm in staging
- [x] Secrets only in env; README / this doc / [RUNBOOK](../ops/n8n/RUNBOOK.md) link from parent plan
- [x] Fallback behavior defined if n8n is unreachable (`AUTOMATION_FALLBACK_EMAIL` + runbook)

---

## 13. Out of scope (this phase)

- Client portal  
- Proposal generation  
- Marketing nurture sequences beyond the first resource email  
- Multi-currency / multi-region scoring  
- Replacing GA4  
- Building a custom CRM UI on the marketing site  
- Calendly or any non–Cal.com scheduler  

---

## 14. Immediate next steps

1. ~~Add `ops/n8n/docker-compose.yml` + `.env.example`.~~ **G0 done**
2. ~~Stand up staging n8n; confirm webhook reachable.~~ **G0 done** (Railway + local)
3. ~~Implement scoring (`lib/lead-scoring.ts`).~~ **G1 done** (`npm run test:lead-scoring`)
4. ~~Build **Northline — Consultation Intake** via n8n MCP (G2).~~ **G2 done**. ~~Wire webhook client on `after` (G3).~~ **G3 done** (`lib/n8n.ts` → Railway intake).
5. ~~G4–G6.~~ **Phase G complete** (branch UX, GA4 + booking land, [runbook](../ops/n8n/RUNBOOK.md)). Proceed to **Phase H** polish / launch; set real Cal.com + GA measurement IDs in staging when ready.
