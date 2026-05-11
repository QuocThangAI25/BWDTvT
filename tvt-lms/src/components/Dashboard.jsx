import React, { useState, useEffect } from "react";
import {
  MagnifyingGlassIcon,
  BellIcon,
  ChartBarIcon,
  SparklesIcon,
  FireIcon,
  ChatBubbleLeftRightIcon,
  LockClosedIcon,
} from "@heroicons/react/24/outline";
import { useAuth } from "../contexts/AuthContext";
import Sidebar from "./layout/Sidebar";
import CourseCard from "./course/CourseCard";
import Chatbot from "./chat/Chatbot";
import Contests from "../pages/Contests";

const Dashboard = () => {
  const { user } = useAuth();
  console.log("CHECK DỮ LIỆU USER TRONG CODE:", user);
  const [activeTab, setActiveTab] = useState("home");
  const [searchTerm, setSearchTerm] = useState("");
  const [greeting, setGreeting] = useState("");

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting("Chào buổi sáng");
    else if (hour < 18) setGreeting("Chào buổi chiều");
    else setGreeting("Chào buổi tối");
  }, []);

  const ongoingCourses = [
    {
      id: 1,
      title: "React & Next.js Mastery 2025",
      instructor: "Nguyễn Văn A",
      thumbnail:
        "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400",
      progress: 65,
      duration: "25 giờ",
      level: "Trung cấp",
    },
    {
      id: 2,
      title: "Python for Data Science",
      instructor: "Trần Thị B",
      thumbnail:
        "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=400",
      progress: 30,
      duration: "40 giờ",
      level: "Cơ bản",
    },
    {
      id: 3,
      title: "UI/UX Design với Figma",
      instructor: "Lê Văn C",
      thumbnail:
        "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?w=400",
      progress: 85,
      duration: "15 giờ",
      level: "Nâng cao",
    },
  ];

  const recommendedCourses = [
    {
      id: 4,
      title: "Machine Learning cơ bản",
      instructor: "Phạm Thị D",
      thumbnail:
        "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=400",
      duration: "35 giờ",
      level: "Nâng cao",
      price: 799000,
    },
    {
      id: 5,
      title: "Digital Marketing toàn diện",
      instructor: "Hoàng Văn E",
      thumbnail:
        "https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?w=400",
      duration: "30 giờ",
      level: "Cơ bản",
      price: 449000,
    },
  ];

  const stats = [
    {
      icon: FireIcon,
      label: "Streak",
      value: user?.streak || 7,
      unit: "ngày",
      color: "from-orange-500 to-red-500",
    },
    {
      icon: ChartBarIcon,
      label: "Đã học",
      value: "45",
      unit: "giờ",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: SparklesIcon,
      label: "Điểm",
      value: user?.points || 1200,
      unit: "điểm",
      color: "from-purple-500 to-pink-500",
    },
  ];

  const filteredRecommended = recommendedCourses.filter((course) =>
    course.title.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  // Nếu chọn tab Cuộc thi, hiển thị component Contests
  if (activeTab === "contests") {
    return (
      <div className="min-h-screen bg-gray-50">
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
        <div className="pt-16">
          <Contests />
        </div>
        <Chatbot />
      </div>
    );
  }

  const renderContent = () => {
    if (!user && (activeTab === "my-courses" || activeTab === "settings")) {
      return (
        <div className="text-center py-20">
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-full p-4 w-20 h-20 mx-auto mb-6 flex items-center justify-center">
            <LockClosedIcon className="h-10 w-10 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-3">
            Cần đăng nhập
          </h2>
          <p className="text-gray-600 mb-8">
            Vui lòng đăng nhập để xem khóa học và quản lý tài khoản
          </p>
          <div className="flex justify-center space-x-4">
            <a
              href="/login"
              className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold"
            >
              Đăng nhập ngay
            </a>
            <a
              href="/register"
              className="px-6 py-3 border-2 text-gray-700 rounded-xl font-semibold"
            >
              Đăng ký
            </a>
          </div>
        </div>
      );
    }

    if (activeTab === "my-courses" && user) {
      return (
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            📚 Khóa học của tôi
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {ongoingCourses.map((course) => (
              <CourseCard key={course.id} course={course} type="ongoing" />
            ))}
          </div>
        </div>
      );
    }

    if (activeTab === "chat") {
      return (
        <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-3xl p-12 text-center text-white">
          <div className="animate-bounce">
            <ChatBubbleLeftRightIcon className="h-20 w-20 mx-auto mb-6" />
          </div>
          <h2 className="text-3xl font-bold mb-4">💬 Trung tâm tư vấn AI</h2>
          <p className="text-lg mb-8">Nhấn vào nút chat góc phải màn hình</p>
          <div className="bg-white/20 backdrop-blur-lg rounded-2xl p-6 max-w-md mx-auto">
            <p className="font-semibold mb-2">✨ Gợi ý hôm nay:</p>
            <p>"Python đang là xu hướng 2025 - Học ngay!"</p>
          </div>
        </div>
      );
    }

    if (activeTab === "settings" && user) {
      return (
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            ⚙️ Cài đặt tài khoản
          </h2>
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center space-x-4 mb-6">
              <div className="h-16 w-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                <span className="text-2xl text-white">
                  {user?.name?.charAt(0)}
                </span>
              </div>
              <div>
                <h3 className="font-bold text-lg">{user?.name}</h3>
                <p className="text-gray-500">{user?.email}</p>
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Họ và tên
                </label>
                <input
                  type="text"
                  defaultValue={user?.name}
                  className="w-full px-4 py-2 border rounded-lg"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  defaultValue={user?.email}
                  className="w-full px-4 py-2 border rounded-lg bg-gray-50"
                  disabled
                />
              </div>
              <button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-xl font-semibold">
                Lưu thay đổi
              </button>
            </div>
          </div>
        </div>
      );
    }

    // Home page
    return (
      <>
        <div className="mb-8">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h1 className="text-3xl lg:text-4xl font-bold text-gray-900">
                {greeting}, {user?.name?.split(" ")[0] || "bạn"}! 👋
              </h1>
              <p className="text-gray-600 mt-2">Hôm nay học gì nào? 🚀</p>
            </div>
            <button className="relative">
              <BellIcon className="h-6 w-6 text-gray-600" />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center animate-pulse">
                3
              </span>
            </button>
          </div>
          <div className="relative max-w-2xl">
            <MagnifyingGlassIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Tìm kiếm khóa học yêu thích..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-4 border-0 rounded-xl bg-white shadow-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
          {stats.map((stat, idx) => (
            <div key={idx} className="bg-white rounded-2xl p-6 shadow-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-sm">{stat.label}</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {stat.value} <span className="text-sm">{stat.unit}</span>
                  </p>
                </div>
                <div
                  className={`bg-gradient-to-r ${stat.color} p-3 rounded-xl`}
                >
                  <stat.icon className="h-6 w-6 text-white" />
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mb-12">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-gray-900">
              📖 Tiếp tục học tập
            </h2>
            <button className="text-blue-600 text-sm">Xem tất cả →</button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {ongoingCourses.map((course) => (
              <CourseCard key={course.id} course={course} type="ongoing" />
            ))}
          </div>
        </div>

        <div>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-gray-900">
              ✨ Đề xuất cho bạn
            </h2>
            <button className="text-blue-600 text-sm">Xem tất cả →</button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredRecommended.map((course) => (
              <CourseCard key={course.id} course={course} type="recommended" />
            ))}
          </div>
        </div>
      </>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <main className="pt-20 px-4 lg:px-8 max-w-7xl mx-auto pb-12">
        {renderContent()}
      </main>
      <Chatbot />
    </div>
  );
};

export default Dashboard;