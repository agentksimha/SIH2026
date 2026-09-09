import requests

response = requests.post(
    "http://127.0.0.1:8000/query",
    json={
  "query": "Write a 30 line essay on blachole",
  "context_doc": ""
},
    stream=True
)

for chunk in response.iter_content(chunk_size=None, decode_unicode=True):
    if chunk:
        print(chunk, end="", flush=True)