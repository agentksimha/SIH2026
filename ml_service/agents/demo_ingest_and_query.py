"""End-to-end demo: upload a native-text and scanned PDF, then stream RAG answers.

Start the API first with ``uvicorn main:app --port 8000``.  The scanned upload
uses Gemini Vision, and both questions use Gemini, so GEMINI_API_KEY must be
set in the server environment.
"""
from __future__ import annotations

import io
from pathlib import Path

import requests
from PIL import Image, ImageDraw
from reportlab.lib.utils import ImageReader
from reportlab.pdfgen import canvas


BASE_URL = "http://127.0.0.1:8000"
DEMO_DIR = Path(__file__).resolve().parent.parent / "storage" / "demo_pdfs"


def _make_typed_pdf(path: Path) -> None:
    pdf = canvas.Canvas(str(path))
    pdf.drawString(72, 720, "Typed report: the approved coal production target is 12.5 MT.")
    pdf.drawString(72, 695, "The planned completion year for the survey is 2028.")
    pdf.save()


def _make_scanned_pdf(path: Path) -> None:
    image = Image.new("RGB", (1400, 500), "white")
    draw = ImageDraw.Draw(image)
    draw.text((40, 100), "Scanned field note: borehole BH-17 reached a depth of 348 metres.", fill="black")
    draw.text((40, 180), "The seam thickness recorded at BH-17 is 4.2 metres.", fill="black")
    buffer = io.BytesIO()
    image.save(buffer, format="PNG")
    buffer.seek(0)
    pdf = canvas.Canvas(str(path))
    pdf.drawImage(ImageReader(buffer), 40, 350, width=520, height=185)
    pdf.save()


def _upload(path: Path) -> str:
    with path.open("rb") as file_handle:
        response = requests.post(f"{BASE_URL}/process-document", files={"file": (path.name, file_handle, "application/pdf")})
    response.raise_for_status()
    payload = response.json()
    print(f"Uploaded {path.name}: type={payload['document_type']}, id={payload['document_id']}")
    return payload["document_id"]


def _ask(document_id: str, question: str) -> None:
    print(f"\nQ: {question}\nA: ", end="", flush=True)
    response = requests.post(f"{BASE_URL}/query", json={"query": question, "context_doc": document_id}, stream=True)
    response.raise_for_status()
    for chunk in response.iter_content(chunk_size=None, decode_unicode=True):
        if chunk:
            print(chunk, end="", flush=True)
    print()


if __name__ == "__main__":
    DEMO_DIR.mkdir(parents=True, exist_ok=True)
    typed_pdf = DEMO_DIR / "typed_demo.pdf"
    scanned_pdf = DEMO_DIR / "scanned_demo.pdf"
    _make_typed_pdf(typed_pdf)
    _make_scanned_pdf(scanned_pdf)
    typed_id = _upload(typed_pdf)
    scanned_id = _upload(scanned_pdf)
    _ask(typed_id, "What is the approved coal production target?")
    _ask(scanned_id, "What depth did borehole BH-17 reach?")
