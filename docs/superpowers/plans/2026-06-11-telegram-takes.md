# Telegram Takes Webhook Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** A Vercel API route receives Telegram webhook messages in `title: xxx\ntake: xxx` format and opens a GitHub PR adding the take as a markdown file in `content/takes/`.

**Architecture:** Single Next.js 16 App Router route handler at `app/api/telegram/route.ts`. On each POST, it validates the Telegram secret header, parses the message, makes 4 GitHub API calls (get main SHA → create branch → create file → open PR), then replies in Telegram with the PR link. No new dependencies — uses native `fetch` and `Buffer`.

**Tech Stack:** Next.js 16 App Router route handlers, GitHub REST API, Telegram Bot API, Vercel env vars

> **Note:** Per project conventions, no tests and no git commits are included in these steps.

---

### Task 1: Create the webhook route

**Files:**
- Create: `app/api/telegram/route.ts`

- [ ] **Step 1: Read the Next.js 16 route handler docs**

Run:
```bash
cat node_modules/next/dist/docs/01-app/01-getting-started/15-route-handlers.md
```

Key points to note: route handlers export named async functions (`POST`, `GET`, etc.); use standard Web `Request`/`Response`; `Response.json()` for JSON responses; `new Response(null, { status: 401 })` for status-only responses.

- [ ] **Step 2: Create `app/api/telegram/route.ts` with the full implementation**

```typescript
import { NextRequest } from 'next/server';

export async function POST(req: NextRequest) {
  // 1. Validate secret
  const secret = req.headers.get('x-telegram-bot-api-secret-token');
  if (secret !== process.env.TELEGRAM_SECRET) {
    return new Response(null, { status: 401 });
  }

  // 2. Parse update
  const update = await req.json();
  const text: string | undefined = update.message?.text;
  const chatId: number | undefined = update.message?.chat?.id;

  if (!text || !chatId) {
    return Response.json({ ok: true });
  }

  // 3. Parse title and take fields
  const titleMatch = text.match(/^title:\s*(.+)/im);
  const takeMatch = text.match(/^take:\s*([\s\S]+)/im);

  if (!titleMatch || !takeMatch) {
    await telegramReply(
      chatId,
      "Couldn't parse your take. Use this format:\n\ntitle: your title\ntake: your take"
    );
    return Response.json({ ok: true });
  }

  const title = titleMatch[1].trim();
  const take = takeMatch[1].trim();

  // 4. Generate slug and filename
  const slug = title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 60);
  const date = new Date().toISOString().slice(0, 10); // YYYY-MM-DD UTC
  const filename = `${date}-${slug}.md`;
  const fileContent = `---\ntitle: ${title}\ndate: ${date}\n---\n\n${take}\n`;

  // 5. Create PR via GitHub API
  try {
    const pr = await createTakePR(slug, filename, fileContent, title);
    await telegramReply(chatId, `PR opened: #${pr.number} — ${title}\n${pr.html_url}`);
  } catch {
    await telegramReply(chatId, 'Something went wrong creating the PR. Try again.');
  }

  return Response.json({ ok: true });
}

async function createTakePR(
  slug: string,
  filename: string,
  content: string,
  title: string
): Promise<{ number: number; html_url: string }> {
  const owner = 'elisacarrillo';
  const repo = 'queenellie-portfolio';
  const branch = `takes/${slug}`;
  const pat = process.env.GITHUB_PAT!;

  const headers = {
    Authorization: `Bearer ${pat}`,
    Accept: 'application/vnd.github+json',
    'X-GitHub-Api-Version': '2022-11-28',
    'Content-Type': 'application/json',
  };

  // Step 1: Get main SHA
  const refRes = await fetch(
    `https://api.github.com/repos/${owner}/${repo}/git/ref/heads/main`,
    { headers }
  );
  if (!refRes.ok) throw new Error(`get main SHA: ${refRes.status}`);
  const sha: string = (await refRes.json()).object.sha;

  // Step 2: Create branch
  const branchRes = await fetch(
    `https://api.github.com/repos/${owner}/${repo}/git/refs`,
    {
      method: 'POST',
      headers,
      body: JSON.stringify({ ref: `refs/heads/${branch}`, sha }),
    }
  );
  if (!branchRes.ok) throw new Error(`create branch: ${branchRes.status}`);

  // Step 3: Create file
  const fileRes = await fetch(
    `https://api.github.com/repos/${owner}/${repo}/contents/content/takes/${filename}`,
    {
      method: 'PUT',
      headers,
      body: JSON.stringify({
        message: `Add take: ${title}`,
        content: Buffer.from(content, 'utf8').toString('base64'),
        branch,
      }),
    }
  );
  if (!fileRes.ok) throw new Error(`create file: ${fileRes.status}`);

  // Step 4: Open PR
  const prRes = await fetch(
    `https://api.github.com/repos/${owner}/${repo}/pulls`,
    {
      method: 'POST',
      headers,
      body: JSON.stringify({
        title: `Add take: ${title}`,
        head: branch,
        base: 'main',
        body: 'New take added via Telegram.',
      }),
    }
  );
  if (!prRes.ok) throw new Error(`open PR: ${prRes.status}`);
  return prRes.json();
}

