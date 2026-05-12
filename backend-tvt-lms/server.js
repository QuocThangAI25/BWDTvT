const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./src/config/db");

// Load environment variables
dotenv.config();

// Kết nối database
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Logger middleware - để xem request
app.use((req, res, next) => {
  console.log(`📡 [${new Date().toLocaleTimeString()}] ${req.method} ${req.url}`);
  next();
});

// ========== ROUTES ==========
app.use("/api/auth", require("./src/routes/auth"));
app.use("/api/chat", require("./src/routes/chat"));
// app.use("/api/courses", require("./src/routes/courses"));
// app.use("/api/progress", require("./src/routes/progress"));

// Home route
app.get("/", (req, res) => {
  res.json({
    message: "🎓 TvT LMS API Server",
    version: "1.0.0",
    status: "running",
    endpoints: {
      auth: "/api/auth",
      chat: "/api/chat",
    },
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error("❌ Error:", err.stack);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

// ========== START SERVER ==========
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📡 API URL: http://localhost:${PORT}`);
  console.log(`✅ Chat API: http://localhost:${PORT}/api/chat`);
});
