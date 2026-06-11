# Telegram → Takes Workflow Design

**Date:** 2026-06-11

## Summary

Text a Telegram bot in a structured format and it opens a GitHub PR adding the take as a markdown file in `content/takes/`. You review the PR and merge to publish.

---

## Message Format

```
title: CSS-in-JS was never the problem
take: We confused styling tools with architecture decisions. The real problem was that nobody agreed on where styles belonged.
```

Both fields are required. `title:` and `take:` are parsed case-insensitively. The `take:` field can span multiple lines. If either field is missing, the bot replies with an error and the expected format.

---

## Components

### 1. Telegram Bot

Created via BotFather (free, no verification). The bot's webhook is set to `https://<vercel-domain>/api/telegram`. A secret token header is configured so the route can reject non-Telegram requests.

### 2. Webhook Route

**File:** `app/api/telegram/route.ts`

Handles `POST /api/telegram`. Responsibilities:

1. Validate `X-Telegram-Bot-Api-Secret-Token` header matches `TELEGRAM_SECRET` env var — return 401 if not
2. Parse the message body for `title:` and `take:` fields
3. If either is missing: call Telegram API to reply with error message, return 200
4. Generate slug from title (lowercase, spaces → hyphens, alphanumeric + hyphens only, max 60 chars)
5. Generate today's date in `YYYY-MM-DD` format (UTC)
6. Call GitHub API to create branch, commit file, and open PR
7. Call Telegram API to reply with PR link
8. Return 200

### 3. GitHub Integration

Uses the GitHub REST API with a personal access token. Four API calls per take:

1. `GET /repos/{owner}/{repo}/git/ref/heads/main` — get current `main` SHA
2. `POST /repos/{owner}/{repo}/git/refs` — create branch `refs/heads/takes/<slug>` at that SHA
3. `PUT /repos/{owner}/{repo}/contents/content/takes/{filename}` — create file on the new branch
4. `POST /repos/{owner}/{repo}/pulls` — open PR targeting `main`

**File created:** `content/takes/YYYY-MM-DD-<slug>.md`

**File content:**
```markdown
---
title: <title from message>
date: YYYY-MM-DD
---

<take body from message>
```

**PR title:** `Add take: <title>`
**PR branch:** `takes/<slug>`
**PR body:** `New take added via Telegram.`

---

## Environment Variables

| Variable | Purpose |
|---|---|
| `TELEGRAM_BOT_TOKEN` | Bot token from BotFather — used to send reply messages |
| `TELEGRAM_SECRET` | Secret string set when registering the webhook — validates incoming requests |
| `GITHUB_PAT` | Personal access token with `contents: write` and `pull_requests: write` scopes |

These are set in Vercel project settings (not committed to the repo).

---

## Error Handling

| Situation | Bot reply |
|---|---|
| Missing `title:` or `take:` | "Couldn't parse your take. Format:\n\ntitle: your title\ntake: your take" |
| GitHub API failure | "Something went wrong creating the PR. Try again." |
| Invalid secret header | 401, no reply |
| Non-message update (e.g. bot added to group) | 200, no action |

---

## Setup Steps (one-time)

1. Create bot via BotFather → get `TELEGRAM_BOT_TOKEN`
2. Add env vars to Vercel: `TELEGRAM_BOT_TOKEN`, `TELEGRAM_SECRET`, `GITHUB_PAT`
3. After deployment, register webhook:
   ```bash
   curl "https://api.telegram.org/bot<TOKEN>/setWebhook" \
     -d "url=https://<vercel-domain>/api/telegram" \
     -d "secret_token=<TELEGRAM_SECRET>"
   ```

---

## Out of Scope

- Editing or deleting takes via Telegram
- Merging PRs from Telegram
- Authentication beyond the secret token (single user assumed)
- Rich formatting or markdown in takes (plain text only for now)
