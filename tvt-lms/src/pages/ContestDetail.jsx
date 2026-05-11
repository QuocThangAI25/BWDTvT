import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  CalendarIcon,
  ClockIcon,
  UsersIcon,
  TrophyIcon,
  CodeBracketIcon,
  PlayIcon,
  ArrowLeftIcon,
} from "@heroicons/react/24/outline";
import { useAuth } from "../contexts/AuthContext";

const ContestDetail = () => {
  const { slug } = useParams();
  const { user } = useAuth();
  const [registered, setRegistered] = useState(false);
  const [activeChallenge, setActiveChallenge] = useState(0);
  const [code, setCode] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState(null);

  // DỮ LIỆU MẪU CHO TỪNG CUỘC THI
  const contestsData = {
    "ai-coding-battle-2026": {
      id: 1,
      title: "AI Coding Battle 2026",
      description:
        "Cuộc thi lập trình AI lớn nhất năm với giải thưởng hấp dẫn. Thử thách xây dựng mô hình AI phân loại ảnh và xử lý ngôn ngữ tự nhiên.",
      startDate: "2026-05-01",
      endDate: "2026-05-30",
      duration: 150,
      totalParticipants: 1245,
      prize: "15.000.000đ",
      challenges: [
        {
          id: 1,
          title: "Bài 1: Phân loại ảnh",
          description: "Xây dựng mô hình phân loại ảnh với độ chính xác > 90%",
          maxScore: 100,
          starterCode:
            '# Bài 1: Phân loại ảnh\n\ndef classify_image(image_path):\n    # TODO: Implement classification\n    return "cat"',
        },
        {
          id: 2,
          title: "Bài 2: NLP Sentiment",
          description: "Phân tích cảm xúc của văn bản",
          maxScore: 100,
          starterCode:
            '# Bài 2: Sentiment Analysis\n\ndef analyze_sentiment(text):\n    return "positive"',
        },
        {
          id: 3,
          title: "Bài 3: Tối ưu hóa",
          description: "Tìm đường đi ngắn nhất",
          maxScore: 100,
          starterCode:
            "# Bài 3: Tối ưu hóa\n\ndef find_shortest_path(grid, start, end):\n    return []",
        },
      ],
    },
    "data-science-marathon": {
      id: 2,
      title: "Data Science Marathon",
      description:
        "Thử thách xử lý 1 triệu dòng dữ liệu trong thời gian giới hạn",
      startDate: "2026-04-15",
      endDate: "2026-05-15",
      duration: 120,
      totalParticipants: 856,
      prize: "10.000.000đ",
      challenges: [
        {
          id: 1,
          title: "Bài 1: Làm sạch dữ liệu",
          description: "Xử lý missing values và outliers",
          maxScore: 100,
          starterCode:
            "# Bài 1: Làm sạch dữ liệu\n\nimport pandas as pd\n\ndef clean_data(df):\n    return df",
        },
        {
          id: 2,
          title: "Bài 2: Phân tích dữ liệu",
          description: "Tìm insights từ dữ liệu",
          maxScore: 100,
          starterCode: "# Bài 2: Phân tích\n\ndef analyze(df):\n    return {}",
        },
      ],
    },
    "quick-math-race": {
      id: 3,
      title: "Quick Math Race",
      description: "Cuộc thi toán nhanh mỗi tuần",
      startDate: "2026-06-01",
      endDate: "2026-06-07",
      duration: 60,
      totalParticipants: 0,
      prize: "5.000.000đ",
      challenges: [
        {
          id: 1,
          title: "Bài 1: Giải phương trình",
          description: "Giải phương trình bậc 2",
          maxScore: 100,
          starterCode:
            "# Bài 1\n\ndef solve_quadratic(a, b, c):\n    return []",
        },
        {
          id: 2,
          title: "Bài 2: Tính tổ hợp",
          description: "Tính C(n, k) với n lớn",
          maxScore: 100,
          starterCode: "# Bài 2\n\ndef combination(n, k):\n    return 0",
        },
      ],
    },
    "web-dev-hackathon": {
      id: 4,
      title: "Web Development Hackathon",
      description: "Xây dựng ứng dụng web hoàn chỉnh trong 48 giờ",
      startDate: "2026-03-01",
      endDate: "2026-03-15",
      duration: 2880,
      totalParticipants: 342,
      prize: "20.000.000đ",
      challenges: [
        {
          id: 1,
          title: "Bài 1: Frontend",
          description: "Xây dựng giao diện responsive",
          maxScore: 100,
          starterCode:
            "// Bài 1: Frontend\n\n// TODO: Implement React components",
        },
        {
          id: 2,
          title: "Bài 2: Backend API",
          description: "Xây dựng RESTful API",
          maxScore: 100,
          starterCode: "// Bài 2: Backend\n\n// TODO: Implement API",
        },
      ],
    },
    "python-advanced-challenge": {
      id: 5,
      title: "Python Advanced Challenge",
      description: "Thử thách Python nâng cao",
      startDate: "2026-05-20",
      endDate: "2026-05-25",
      duration: 90,
      totalParticipants: 567,
      prize: "8.000.000đ",
      challenges: [
        {
          id: 1,
          title: "Bài 1: Thuật toán",
          description: "Tối ưu thuật toán sắp xếp",
          maxScore: 100,
          starterCode: "# Bài 1\n\ndef optimized_sort(arr):\n    return arr",
        },
      ],
    },
  };

  const contest = contestsData[slug];

  if (!contest) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-500 mb-4">Không tìm thấy cuộc thi</p>
          <Link to="/contests" className="text-blue-600 hover:underline">
            ← Quay lại danh sách
          </Link>
        </div>
      </div>
    );
  }

  const currentChallenge = contest.challenges[activeChallenge];

  const handleRegister = () => {
    if (!user) {
      alert("Vui lòng đăng nhập để đăng ký");
      window.location.href = "/login";
      return;
    }
    setRegistered(true);
    alert("Đăng ký thành công!");
  };

  const handleSubmit = () => {
    if (!user) {
      alert("Vui lòng đăng nhập để nộp bài");
      window.location.href = "/login";
      return;
    }
    setSubmitting(true);
    setTimeout(() => {
      const mockResult = { totalScore: 75, maxScore: 100 };
      setResult(mockResult);
      alert(`Kết quả: ${mockResult.totalScore}/${mockResult.maxScore} điểm`);
      setSubmitting(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-900 to-purple-900 text-white">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <Link
            to="/contests"
            className="inline-flex items-center gap-2 text-blue-200 hover:text-white mb-4"
          >
            <ArrowLeftIcon className="h-4 w-4" />
            <span>Quay lại danh sách</span>
          </Link>
          <h1 className="text-3xl font-bold mb-4">{contest.title}</h1>
          <p className="text-gray-200 mb-6 max-w-2xl">{contest.description}</p>
          <div className="flex flex-wrap gap-6 text-sm">
            <div className="flex items-center gap-2">
              <CalendarIcon className="h-5 w-5" />
              <span>
                {new Date(contest.startDate).toLocaleDateString("vi-VN")}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <ClockIcon className="h-5 w-5" />
              <span>{contest.duration} phút</span>
            </div>
            <div className="flex items-center gap-2">
              <UsersIcon className="h-5 w-5" />
              <span>{contest.totalParticipants} người</span>
            </div>
            <div className="flex items-center gap-2">
              <TrophyIcon className="h-5 w-5" />
              <span>{contest.prize}</span>
            </div>
          </div>
          {!registered && (
            <button
              onClick={handleRegister}
              className="mt-6 px-6 py-2 bg-yellow-500 text-gray-900 rounded-lg font-semibold hover:bg-yellow-400"
            >
              Đăng ký tham gia →
            </button>
          )}
        </div>
      </div>

      {/* Nội dung */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Danh sách bài thi */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-24">
              <h3 className="font-bold text-lg mb-4">📋 Danh sách bài thi</h3>
              <div className="space-y-3">
                {contest.challenges.map((challenge, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setActiveChallenge(idx);
                      setResult(null);
                      setCode(challenge.starterCode || "");
                    }}
                    className={`w-full text-left p-4 rounded-xl transition-all ${
                      activeChallenge === idx
                        ? "bg-blue-50 border-2 border-blue-500"
                        : "bg-gray-50 hover:bg-gray-100"
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <span className="text-sm text-gray-500">
                          Bài {idx + 1}
                        </span>
                        <h4 className="font-semibold">{challenge.title}</h4>
                      </div>
                      <PlayIcon
                        className={`h-5 w-5 ${activeChallenge === idx ? "text-blue-500" : "text-gray-400"}`}
                      />
                    </div>
                    <p className="text-xs text-gray-400 mt-1">
                      {challenge.maxScore} điểm
                    </p>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Code Editor */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="bg-gray-800 p-4">
                <h3 className="text-white font-semibold">
                  Bài {activeChallenge + 1}: {currentChallenge?.title}
                </h3>
              </div>
              <div className="p-6">
                <div className="mb-6">
                  <h4 className="font-semibold text-gray-900 mb-2">
                    📝 Mô tả:
                  </h4>
                  <p className="text-gray-600">
                    {currentChallenge?.description}
                  </p>
                </div>
                <div className="mb-6">
                  <h4 className="font-semibold text-gray-900 mb-2">
                    💻 Code của bạn:
                  </h4>
                  <textarea
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    placeholder={currentChallenge?.starterCode}
                    className="w-full h-64 font-mono text-sm p-4 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <button
                  onClick={handleSubmit}
                  disabled={submitting}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-xl font-semibold hover:shadow-lg disabled:opacity-50"
                >
                  {submitting ? "⏳ Đang chấm điểm..." : "🚀 Nộp bài"}
                </button>
                {result && (
                  <div
                    className={`mt-4 p-4 rounded-lg ${result.totalScore === result.maxScore ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}`}
                  >
                    <p className="font-semibold">
                      📊 Kết quả: {result.totalScore}/{result.maxScore} điểm
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContestDetail;
