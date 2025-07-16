// src/components/BazaarItemCard.jsx
import React from "react";

export default function BazaarItemCard({ tag, buy, sell, buyVolume, sellVolume }) {
  // Spread & Marge
  const spread = buy - sell;
  // Bazaar Tax: 1.25% pro Flip (1% buy, 0.25% sell) → siehe https://wiki.hypixel.net/Bazaar#Bazaar_Tax
  const tax = Math.floor(sell * 0.0125);
  const marge = spread;
  const margeNachSteuern = spread - tax;

  return (
    <div className="rounded-xl shadow p-4 bg-card border flex flex-col gap-2">
      <div className="font-bold text-lg">{tag.replace(/_/g, " ")}</div>
      <div className="flex gap-5">
        <div>
          <div className="text-xs text-muted-foreground">Buy</div>
          <div className="font-mono">{buy.toLocaleString()}</div>
        </div>
        <div>
          <div className="text-xs text-muted-foreground">Sell</div>
          <div className="font-mono">{sell.toLocaleString()}</div>
        </div>
      </div>
      <div className="flex gap-5">
        <div>
          <div className="text-xs">Spread</div>
          <div className="font-mono text-green-600">{spread.toLocaleString()}</div>
        </div>
        <div>
          <div className="text-xs">Marge</div>
          <div className="font-mono text-blue-600">{marge.toLocaleString()}</div>
        </div>
        <div>
          <div className="text-xs">Marge (n. Steuern)</div>
          <div className="font-mono text-rose-600">{margeNachSteuern.toLocaleString()}</div>
        </div>
      </div>
      <div className="text-xs mt-2 flex gap-6 text-muted-foreground">
        <span>Sell Vol: {sellVolume}</span>
        <span>Buy Vol: {buyVolume}</span>
      </div>
    </div>
  );
}
