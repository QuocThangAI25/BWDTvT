const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
  role: {
    type: String,
    enum: ["user", "assistant"],
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  recommendedCourses: [
    {
      courseId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course",
      },
      relevance: Number,
    },
  ],
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

const chatHistorySchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    sessionId: {
      type: String,
      required: true,
    },
    messages: [messageSchema],
    context: {
      interests: [String],
      level: String,
      lastRecommendations: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Course",
        },
      ],
    },
  },
  {
    timestamps: true,
  },
);

// Tạo index cho tìm kiếm nhanh
chatHistorySchema.index({ user: 1, sessionId: 1 });
chatHistorySchema.index({ createdAt: -1 });

module.exports = mongoose.model("ChatHistory", chatHistorySchema);
