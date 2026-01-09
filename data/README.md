# Data collection & preprocessing

This folder will contain scripts to gather, filter, deduplicate, and tokenize large corpora of code and text for pretraining.

Key steps (implemented by scripts below):
1. Download public datasets (The Pile subsets, public GitHub snapshot, StackOverflow dumps, documentation archives) with license filtering.
2. Filter by license and remove repos with restrictive licenses if you plan to release the model.
3. Deduplicate using hashing (MinHash / shingling) and line-based dedupe.
4. Split into shards and upload to fast object storage for training.

Files:
- `prepare_dataset.sh` — example orchestrator to run download + preprocess steps.
- `normalize_code.py` — small script to normalize whitespace and strip large binaries.
