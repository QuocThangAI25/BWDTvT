import React, { useState } from "react";
import {
  HomeIcon,
  BookOpenIcon,
  ChatBubbleLeftRightIcon,
  Cog6ToothIcon,
  UserCircleIcon,
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

  // 🌟 Hàm tính câu chào theo thời gian thực
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Chào buổi sáng";
    if (hour < 18) return "Chào buổi chiều";
    return "Chào buổi tối";
  };

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

            {/* User / Auth (Desktop) */}
            <div className="flex items-center space-x-4">
              {user ? (
                <div className="hidden md:flex items-center space-x-3">
                  {/* Hiển thị Avatar */}
                  {user.avatar ? (
                    <img src={user.avatar} alt="Avatar" className="h-8 w-8 rounded-full object-cover border border-gray-600" />
                  ) : (
                    <UserCircleIcon className="h-8 w-8 text-gray-300" />
                  )}
                  
                  <div>
                    {/* ✅ HIỂN THỊ CÂU CHÀO THEO GIỜ Ở ĐÂY (Desktop) */}
                    <p className="text-sm font-semibold text-white">
                      {getGreeting()}, {user.name}!
                    </p>
                    <p className="text-xs text-gray-400">
                      {user.points || 0} điểm
                    </p>
                  </div>
                  <button
                    onClick={logout}
                    title="Đăng xuất"
                    className="text-red-400 hover:text-red-300 p-2 rounded-lg hover:bg-white/5 transition-colors"
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
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
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
          <div className="md:hidden bg-gray-800 p-4 shadow-xl border-t border-gray-700">
            {/* Thông tin User (Mobile) */}
            {user && (
              <div className="flex items-center justify-between p-3 mb-3 bg-gray-900 rounded-xl">
                <div className="flex items-center space-x-3">
                  {user.avatar ? (
                    <img src={user.avatar} alt="Avatar" className="h-10 w-10 rounded-full object-cover border border-gray-600" />
                  ) : (
                    <UserCircleIcon className="h-10 w-10 text-gray-400" />
                  )}
                  <div>
                    {/* ✅ HIỂN THỊ CÂU CHÀO THEO GIỜ Ở ĐÂY (Mobile) */}
                    <p className="text-sm font-semibold text-white">
                      {getGreeting()}, {user.name}!
                    </p>
                    <p className="text-xs text-gray-400">{user.email}</p>
                  </div>
                </div>
                <button onClick={logout} className="p-2 text-red-400 bg-red-400/10 rounded-lg">
                  <ArrowRightOnRectangleIcon className="h-5 w-5" />
                </button>
              </div>
            )}

            {/* Các link điều hướng Mobile */}
            {displayMenuItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setIsMobileOpen(false);
                  }}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg mb-1 ${
                    activeTab === item.id ? "bg-blue-600/20 text-blue-400" : "text-gray-300 hover:bg-gray-700 hover:text-white"
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  <span>{item.name}</span>
                </button>
              );
            })}

            {!user && (
              <div className="mt-4 pt-4 border-t border-gray-700 flex flex-col space-y-2">
                <a href="/login" className="w-full text-center px-4 py-2 text-gray-300 bg-gray-700 rounded-lg">Đăng nhập</a>
                <a href="/register" className="w-full text-center px-4 py-2 bg-blue-600 text-white rounded-lg">Đăng ký</a>
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