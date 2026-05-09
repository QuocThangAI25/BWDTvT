const mongoose = require("mongoose");

const completedLessonSchema = new mongoose.Schema({
  lessonId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  completedAt: {
    type: Date,
    default: Date.now,
  },
  watchTime: {
    type: Number, // seconds watched
    default: 0,
  },
});

const quizScoreSchema = new mongoose.Schema({
  quizId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  score: Number,
  maxScore: Number,
  attempts: { type: Number, default: 1 },
  completedAt: Date,
});

const noteSchema = new mongoose.Schema({
  lessonId: mongoose.Schema.Types.ObjectId,
  content: String,
  createdAt: { type: Date, default: Date.now },
});

const progressSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    },
    completedLessons: [completedLessonSchema],
    totalLessons: {
      type: Number,
      default: 0,
    },
    progressPercentage: {
      type: Number,
      default: 0,
    },
    lastAccessed: {
      type: Date,
      default: Date.now,
    },
    timeSpent: {
      type: Number, // total seconds
      default: 0,
    },
    quizScores: [quizScoreSchema],
    notes: [noteSchema],
  },
  {
    timestamps: true,
  },
);

// Cập nhật phần trăm tự động
progressSchema.pre("save", function (next) {
  if (this.completedLessons && this.totalLessons > 0) {
    this.progressPercentage =
      (this.completedLessons.length / this.totalLessons) * 100;
  }
  next();
});

module.exports = mongoose.model("Progress", progressSchema);
