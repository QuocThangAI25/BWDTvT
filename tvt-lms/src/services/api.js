import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000/api";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 30000,
});

// Interceptor thêm token vào header
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    console.error("Request interceptor error:", error);
    return Promise.reject(error);
  },
);

// Interceptor xử lý response
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  },
);

// ========== AUTH APIS ==========
export const register = (userData) => api.post("/auth/register", userData);
export const login = (email, password) =>
  api.post("/auth/login", { email, password });
export const getCurrentUser = () => api.get("/auth/me");
export const forgotPassword = (email) =>
  api.post("/auth/forgot-password", { email });
export const resetPassword = (token, password) =>
  api.post("/auth/reset-password", { token, password });

// ========== COURSE APIS ==========
export const getCourses = (params) => api.get("/courses", { params });
export const getCourseBySlug = (slug) => api.get(`/courses/${slug}`);
export const getMyCourses = () => api.get("/courses/my-courses");
export const enrollCourse = (courseId) =>
  api.post(`/courses/${courseId}/enroll`);
export const getCourseProgress = (courseId) =>
  api.get(`/courses/${courseId}/progress`);
export const updateProgress = (courseId, lessonId, data) =>
  api.put(`/courses/${courseId}/progress/${lessonId}`, data);

// ========== CONTEST APIS ==========
export const getContests = (params) => api.get("/contests", { params });
export const getContestBySlug = (slug) => api.get(`/contests/${slug}`);
export const registerContest = (contestId) =>
  api.post(`/contests/${contestId}/register`);
export const submitChallenge = (contestId, data) =>
  api.post(`/contests/${contestId}/submit`, data);
export const getLeaderboard = (contestId) =>
  api.get(`/contests/${contestId}/leaderboard`);

// ========== CHAT APIS ==========
export const sendChatMessage = (message, history = []) =>
  api.post("/chat/send", { message, history });
export const getChatHistory = () => api.get("/chat/history");
export const getChatSuggestions = () => api.get("/chat/suggestions");
export const getChatStatus = () => api.get("/chat/status");

// ========== USER APIS ==========
export const updateProfile = (userData) => api.put("/users/profile", userData);
export const updateAvatar = (formData) =>
  api.put("/users/avatar", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
export const getUserStats = () => api.get("/users/stats");
export const getNotifications = () => api.get("/users/notifications");
export const markNotificationRead = (id) =>
  api.put(`/users/notifications/${id}/read`);
export const markAllNotificationsRead = () =>
  api.put("/users/notifications/read-all");

// ========== PAYMENT APIS ==========
export const createPayment = (courseId, method) =>
  api.post("/payments/create", { courseId, method });
export const verifyPayment = (paymentId, transactionId) =>
  api.post("/payments/verify", { paymentId, transactionId });
export const getPaymentHistory = () => api.get("/payments/history");

// ========== REVIEW APIS ==========
export const getCourseReviews = (courseId) =>
  api.get(`/reviews/course/${courseId}`);
export const addReview = (courseId, rating, comment) =>
  api.post("/reviews", { courseId, rating, comment });
export const updateReview = (reviewId, rating, comment) =>
  api.put(`/reviews/${reviewId}`, { rating, comment });
export const deleteReview = (reviewId) => api.delete(`/reviews/${reviewId}`);

// ========== ADMIN APIS ==========
export const getAllUsers = (params) => api.get("/admin/users", { params });
export const updateUserRole = (userId, role) =>
  api.put(`/admin/users/${userId}/role`, { role });
export const deleteUser = (userId) => api.delete(`/admin/users/${userId}`);
export const getAllCourses = (params) => api.get("/admin/courses", { params });
export const approveCourse = (courseId) =>
  api.put(`/admin/courses/${courseId}/approve`);
export const rejectCourse = (courseId, reason) =>
  api.put(`/admin/courses/${courseId}/reject`, { reason });
export const deleteCourse = (courseId) =>
  api.delete(`/admin/courses/${courseId}`);
export const getDashboardStats = () => api.get("/admin/stats");

// ========== UPLOAD APIS ==========
export const uploadImage = (file) => {
  const formData = new FormData();
  formData.append("image", file);
  return api.post("/upload/image", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

export const uploadVideo = (file, onProgress) => {
  const formData = new FormData();
  formData.append("video", file);
  return api.post("/upload/video", formData, {
    headers: { "Content-Type": "multipart/form-data" },
    onUploadProgress: (progressEvent) => {
      if (onProgress) {
        const percent = Math.round(
          (progressEvent.loaded * 100) / progressEvent.total,
        );
        onProgress(percent);
      }
    },
  });
};

export default api;
