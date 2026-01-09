# Infrastructure recommendations & cost estimates

Defaults (prototype 13B starter):
- Use cloud provider with A100 or H100 GPUs (e.g., CoreWeave, Lambda Labs, Oracle, AWS via EC2 p4a/p4d, GCP A2).
- For 13B training you can run on 4-8 x A100 80GB with DeepSpeed ZeRO stage 3.

Checkpoint storage:
- Keep fast NVMe for active training; store checkpoints to S3/GCS for long-term.

Ballpark costs (very rough):
- Prototype (1–3B): $2k–$20k (compute + storage)
- 13B run: $20k–$200k depending on training tokens and time
- 70B+: $200k–$2M+

Security & secrets:
- Use cloud secret manager for GCP/AWS or host-specific env vars. Never commit tokens or keys to repo.
