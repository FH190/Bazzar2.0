// src/components/BoosterCookieCard.jsx
import React, { useEffect, useState } from "react";
import { Cookie } from "lucide-react";

export default function BoosterCookieCard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://sky.coflnet.com/api/bazaar/BOOSTER_COOKIE/history/hour")
      .then(r => r.json())
      .then(d => {
        setData(d[d.length - 1]); // Neuester Datensatz
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="rounded-2xl shadow-lg bg-card p-6 flex flex-col items-center justify-center h-48 animate-pulse border">
        <span className="text-muted-foreground">Lade Booster Cookie...</span>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="rounded-2xl shadow-lg bg-card p-6 flex flex-col items-center justify-center h-48 border">
        <span className="text-destructive">Fehler beim Laden!</span>
      </div>
    );
  }

  const spread = data.buy - data.sell;

  return (
    <div className="rounded-2xl shadow-lg bg-card p-6 border flex flex-col gap-2 transition hover:scale-[1.02]">
      <div className="flex items-center gap-2 mb-2">
        <Cookie className="text-yellow-400" size={30} />
        <div className="font-bold text-lg">Booster Cookie</div>
      </div>
      <div className="flex gap-6 mt-2">
        <div>
          <div className="text-xs text-muted-foreground">Kaufpreis</div>
          <div className="font-mono">{data.buy.toLocaleString()} ¢</div>
        </div>
        <div>
          <div className="text-xs text-muted-foreground">Verkaufspreis</div>
          <div className="font-mono">{data.sell.toLocaleString()} ¢</div>
        </div>
        <div>
          <div className="text-xs text-muted-foreground">Spread</div>
          <div className="font-mono text-green-600">{spread.toLocaleString()} ¢</div>
        </div>
      </div>
      <div className="flex gap-6 text-xs text-muted-foreground mt-2">
        <div>Sell Vol: {data.sellVolume}</div>
        <div>Buy Vol: {data.buyVolume}</div>
      </div>
      <div className="text-xs mt-2 text-muted-foreground">
        Stand: {new Date(data.timestamp).toLocaleTimeString()}
      </div>
    </div>
  );
}
