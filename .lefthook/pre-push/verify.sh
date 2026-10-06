#!/bin/sh
set -eu

if [ -n "$(git status --porcelain)" ]; then
  echo "Commit or stash local changes before pushing: checks must match the committed files."
  exit 1
fi

exec mise exec -- npm run verify
