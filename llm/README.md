# From-scratch LLM (project scaffold)

This folder contains the initial scaffold and runbook to train a causal language model from random initialization (no pre-trained checkpoints) with a focus on coding capabilities.

High-level phases
- Phase 0: Planning & infra (this document)
- Phase 1: Prototype pipeline + small model (1–3B)
- Phase 2: Scale pretraining to target (13B default) — large runs
- Phase 3: Instruction tuning + RLHF
- Phase 4: Optimization & deployment

Important: training from scratch requires significant compute, storage, and careful legal/licensing review of datasets.

See the repository root README for full runbook, and `infra/README.md` for recommended cloud instance types and cost estimates.
