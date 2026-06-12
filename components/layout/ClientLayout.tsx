// components/layout/ClientLayout.tsx
"use client";

import { useState } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import ParticleBackground from "@/components/dashboard/ParticleBackground";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // ✅ پیش‌فرض بسته در موبایل
  const [activeItem, setActiveItem] = useState("Dashboard");

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0F0F0F] flex relative">
      {/* انیمیشن ذرات در پس‌زمینه - z-0 */}
      <ParticleBackground />
      
      {/* Sidebar - در موبایل فقط با منو باز می‌شود */}
      <div className="relative z-50">
        <Sidebar 
          isOpen={isSidebarOpen} 
          onClose={() => setIsSidebarOpen(false)}
          activeItem={activeItem}
          onNavigate={setActiveItem}
        />
      </div>
      
      {/* Main Content Area */}
      <div className="flex-1 flex flex-col relative z-10 w-full">
        <Header 
          isSidebarOpen={isSidebarOpen}
          onOpenSidebar={() => setIsSidebarOpen(true)}
        />
        <main className="p-0 md:p-8 flex-1 overflow-auto w-full">
          {children}
        </main>
      </div>
    </div>
  );
}