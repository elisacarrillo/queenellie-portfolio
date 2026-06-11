# GitHub → Claude Workflow Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Wire up a system where mentioning `@claude` in a GitHub issue triggers a scheduled cloud agent to implement the work, verify it against a Vercel preview URL using the golden-rule-verification skill, and report back via PR + issue comment.

**Architecture:** Four files created, one scheduled routine registered. A `.github/claude-poller.md` prompt defines what the cloud agent does every 15 minutes — find unprocessed `@claude` mentions, check golden rule clarity, implement on a branch, push, get Vercel preview URL, verify, open PR, comment. Labels track state.

**Tech Stack:** `gh` CLI, Vercel CLI (`vercel`), Playwright (for verification), Claude `schedule` skill

---

### Task 1: Create GitHub labels

**Files:**
- Create: `scripts/setup-labels.sh`

- [ ] **Step 1: Create `scripts/setup-labels.sh`**

```bash
#!/usr/bin/env bash
set -e

REPO="elisacarrillo/queenellie-portfolio"

gh label create "claude-picked-up" \
  --repo "$REPO" \
  --color "f0407a" \
  --description "Claude is working on this issue" \
  2>/dev/null || gh label edit "claude-picked-up" \
    --repo "$REPO" \
    --color "f0407a" \
    --description "Claude is working on this issue"

gh label create "claude-needs-clarification" \
  --repo "$REPO" \
  --color "fbca04" \
  --description "Claude needs a clearer golden rule before starting" \
  2>/dev/null || gh label edit "claude-needs-clarification" \
    --repo "$REPO" \
    --color "fbca04" \
    --description "Claude needs a clearer golden rule before starting"

echo "✓ Labels created"
```

- [ ] **Step 2: Make it executable and run it**

```bash
chmod +x scripts/setup-labels.sh
./scripts/setup-labels.sh
```

Expected output: `✓ Labels created`

- [ ] **Step 3: Verify labels exist on GitHub**

```bash
gh label list --repo elisacarrillo/queenellie-portfolio | grep claude
```

Expected: two lines — `claude-picked-up` and `claude-needs-clarification`

---

### Task 2: Create the issue template

**Files:**
- Create: `.github/ISSUE_TEMPLATE/claude-task.yml`

- [ ] **Step 1: Create the directory and template file**

```bash
mkdir -p .github/ISSUE_TEMPLATE
```

- [ ] **Step 2: Write `.github/ISSUE_TEMPLATE/claude-task.yml`**

```yaml
name: Claude Task
description: Assign a task to Claude for implementation
title: "[claude] "
labels: []
body:
  - type: markdown
    attributes:
      value: |
        Mention `@claude` in the **What to build** field or in a comment to trigger pickup.
        Claude checks for new mentions every 15 minutes.

  - type: textarea
    id: what-to-build
    attributes:
      label: What to build
      description: Describe what you want implemented. Be specific about files, pages, or behavior.
      placeholder: "e.g. Add a hover state to the case cards that shows the full summary text"
    validations:
      required: true

  - type: textarea
    id: golden-rule
    attributes:
      label: Golden Rule
      description: |
        The specific, observable thing that must be true when this is done.
        ✅ Good: "Hovering a card on /work reveals the full summary in a tooltip"
        ❌ Bad: "Cards should look better on hover"
      placeholder: "Visiting ___ shows/does ___"
    validations:
      required: true

  - type: textarea
    id: context
    attributes:
      label: Context (optional)
      description: Relevant files, constraints, prior decisions, or anything Claude should know.
    validations:
      required: false
```

- [ ] **Step 3: Verify template appears on GitHub**

Open `https://github.com/elisacarrillo/queenellie-portfolio/issues/new/choose` in a browser. The "Claude Task" template should appear as an option.

---

### Task 3: Write the poller prompt

**Files:**
- Create: `.github/claude-poller.md`

This file is the complete task prompt the scheduled cloud agent runs every 15 minutes.

- [ ] **Step 1: Write `.github/claude-poller.md`**

```markdown
# Claude Poller — queenellie-portfolio

You are a scheduled agent for the `elisacarrillo/queenellie-portfolio` repository.
Working directory: `/Users/queenellie/Documents/queenellie-portfolio`
Run every 15 minutes. Each run: find one unprocessed `@claude` mention, work it to completion, stop.

## Step 1: Find an unprocessed mention

Search open issues for `@claude` without the `claude-picked-up` label:

```bash
gh issue list \
  --repo elisacarrillo/queenellie-portfolio \
  --state open \
  --search "@claude" \
  --json number,title,body,labels \
  --limit 20
