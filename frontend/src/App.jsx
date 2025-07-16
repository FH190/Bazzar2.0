import { Routes, Route } from "react-router-dom";
import DashboardLayout from './layouts/DashboardLayout.jsx';
import Home from './pages/Home.jsx';
import Bazaar from './pages/Bazaar.jsx';
import Flips from './pages/Flips.jsx';
import Stats from './pages/Stats.jsx';
import React from "react";


export default function App() {
  return (
    <DashboardLayout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/bazaar" element={<Bazaar />} />
        <Route path="/flips" element={<Flips />} />
        <Route path="/stats" element={<Stats />} />
      </Routes>
    </DashboardLayout>
  );
}
