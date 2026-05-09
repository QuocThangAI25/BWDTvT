// test-db.js - Chạy thử database cho TvT LMS

const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

// Import models (cần phải có các file này trước)
const User = require("./src/models/User");
const Course = require("./src/models/Course");
const Enrollment = require("./src/models/Enrollment");
const Progress = require("./src/models/Progress");

async function testDatabase() {
  console.log("\n🚀 BẮT ĐẦU TEST DATABASE TVT LMS\n");
  console.log("═".repeat(50));

  try {
    // Bước 1: Kết nối MongoDB
    console.log("📡 Bước 1: Kết nối MongoDB...");

    if (!process.env.MONGODB_URI) {
      throw new Error("❌ Chưa có MONGODB_URI trong file .env");
    }

    await mongoose.connect(process.env.MONGODB_URI);
    console.log("✅ Kết nối database thành công!");

    // Bước 2: Xóa dữ liệu cũ (để test sạch)
    console.log("\n📡 Bước 2: Xóa dữ liệu cũ...");
    await User.deleteMany({ email: /test@tvt.edu/ });
    await Course.deleteMany({ slug: /test-course/ });
    console.log("✅ Đã xóa dữ liệu test cũ");

    // Bước 3: Tạo user mới
    console.log("\n📡 Bước 3: Tạo user test...");
    const newUser = new User({
      name: "Nguyễn Văn Test",
      email: "test@tvt.edu",
      password: "123456",
      role: "student",
      points: 100,
      streak: 5,
      settings: {
        emailNotifications: true,
        darkMode: false,
        language: "vi",
      },
    });

    const savedUser = await newUser.save();
    console.log("✅ Đã tạo user:");
    console.log(`   - ID: ${savedUser._id}`);
    console.log(`   - Tên: ${savedUser.name}`);
    console.log(`   - Email: ${savedUser.email}`);
    console.log(`   - Vai trò: ${savedUser.role}`);

    // Bước 4: Tạo khóa học mẫu
    console.log("\n📡 Bước 4: Tạo khóa học test...");
    const newCourse = new Course({
      title: "Test Course - React & Next.js Mastery",
      slug: "test-course-react-nextjs",
      description:
        "Đây là khóa học test để kiểm tra database. Khóa học về React và Next.js từ cơ bản đến nâng cao.",
      shortDescription: "Khóa học React chuyên sâu",
      instructor: savedUser._id,
      thumbnail:
        "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400",
      price: 499000,
      discountPrice: 399000,
      level: "intermediate",
      category: "programming",
      tags: ["react", "nextjs", "javascript", "frontend"],
      whatYouWillLearn: [
        "Xây dựng ứng dụng React chuyên nghiệp",
        "Tối ưu hiệu suất với Next.js",
        "Xử lý authentication",
        "Deploy lên Vercel",
      ],
      requirements: [
        "Biết HTML, CSS, JavaScript cơ bản",
        "Có máy tính cài Node.js",
      ],
      sections: [
        {
          title: "React Cơ bản",
          order: 1,
          lessons: [
            {
              title: "Giới thiệu về React",
              videoUrl: "https://example.com/react-intro.mp4",
              duration: 15,
              isFree: true,
              order: 1,
              description: "Tìm hiểu React là gì và tại sao nên học",
            },
            {
              title: "JSX và Components",
              videoUrl: "https://example.com/jsx.mp4",
              duration: 25,
              isFree: false,
              order: 2,
            },
          ],
        },
        {
          title: "React Nâng cao",
          order: 2,
          lessons: [
            {
              title: "Hooks",
              videoUrl: "https://example.com/hooks.mp4",
              duration: 30,
              isFree: false,
              order: 1,
            },
          ],
        },
      ],
    });

    const savedCourse = await newCourse.save();
    console.log("✅ Đã tạo khóa học:");
    console.log(`   - ID: ${savedCourse._id}`);
    console.log(`   - Tên: ${savedCourse.title}`);
    console.log(`   - Số bài học: ${savedCourse.totalLessons}`);
    console.log(`   - Thời lượng: ${savedCourse.totalDuration} phút`);

    // Bước 5: Tạo đăng ký học (enrollment)
    console.log("\n📡 Bước 5: Tạo đăng ký học...");
    const newEnrollment = new Enrollment({
      user: savedUser._id,
      course: savedCourse._id,
      status: "active",
      payment: {
        amount: 399000,
        method: "momo",
        transactionId: "TEST_TXN_001",
        status: "completed",
        paidAt: new Date(),
      },
      enrolledAt: new Date(),
      expiryDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000), // 1 năm sau
    });

    const savedEnrollment = await newEnrollment.save();
    console.log("✅ Đã tạo đăng ký học:");
    console.log(`   - ID: ${savedEnrollment._id}`);
    console.log(`   - Trạng thái: ${savedEnrollment.status}`);

    // Bước 6: Tạo tiến độ học tập
    console.log("\n📡 Bước 6: Tạo tiến độ học tập...");
    const newProgress = new Progress({
      user: savedUser._id,
      course: savedCourse._id,
      totalLessons: savedCourse.totalLessons,
      completedLessons: [
        {
          lessonId: savedCourse.sections[0].lessons[0]._id,
          completedAt: new Date(),
          watchTime: 900, // 15 phút
        },
      ],
      timeSpent: 900,
      progressPercentage: (1 / savedCourse.totalLessons) * 100,
      lastAccessed: new Date(),
    });

    const savedProgress = await newProgress.save();
    console.log("✅ Đã tạo tiến độ học tập:");
    console.log(`   - ID: ${savedProgress._id}`);
    console.log(
      `   - Hoàn thành: ${savedProgress.completedLessons.length}/${savedProgress.totalLessons} bài`,
    );
    console.log(
      `   - Tiến độ: ${savedProgress.progressPercentage.toFixed(1)}%`,
    );

    // Bước 7: Kiểm tra dữ liệu vừa tạo
    console.log("\n📡 Bước 7: Kiểm tra dữ liệu...");

    // Tìm user và populate courses
    const userWithCourses = await User.findById(savedUser._id).populate(
      "enrolledCourses",
    );

    console.log("✅ User với khóa học đã đăng ký:");
    console.log(`   - Tên: ${userWithCourses.name}`);
    console.log(`   - Điểm: ${userWithCourses.points}`);
    console.log(`   - Streak: ${userWithCourses.streak} ngày`);

    // Tìm khóa học và populate instructor
    const courseWithInstructor = await Course.findById(
      savedCourse._id,
    ).populate("instructor", "name email");

    console.log("✅ Chi tiết khóa học:");
    console.log(`   - Tên: ${courseWithInstructor.title}`);
    console.log(`   - Giảng viên: ${courseWithInstructor.instructor?.name}`);
    console.log(`   - Số học viên: ${courseWithInstructor.totalStudents}`);

    // Bước 8: Thống kê
    console.log("\n📊 Bước 8: Thống kê database:");
    const userCount = await User.countDocuments();
    const courseCount = await Course.countDocuments();
    const enrollmentCount = await Enrollment.countDocuments();
    const progressCount = await Progress.countDocuments();

    console.log(`   - Tổng số users: ${userCount}`);
    console.log(`   - Tổng số courses: ${courseCount}`);
    console.log(`   - Tổng số enrollments: ${enrollmentCount}`);
    console.log(`   - Tổng số progress: ${progressCount}`);

    // Bước 9: Test tìm kiếm
    console.log("\n📡 Bước 9: Test tìm kiếm...");

    // Tìm khóa học theo category
    const programmingCourses = await Course.find({ category: "programming" });
    console.log(`   - Khóa học lập trình: ${programmingCourses.length} khóa`);

    // Tìm user theo role
    const students = await User.find({ role: "student" });
    console.log(`   - Số học viên: ${students.length}`);

    console.log("\n" + "═".repeat(50));
    console.log("🎉 TEST DATABASE HOÀN TẤT! MỌI THỨ ĐỀU HOẠT ĐỘNG TỐT");
    console.log("═".repeat(50) + "\n");
  } catch (error) {
    console.error("\n❌ LỖI TRONG QUÁ TRÌNH TEST:");
    console.error(`   ${error.message}`);
    console.error("\n📌 Kiểm tra lại:");
    console.error("   1. Đã cài đặt mongoose chưa? (npm install mongoose)");
    console.error("   2. File .env đã có MONGODB_URI chưa?");
    console.error("   3. Các model đã được tạo đúng chưa?");
    console.error("   4. Kết nối internet có ổn không?\n");
  } finally {
    // Ngắt kết nối database
    await mongoose.disconnect();
    console.log("🔌 Đã ngắt kết nối database\n");
  }
}

// Chạy hàm test
testDatabase();
