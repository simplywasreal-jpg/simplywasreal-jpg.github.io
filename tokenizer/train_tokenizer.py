# Train a SentencePiece tokenizer on combined text+code corpus
# Example usage:
#   python tokenizer/train_tokenizer.py --input-list shards.txt --vocab-size 64000 --model-prefix tokenizer

import argparse
import sentencepiece as spm

parser = argparse.ArgumentParser()
parser.add_argument('--input-list', required=True, help='File containing newline-separated shard file paths')
parser.add_argument('--vocab-size', type=int, default=64000)
parser.add_argument('--model-prefix', default='tokenizer')
args = parser.parse_args()

# Create a temporary concatenated file or use sentencepiece's --input for multiple files (join into one fast file)
# For very large corpora, prepare a single merged file or use streaming training approaches.

with open(args.input_list) as f:
    files = [l.strip() for l in f if l.strip()]

# SentencePiece can accept a comma-separated list; join if modest size
input_files = ','.join(files)

spm.SentencePieceTrainer.Train(
    f"--input={input_files} --model_prefix={args.model_prefix} --vocab_size={args.vocab_size} --model_type=bpe --character_coverage=1.0 --pad_id=0 --unk_id=1 --bos_id=2 --eos_id=3"
)

print('Tokenizer training complete:', args.model_prefix)
