# Northline n8n (Phase G)

Self-hosted n8n for consultation automation. **Compose** is the local/dev contract; **Railway** is the staging/production host. Authoring also uses a Cursor **n8n MCP** cloud instance for workflow design.

| Environment | How | Editor / webhook base |
| --- | --- | --- |
| Local | Docker Compose (this folder) | `http://localhost:5678/` |
| Staging | Railway project `northline-n8n` | `https://n8n-production-26316.up.railway.app/` |
| MCP (design) | Cursor n8n MCP cloud | `https://brightakolade.app.n8n.cloud/` |

**Future marketing site (not n8n):** `https://northlinecreative.online` (domain pending purchase). Use for resource links and Next.js `NEXT_PUBLIC_SITE_URL` later — do not treat Railway `*.up.railway.app` or localhost as the public brand domain.

Stack lock: official n8n Docker image + SQLite on a persistent volume. No SaaS CRM.

## Local

```bash
cd ops/n8n
cp .env.example .env
# Set N8N_ENCRYPTION_KEY in .env (32+ random chars), then:
docker compose up -d
```

- Editor: [http://localhost:5678](http://localhost:5678)
- Stop: `docker compose down` (keeps the named volume)
- Wipe data: `docker compose down -v`

### Health webhook (local)

Workflow **Northline - Webhook Health** (`workflows/webhook-health.json`): Webhook POST `northline-health` → Respond `{ "ok": true, ... }`.

```bash
curl -sS -X POST "http://localhost:5678/webhook/northline-health" -H "Content-Type: application/json" -d "{}"
```

Expect HTTP 200 and JSON with `"ok":true`.

## Consultation Intake (G2)

Workflow **Northline - Consultation Intake** — Mode A: upsert Company/Contact, insert Opportunity, branch `automationStatus` (`calendar_offered` vs `resources_sent`), internal notify **stub** (Resend deferred). Prospect confirmation stays on Next.js Resend until wired later.

| Host | Production webhook |
| --- | --- |
| MCP cloud | `https://brightakolade.app.n8n.cloud/webhook/consultation-intake` |
| Railway | `https://n8n-production-26316.up.railway.app/webhook/consultation-intake` |

Header: `X-Northline-Webhook-Secret: <N8N_WEBHOOK_SECRET>`

Data Tables (per host; IDs differ): **Company**, **Contact**, **Opportunity**. Repo export `workflows/consultation-intake.json` is remapped to **Railway** table IDs. MCP source: `workflows/consultation-intake.sdk.js`.

### Manual curl (qualified)

```bash
curl -sS -X POST "https://n8n-production-26316.up.railway.app/webhook/consultation-intake" \
  -H "Content-Type: application/json" \
  -H "X-Northline-Webhook-Secret: $N8N_WEBHOOK_SECRET" \
  --data-binary "@workflows/g2-payload-qualified.json"
```

Expect HTTP 200 and `{ "ok": true, "band": "qualified", "score": 115, ... }`. Repeat with `g2-payload-nurture.json` for the non-qualified branch. Missing/wrong secret → HTTP 401.

## Railway staging

Railway does not run `docker-compose.yml` directly. Map:

| Compose | Railway |
| --- | --- |
| Image `docker.n8n.io/n8nio/n8n` | Service image `n8nio/n8n` |
| Volume `n8n_data` | Volume mounted at `/home/node/.n8n` |
| Env file | Service variables |

Required variables on the `n8n` service:

| Variable | Value |
| --- | --- |
| `N8N_PORT` | `5678` |
| `PORT` | `5678` |
| `N8N_PROTOCOL` | `https` |
| `N8N_HOST` | `n8n-production-26316.up.railway.app` |
| `WEBHOOK_URL` | `https://n8n-production-26316.up.railway.app/` |
| `GENERIC_TIMEZONE` | `America/Los_Angeles` |
| `N8N_ENCRYPTION_KEY` | Random secret (Railway vars only — never commit) |
| `N8N_WEBHOOK_SECRET` | Shared header secret (Railway vars + local `ops/n8n/.env` only) |
| `RAILWAY_RUN_UID` | `0` (required — volume is root-owned; without this n8n hits `EACCES` on `config`) |

**Staging webhook host:**

```
WEBHOOK_BASE=https://n8n-production-26316.up.railway.app/
```

Health verify:

```bash
curl -sS -X POST "https://n8n-production-26316.up.railway.app/webhook/northline-health" -H "Content-Type: application/json" -d "{}"
```

Editor: [https://n8n-production-26316.up.railway.app](https://n8n-production-26316.up.railway.app)

Owner email used at G0 bootstrap: `ops@northlinecreative.com` — reset the password in the n8n UI (Settings) if you did not set it yourself.

## Cal.com booking land (G5)

Qualified success CTA opens `NEXT_PUBLIC_CAL_COM_URL` (name/email prefilled). After a booking, set the Cal.com event **Redirect on booking** to:

```
{NEXT_PUBLIC_SITE_URL}/book-consultation/booked
```

That page fires GA4 `calendar_booking_complete` (`provider: cal.com`). Visiting the path locally is enough to verify the beacon without a live booking.

## Backup

See the operator **[RUNBOOK](./RUNBOOK.md)** for volume backup/restore, workflow export cadence, Railway recovery, and the n8n-down incident path (`AUTOMATION_FALLBACK_EMAIL`).

Summary:

- Local: back up the Docker volume or export workflows from the n8n UI before upgrades.
- Railway: volume persists across redeploys; still export critical workflows periodically.

## Related

- Operator runbook: [RUNBOOK.md](./RUNBOOK.md)
- Spec: [doc/automation-analytics.md](../../doc/automation-analytics.md)
- Parent plan: [doc/redesign-implementation-plan.md](../../doc/redesign-implementation-plan.md) Phase G
