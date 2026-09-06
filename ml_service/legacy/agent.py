import os
import pathlib
import numpy as np
import google.generativeai as genai
from dotenv import load_dotenv
import pickle

# ---------------------------
# Setup
# ---------------------------
BASE_DIR = pathlib.Path(__file__).resolve().parent
VECTORSTORE_PATH = BASE_DIR / "vectorstore"
load_dotenv()
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")

if GEMINI_API_KEY is None:
    raise ValueError("❌ GEMINI_API_KEY environment variable is missing!")

genai.configure(api_key=GEMINI_API_KEY)

# Free-tier friendly model. gemini-2.5-flash-lite has the most generous
# free-tier quota (15 RPM / 1000 RPD as of mid-2026) - good default for
# an app making many small calls. Override with GEMINI_MODEL if needed.
GEMINI_MODEL_NAME = os.getenv("GEMINI_MODEL", "gemini-3.5-flash-lite")
gemini_model = genai.GenerativeModel(GEMINI_MODEL_NAME)

import time
import random

def _generate_with_retry(prompt: str, max_retries: int = 4):
    """Call Gemini with exponential backoff on 429 rate-limit errors."""
    from google.api_core.exceptions import ResourceExhausted

    for attempt in range(max_retries):
        try:
            response = gemini_model.generate_content(
                prompt,
                generation_config=genai.types.GenerationConfig(temperature=0.3),
            )
            return response.text
        except ResourceExhausted:
            if attempt == max_retries - 1:
                raise
            # backoff: 2s, 4s, 8s, 16s (+ jitter) - respects the Retry-After
            # window Gemini's free tier typically asks for (~20-30s worst case)
            wait = (2 ** (attempt + 1)) + random.uniform(0, 1)
            print(f"⏳ Gemini 429 rate-limited, retrying in {wait:.1f}s (attempt {attempt+1}/{max_retries})...")
            time.sleep(wait)

# ---------------------------
# Lazy-loaded globals
# ---------------------------
_index = None
_documents = None
_embed_model = None

def _load_resources():
    """Load FAISS index, documents, and embedding model only once, on first use."""
    global _index, _documents, _embed_model

    if _index is not None:
        return  # Already loaded

    import faiss
    from sentence_transformers import SentenceTransformer

    print("🔄 Loading embedding model...")
    _embed_model = SentenceTransformer("all-MiniLM-L6-v2")

    faiss_index_path = VECTORSTORE_PATH / "index.faiss"
    faiss_meta_path  = VECTORSTORE_PATH / "index.pkl"

    if not faiss_index_path.exists():
        raise FileNotFoundError("❌ FAISS index not found. Run the vectorstore builder first.")

    print("🔄 Loading FAISS index...")
    _index = faiss.read_index(str(faiss_index_path))

    print("🔄 Loading documents metadata...")
    with open(faiss_meta_path, "rb") as f:
        meta = pickle.load(f)

    documents = None

    if isinstance(meta, list):
        documents = meta
    elif isinstance(meta, tuple):
        for item in meta:
            if isinstance(item, list):
                documents = item
                break
            if isinstance(item, dict) and "documents" in item:
                documents = item["documents"]
                break
    elif isinstance(meta, dict):
        if "documents" in meta:
            documents = meta["documents"]

    if documents is None:
        def find_docs(obj):
            if isinstance(obj, list) and all(isinstance(x, str) for x in obj):
                return obj
            if isinstance(obj, dict):
                for v in obj.values():
                    found = find_docs(v)
                    if found:
                        return found
            if isinstance(obj, tuple):
                for v in obj:
                    found = find_docs(v)
                    if found:
                        return found
            return None
        documents = find_docs(meta)

    if documents is None:
        raise TypeError("❌ Could not locate any list of documents inside index.pkl. "
                        "Rebuild the vectorstore.")

    _documents = documents
    print(f"✅ Loaded {len(_documents)} documents from index.pkl")


# ---------------------------
# Utility: Embed a query
# ---------------------------
def embed(text: str):
    return np.array(_embed_model.encode([text]), dtype=np.float32)


# ---------------------------
# RAG Search
# ---------------------------
def search_faiss(query: str, k=5):
    q_emb = embed(query)
    distances, indices = _index.search(q_emb, k)
    hits = [_documents[i] for i in indices[0] if i != -1]
    return hits


# ---------------------------
# Generate Final Answer
# ---------------------------
def generate_answer(query: str, context_docs: list):
    context = "\n\n".join(context_docs)

    prompt = f"""
You are an expert mining assistant.

User question:
{query}

Relevant mining documents:
{context}

Answer concisely, factually, and directly.
"""

    return _generate_with_retry(prompt)


# ---------------------------
# Full RAG Pipeline
# ---------------------------
def ask(query: str):
    _load_resources()       # ← loads only on first call, cached after
    context_docs = search_faiss(query, k=5)
    answer = generate_answer(query, context_docs)
    return answer


# ---------------------------
# CLI testing
# ---------------------------
if __name__ == "__main__":
    while True:
        q = input("\nAsk me anything about mining: ")
        print("\n🔍 Searching FAISS...")
        print("💬 Answer:", ask(q))