```

Filter out any issues that already have a `claude-picked-up` label.

Also check comments on open issues:

```bash
gh api repos/elisacarrillo/queenellie-portfolio/issues/comments \
  --paginate \
  --jq '.[] | select(.body | contains("@claude")) | {issue_url: .issue_url, body: .body}'
```

Cross-reference with the label filter above.

If no unprocessed mentions found: output "No new @claude mentions found." and stop.

## Step 2: Claim the issue

Add the `claude-picked-up` label immediately to prevent double-processing:

```bash
gh issue edit <NUMBER> \
  --repo elisacarrillo/queenellie-portfolio \
  --add-label "claude-picked-up"
```

## Step 3: Check golden rule clarity

Read the issue body. Find the **Golden Rule** section.

A golden rule is **clear** if it:
- Names a specific URL, page, or element
- Describes observable output (text, visual, behavior)
- Is binary — either passes or doesn't

A golden rule is **unclear** if it:
- Is missing entirely
- Says something vague like "it should work" or "looks right"
- Doesn't describe something you can check at a running URL

**If unclear:** Post this comment, swap the label, and stop:

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
cd /Users/queenellie/Documents/queenellie-portfolio
git fetch origin main
git checkout -b claude/<NUMBER>-<slug> origin/main
```

Where `<slug>` is the issue title lowercased, spaces replaced with hyphens, max 40 chars.

Read the full issue (title + body + golden rule + context). Implement the work described.

Do NOT run git commands that push yet — push happens after verification.

## Step 5: Verify against Vercel preview

Push the branch and get the preview URL:

```bash
git push origin claude/<NUMBER>-<slug>
```

Create a draft PR to trigger Vercel preview:

```bash
gh pr create \
  --repo elisacarrillo/queenellie-portfolio \
  --title "<issue title>" \
  --body "Closes #<NUMBER>" \
  --head claude/<NUMBER>-<slug> \
  --base main \
  --draft
```

Wait for Vercel to deploy (up to 90 seconds). Get the preview URL:

```bash
sleep 30
gh pr view --json statusCheckRollup | \
  jq -r '.statusCheckRollup[] | select(.name | contains("vercel")) | .targetUrl' | head -1
```

If no Vercel URL appears after 90s, note it in the PR and proceed anyway.

**Apply golden-rule-verification:**

Define the golden rule from the issue (write it down explicitly before verifying).
Replace `localhost:3000` with the Vercel preview URL.
Use `npx playwright screenshot` or `curl` to verify at the real URL.
Loop up to 3 times — fix and re-verify if the golden rule doesn't pass.

## Step 6: Report back

**If golden rule passes:**

```bash
# Mark PR as ready
gh pr ready <PR_NUMBER> --repo elisacarrillo/queenellie-portfolio

# Comment on the issue
gh issue comment <NUMBER> \
  --repo elisacarrillo/queenellie-portfolio \
  --body "✅ Done! Here's what I built and how I verified it:

**What I did:** <brief summary>

**Golden rule verified:** <the golden rule, confirmed passing>

**Preview:** <vercel preview URL>

PR: #<PR_NUMBER>"
```

**If golden rule fails after 3 attempts:**

```bash
gh issue comment <NUMBER> \
  --repo elisacarrillo/queenellie-portfolio \
  --body "⚠️ I implemented this but couldn't fully verify the golden rule after 3 attempts.

**What I tried:** <summary>

**What's blocking:** <specific issue>

**Draft PR with my work:** #<PR_NUMBER>

Please review and let me know how to proceed."
```
```

---

### Task 4: Register the scheduled routine

**Files:** None — configured via the `schedule` skill

- [ ] **Step 1: Register the 15-minute poller using the `schedule` skill**

Invoke the `schedule` skill with the following parameters:
- **Name:** `claude-poller-queenellie`
- **Schedule:** Every 15 minutes (`*/15 * * * *`)
- **Prompt:** Contents of `.github/claude-poller.md`
- **Working directory:** `/Users/queenellie/Documents/queenellie-portfolio`

- [ ] **Step 2: Verify the routine is registered**

```bash
# List scheduled routines to confirm it appears
```

Use the `schedule` skill's list command to confirm `claude-poller-queenellie` appears with a `*/15 * * * *` schedule.

- [ ] **Step 3: Test with a manual trigger**

Create a test issue on GitHub using the Claude Task template. Fill in a clear golden rule. Mention `@claude` in the body.

Trigger the poller manually via the `schedule` skill's run command.

Confirm it:
1. Finds the issue
2. Adds `claude-picked-up` label
3. Posts a comment OR starts implementing (depending on golden rule clarity)
