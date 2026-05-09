const mongoose = require("mongoose");

const enrollmentSchema = new mongoose.Schema(
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
    status: {
      type: String,
      enum: ["pending", "active", "completed", "cancelled"],
      default: "pending",
    },
    payment: {
      amount: Number,
      method: {
        type: String,
        enum: ["momo", "vnpay", "credit_card", "bank_transfer"],
      },
      transactionId: String,
      status: {
        type: String,
        enum: ["pending", "completed", "failed", "refunded"],
        default: "pending",
      },
      paidAt: Date,
    },
    enrolledAt: {
      type: Date,
      default: Date.now,
    },
    completedAt: Date,
    expiryDate: Date,
    certificate: {
      issued: { type: Boolean, default: false },
      issuedAt: Date,
      certificateUrl: String,
    },
  },
  {
    timestamps: true,
  },
);

// Đảm bảo mỗi user chỉ đăng ký 1 course 1 lần
enrollmentSchema.index({ user: 1, course: 1 }, { unique: true });

module.exports = mongoose.model("Enrollment", enrollmentSchema);
