#!/usr/bin/env python3
"""Basic normalization for code/text before tokenization.
This is a small utility to strip large binary-like blobs and normalize line endings, remove trailing whitespace, and optionally truncate very long files.

This is only a starting point — real pipelines use robust deduplication and license filtering.
"""
import sys

MAX_LINES = 20000

for raw in sys.stdin:
    # simple passthrough example; real cleaning should be more involved
    text = raw.replace('\r\n', '\n')
    lines = text.split('\n')[:MAX_LINES]
    out = '\n'.join(l.rstrip() for l in lines)
    print(out)
