const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./src/config/db");

// 1. IMPORT FILE ROUTER CỦA BẠN VÀO ĐÂY
// (Lưu ý: Nếu thư mục routes nằm trong src thì đổi thành "./src/routes/auth")
const authRoutes = require("./src/routes/auth"); 

// Load environment variables
dotenv.config();

// Kết nối database
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ==========================================
// 2. GẮN ROUTE /api/auth VÀO ỨNG DỤNG
// Từ giờ mọi request gửi đến /api/auth/... sẽ được đưa cho file auth.js xử lý
app.use("/api/auth", authRoutes);
// ==========================================

// Routes mặc định
app.get("/", (req, res) => {
  res.json({
    message: "🎓 TvT LMS API Server",
    version: "1.0.0",
    status: "running",
    endpoints: {
      auth: "/api/auth",
      courses: "/api/courses",
      progress: "/api/progress",
      chat: "/api/chat",
    },
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📡 API URL: http://localhost:${PORT}`);
});