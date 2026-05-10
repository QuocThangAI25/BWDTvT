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
  UserPlusIcon,
} from "@heroicons/react/24/outline";
import { useAuth } from "../../contexts/AuthContext";

const Sidebar = ({ activeTab, setActiveTab }) => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const { user, logout } = useAuth();

  const menuItems = [
    { id: "home", name: "Trang chủ", icon: HomeIcon },
    { id: "my-courses", name: "Khóa học của tôi", icon: BookOpenIcon },
    { id: "chat", name: "Chat tư vấn", icon: ChatBubbleLeftRightIcon },
    { id: "settings", name: "Cài đặt", icon: Cog6ToothIcon },
  ];

  // Menu cho người chưa đăng nhập (ẩn khóa học của tôi và cài đặt)
  const publicMenuItems = [
    { id: "home", name: "Trang chủ", icon: HomeIcon },
    { id: "chat", name: "Chat tư vấn", icon: ChatBubbleLeftRightIcon },
  ];

  const displayMenuItems = user ? menuItems : publicMenuItems;

  return (
    <>
      <nav className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 shadow-lg fixed top-0 left-0 right-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <a href="/" className="flex items-center space-x-3 cursor-pointer">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full blur-lg opacity-70 animate-pulse"></div>
                <AcademicCapIcon className="relative h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                  TvT Learn
                </h1>
                <p className="text-xs text-gray-400 hidden sm:block">
                  Học tập thông minh
                </p>
              </div>
            </a>

            {/* Desktop Menu - hiển thị cho cả đã login và chưa login */}
            <div className="hidden md:flex items-center space-x-1">
              {displayMenuItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-300 ${
                      isActive
                        ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg"
                        : "text-gray-300 hover:text-white hover:bg-white/10"
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                    <span className="font-medium">{item.name}</span>
                  </button>
                );
              })}
            </div>

            {/* Right side - Auth Buttons or User Info */}
            <div className="flex items-center space-x-4">
              {user ? (
                <>
                  <div className="hidden md:flex items-center space-x-3 cursor-pointer group">
                    <div className="relative">
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <UserCircleIcon className="relative h-8 w-8 text-gray-300 group-hover:text-white transition-colors duration-300" />
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-semibold text-white">
                        {user.name}
                      </p>
                      <div className="flex items-center space-x-1">
                        <SparklesIcon className="h-3 w-3 text-yellow-400" />
                        <span className="text-xs text-gray-400">
                          {user.points || 0} điểm
                        </span>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={logout}
                    className="hidden md:flex items-center space-x-2 px-4 py-2 rounded-lg text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-all duration-300"
                  >
                    <ArrowRightOnRectangleIcon className="h-5 w-5" />
                    <span>Đăng xuất</span>
                  </button>
                </>
              ) : (
                <div className="hidden md:flex items-center space-x-3">
                  <a
                    href="/login"
                    className="px-4 py-2 rounded-lg text-gray-300 hover:text-white hover:bg-white/10 transition-all duration-300"
                  >
                    Đăng nhập
                  </a>
                  <a
                    href="/register"
                    className="px-4 py-2 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:shadow-lg transition-all duration-300"
                  >
                    Đăng ký
                  </a>
                </div>
              )}

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileOpen(!isMobileOpen)}
                className="md:hidden p-2 rounded-lg text-white hover:bg-white/10 transition-colors"
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
          <div className="md:hidden bg-gray-800 border-t border-gray-700 py-2 max-h-[80vh] overflow-y-auto">
            {user ? (
              <>
                <div className="flex items-center space-x-3 px-6 py-4 border-b border-gray-700">
                  <UserCircleIcon className="h-10 w-10 text-gray-400" />
                  <div>
                    <p className="font-semibold text-white">{user.name}</p>
                    <p className="text-xs text-gray-400">{user.email}</p>
                  </div>
                </div>
                {menuItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeTab === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        setActiveTab(item.id);
                        setIsMobileOpen(false);
                      }}
                      className={`w-full flex items-center space-x-3 px-6 py-3 transition-all duration-200 ${
                        isActive
                          ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white"
                          : "text-gray-300 hover:bg-white/10"
                      }`}
                    >
                      <Icon className="h-5 w-5" />
                      <span>{item.name}</span>
                    </button>
                  );
                })}
                <button
                  onClick={() => {
                    logout();
                    setIsMobileOpen(false);
                  }}
                  className="w-full flex items-center space-x-3 px-6 py-3 text-red-400 hover:bg-red-500/10 transition-all duration-200"
                >
                  <ArrowRightOnRectangleIcon className="h-5 w-5" />
                  <span>Đăng xuất</span>
                </button>
              </>
            ) : (
              <div className="flex flex-col gap-2 p-4">
                <a
                  href="/"
                  onClick={() => setIsMobileOpen(false)}
                  className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-300 hover:text-white hover:bg-white/10 transition-all duration-300"
                >
                  <HomeIcon className="h-5 w-5" />
                  <span>Trang chủ</span>
                </a>
                <a
                  href="/chat"
                  onClick={() => {
                    setActiveTab("chat");
                    setIsMobileOpen(false);
                  }}
                  className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-300 hover:text-white hover:bg-white/10 transition-all duration-300"
                >
                  <ChatBubbleLeftRightIcon className="h-5 w-5" />
                  <span>Chat tư vấn</span>
                </a>
                <div className="border-t border-gray-700 my-2"></div>
                <a
                  href="/login"
                  className="w-full text-center px-4 py-3 rounded-lg text-gray-300 hover:text-white hover:bg-white/10 transition-all duration-300"
                  onClick={() => setIsMobileOpen(false)}
                >
                  Đăng nhập
                </a>
                <a
                  href="/register"
                  className="w-full text-center px-4 py-3 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:shadow-lg transition-all duration-300"
                  onClick={() => setIsMobileOpen(false)}
                >
                  Đăng ký
                </a>
              </div>
            )}
          </div>
        )}
      </nav>

      <div className="h-16"></div>
    </>
  );
};

export default Sidebar;
