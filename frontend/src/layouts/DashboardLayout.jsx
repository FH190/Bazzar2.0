import Sidebar from '../components/Sidebar.jsx';
import Topbar from '../components/Topbar.jsx';
import React from "react";

export default function DashboardLayout({ children }) {
  return (
    <div className="flex h-screen bg-background text-foreground">
      <Sidebar />
      <div className="flex flex-col flex-1">
        <Topbar />
        <main className="p-6 flex-1 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}
