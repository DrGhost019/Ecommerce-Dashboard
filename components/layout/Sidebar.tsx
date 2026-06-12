"use client";

import { useState, useEffect, useRef } from "react";
import { useTheme } from "next-themes";
import { 
  ChevronUp, 
  ChevronDown, 
  Users, 
  UserPlus, 
  LogOut, 
  Moon,
  Home,
  ShoppingBag,
  FileText,
  UserCircle,
  TrendingUp,
  Settings,
  HelpCircle,
  PanelLeftClose,
  X
} from "lucide-react";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  activeItem: string;
  onNavigate: (item: string) => void;
  className?: string;
}

const Sidebar = ({ isOpen, onClose, activeItem, onNavigate, className = "" }: SidebarProps) => {
  const { theme, setTheme } = useTheme();
  const isDarkMode = theme === "dark";

  const [isDark, setIsDark] = useState(false);
  const [isProductsOpen, setIsProductsOpen] = useState(true);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [isCompanyTooltipOpen, setIsCompanyTooltipOpen] = useState(false);
  const companyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsDark(isDarkMode);
  }, [isDarkMode]);

  const toggleTheme = () => {
    const newTheme = isDarkMode ? "light" : "dark";
    setTheme(newTheme);
  };

  const subProducts = ["Sneakers", "Jacket", "T-Shirt", "Bag"];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (companyRef.current && !companyRef.current.contains(event.target as Node)) {
        setIsCompanyTooltipOpen(false);
      }
    };

    if (isCompanyTooltipOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isCompanyTooltipOpen]);

  if (!isOpen) return null;

  return (
    <aside className={`w-[280px] min-h-screen bg-white dark:bg-[#1A1A1A] border-r-2 border-[#E7E7E7] dark:border-[#2A2A2A] flex flex-col ${className}`}>
      <div className="p-[32px_16px] flex flex-col flex-1 gap-[45px]">
        
        <div className="w-[248px] h-[31px] flex justify-between items-center px-2 shrink-0">
          <img
            src={isDark ? "/assets/dark_culters.png" : "/assets/culters.png"}
            alt="Kanky Store Logo"
            className="w-[120px] h-auto object-contain"
          />
          <button
            onClick={onClose}
            className="w-6 h-6 flex items-center justify-center hover:bg-gray-100 dark:hover:bg-[#2A2A2A] rounded-md transition"
          >
            <PanelLeftClose className="w-4 h-4 text-gray-700 dark:text-gray-300" />
          </button>
        </div>

        <div className="w-[248px] flex flex-col gap-8 flex-1 overflow-y-auto custom-scrollbar">
          
          <div className="relative" ref={companyRef}>
            <div
              className="w-[248px] h-[56px] flex items-center gap-2 p-2 rounded-xl border border-[#E7E7E7] dark:border-[#2A2A2A] shrink-0 bg-white dark:bg-[#1A1A1A] cursor-pointer transition-all duration-300 hover:shadow-md hover:scale-[1.02]"
              onMouseEnter={() => setIsCompanyTooltipOpen(true)}
              onMouseLeave={() => setIsCompanyTooltipOpen(false)}
            >
              <img src="/assets/kanky.png" alt="Kanky" className="w-12 h-12 object-cover" />
              <div className="flex flex-col">
                <span className="text-xs font-semibold text-gray-400">Company</span>
                <span className="text-sm text-gray-900 dark:text-white">Kanky Store</span>
              </div>
            </div>

            {isCompanyTooltipOpen && (
              <div 
                className="fixed w-[280px] bg-white dark:bg-[#1A1A1A] rounded-xl border border-[#E7E7E7] dark:border-[#2A2A2A] shadow-2xl overflow-hidden z-[100] animate-in fade-in slide-in-from-left-2 duration-200"
                style={{
                  left: '290px',
                  top: '100px',
                }}
              >
                <div className="flex items-center justify-between px-4 py-3 border-b border-[#E7E7E7] dark:border-[#2A2A2A] bg-[#F6F6F6] dark:bg-[#2A2A2A]">
                  <div className="flex items-center gap-2">
                    <img src="/assets/kanky.png" alt="Kanky" className="w-8 h-8 object-cover rounded-lg" />
                    <div className="flex flex-col">
                      <span className="text-xs font-semibold text-gray-400">Company</span>
                      <span className="text-sm font-semibold text-gray-900 dark:text-white">Kanky Store</span>
                    </div>
                  </div>
                  <button
                    onClick={() => setIsCompanyTooltipOpen(false)}
                    className="w-6 h-6 flex items-center justify-center rounded-md hover:bg-gray-200 dark:hover:bg-[#3A3A3A] transition"
                  >
                    <X className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                  </button>
                </div>

                <div className="px-4 py-3">
                  <p className="font-jakarta text-xs text-gray-600 dark:text-gray-300 leading-relaxed">
                    Kanky Store is a premium e-commerce platform specializing in high-quality footwear and accessories. Founded with a passion for innovation and customer satisfaction, we offer a curated collection of products that blend style, comfort, and durability. Our commitment to excellence has made us a trusted choice for thousands of customers worldwide.
                  </p>
                </div>

                <div className="px-4 py-3 bg-[#F6F6F6] dark:bg-[#2A2A2A] border-t border-[#E7E7E7] dark:border-[#2A2A2A]">
                  <div className="flex items-center justify-between">
                    <div className="flex flex-col">
                      <span className="font-jakarta text-[10px] text-gray-500 dark:text-gray-400">Founded</span>
                      <span className="font-jakarta text-xs font-semibold text-gray-900 dark:text-white">2020</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="font-jakarta text-[10px] text-gray-500 dark:text-gray-400">Products</span>
                      <span className="font-jakarta text-xs font-semibold text-gray-900 dark:text-white">119</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="font-jakarta text-[10px] text-gray-500 dark:text-gray-400">Customers</span>
                      <span className="font-jakarta text-xs font-semibold text-gray-900 dark:text-white">5,000+</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="w-[248px] flex flex-col gap-[10px]">
            <span className="w-[81px] h-[21px] text-xs font-medium text-gray-500 dark:text-gray-400 px-2 flex items-center">
              General
            </span>

            <div 
              className={`w-[248px] h-10 flex justify-between items-center p-2 rounded-xl cursor-pointer transition ${
                activeItem === "Dashboard" 
                  ? "bg-[#D9EDFF] dark:bg-[#1A71F6]/20" 
                  : "hover:bg-gray-50 dark:hover:bg-[#2A2A2A]"
              }`}
              onClick={() => onNavigate("Dashboard")}
            >
              <div className="flex items-center gap-2">
                <Home className="w-5 h-5 text-gray-700 dark:text-gray-300" />
                <span className="text-sm font-semibold text-gray-900 dark:text-white">Dashboard</span>
              </div>
            </div>

            <div className="w-[248px]">
              <div 
                className={`w-[248px] h-10 flex justify-between items-center p-2 rounded-lg cursor-pointer transition ${
                  activeItem === "Product" 
                    ? "bg-[#D9EDFF] dark:bg-[#1A71F6]/20" 
                    : "hover:bg-gray-50 dark:hover:bg-[#2A2A2A]"
                }`}
                onClick={() => {
                  onNavigate("Product");
                  setIsProductsOpen(!isProductsOpen);
                }}
              >
                <div className="flex items-center gap-2">
                  <ShoppingBag className="w-5 h-5 text-gray-700 dark:text-gray-300" />
                  <span className="text-sm text-gray-700 dark:text-gray-300">Product (119)</span>
                </div>
                {isProductsOpen ? (
                  <ChevronUp className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                )}
              </div>

              {isProductsOpen && (
                <div className="flex mt-2 ml-4">
                  <div className="relative w-4">
                    <div className="absolute top-0 left-2 w-[2px] h-full bg-gray-300 dark:bg-gray-600"></div>
                  </div>
                  <div className="flex-1 flex flex-col gap-1 py-1">
                    {subProducts.map((item, index) => (
                      <div 
                        key={index} 
                        className="relative flex items-center h-8 px-2 rounded-lg cursor-pointer transition-all duration-200 hover:bg-[#D9EDFF] dark:hover:bg-[#1A71F6]/20 group"
                      >
                        <div className="absolute -left-4 top-1/2 w-4 h-[2px] bg-gray-300 dark:bg-gray-600 group-hover:bg-[#1A71F6]"></div>
                        <span className="text-sm text-gray-500 dark:text-gray-400 group-hover:text-[#1A71F6] dark:group-hover:text-[#60A5FA] transition-colors duration-200">
                          {item}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div 
              className={`w-[248px] h-10 flex items-center gap-2 p-2 rounded-lg cursor-pointer transition ${
                activeItem === "Transactions" 
                  ? "bg-[#D9EDFF] dark:bg-[#1A71F6]/20" 
                  : "hover:bg-gray-50 dark:hover:bg-[#2A2A2A]"
              }`}
              onClick={() => onNavigate("Transactions")}
            >
              <FileText className="w-5 h-5 text-gray-700 dark:text-gray-300" />
              <span className="text-sm text-gray-700 dark:text-gray-300">Transactions</span>
            </div>

            <div 
              className={`w-[248px] h-10 flex items-center gap-2 p-2 rounded-lg cursor-pointer transition ${
                activeItem === "Customers" 
                  ? "bg-[#D9EDFF] dark:bg-[#1A71F6]/20" 
                  : "hover:bg-gray-50 dark:hover:bg-[#2A2A2A]"
              }`}
              onClick={() => onNavigate("Customers")}
            >
              <UserCircle className="w-5 h-5 text-gray-700 dark:text-gray-300" />
              <span className="text-sm text-gray-700 dark:text-gray-300">Customers</span>
            </div>

            <div 
              className={`w-[248px] h-10 flex items-center gap-2 p-2 rounded-lg cursor-pointer transition ${
                activeItem === "Sales Report" 
                  ? "bg-[#D9EDFF] dark:bg-[#1A71F6]/20" 
                  : "hover:bg-gray-50 dark:hover:bg-[#2A2A2A]"
              }`}
              onClick={() => onNavigate("Sales Report")}
            >
              <TrendingUp className="w-5 h-5 text-gray-700 dark:text-gray-300" />
              <span className="text-sm text-gray-700 dark:text-gray-300">Sales Report</span>
            </div>
          </div>

          <div className="w-[248px] flex flex-col gap-[10px] mt-4">
            <span className="w-[64px] h-[21px] text-xs font-medium text-gray-500 dark:text-gray-400 px-2 flex items-center">
              Tools
            </span>

            <div 
              className={`w-[248px] h-10 flex items-center gap-2 p-2 rounded-lg cursor-pointer transition ${
                activeItem === "Account & Setting" 
                  ? "bg-[#D9EDFF] dark:bg-[#1A71F6]/20" 
                  : "hover:bg-gray-50 dark:hover:bg-[#2A2A2A]"
              }`}
              onClick={() => onNavigate("Account & Setting")}
            >
              <Settings className="w-5 h-5 text-gray-700 dark:text-gray-300" />
              <span className="text-sm text-gray-700 dark:text-gray-300">Account & Setting</span>
            </div>

            <div 
              className={`w-[248px] h-10 flex items-center gap-2 p-2 rounded-lg cursor-pointer transition ${
                activeItem === "Help" 
                  ? "bg-[#D9EDFF] dark:bg-[#1A71F6]/20" 
                  : "hover:bg-gray-50 dark:hover:bg-[#2A2A2A]"
              }`}
              onClick={() => onNavigate("Help")}
            >
              <HelpCircle className="w-5 h-5 text-gray-700 dark:text-gray-300" />
              <span className="text-sm text-gray-700 dark:text-gray-300">Help</span>
            </div>

            <div 
              className="w-[248px] h-10 flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-[#2A2A2A] cursor-pointer transition"
              onClick={toggleTheme}
            >
              <Moon className="w-5 h-5 text-gray-500 dark:text-gray-400" strokeWidth={1.5} />
              <span className="text-sm text-gray-700 dark:text-gray-300">Dark Mode</span>
              <div 
                className="ml-auto w-11 h-6 rounded-full relative transition-colors duration-300 flex-shrink-0"
                style={{ backgroundColor: isDark ? '#2A2A2A' : '#E5E7EB' }}
              >
                <div
                  className={`absolute top-1 w-4 h-4 rounded-full shadow-md transition-all duration-300 ${
                    isDark 
                      ? "right-1 bg-[#1A71F6]" 
                      : "left-1 bg-white"
                  }`}
                />
              </div>
            </div>
          </div>

          <div className="relative w-[248px]">
            <div 
              className="w-[248px] h-[56px] flex items-center justify-between p-2 rounded-xl border border-[#E7E7E7] dark:border-[#2A2A2A] cursor-pointer hover:bg-gray-50 dark:hover:bg-[#2A2A2A] transition bg-white dark:bg-[#1A1A1A]"
              onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
            >
              <div className="flex items-center gap-2">
                <img src="/assets/guy.png" alt="Guy Hawkins" className="w-9 h-9 rounded-md object-cover" />
                <div className="flex flex-col">
                  <span className="text-sm font-semibold text-gray-900 dark:text-white">Guy Hawkins</span>
                  <span className="text-xs text-gray-500 dark:text-gray-400">Admin</span>
                </div>
              </div>
              <ChevronDown className={`w-4 h-4 text-gray-500 dark:text-gray-400 transition-transform duration-300 ${isProfileMenuOpen ? 'rotate-180' : ''}`} />
            </div>

            {isProfileMenuOpen && (
              <div className="absolute bottom-full left-0 w-full mb-2 bg-white dark:bg-[#1A1A1A] rounded-xl border border-[#E7E7E7] dark:border-[#2A2A2A] shadow-lg overflow-hidden z-50">
                <div className="flex items-center gap-2 p-3 hover:bg-gray-50 dark:hover:bg-[#2A2A2A] cursor-pointer transition">
                  <Users className="w-4 h-4 text-blue-500" />
                  <span className="text-sm font-medium text-blue-500">Switch Account</span>
                </div>
                <div className="flex items-center gap-2 p-3 hover:bg-gray-50 dark:hover:bg-[#2A2A2A] cursor-pointer transition border-t border-[#E7E7E7] dark:border-[#2A2A2A]">
                  <UserPlus className="w-4 h-4 text-blue-500" />
                  <span className="text-sm font-medium text-blue-500">Create New Account</span>
                </div>
                <div className="flex items-center gap-2 p-3 hover:bg-gray-50 dark:hover:bg-[#2A2A2A] cursor-pointer transition border-t border-[#E7E7E7] dark:border-[#2A2A2A]">
                  <LogOut className="w-4 h-4 text-red-500" />
                  <span className="text-sm font-medium text-red-500">Log Out</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;