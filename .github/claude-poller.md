# Claude Poller — queenellie-portfolio

You are a scheduled agent for the `elisacarrillo/queenellie-portfolio` repository.
Run every hour. Each run: find one unprocessed `@claude` mention, work it to completion, stop.

## Step 1: Find an unprocessed mention

Search open issues for `@claude` without the `claude-picked-up` label:

Filter to issues without `claude-picked-up` using jq:

```bash
gh issue list \
  --repo elisacarrillo/queenellie-portfolio \
  --state open \
  --search "@claude" \
  --json number,title,body,labels \
  --limit 20 \
  | jq '[.[] | select(.labels | map(.name) | contains(["claude-picked-up"]) | not)]'
```

Also check comments on open issues:

```bash
gh api repos/elisacarrillo/queenellie-portfolio/issues/comments \
  --paginate \
  --jq '.[] | select(.body | contains("@claude")) | {issue_url: .issue_url, id: .id, body: .body}'
```

For comments: extract the issue number from `issue_url` (last path segment). Skip issues already labelled `claude-picked-up`.

If no unprocessed mentions found: output "No new @claude mentions found." and stop.

## Step 2: Claim the issue

Add the `claude-picked-up` label immediately to prevent double-processing:

```bash
gh issue edit <NUMBER> \
  --repo elisacarrillo/queenellie-portfolio \
  --add-label "claude-picked-up"
```

## Step 3: Check golden rule clarity

Read the full issue body. Find the **Golden Rule** section (from the issue template, it's the second required field).

A golden rule is **clear** if it:
- Names a specific URL, page, or element (e.g. "/work", "the nav bar", "each case card")
- Describes observable output — text, visual, or behavior
- Is binary: either passes or it doesn't

A golden rule is **unclear** if it:
- Is missing entirely
- Says something vague like "it should work" or "looks right" or "looks better"
- Doesn't describe something checkable at a running URL

**If unclear:** post this comment, swap the label, and stop:

```bash
gh issue comment <NUMBER> \
  --repo elisacarrillo/queenellie-portfolio \
  --body "Hi! I picked up this ticket but the **Golden Rule** isn't specific enough for me to verify my work.

Could you update it to describe a specific, observable outcome? For example:
- ✅ \"Visiting /work shows cards with a pink left border\"
- ❌ \"Cards look better\"

Once you clarify, mention \`@claude\` again and I'll pick it back up."

gh issue edit <NUMBER> \
  --repo elisacarrillo/queenellie-portfolio \
  --remove-label "claude-picked-up" \
  --add-label "claude-needs-clarification"
```

Then stop.

## Step 4: Create a branch and implement

```bash
git fetch origin main
git checkout -b claude/<NUMBER>-<slug> origin/main
```

`<slug>` = issue title lowercased, spaces → hyphens, max 40 chars, alphanumeric and hyphens only.

Read the full issue: title, "What to build" field, golden rule, context. Implement the described work.

The project is Next.js 16 App Router with Tailwind CSS v4. Brand color: `#f0407a`. Fonts: Inter (`font-inter`), Fraunces (`font-fraunces`), Syne (`font-syne`), Manufacturing Consent (`font-queenellie-display`). Before writing any Next.js code, read `node_modules/next/dist/docs/` for the relevant guide — this version has breaking changes.

Do NOT push yet — push happens in Step 5.

## Step 5: Open a draft PR and get the Vercel preview URL

Push the branch and open a draft PR:

```bash
git push origin claude/<NUMBER>-<slug>

PR_URL=$(gh pr create \
  --repo elisacarrillo/queenellie-portfolio \
  --title "<issue title>" \
  --body "Closes #<NUMBER>

## What I built
<brief description of the implementation>

## Golden Rule
<the exact golden rule from the issue>

## Verification
Will verify against Vercel preview URL once deployed." \
  --head claude/<NUMBER>-<slug> \
  --base main \
  --draft)
PR_NUMBER=$(echo "$PR_URL" | grep -oE '[0-9]+$')
echo "Draft PR created: $PR_URL (number: $PR_NUMBER)"
```

Wait 60 seconds for Vercel to deploy, then check for the preview URL.

```bash
sleep 60
gh pr view <PR_NUMBER> \
  --repo elisacarrillo/queenellie-portfolio \
  --json statusCheckRollup \
  --jq '.statusCheckRollup[] | select(.name | ascii_downcase | contains("vercel")) | .targetUrl' \
  | head -1
```

If no Vercel URL appears after 90s, proceed with the golden rule check against `localhost:3000` instead (noting this limitation in the PR).

## Step 6: Verify the golden rule

**Before verifying, write down the golden rule explicitly:**

> Golden Rule: [exact text from issue]
> Verification URL: [Vercel preview URL or localhost:3000]

Use `npx playwright screenshot` or `curl` to check the URL at the relevant page.

```bash
# Screenshot approach
npx playwright screenshot --browser chromium <URL>/<path> /tmp/check.png

# Text content approach
curl -s <URL>/<path> | grep -o "<expected text>"
```

If the golden rule doesn't pass: fix the implementation and re-verify. Loop up to 3 attempts total.

## Step 7: Report back

**If golden rule passes:**

Update the PR body with verification results, then comment on the issue:

```bash
gh issue comment <NUMBER> \
  --repo elisacarrillo/queenellie-portfolio \
  --body "✅ Done!

**What I built:** <one sentence summary>

**Golden rule verified:** <the exact golden rule, confirmed passing>

**Preview:** <vercel preview URL>

**PR:** #<PR_NUMBER>"

# Mark PR ready for review
gh pr ready <PR_NUMBER> --repo elisacarrillo/queenellie-portfolio
```

**If golden rule fails after 3 attempts:**

```bash
gh issue comment <NUMBER> \
  --repo elisacarrillo/queenellie-portfolio \
  --body "⚠️ I implemented this but couldn't fully verify the golden rule after 3 attempts.

**What I tried:** <brief summary of implementation>

**What's blocking verification:** <specific issue>

**Draft PR with my work:** #<PR_NUMBER>

Please review and let me know how to proceed."
```
