#!/bin/bash
set -euo pipefail

if [ "${CLAUDE_CODE_REMOTE:-}" != "true" ]; then
  exit 0
fi

if command -v headroom >/dev/null 2>&1; then
  exit 0
fi

pip install --quiet --disable-pip-version-check "headroom-ai[all]"
