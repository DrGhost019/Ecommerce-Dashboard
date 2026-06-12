"use client";

import { Search, Menu, Bell, Mail, X, UserPlus, Users, LogOut, ChevronDown } from "lucide-react";
import { useTheme } from "next-themes";
import { useState, useEffect, useRef } from "react";
import { api, MessageData, NotificationData } from "@/lib/api";

interface HeaderProps {
  isSidebarOpen: boolean;
  onOpenSidebar: () => void;
}

const avatarColors = [
  "bg-[#1A71F6]",
  "bg-[#9333EA]",
  "bg-[#EF4444]",
  "bg-[#F59E0B]",
  "bg-[#10B981]",
  "bg-[#EC4899]",
  "bg-[#6366F1]",
  "bg-[#14B8A6]",
];

const getInitials = (name: string) => {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
};

const Header = ({ isSidebarOpen, onOpenSidebar }: HeaderProps) => {
  const { theme } = useTheme();
  const [isDark, setIsDark] = useState(false);
  const [isMessageOpen, setIsMessageOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  
  const [messages, setMessages] = useState<MessageData[]>([]);
  const [notifications, setNotifications] = useState<NotificationData[]>([]);
  const [loadingMessages, setLoadingMessages] = useState(true);
  const [loadingNotifications, setLoadingNotifications] = useState(true);
  
  const messageRef = useRef<HTMLDivElement>(null);
  const notificationRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsDark(theme === "dark");
  }, [theme]);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const data = await api.getMessages();
        setMessages(data);
      } catch (error) {
        console.error('Failed to fetch messages:', error);
      } finally {
        setLoadingMessages(false);
      }
    };

    fetchMessages();
  }, []);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const data = await api.getNotifications();
        setNotifications(data);
      } catch (error) {
        console.error('Failed to fetch notifications:', error);
      } finally {
        setLoadingNotifications(false);
      }
    };

    fetchNotifications();
  }, []);

  const unreadCount = messages.filter(m => !m.isRead).length;
  const notificationCount = notifications.filter(n => !n.isRead).length;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (messageRef.current && !messageRef.current.contains(event.target as Node)) {
        setIsMessageOpen(false);
      }
      if (notificationRef.current && !notificationRef.current.contains(event.target as Node)) {
        setIsNotificationOpen(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setIsProfileOpen(false);
      }
    };

    if (isMessageOpen || isNotificationOpen || isProfileOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMessageOpen, isNotificationOpen, isProfileOpen]);

  const toggleMessage = () => {
    setIsMessageOpen(!isMessageOpen);
    if (!isMessageOpen) {
      setMessages((prev) => prev.map((msg) => ({ ...msg, isRead: true })));
    }
  };

  const toggleNotification = () => {
    setIsNotificationOpen(!isNotificationOpen);
    if (!isNotificationOpen) {
      setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
    }
  };

  const toggleProfile = () => {
    setIsProfileOpen(!isProfileOpen);
  };

  return (
    <header className="w-full h-[70px] md:h-[87px] bg-white dark:bg-[#1A1A1A] border-b-2 border-[#E7E7E7] dark:border-[#2A2A2A] px-4 md:px-8 flex items-center justify-between shrink-0">
      <div className="flex items-center gap-3 md:gap-6">
        <button
          onClick={onOpenSidebar}
          className="w-9 h-9 flex items-center justify-center hover:bg-gray-100 dark:hover:bg-[#2A2A2A] rounded-md transition"
        >
          <Menu className="w-5 h-5 text-gray-700 dark:text-gray-300" />
        </button>
        
        <img
          src={isDark ? "/assets/dark_culters.png" : "/assets/culters.png"}
          alt="Kanky Store Logo"
          className="w-[80px] md:w-[120px] h-auto object-contain hidden md:block"
        />

        <div className="w-[200px] md:w-[300px] h-[35px] md:h-[40px] items-center gap-1 px-3 md:px-4 border-[1.6px] border-[#B0B0B0] dark:border-[#454545] rounded-xl bg-white dark:bg-[#1A1A1A] hidden md:flex">
          <Search className="w-4 h-4 md:w-5 md:h-5 text-gray-500 dark:text-gray-400" />
          <input
            type="text"
            placeholder="Search product"
            className="flex-1 bg-transparent outline-none text-xs md:text-sm text-gray-700 dark:text-gray-200 placeholder:text-gray-400 dark:placeholder:text-gray-500"
          />
        </div>
      </div>

      <div className="flex items-center gap-2 md:gap-4 h-[36px]">
        <div className="relative" ref={messageRef}>
          <div
            onClick={toggleMessage}
            className={`relative w-8 h-8 md:w-9 md:h-9 p-1.5 bg-[#F6F6F6] dark:bg-[#2A2A2A] rounded-md flex items-center justify-center cursor-pointer transition-all duration-300 hover:scale-110 hover:shadow-md hover:bg-[#E5E7EB] dark:hover:bg-[#3A3A3A] ${
              isMessageOpen ? "ring-2 ring-[#1A71F6] ring-offset-2 dark:ring-offset-[#1A1A1A]" : ""
            }`}
          >
            <Mail className="w-4 h-4 text-gray-700 dark:text-gray-300" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 w-3.5 h-3.5 md:w-4 md:h-4 bg-red-500 text-white text-[9px] md:text-[10px] font-bold rounded-full flex items-center justify-center animate-bounce">
                {unreadCount}
              </span>
            )}
          </div>

          {isMessageOpen && (
            <div className="absolute right-0 top-full mt-2 md:mt-3 w-[280px] md:w-[320px] bg-white dark:bg-[#1A1A1A] rounded-xl md:rounded-2xl border border-[#E7E7E7] dark:border-[#2A2A2A] shadow-xl overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-200">
              <div className="flex items-center justify-between px-3 md:px-4 py-2 md:py-3 border-b border-[#E7E7E7] dark:border-[#2A2A2A] bg-[#F6F6F6] dark:bg-[#2A2A2A]">
                <h3 className="font-jakarta font-semibold text-xs md:text-sm text-[#2A2A2A] dark:text-white">
                  Messages
                </h3>
                <button
                  onClick={() => setIsMessageOpen(false)}
                  className="w-5 h-5 md:w-6 md:h-6 flex items-center justify-center rounded-md hover:bg-gray-200 dark:hover:bg-[#3A3A3A] transition"
                >
                  <X className="w-3 h-3 md:w-4 md:h-4 text-gray-500 dark:text-gray-400" />
                </button>
              </div>

              <div className="max-h-[250px] md:max-h-[300px] overflow-y-auto">
                {loadingMessages ? (
                  <div className="px-4 py-3 text-center text-gray-500 dark:text-gray-400 text-sm">
                    Loading messages...
                  </div>
                ) : messages.length === 0 ? (
                  <div className="px-4 py-3 text-center text-gray-500 dark:text-gray-400 text-sm">
                    No messages
                  </div>
                ) : (
                  messages.map((message) => (
                    <div
                      key={message.id}
                      className={`px-3 md:px-4 py-2 md:py-3 border-b border-[#E7E7E7] dark:border-[#2A2A2A] last:border-b-0 hover:bg-gray-50 dark:hover:bg-[#2A2A2A] cursor-pointer transition ${
                        !message.isRead ? "bg-blue-50/50 dark:bg-[#1A71F6]/10" : ""
                      }`}
                    >
                      <div className="flex items-start gap-2 md:gap-3">
                        <div className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-[#1A71F6]/10 dark:bg-[#1A71F6]/20 flex items-center justify-center flex-shrink-0 mt-1">
                          <Mail className="w-3.5 h-3.5 md:w-4 md:h-4 text-[#1A71F6]" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-2 mb-1">
                            <h4 className="font-jakarta font-semibold text-xs md:text-sm text-[#2A2A2A] dark:text-white truncate">
                              {message.title}
                            </h4>
                            {!message.isRead && (
                              <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-[#1A71F6] flex-shrink-0"></div>
                            )}
                          </div>
                          <p className="font-jakarta text-[10px] md:text-xs text-gray-500 dark:text-gray-400 line-clamp-2 mb-1">
                            {message.description}
                          </p>
                          <span className="font-jakarta text-[9px] md:text-[10px] text-gray-400 dark:text-gray-500">
                            {message.time}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              <div className="px-3 md:px-4 py-2 md:py-3 bg-[#F6F6F6] dark:bg-[#2A2A2A] border-t border-[#E7E7E7] dark:border-[#2A2A2A]">
                <button className="w-full font-jakarta text-xs md:text-sm font-semibold text-[#1A71F6] hover:text-[#1565D8] transition text-center">
                  View all messages
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="relative" ref={notificationRef}>
          <div
            onClick={toggleNotification}
            className={`relative w-8 h-8 md:w-9 md:h-9 p-1.5 bg-[#F6F6F6] dark:bg-[#2A2A2A] rounded-md flex items-center justify-center cursor-pointer transition-all duration-300 hover:scale-110 hover:shadow-md hover:bg-[#E5E7EB] dark:hover:bg-[#3A3A3A] ${
              isNotificationOpen ? "ring-2 ring-[#1A71F6] ring-offset-2 dark:ring-offset-[#1A1A1A]" : ""
            }`}
          >
            <Bell className="w-4 h-4 text-gray-700 dark:text-gray-300" />
            {notificationCount > 0 && (
              <span className="absolute -top-1 -right-1 w-3.5 h-3.5 md:w-4 md:h-4 bg-red-500 text-white text-[9px] md:text-[10px] font-bold rounded-full flex items-center justify-center animate-bounce">
                {notificationCount}
              </span>
            )}
          </div>

          {isNotificationOpen && (
            <div className="absolute right-0 top-full mt-2 md:mt-3 w-[280px] md:w-[320px] bg-white dark:bg-[#1A1A1A] rounded-xl md:rounded-2xl border border-[#E7E7E7] dark:border-[#2A2A2A] shadow-xl overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-200">
              <div className="flex items-center justify-between px-3 md:px-4 py-2 md:py-3 border-b border-[#E7E7E7] dark:border-[#2A2A2A] bg-[#F6F6F6] dark:bg-[#2A2A2A]">
                <h3 className="font-jakarta font-semibold text-xs md:text-sm text-[#2A2A2A] dark:text-white">
                  Notifications
                </h3>
                <button
                  onClick={() => setIsNotificationOpen(false)}
                  className="w-5 h-5 md:w-6 md:h-6 flex items-center justify-center rounded-md hover:bg-gray-200 dark:hover:bg-[#3A3A3A] transition"
                >
                  <X className="w-3 h-3 md:w-4 md:h-4 text-gray-500 dark:text-gray-400" />
                </button>
              </div>

              <div className="max-h-[300px] md:max-h-[360px] overflow-y-auto">
                {loadingNotifications ? (
                  <div className="px-4 py-3 text-center text-gray-500 dark:text-gray-400 text-sm">
                    Loading notifications...
                  </div>
                ) : notifications.length === 0 ? (
                  <div className="px-4 py-3 text-center text-gray-500 dark:text-gray-400 text-sm">
                    No notifications
                  </div>
                ) : (
                  notifications.map((notification, index) => (
                    <div
                      key={notification.id}
                      className={`px-3 md:px-4 py-2 md:py-3 border-b border-[#E7E7E7] dark:border-[#2A2A2A] last:border-b-0 hover:bg-gray-50 dark:hover:bg-[#2A2A2A] cursor-pointer transition ${
                        !notification.isRead ? "bg-blue-50/50 dark:bg-[#1A71F6]/10" : ""
                      }`}
                    >
                      <div className="flex items-start gap-2 md:gap-3">
                        <div className={`w-8 h-8 md:w-10 md:h-10 rounded-full ${avatarColors[index % avatarColors.length]} flex items-center justify-center flex-shrink-0 text-white font-jakarta font-semibold text-[10px] md:text-sm`}>
                          {getInitials(notification.name)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-2 mb-1">
                            <h4 className="font-jakarta font-semibold text-xs md:text-sm text-[#2A2A2A] dark:text-white truncate">
                              {notification.name}
                            </h4>
                            {!notification.isRead && (
                              <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-[#1A71F6] flex-shrink-0"></div>
                            )}
                          </div>
                          <p className="font-jakarta text-[10px] md:text-xs text-gray-500 dark:text-gray-400 mb-1">
                            {notification.action}
                          </p>
                          <span className="font-jakarta text-[9px] md:text-[10px] text-gray-400 dark:text-gray-500">
                            {notification.time}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              <div className="px-3 md:px-4 py-2 md:py-3 bg-[#F6F6F6] dark:bg-[#2A2A2A] border-t border-[#E7E7E7] dark:border-[#2A2A2A]">
                <button className="w-full font-jakarta text-xs md:text-sm font-semibold text-[#1A71F6] hover:text-[#1565D8] transition text-center">
                  View all notifications
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="relative" ref={profileRef}>
          <div
            onClick={toggleProfile}
            className={`flex items-center gap-1 md:gap-2 cursor-pointer transition-all duration-300 hover:scale-105 hover:bg-gray-100 dark:hover:bg-[#2A2A2A] rounded-lg p-1 ${
              isProfileOpen ? "ring-2 ring-[#1A71F6] ring-offset-2 dark:ring-offset-[#1A1A1A]" : ""
            }`}
          >
            <div className="relative w-7 h-7 md:w-10 md:h-9 rounded-md">
              <img
                src="/assets/guy.png"
                alt="Guy Hawkins"
                className="w-full h-full object-cover rounded-md"
              />
              <span className="absolute bottom-0 right-0 w-2 h-2 md:w-2.5 md:h-2.5 bg-green-500 border-2 border-white dark:border-[#1A1A1A] rounded-full"></span>
            </div>
            <div className="flex-col hidden md:flex">
              <span className="text-xs md:text-sm font-semibold text-gray-900 dark:text-white leading-tight">
                Guy Hawkins
              </span>
              <span className="text-[10px] md:text-xs text-gray-500 dark:text-gray-400 leading-tight">
                Admin
              </span>
            </div>
          </div>

          {isProfileOpen && (
            <div className="absolute right-0 top-full mt-2 md:mt-3 w-[200px] md:w-[248px] bg-white dark:bg-[#1A1A1A] rounded-xl border border-[#E7E7E7] dark:border-[#2A2A2A] shadow-xl overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-200">
              <div className="flex items-center gap-2 p-3 hover:bg-gray-50 dark:hover:bg-[#2A2A2A] cursor-pointer transition">
                <Users className="w-4 h-4 text-blue-500" />
                <span className="text-xs md:text-sm font-medium text-blue-500">Switch Account</span>
              </div>
              <div className="flex items-center gap-2 p-3 hover:bg-gray-50 dark:hover:bg-[#2A2A2A] cursor-pointer transition border-t border-[#E7E7E7] dark:border-[#2A2A2A]">
                <UserPlus className="w-4 h-4 text-blue-500" />
                <span className="text-xs md:text-sm font-medium text-blue-500">Create New Account</span>
              </div>
              <div className="flex items-center gap-2 p-3 hover:bg-gray-50 dark:hover:bg-[#2A2A2A] cursor-pointer transition border-t border-[#E7E7E7] dark:border-[#2A2A2A]">
                <LogOut className="w-4 h-4 text-red-500" />
                <span className="text-xs md:text-sm font-medium text-red-500">Log Out</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;