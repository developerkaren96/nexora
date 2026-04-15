#!/usr/bin/env bash
# Stop all Nexora infrastructure containers. Pass --wipe to also delete volumes.
set -Eeuo pipefail
cd "$(dirname "${BASH_SOURCE[0]}")/.."

if docker compose version >/dev/null 2>&1; then COMPOSE=(docker compose)
else COMPOSE=(docker-compose); fi

if [[ "${1:-}" == "--wipe" ]]; then
  "${COMPOSE[@]}" down -v
  rm -f .nexora.seeded
  echo "Containers stopped and volumes wiped."
else
  "${COMPOSE[@]}" down
  echo "Containers stopped (volumes preserved)."
fi
