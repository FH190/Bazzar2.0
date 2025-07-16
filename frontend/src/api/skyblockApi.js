// src/api/skyblockApi.js

const ITEMS = [
  "BOOSTER_COOKIE",
  "ENCHANTED_DIAMOND",


  // ...nach Belieben erweitern!
];



export async function getBazaarSnapshot(itemTag) {
  const res = await fetch(`https://sky.coflnet.com/api/bazaar/${itemTag}/snapshot`);
  if (!res.ok) throw new Error("Fehler beim Laden!");
  return res.json();
}

// skyblockApi.js
export async function getMultipleSnapshots(items) {
  const obj = {};
  for (const item of items) {
    try {
      const res = await fetch(`https://sky.coflnet.com/api/bazaar/${item}/snapshot`);
      console.log(item, res.status);
      if (res.ok) {
        obj[item] = await res.json();
        console.log(item, obj[item]);
      } else {
        console.warn(`Item ${item} liefert keinen Status 200!`);
      }
    } catch (e) {
      console.error(`Fetch-Fehler für ${item}:`, e);
    }
  }
  return obj;
}
