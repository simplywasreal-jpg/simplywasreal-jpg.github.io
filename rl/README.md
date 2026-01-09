# RLHF & alignment runbook

This folder describes the steps for implementing RLHF after SFT (supervised fine-tuning):
1. Collect human preference data comparing multiple model outputs for the same prompt.
2. Train a reward model on preference pairs.
3. Use PPO (or similar) to update the policy model using the reward model.

Notes:
- RLHF is compute-intensive because it requires many rollouts.
- Start with SFT and automated preference heuristics before committing to full human labeling.
