import React, { useState } from "react";
import {
  CalendarIcon,
  ClockIcon,
  UsersIcon,
  TrophyIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";

const Contests = () => {
  const [activeFilter, setActiveFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  // DỮ LIỆU MẪU - KHÔNG CẦN API
  const contests = [
    {
      id: 1,
      title: "AI Coding Battle 2026",
      description: "Cuộc thi lập trình AI lớn nhất năm với giải thưởng hấp dẫn",
      slug: "ai-coding-battle-2026",
      thumbnail:
        "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400",
      startDate: "2026-05-01",
      endDate: "2026-05-30",
      duration: 150,
      totalParticipants: 1245,
      prize: "15.000.000đ",
      status: "ongoing",
    },
    {
      id: 2,
      title: "Data Science Marathon",
      description:
        "Thử thách xử lý 1 triệu dòng dữ liệu trong thời gian giới hạn",
      slug: "data-science-marathon",
      thumbnail:
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400",
      startDate: "2026-04-15",
      endDate: "2026-05-15",
      duration: 120,
      totalParticipants: 856,
      prize: "10.000.000đ",
      status: "ongoing",
    },
    {
      id: 3,
      title: "Quick Math Race",
      description:
        "Cuộc thi toán nhanh mỗi tuần với các bài toán từ cơ bản đến nâng cao",
      slug: "quick-math-race",
      thumbnail:
        "https://images.unsplash.com/photo-1509228468518-180dd4864904?w=400",
      startDate: "2026-06-01",
      endDate: "2026-06-07",
      duration: 60,
      totalParticipants: 0,
      prize: "5.000.000đ",
      status: "upcoming",
    },
    {
      id: 4,
      title: "Web Development Hackathon",
      description: "Xây dựng ứng dụng web hoàn chỉnh trong 48 giờ",
      slug: "web-dev-hackathon",
      thumbnail:
        "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400",
      startDate: "2026-03-01",
      endDate: "2026-03-15",
      duration: 2880,
      totalParticipants: 342,
      prize: "20.000.000đ",
      status: "ended",
    },
    {
      id: 5,
      title: "Python Advanced Challenge",
      description: "Thử thách Python nâng cao với các bài toán thuật toán",
      slug: "python-advanced-challenge",
      thumbnail:
        "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=400",
      startDate: "2026-05-20",
      endDate: "2026-05-25",
      duration: 90,
      totalParticipants: 567,
      prize: "8.000.000đ",
      status: "upcoming",
    },
  ];

  const getStatus = (startDate, endDate, status) => {
    const now = new Date();
    const start = new Date(startDate);
    const end = new Date(endDate);

    if (status === "upcoming" || now < start) {
      return { text: "Sắp diễn ra", color: "bg-yellow-500" };
    } else if (status === "ongoing" || (now >= start && now <= end)) {
      return { text: "Đang diễn ra", color: "bg-green-500 animate-pulse" };
    } else {
      return { text: "Đã kết thúc", color: "bg-gray-500" };
    }
  };

  const filters = [
    { id: "all", name: "Tất cả" },
    { id: "upcoming", name: "Sắp diễn ra" },
    { id: "ongoing", name: "Đang diễn ra" },
    { id: "ended", name: "Đã kết thúc" },
  ];

  // Lọc dữ liệu
  const filteredContests = contests.filter((contest) => {
    // Lọc theo status
    if (activeFilter !== "all" && contest.status !== activeFilter) return false;
    // Lọc theo tìm kiếm
    if (
      searchTerm &&
      !contest.title.toLowerCase().includes(searchTerm.toLowerCase())
    )
      return false;
    return true;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            🏆 Cuộc thi lập trình
          </h1>
          <p className="text-gray-600 mt-2">
            Tham gia các cuộc thi, thử thách bản thân và nhận giải thưởng
          </p>
        </div>

        {/* Search và Filter */}
        <div className="flex flex-col md:flex-row justify-between gap-4 mb-8">
          <div className="relative flex-1 max-w-md">
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Tìm kiếm cuộc thi..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            {filters.map((filter) => (
              <button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id)}
                className={`px-4 py-2 rounded-lg transition-all ${
                  activeFilter === filter.id
                    ? "bg-blue-600 text-white"
                    : "bg-white text-gray-600 hover:bg-gray-100 border"
                }`}
              >
                {filter.name}
              </button>
            ))}
          </div>
        </div>

        {/* Danh sách cuộc thi */}
        {filteredContests.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-2xl">
            <TrophyIcon className="h-16 w-16 mx-auto text-gray-300 mb-4" />
            <p className="text-gray-500">Không tìm thấy cuộc thi nào</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredContests.map((contest) => {
              const status = getStatus(
                contest.startDate,
                contest.endDate,
                contest.status,
              );
              return (
                <div
                  key={contest.id}
                  className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all overflow-hidden group"
                >
                  <div className="relative h-40 overflow-hidden">
                    <img
                      src={contest.thumbnail}
                      alt={contest.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div
                      className={`absolute top-3 right-3 ${status.color} text-white text-xs px-2 py-1 rounded-full`}
                    >
                      {status.text}
                    </div>
                  </div>
                  <div className="p-5">
                    <h3 className="font-bold text-lg text-gray-900 mb-2">
                      {contest.title}
                    </h3>
                    <p className="text-gray-500 text-sm mb-4 line-clamp-2">
                      {contest.description}
                    </p>
                    <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                      <div className="flex items-center gap-1">
                        <CalendarIcon className="h-4 w-4" />
                        <span>
                          {new Date(contest.startDate).toLocaleDateString(
                            "vi-VN",
                          )}
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <ClockIcon className="h-4 w-4" />
                        <span>{contest.duration} phút</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <UsersIcon className="h-4 w-4" />
                        <span>{contest.totalParticipants}</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1 text-yellow-600">
                        <TrophyIcon className="h-4 w-4" />
                        <span className="text-sm font-semibold">
                          {contest.prize}
                        </span>
                      </div>
                      <a
                        href={`/contest/${contest.slug}`}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-semibold hover:bg-blue-700 transition-colors"
                      >
                        Xem chi tiết →
                      </a>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Contests;
