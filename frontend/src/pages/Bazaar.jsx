import React, { useEffect, useState } from "react";
import { getMultipleSnapshots } from "../api/skyblockApi";
// Recharts für Chart:
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const ITEMS = [
  "BOOSTER_COOKIE",
  "ENCHANTED_DIAMOND",
  "ENCHANTED_GOLD_INGOT",
  "ENCHANTED_IRON_INGOT",
  "ENCHANTED_EMERALD",
  // ...
];


function calculateMarge(buy, sell) {
  return sell - buy;
}
function calculateMargeNachSteuern(buy, sell) {
  return (sell * 0.9875) - buy;
}

export default function Bazaar() {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    getMultipleSnapshots(ITEMS)
      .then((d) => {
        setData(d);
        setLoading(false);
      })
      .catch((e) => {
        setError(e.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Lade Daten...</div>;
  if (error) return <div>Fehler beim Laden: {error}</div>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Bazaar Live-Preise</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {ITEMS.map(item => {
          const itemData = data[item];
          if (!itemData || !itemData.quick_status) return (
            <div key={item} className="rounded bg-neutral-800 text-white p-4 shadow">
              <div className="font-bold mb-2">{item}</div>
              <div className="text-red-400">Keine Daten</div>
            </div>
          );

          const quick = itemData.quick_status;
          const buy = quick.buyPrice || 0;
          const sell = quick.sellPrice || 0;
          const spread = sell - buy;
          const volumeBuy = quick.buyVolume || 0;
          const volumeSell = quick.sellVolume || 0;
          const marge = calculateMarge(buy, sell);
          const margeSteuern = calculateMargeNachSteuern(buy, sell);

          // Beispiel-Graph-Daten (echte Preis-Historie wäre besser, hier nur ein Dummy)
          const chartData = [
            { t: 0, value: buy },
            { t: 1, value: sell }
          ];

          return (
            <div key={item} className="rounded bg-neutral-800 text-white p-4 shadow flex flex-col">
              <div className="font-bold text-lg mb-1">{item.replace(/_/g, ' ')}</div>
              <div className="flex gap-4">
                <div className="flex-1">
                  <div>Buy: <span className="font-mono">{buy.toLocaleString()}</span></div>
                  <div>Sell: <span className="font-mono">{sell.toLocaleString()}</span></div>
                  <div>Spread: <span className="font-mono">{spread.toLocaleString()}</span></div>
                  <div>Volumen Buy: <span className="font-mono">{volumeBuy.toLocaleString()}</span></div>
                  <div>Volumen Sell: <span className="font-mono">{volumeSell.toLocaleString()}</span></div>
                  <div>Marge: <span className="font-mono">{marge.toFixed(2)}</span></div>
                  <div>Marge nach Steuern: <span className="font-mono">{margeSteuern.toFixed(2)}</span></div>
                </div>
                <div style={{ width: 120, height: 60 }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={chartData}>
                      <Line type="monotone" dataKey="value" stroke="#60A5FA" strokeWidth={2} dot={false} />
                      <XAxis hide dataKey="t" />
                      <YAxis hide />
                      <Tooltip />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
