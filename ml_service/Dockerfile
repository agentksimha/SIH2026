# -------------------------------------------------------
# Build stage
# -------------------------------------------------------
FROM python:3.10-slim AS builder

WORKDIR /build

COPY requirements.txt .

RUN pip install --no-cache-dir --upgrade pip \
    && pip install --no-cache-dir --prefix=/install -r requirements.txt

# -------------------------------------------------------
# Final stage
# -------------------------------------------------------
FROM python:3.10-slim

# Minimal system deps only
RUN apt-get update && apt-get install -y --no-install-recommends \
    libglib2.0-0 \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Copy installed packages from builder
COPY --from=builder /install /usr/local

# Copy project files
COPY . .

# Storage setup
RUN mkdir -p /app/storage
ENV DB_PATH=/app/storage/rag_cache.db

# Don't run as root (HF Spaces best practice)
RUN useradd -m appuser && chown -R appuser /app
USER appuser

EXPOSE 7860

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "7860", "--workers", "1"]
