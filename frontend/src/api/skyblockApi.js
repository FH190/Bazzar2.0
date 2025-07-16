// src/api/skyblockApi.js

const ITEMS = [
  "BOOSTER_COOKIE",
  "ENCHANTED_DIAMOND",
  "ENCHANTED_GOLD_INGOT",
  "ENCHANTED_IRON",
  "ENCHANTED_COBBLESTONE",
  "ENCHANTED_SUGAR",
  "ENCHANTED_POTATO",
  "ENCHANTED_CARROT",
  "ENCHANTED_BLAZE_ROD",
  "ENCHANTED_NETHER_WART"
  // ...nach Belieben erweitern!
];



export async function getBazaarSnapshot(itemTag) {
  const res = await fetch(`https://sky.coflnet.com/api/bazaar/${itemTag}/snapshot`);
  if (!res.ok) throw new Error("Fehler beim Laden!");
  return res.json();
}

export async function getMultipleSnapshots(items) {
  const obj = {};
  for (const item of items) {
    const res = await fetch(`https://sky.coflnet.com/api/bazaar/${item}/snapshot`);
    if (res.ok) {
      obj[item] = await res.json();
    }
  }
  return obj;
}
