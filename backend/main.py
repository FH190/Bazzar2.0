from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import requests

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

COFLNET_BASE = "https://sky.coflnet.com/api/bazaar"

@app.get("/api/item/{item_tag}/history/{period}")
def get_item_history(item_tag: str, period: str):
    url = f"{COFLNET_BASE}/{item_tag}/history/{period}"
    resp = requests.get(url, timeout=10)
    resp.raise_for_status()
    return resp.json()

@app.get("/api/item/{item_tag}/snapshot")
def get_item_snapshot(item_tag: str):
    url = f"{COFLNET_BASE}/{item_tag}/snapshot"
    resp = requests.get(url, timeout=10)
    resp.raise_for_status()
    return resp.json()
