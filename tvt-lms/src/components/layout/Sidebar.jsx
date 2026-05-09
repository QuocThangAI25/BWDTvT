import React, { useState } from "react";
import {
  HomeIcon,
  BookOpenIcon,
  ChatBubbleLeftRightIcon,
  Cog6ToothIcon,
  UserCircleIcon,
  SparklesIcon,
  AcademicCapIcon,
} from "@heroicons/react/24/outline";

const Sidebar = ({ activeTab, setActiveTab }) => {
  const [hoveredItem, setHoveredItem] = useState(null);

  const menuItems = [
    {
      id: "home",
      name: "Trang chủ",
      icon: HomeIcon,
      color: "from-blue-500 to-cyan-500",
    },
    {
      id: "my-courses",
      name: "Khóa học của tôi",
      icon: BookOpenIcon,
      color: "from-purple-500 to-pink-500",
    },
    {
      id: "chat",
      name: "Chat tư vấn",
      icon: ChatBubbleLeftRightIcon,
      color: "from-green-500 to-emerald-500",
    },
    {
      id: "settings",
      name: "Cài đặt",
      icon: Cog6ToothIcon,
      color: "from-orange-500 to-red-500",
    },
  ];

  return (
    <div className="h-full bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 backdrop-blur-xl border-r border-white/10 fixed left-0 top-0 w-72 shadow-2xl">
      {/* Logo Area */}
      <div className="p-6 border-b border-white/10">
        <div className="flex items-center space-x-3">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full blur-lg opacity-70 animate-pulse"></div>
            <AcademicCapIcon className="relative h-10 w-10 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              TvT Learn
            </h1>
            <p className="text-xs text-gray-400 mt-1">Học tập thông minh</p>
          </div>
        </div>
      </div>

      {/* User Info */}
      <div className="p-6 border-b border-white/10">
        <div className="flex items-center space-x-4 group cursor-pointer">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <UserCircleIcon className="relative h-14 w-14 text-gray-300 group-hover:text-white transition-colors duration-300" />
          </div>
          <div className="flex-1">
            <p className="font-semibold text-white">Nguyễn Văn A</p>
            <p className="text-xs text-gray-400">Học viên Pro</p>
            <div className="flex items-center space-x-1 mt-1">
              <SparklesIcon className="h-3 w-3 text-yellow-400" />
              <span className="text-xs text-yellow-400">1200 điểm</span>
            </div>
          </div>
        </div>
      </div>

      {/* Menu Items */}
      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          const isHovered = hoveredItem === item.id;

          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              onMouseEnter={() => setHoveredItem(item.id)}
              onMouseLeave={() => setHoveredItem(null)}
              className={`relative w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-300 overflow-hidden group ${
                isActive
                  ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg"
                  : "text-gray-300 hover:text-white"
              }`}
            >
              {/* Hover background effect */}
              {!isActive && (
                <div
                  className={`absolute inset-0 bg-gradient-to-r ${item.color} opacity-0 group-hover:opacity-20 transition-opacity duration-300`}
                ></div>
              )}

              {/* Active indicator */}
              {isActive && (
                <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-1 h-8 bg-white rounded-r-full"></div>
              )}

              <Icon
                className={`h-5 w-5 relative z-10 transition-transform duration-300 ${isHovered ? "scale-110" : ""}`}
              />
              <span className="relative z-10 font-medium">{item.name}</span>

              {/* Badge for chat */}
              {item.id === "chat" && (
                <span className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-red-500 text-white text-xs rounded-full px-2 py-0.5 animate-pulse">
                  New
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-6 border-t border-white/10">
        <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-xl p-4">
          <p className="text-xs text-gray-400 text-center">
            ✨ Nâng cấp lên Pro
          </p>
          <p className="text-xs text-gray-500 text-center mt-1">
            Mở khóa tất cả khóa học
          </p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
