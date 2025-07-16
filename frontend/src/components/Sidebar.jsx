import { Link, useLocation } from "react-router-dom";
import React from "react";

const navItems = [
  { name: "Dashboard", path: "/" },
  { name: "Bazaar", path: "/bazaar" },
  { name: "Flips", path: "/flips" },
  { name: "Statistiken", path: "/stats" },
];

export default function Sidebar() {
  const location = useLocation();
  return (
    <aside className="w-56 bg-card h-screen border-r border-border p-4 flex flex-col">
      <div className="text-xl font-bold mb-8">SkyBlock Bazaar</div>
      <nav className="flex flex-col gap-2">
        {navItems.map(item => (
          <Link
            key={item.path}
            to={item.path}
            className={`p-2 rounded-xl transition ${location.pathname === item.path ? 'bg-primary text-primary-foreground' : 'hover:bg-muted'}`}
          >
            {item.name}
          </Link>
        ))}
      </nav>
      <div className="flex-1" />
      <div className="text-xs text-muted-foreground text-center">v0.1 Alpha</div>
    </aside>
  );
}
