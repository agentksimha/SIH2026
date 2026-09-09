from sentence_transformers import SentenceTransformer

model = SentenceTransformer("BAAI/bge-small-en-v1.5")

texts = [
    "Virat Kohli is an Indian cricketer",
    "The company achieved production of 52.4 million tonnes.",
    "cricket is a sport played in India."
]

embeddings = model.encode(
    texts,
    normalize_embeddings=True
)

import faiss
from pathlib import Path

storage_dir=Path('../storage')
storage_dir.mkdir(parents=True,exist_ok=True)

dimension = embeddings.shape[1]

index = faiss.IndexFlatIP(dimension)

index.add(embeddings)

faiss.write_index(index,str(storage_dir/'vectors.index'))