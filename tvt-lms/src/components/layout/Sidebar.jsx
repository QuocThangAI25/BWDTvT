import React, { useState } from "react";
import {
  HomeIcon,
  BookOpenIcon,
  ChatBubbleLeftRightIcon,
  Cog6ToothIcon,
  UserCircleIcon,
  SparklesIcon,
  AcademicCapIcon,
  Bars3Icon,
  XMarkIcon,
  ArrowRightOnRectangleIcon,
  TrophyIcon,
} from "@heroicons/react/24/outline";
import { useAuth } from "../../contexts/AuthContext";

const Sidebar = ({ activeTab, setActiveTab }) => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const { user, logout } = useAuth();

  const menuItems = [
    { id: "home", name: "Trang chủ", icon: HomeIcon },
    { id: "contests", name: "Cuộc thi", icon: TrophyIcon },
    { id: "my-courses", name: "Khóa học của tôi", icon: BookOpenIcon },
    { id: "chat", name: "Chat tư vấn", icon: ChatBubbleLeftRightIcon },
    { id: "settings", name: "Cài đặt", icon: Cog6ToothIcon },
  ];

  const publicMenuItems = [
    { id: "home", name: "Trang chủ", icon: HomeIcon },
    { id: "contests", name: "Cuộc thi", icon: TrophyIcon },
    { id: "chat", name: "Chat tư vấn", icon: ChatBubbleLeftRightIcon },
  ];

  const displayMenuItems = user ? menuItems : publicMenuItems;

  return (
    <>
      <nav className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 shadow-lg fixed top-0 left-0 right-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <a href="/" className="flex items-center space-x-3">
              <AcademicCapIcon className="h-8 w-8 text-white" />
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  TvT Learn
                </h1>
                <p className="text-xs text-gray-400 hidden sm:block">
                  Học tập thông minh
                </p>
              </div>
            </a>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-1">
              {displayMenuItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${
                      isActive
                        ? "bg-blue-600 text-white"
                        : "text-gray-300 hover:text-white hover:bg-white/10"
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                    <span>{item.name}</span>
                  </button>
                );
              })}
            </div>

            {/* User / Auth */}
            <div className="flex items-center space-x-4">
              {user ? (
                <div className="hidden md:flex items-center space-x-3">
                  <UserCircleIcon className="h-8 w-8 text-gray-300" />
                  <div>
                    <p className="text-sm font-semibold text-white">
                      {user.name}
                    </p>
                    <p className="text-xs text-gray-400">
                      {user.points || 0} điểm
                    </p>
                  </div>
                  <button
                    onClick={logout}
                    className="text-red-400 hover:text-red-300"
                  >
                    <ArrowRightOnRectangleIcon className="h-5 w-5" />
                  </button>
                </div>
              ) : (
                <div className="hidden md:flex items-center space-x-3">
                  <a href="/login" className="text-gray-300 hover:text-white">
                    Đăng nhập
                  </a>
                  <a
                    href="/register"
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg"
                  >
                    Đăng ký
                  </a>
                </div>
              )}

              {/* Mobile button */}
              <button
                onClick={() => setIsMobileOpen(!isMobileOpen)}
                className="md:hidden p-2 text-white"
              >
                {isMobileOpen ? (
                  <XMarkIcon className="h-6 w-6" />
                ) : (
                  <Bars3Icon className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileOpen && (
          <div className="md:hidden bg-gray-800 p-4">
            {displayMenuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setIsMobileOpen(false);
                }}
                className="w-full text-left px-4 py-2 text-gray-300 hover:text-white"
              >
                {item.name}
              </button>
            ))}
          </div>
        )}
      </nav>
      <div className="h-16"></div>
    </>
  );
};

export default Sidebar;
