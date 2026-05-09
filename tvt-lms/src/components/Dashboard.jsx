import React, { useState, useEffect } from "react";
import {
  MagnifyingGlassIcon,
  BellIcon,
  ChartBarIcon,
  SparklesIcon,
  FireIcon,
  CalendarIcon,
} from "@heroicons/react/24/outline";
import Sidebar from "./layout/Sidebar";
import CourseCard from "./course/CourseCard";
import Chatbot from "./chat/Chatbot";

const Dashboard = () => {
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
      rating: 4.8,
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
      rating: 4.6,
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
      rating: 4.9,
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
      students: 3456,
      rating: 4.7,
    },
    {
      id: 5,
      title: "Digital Marketing toàn diện",
      instructor: "Hoàng Văn E",
      thumbnail:
        "https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?w=400",
      duration: "30 giờ",
      level: "Cơ bản",
      students: 5678,
      rating: 4.5,
    },
    {
      id: 6,
      title: "Tiếng Anh IT chuyên ngành",
      instructor: "Ngô Thị F",
      thumbnail:
        "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=400",
      duration: "20 giờ",
      level: "Trung cấp",
      students: 2345,
      rating: 4.8,
    },
  ];

  const stats = [
    {
      icon: FireIcon,
      label: "Streak",
      value: "7 ngày",
      color: "from-orange-500 to-red-500",
    },
    {
      icon: ChartBarIcon,
      label: "Đã học",
      value: "45 giờ",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: SparklesIcon,
      label: "Chứng chỉ",
      value: "3",
      color: "from-purple-500 to-pink-500",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      <div className="lg:ml-72">
        <main className="p-4 lg:p-8">
          {activeTab === "home" && (
            <div className="animate-fadeInUp">
              {/* Header with greeting */}
              <div className="mb-8">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                      {greeting}! 👋
                    </h1>
                    <p className="text-gray-600 mt-2">Hôm nay học gì nào? 🚀</p>
                  </div>
                  <button className="relative group">
                    <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full blur opacity-0 group-hover:opacity-100 transition duration-300"></div>
                    <BellIcon className="relative h-6 w-6 text-gray-600 group-hover:text-gray-900 transition-colors" />
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center animate-pulse">
                      3
                    </span>
                  </button>
                </div>

                {/* Search Bar with animation */}
                <div className="relative max-w-2xl group">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl blur opacity-0 group-hover:opacity-100 transition duration-300"></div>
                  <div className="relative">
                    <MagnifyingGlassIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 group-hover:text-blue-600 transition-colors" />
                    <input
                      type="text"
                      placeholder="Tìm kiếm khóa học yêu thích..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-12 pr-4 py-4 border-0 rounded-xl bg-white shadow-lg focus:ring-2 focus:ring-blue-500 transition-all group-hover:shadow-xl"
                    />
                  </div>
                </div>
              </div>

              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                {stats.map((stat, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 animate-fadeInLeft"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-gray-500 text-sm">{stat.label}</p>
                        <p className="text-2xl font-bold text-gray-900 mt-1">
                          {stat.value}
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

              {/* Ongoing Courses */}
              <div className="mb-12">
                <div className="flex justify-between items-center mb-6">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">
                      📚 Tiếp tục học tập
                    </h2>
                    <p className="text-gray-600 text-sm mt-1">
                      Đừng bỏ lỡ tiến độ của bạn
                    </p>
                  </div>
                  <button className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center space-x-1 group">
                    <span>Xem tất cả</span>
                    <span className="group-hover:translate-x-1 transition-transform">
                      →
                    </span>
                  </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {ongoingCourses.map((course, index) => (
                    <div
                      key={course.id}
                      className="animate-fadeInUp"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <CourseCard course={course} type="ongoing" />
                    </div>
                  ))}
                </div>
              </div>

              {/* Recommended Courses */}
              <div>
                <div className="flex justify-between items-center mb-6">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">
                      ✨ Đề xuất cho bạn
                    </h2>
                    <p className="text-gray-600 text-sm mt-1">
                      Dựa trên sở thích học tập của bạn
                    </p>
                  </div>
                  <button className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center space-x-1 group">
                    <span>Xem tất cả</span>
                    <span className="group-hover:translate-x-1 transition-transform">
                      →
                    </span>
                  </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {recommendedCourses.map((course, index) => (
                    <div
                      key={course.id}
                      className="animate-fadeInRight"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <CourseCard course={course} type="recommended" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === "my-courses" && (
            <div className="animate-fadeInUp">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                📖 Khóa học của tôi
              </h2>
              <p className="text-gray-600 mb-8">
                Quản lý tất cả khóa học bạn đã đăng ký
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {ongoingCourses.map((course) => (
                  <CourseCard key={course.id} course={course} type="ongoing" />
                ))}
              </div>
            </div>
          )}

          {activeTab === "chat" && (
            <div className="animate-fadeInUp">
              <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-3xl p-12 text-center text-white">
                <div className="animate-float">
                  <ChatBubbleLeftRightIcon className="h-20 w-20 mx-auto mb-6" />
                </div>
                <h2 className="text-3xl font-bold mb-4">
                  💬 Trung tâm tư vấn AI
                </h2>
                <p className="text-lg mb-8 opacity-95">
                  Nhấn vào nút chat góc phải màn hình để bắt đầu trò chuyện
                </p>
                <div className="bg-white/20 backdrop-blur-lg rounded-2xl p-6 max-w-md mx-auto">
                  <p className="text-white font-semibold mb-2">
                    ✨ Gợi ý hôm nay:
                  </p>
                  <p className="text-white/90">
                    "Python đang là xu hướng 2025 - Học ngay để không bỏ lỡ!"
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeTab === "settings" && (
            <div className="animate-fadeInUp max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                ⚙️ Cài đặt tài khoản
              </h2>
              <p className="text-gray-600 mb-8">
                Quản lý thông tin cá nhân và tùy chỉnh
              </p>
              {/* Settings content here */}
            </div>
          )}
        </main>
      </div>

      <Chatbot />
    </div>
  );
};

export default Dashboard;
