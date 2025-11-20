---
title: "RAG Journal — Chunking Trials"
description: "Comparing different chunking strategies for RAG systems with OpenSearch and vector search"
pubDate: "2024-01-15"
tags: ["AI", "RAG", "OpenSearch", "Vector Search", "Machine Learning"]
context: "Comparing 400–600 vs 800–1,000 token chunks with BM25+vector and citation precision."
stage: "draft"
confidence: "med"
mood: "curious"
featured: false
---

# RAG Journal — Chunking Trials

I've been experimenting with different chunking strategies for Retrieval-Augmented Generation (RAG) systems. The goal is to find the sweet spot between retrieval accuracy and computational efficiency.

## Current Setup

I'm using OpenSearch with both BM25 (lexical) and vector search capabilities. The system ingests markdown documents and generates embeddings using a sentence transformer model.

## Chunking Strategies Tested

### Strategy 1: Fixed Size (400-600 tokens)
- **Pros**: Consistent chunk sizes, good for batch processing
- **Cons**: May split related content, context windows can be too small
- **Performance**: 78% precision at top-5, 45% citation accuracy

### Strategy 2: Semantic Chunking (800-1000 tokens)
- **Pros**: Better context preservation, fewer splits in related content
- **Cons**: Variable processing times, potential memory issues
- **Performance**: 82% precision at top-5, 52% citation accuracy

### Strategy 3: Hybrid (Sentence-aware + 600 token max)
- **Pros**: Respects sentence boundaries, good balance of size and context
- **Cons**: More complex implementation
- **Performance**: 85% precision at top-5, 48% citation accuracy

## Observations

The semantic chunking approach shows the best overall performance, but the difference isn't as dramatic as I expected. The hybrid approach seems promising for production use cases.

## Next Steps

1. Test with larger document sets (current: 500 docs, target: 5000+)
2. Experiment with different embedding models
3. Add query expansion techniques
4. Measure end-to-end latency impact

## Code Snippet

Here's a basic chunking function I'm using:

```python
def chunk_text(text: str, max_tokens: int = 600, strategy: str = "hybrid") -> List[str]:
    """Chunk text using different strategies."""
    sentences = sent_tokenize(text)

    if strategy == "fixed":
        return fixed_size_chunk(sentences, max_tokens)
    elif strategy == "semantic":
        return semantic_chunk(sentences, max_tokens)
    else:  # hybrid
        return hybrid_chunk(sentences, max_tokens)
```

More testing needed before drawing final conclusions. The RAG landscape moves quickly, and what works today might be outdated tomorrow.

## References

- [OpenSearch Documentation](https://opensearch.org/docs/)
- [Sentence Transformers](https://www.sbert.net/)
- [RAG Survey Paper](https://arxiv.org/abs/2312.10997)

