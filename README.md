# From-scratch LLM project (defaults chosen)

You asked for defaults and a from-scratch model with coding ability. This repository now contains a scaffold to begin that program.

Defaults chosen:
- Prototype target: 13B model (start with prototype workflow; scale later)
- Languages to prioritize: Python and JavaScript
- Hosting: cloud GPU fleet (A100/H100 recommended)
- No pre-trained checkpoints will be used — training from random init only

What I added
- llm/README.md — project summary
- data/ — dataset preparation skeleton
- tokenizer/train_tokenizer.py — SentencePiece training script
- training/ — training scaffold and deepspeed config
- eval/ — evaluation skeleton
- rl/ — RLHF runbook
- infra/README.md — infra guidance and cost estimate

Next recommended steps (Phase 0 → Phase 1)
1. Legal & license review of datasets you plan to use. If you plan to include public GitHub code, ensure license compliance.
2. Provision a cloud account with GPU quota (A100/H100). Create secure storage (S3/GCS) and secret manager.
3. Prepare a small seed corpus (10–50 GB) and train tokenizer using `tokenizer/train_tokenizer.py`.
4. Implement dataset preprocessing and sharding (data/).
5. Run a small training test using `training/train_from_scratch.py` or better: Megatron-DeepSpeed configs to validate pipeline.

If you want, I will now:
- Create detailed DeepSpeed/Megatron configs and a runnable end-to-end script tuned for 13B on 4-8 A100s.
- Produce Terraform (or provider-native) infra manifests to spin up GPU nodes and object storage.
- Help source & prepare an initial compliant dataset (we must discuss licensing choices).

Which of these should I do next? Reply with one of:
- "create-13b-configs" — prepare full DeepSpeed/Megatron configs and runnable scripts for a 13B from-scratch training run
- "infra-terraform" — prepare Terraform scripts and deployment steps for a chosen cloud provider (specify provider)
- "data-assist" — help source and pre-process datasets (you must confirm licensing choices)
- "wait" — pause; do not take further actions

Remember: training from scratch is expensive and legally sensitive — we must confirm dataset licenses before training if you plan to release or share the model.
