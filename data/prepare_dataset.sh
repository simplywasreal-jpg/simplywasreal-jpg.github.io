#!/usr/bin/env bash
set -euo pipefail

# Example dataset preparation orchestrator (skeleton). Fill dataset sources and storage locations.
# This script is a starting point: replace dataset sources with legally-approved sources you own or have license for.

OUT_DIR=${1:-"/workspace/data/shards"}
mkdir -p "$OUT_DIR"

echo "[dataset] output -> $OUT_DIR"

# Example: run normalization and dedupe pipeline per-source
# ./normalize_code.py < raw_source > cleaned_source
# Then shard and compress

# Placeholder - implementations must be added for each dataset source
for src in "the_pile" "github_snapshot" "stackoverflow"; do
  echo "Processing $src (implement fetching & cleaning)"
  # fetch, clean, dedupe, shard
done

# After this, upload shards to object storage (S3 / GCS / etc.) used by training.

echo "Done. Shards ready in $OUT_DIR"
