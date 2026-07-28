# Northline n8n — Operator runbook (G6)

Day-to-day ops for local Docker Compose and Railway staging. Spec: [doc/automation-analytics.md](../../doc/automation-analytics.md). Overview: [README.md](./README.md).

**Owner login (Railway / local):** `ops@northlinecreative.com` — reset password in n8n Settings if needed.

---

## 1. Health checks

### Local Compose

```bash
cd ops/n8n
docker compose ps
curl -sS -X POST "http://localhost:5678/webhook/northline-health" \
  -H "Content-Type: application/json" -d "{}"
```

Expect HTTP 200 and `"ok":true`.

### Railway staging

```bash
curl -sS -X POST "https://n8n-production-26316.up.railway.app/webhook/northline-health" \
  -H "Content-Type: application/json" -d "{}"
```

### Consultation intake (secret required)

```bash
# PowerShell: $env:N8N_WEBHOOK_SECRET = "..."
curl -sS -X POST "https://n8n-production-26316.up.railway.app/webhook/consultation-intake" \
  -H "Content-Type: application/json" \
  -H "X-Northline-Webhook-Secret: $N8N_WEBHOOK_SECRET" \
  --data-binary "@workflows/g2-payload-qualified.json"
```

Wrong/missing secret → HTTP 401. Success → `"ok":true` plus `band` / `score`.

---

## 2. Restart local Compose

From `ops/n8n` (requires `ops/n8n/.env` with `N8N_ENCRYPTION_KEY` set — keep the same key across restarts):

```bash
cd ops/n8n
docker compose down          # keeps named volume n8n_data
docker compose up -d
docker compose logs -f n8n   # Ctrl+C to detach from logs
```

**Do not** run `docker compose down -v` unless you intend to wipe all local workflows and Data Tables.

### Common failures

| Symptom | Fix |
| --- | --- |
| Port already in use | Stop other process on `5678`, or change host mapping in `docker-compose.yml` |
| Missing encryption key | Set `N8N_ENCRYPTION_KEY` in `ops/n8n/.env` (32+ chars); must stay stable |
| Container exits immediately | `docker compose logs n8n` — usually env or volume permission |
| Editor asks to recreate owner | Volume wiped or wrong encryption key — restore backup or re-bootstrap |

---

## 3. Railway recovery

Project: `northline-n8n` · Service: `n8n` · URL: `https://n8n-production-26316.up.railway.app`

1. Railway dashboard → service → **Redeploy** (or push a no-op if using Git deploy).
2. Confirm service variables still include:
   - `PORT` / `N8N_PORT` = `5678`
   - `N8N_PROTOCOL=https`, `N8N_HOST`, `WEBHOOK_URL`
   - `N8N_ENCRYPTION_KEY`, `N8N_WEBHOOK_SECRET`
   - **`RAILWAY_RUN_UID=0`** (required — without it n8n hits `EACCES` on the volume)
3. Confirm volume mounted at `/home/node/.n8n` — **do not delete the volume**.
4. Re-run health curl above.

Editor: [https://n8n-production-26316.up.railway.app](https://n8n-production-26316.up.railway.app)

---

## 4. Backup

### Workflows (both hosts)

- Keep exports under `ops/n8n/workflows/` (repo): `webhook-health.json`, `consultation-intake.json`, SDK source `consultation-intake.sdk.js`.
- Before image upgrades: n8n UI → export each published workflow → replace or version the JSON in repo.

### Local Docker volume

Find the volume name (Compose prefixes the project directory):

```bash
docker volume ls | findstr n8n
# often: n8n_n8n_data  or  opsn8n_n8n_data  (depends on compose project name)
```

Backup (bash / Git Bash / WSL) — replace `VOLUME_NAME`:

```bash
docker run --rm \
  -v VOLUME_NAME:/data \
  -v "$(pwd)":/backup \
  alpine tar czf /backup/n8n-data-backup.tgz -C /data .
```

PowerShell (from `ops/n8n`):

```powershell
$vol = (docker volume ls --format "{{.Name}}" | Select-String "n8n_data").Line
docker run --rm -v "${vol}:/data" -v "${PWD}:/backup" alpine tar czf /backup/n8n-data-backup.tgz -C /data .
```

Store `n8n-data-backup.tgz` **outside git** (contains credentials material).

Restore (destructive — stop Compose first):

```bash
docker compose down
docker run --rm -v VOLUME_NAME:/data -v "$(pwd)":/backup alpine \
  sh -c "rm -rf /data/* /data/.[!.]*; tar xzf /backup/n8n-data-backup.tgz -C /data"
docker compose up -d
```

### Railway

- Volume persists across redeploys; still **export workflows** periodically into `ops/n8n/workflows/`.
- No automated snapshot in-repo — use Railway volume backups / export discipline before risky changes.

**Cadence:** export workflows before every n8n image bump; local volume tar at least monthly or before experiments.

---

## 5. Incident: n8n unreachable

Next.js Mode A behavior is controlled by `AUTOMATION_FALLBACK_EMAIL` (root app `.env` / Vercel):

| Value | Behavior |
| --- | --- |
| `true` or **unset** (default) | Soft-fail: log n8n error; still send Resend agency + prospect; form succeeds |
| `false` | Hard-fail: form shows error if n8n intake fails or is skipped |

### While n8n is down (default soft-fail)

1. Site still accepts consultations; leads land in **Resend** → `CONTACT_TO_EMAIL`.
2. Scores/bands appear in the agency email subject/body — triage from inbox.
3. Restore n8n (Compose restart or Railway redeploy); confirm health curl.
4. New submits refill Data Tables automatically. Optional: manually re-POST from email details via curl + sample payload shape.
5. Set `AUTOMATION_FALLBACK_EMAIL=false` only if product wants the form offline when automation is down.

There is **no durable queue** in v1 — email-only is the fallback.

---

## 6. Where owners see leads

| Data | Where |
| --- | --- |
| Company / Contact / Opportunity (+ `leadScore`, `band`, `automationStatus`) | Railway n8n → Data Tables |
| Push notify | Resend → `CONTACT_TO_EMAIL` (band/score in agency mail) |
| Bookings | Cal.com dashboard for `NEXT_PUBLIC_CAL_COM_URL` |
| Funnel counts (not full records) | GA4 (`consultation_submit`, `lead_qualified`, `calendar_booking_complete`, …) |

MCP cloud (`brightakolade.app.n8n.cloud`) is for design/testing; **Railway is what the Next.js app writes to**.

---

## Quick reference

| Action | Command / URL |
| --- | --- |
| Start local | `cd ops/n8n && docker compose up -d` |
| Stop local (keep data) | `docker compose down` |
| Logs | `docker compose logs -f n8n` |
| Local editor | http://localhost:5678 |
| Railway editor | https://n8n-production-26316.up.railway.app |
| Health | `POST .../webhook/northline-health` |
| Intake | `POST .../webhook/consultation-intake` + secret header |
