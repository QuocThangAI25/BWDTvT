const mongoose = require("mongoose");

const lessonSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  videoUrl: {
    type: String,
    required: true,
  },
  duration: {
    type: Number, // minutes
    default: 0,
  },
  isFree: {
    type: Boolean,
    default: false,
  },
  order: {
    type: Number,
    default: 0,
  },
  description: String,
  resources: [
    {
      name: String,
      url: String,
    },
  ],
});

const sectionSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  order: {
    type: Number,
    default: 0,
  },
  lessons: [lessonSchema],
});

const courseSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Vui lòng nhập tên khóa học"],
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      required: [true, "Vui lòng nhập mô tả"],
    },
    shortDescription: {
      type: String,
      maxlength: 200,
    },
    instructor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    thumbnail: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    discountPrice: {
      type: Number,
      default: 0,
    },
    level: {
      type: String,
      enum: ["beginner", "intermediate", "advanced"],
      default: "beginner",
    },
    category: {
      type: String,
      required: true,
    },
    tags: [String],
    sections: [sectionSchema],
    totalLessons: {
      type: Number,
      default: 0,
    },
    totalDuration: {
      type: Number,
      default: 0,
    },
    totalStudents: {
      type: Number,
      default: 0,
    },
    rating: {
      type: Number,
      default: 0,
    },
    ratingCount: {
      type: Number,
      default: 0,
    },
    whatYouWillLearn: [String],
    requirements: [String],
    status: {
      type: String,
      enum: ["draft", "pending", "approved", "rejected"],
      default: "pending",
    },
  },
  {
    timestamps: true,
  },
);

// Tính tổng số bài học trước khi lưu
courseSchema.pre("save", function (next) {
  let totalLessons = 0;
  let totalDuration = 0;

  this.sections.forEach((section) => {
    totalLessons += section.lessons.length;
    section.lessons.forEach((lesson) => {
      totalDuration += lesson.duration;
    });
  });

  this.totalLessons = totalLessons;
  this.totalDuration = totalDuration;
  next();
});

module.exports = mongoose.model("Course", courseSchema);
