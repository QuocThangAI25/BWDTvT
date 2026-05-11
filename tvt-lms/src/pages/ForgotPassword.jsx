import React, { useState } from "react";
import { EnvelopeIcon, ArrowLeftIcon, KeyIcon } from "@heroicons/react/24/outline";
import api from "../services/api";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setMessage("");

    try {
      // Gọi API quên mật khẩu
      const response = await api.post("/auth/forgot-password", { email });
      setMessage(response.data.message || "Đã gửi hướng dẫn khôi phục qua email của bạn.");
    } catch (err) {
      setError(err.response?.data?.error || "Không tìm thấy tài khoản với email này.");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <a href="/login" className="inline-flex items-center space-x-2 text-gray-400 hover:text-white mb-6 transition-colors">
          <ArrowLeftIcon className="h-4 w-4" />
          <span>Quay lại đăng nhập</span>
        </a>

        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center p-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl mb-4">
            <KeyIcon className="h-10 w-10 text-white" />
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            Khôi phục mật khẩu
          </h1>
          <p className="text-gray-400 mt-2">Nhập email để nhận liên kết đặt lại mật khẩu</p>
        </div>

        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 shadow-2xl border border-white/20">
          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <div className="bg-red-500/20 border border-red-500 text-red-300 rounded-xl p-3 text-sm">{error}</div>
            )}
            {message && (
              <div className="bg-green-500/20 border border-green-500 text-green-300 rounded-xl p-3 text-sm">{message}</div>
            )}

            <div>
              <label className="block text-gray-300 text-sm font-medium mb-2">Email của bạn</label>
              <div className="relative">
                <EnvelopeIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full pl-10 pr-4 py-3 bg-white/5 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-all"
                  placeholder="example@email.com"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-xl font-semibold hover:shadow-lg transform hover:scale-[1.02] transition-all duration-300 disabled:opacity-50"
            >
              {loading ? "Đang xử lý..." : "Gửi yêu cầu"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;