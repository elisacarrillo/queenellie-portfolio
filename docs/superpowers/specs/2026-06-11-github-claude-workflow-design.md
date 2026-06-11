# GitHub → Claude Workflow Design

**Date:** 2026-06-11

## Summary

A system where creating a GitHub issue with `@claude` in the body or a comment automatically triggers Claude to implement the work, validate against a golden rule, open a PR, and comment on the issue.

---

## Components

### 1. Issue Template

**File:** `.github/ISSUE_TEMPLATE/claude-task.yml`

A GitHub issue form template that enforces the required structure. Required sections:

- **What to build** — free-text description of the task
- **Golden Rule** — specific, observable success criteria (e.g. "Visiting /takes shows 'Jun 2025' for the CSS-in-JS take")
- **Context** (optional) — extra notes, files to look at, constraints

The golden rule field includes placeholder text explaining what makes a good golden rule: specific, observable, binary.

### 2. GitHub Labels

Two labels are created once:

| Label | Color | Purpose |
|---|---|---|
| `claude-picked-up` | `#f0407a` | Added immediately when Claude starts processing — prevents double-pickup |
| `claude-needs-clarification` | `#fbca04` | Added when golden rule is missing or unclear |

### 3. Scheduled Poller

A Claude cloud agent scheduled via the `schedule` skill. Runs every 15 minutes.

**What it does:**
1. Uses `gh` CLI to list open issues that:
   - Mention `@claude` in the body OR have a comment containing `@claude`
   - Do NOT have the `claude-picked-up` label
2. For each matching issue:
   - Immediately adds `claude-picked-up` label (prevents double-processing)
   - Checks if golden rule section is present and specific
   - If unclear: posts a comment asking for clarification, swaps label to `claude-needs-clarification`
   - If clear: runs the executor

### 4. Executor

Runs in the same scheduled agent turn, once per issue:

1. **Parse** — extract title, description, and golden rule from issue body
2. **Branch** — `git checkout -b claude/<issue-number>-<slug>` from latest main
3. **Implement** — work through the task described in the issue
4. **Validate** — apply `golden-rule-verification` skill: define golden rule from issue, verify at the running dev server, loop until it passes (or exhaust 3 attempts)
5. **Report:**
   - If passing: push branch, open PR referencing the issue, post success comment on issue
   - If blocked after 3 attempts: post comment describing what was tried and what's blocking, leave `claude-picked-up` label so it isn't re-picked

---

## Data Flow

```
User creates issue (template)
  └─> Mentions @claude in body or comment
        └─> Poller (every 15 min) finds it
              ├─> Golden rule unclear?
              │     └─> Comment asking for clarification
              │           └─> Swap label to claude-needs-clarification
              └─> Golden rule clear?
                    └─> Add claude-picked-up label
                          └─> Create branch
                                └─> Implement
                                      └─> Validate (golden-rule-verification loop)
                                            ├─> PASS → open PR + comment on issue
                                            └─> BLOCKED → comment with findings
```

---

## Golden Rule Clarity Check

Claude considers a golden rule **unclear** if it:
- Is missing entirely
- Says something vague like "it should work" or "looks right"
- Doesn't describe an observable outcome at the running app

Claude considers it **clear** if it names a specific URL, visual element, text output, or behavior that can be checked at runtime.

---

## Files Created / Modified

| File | Action |
|---|---|
| `.github/ISSUE_TEMPLATE/claude-task.yml` | Create — issue form template |
| `.github/labels.yml` | Create — label definitions |
| `.github/claude-poller.md` | Create — the task prompt the scheduled cloud agent runs each tick |
| `scripts/setup-labels.sh` | Create — one-time script to create labels via `gh` CLI |

The scheduled agent itself is configured via the `schedule` skill — no code file needed for the cron configuration.

---

## Out of Scope

- Multiple `@claude` mentions in the same issue (first one wins)
- Cancelling in-progress work
- Authentication / secrets management beyond what `gh` CLI already provides