async function telegramReply(chatId: number, text: string): Promise<void> {
  await fetch(
    `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: chatId, text }),
    }
  );
}
```

- [ ] **Step 3: Verify it type-checks**

```bash
npx tsc --noEmit
```

Expected: no errors. If you see errors about `Buffer`, it's available in Next.js server routes — ensure `tsconfig.json` includes `"lib": ["es2015", "dom"]` or just ignore Buffer type errors (it works at runtime).

- [ ] **Step 4: Verify the route loads in the dev server**

Start the dev server if not running:
```bash
npm run dev
```

Test that the route exists and rejects missing secrets:
```bash
curl -s -o /dev/null -w "%{http_code}" -X POST http://localhost:3000/api/telegram \
  -H "Content-Type: application/json" \
  -d '{"message":{"text":"test","chat":{"id":123}}}'
```
Expected output: `401`

Test that a valid secret returns 200:
```bash
curl -s -w "\n%{http_code}" -X POST http://localhost:3000/api/telegram \
  -H "Content-Type: application/json" \
  -H "X-Telegram-Bot-Api-Secret-Token: test-secret" \
  -d '{"message":{"text":"test","chat":{"id":123}}}'
```
Expected output: `{"ok":true}` then `200`

Note: with `TELEGRAM_SECRET=test-secret` not set in your env, the 401 test will return 200 (since `undefined !== "test-secret"` but both sides are falsy-ish). To properly test secret validation locally, add `TELEGRAM_SECRET=test-secret` to `.env.local`:
```
TELEGRAM_SECRET=test-secret
TELEGRAM_BOT_TOKEN=placeholder
GITHUB_PAT=placeholder
```

Then re-run both curl commands — the first should 401, the second 200.

---

### Task 2: Create the Telegram bot and wire up the webhook

This task is manual setup steps — no code to write.

**Files:** None

- [ ] **Step 1: Create a Telegram bot via BotFather**

Open Telegram, search for `@BotFather`, start a chat, and send:
```
/newbot
```

Follow the prompts — choose a name (e.g. "Queenellie Takes") and a username (e.g. `queenellie_takes_bot`). BotFather will reply with a token like:
```
7123456789:AAHdqTcvCHlvGMXxxxxxxxxxxxxxxxxx
```

Save this — it's your `TELEGRAM_BOT_TOKEN`.

- [ ] **Step 2: Add environment variables to Vercel**

Go to your Vercel project settings → Environment Variables. Add:

| Name | Value |
|---|---|
| `TELEGRAM_BOT_TOKEN` | The token from BotFather |
| `TELEGRAM_SECRET` | Any string you make up (e.g. `takes-secret-2026`) |
| `GITHUB_PAT` | A GitHub personal access token (see Step 3) |

- [ ] **Step 3: Create a GitHub Personal Access Token**

Go to `https://github.com/settings/tokens/new` (fine-grained tokens work too).

Required scopes for the `elisacarrillo/queenellie-portfolio` repo:
- `Contents` — Read and write (to create files)
- `Pull requests` — Read and write (to open PRs)

Copy the token and add it as `GITHUB_PAT` in Vercel.

- [ ] **Step 4: Deploy to Vercel and get your production URL**

Either push a commit to trigger a deployment, or check your current production URL at `https://vercel.com/dashboard`. Your webhook URL will be:
```
https://<your-vercel-domain>/api/telegram
```

- [ ] **Step 5: Register the webhook with Telegram**

Replace `<TOKEN>` and `<SECRET>` with your actual values:

```bash
curl "https://api.telegram.org/bot<TOKEN>/setWebhook" \
  -d "url=https://<your-vercel-domain>/api/telegram" \
  -d "secret_token=<SECRET>"
```

Expected response:
```json
{"ok":true,"result":true,"description":"Webhook was set"}
```

- [ ] **Step 6: Verify the webhook is registered**

```bash
curl "https://api.telegram.org/bot<TOKEN>/getWebhookInfo"
```

Expected: `"url"` field shows your Vercel URL, `"pending_update_count": 0`.

- [ ] **Step 7: Send a test take**

Open Telegram, find your bot, and send:
```
title: This is a test take
take: Testing the Telegram → GitHub PR pipeline.
```

Expected: Bot replies with something like:
```
PR opened: #42 — This is a test take
https://github.com/elisacarrillo/queenellie-portfolio/pull/42
```

Check GitHub — the PR should exist with a new file at `content/takes/YYYY-MM-DD-this-is-a-test-take.md`.
