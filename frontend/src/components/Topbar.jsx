import { Moon, Sun } from "lucide-react";
import { useState } from "react";
import React from "react";

export default function Topbar() {
  const [dark, setDark] = useState(() => document.documentElement.classList.contains('dark'));
  const toggle = () => {
    document.documentElement.classList.toggle('dark');
    setDark(!dark);
  };

  return (
    <header className="flex items-center justify-between px-6 py-3 border-b border-border bg-card">
      <div className="font-semibold text-lg">Dashboard</div>
      <button
        className="p-2 rounded-xl hover:bg-muted"
        onClick={toggle}
        title="Toggle Dark Mode"
      >
        {dark ? <Sun size={20} /> : <Moon size={20} />}
      </button>
    </header>
  );
}
