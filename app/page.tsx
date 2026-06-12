"use client";

import { useState } from "react";
import Dashboard from "@/components/dashboard/Dashboard";

export default function Home() {
  const [activePage, setActivePage] = useState("Dashboard");

  return <Dashboard />;
}