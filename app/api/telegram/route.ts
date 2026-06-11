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
  } catch (err) {
    console.error('createTakePR failed:', err);
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
  if (!pat) throw new Error('GITHUB_PAT env var is not set');

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
  const res = await fetch(
    `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: chatId, text }),
    }
  );
  if (!res.ok) {
    console.error(`telegramReply failed: ${res.status}`, await res.text());
  }
}
