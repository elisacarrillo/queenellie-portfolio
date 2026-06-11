#!/usr/bin/env bash
set -e

REPO="elisacarrillo/queenellie-portfolio"

ensure_label() {
  local name="$1" color="$2" description="$3"
  if gh label list --repo "$REPO" --json name --jq '.[].name' | grep -qx "$name"; then
    gh label edit "$name" --repo "$REPO" --color "$color" --description "$description"
    echo "  updated: $name"
  else
    gh label create "$name" --repo "$REPO" --color "$color" --description "$description"
    echo "  created: $name"
  fi
}

echo "Setting up Claude labels on $REPO..."
ensure_label "claude-picked-up"         "f0407a" "Claude is working on this issue"
ensure_label "claude-needs-clarification" "fbca04" "Claude needs a clearer golden rule before starting"
echo "✓ Done"
