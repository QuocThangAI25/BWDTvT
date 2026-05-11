import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000/api";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
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
  (error) => Promise.reject(error),
);

// ========== CONTEST APIS ==========
export const getContests = (params) => api.get("/contests", { params });
export const getContestBySlug = (slug) => api.get(`/contests/${slug}`);
export const registerContest = (contestId) =>
  api.post(`/contests/${contestId}/register`);
export const submitChallenge = (contestId, data) =>
  api.post(`/contests/${contestId}/submit`, data);
export const getLeaderboard = (contestId) =>
  api.get(`/contests/${contestId}/leaderboard`);

export default api;
