#!/usr/bin/env bash
set -euo pipefail

PORT="${1:-4173}"
HOST="${2:-127.0.0.1}"

echo "Starting CJ's Pickleball local server..."
echo "URL: http://${HOST}:${PORT}"
echo "Press Ctrl+C to stop."

python3 -m http.server "${PORT}" --bind "${HOST}"
