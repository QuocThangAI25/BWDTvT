import React, { useState } from 'react';

const CourseDetail = () => {
  // Dữ liệu mẫu (sau này bạn fetch từ API)
  const courseData = {
    title: "Khóa học Web Development",
    milestones: [
      {
        id: 1,
        title: "Bài 1: Giới thiệu tổng quan",
        videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
        desc: "Nắm bắt những khái niệm cốt lõi trước khi bắt đầu thực hành dự án thực tế."
      },
      {
        id: 2,
        title: "Bài 2: Thiết lập môi trường",
        videoUrl: "https://vjs.zencdn.net/v/oceans.mp4",
        desc: "Hướng dẫn cài đặt các công cụ cần thiết cho việc phát triển."
      },
      {
        id: 3,
        title: "Bài 3: Xây dựng cơ sở dữ liệu",
        videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
        desc: "Thiết kế các bảng và mối quan hệ trong database."
      }
    ]
  };

  // State lưu trữ bài học đang được chọn, mặc định là bài đầu tiên
  const [activeLesson, setActiveLesson] = useState(courseData.milestones[0]);

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-6 bg-white rounded-xl shadow-lg overflow-hidden">
        
        {/* Khu vực Video (Bên trái) */}
        <div className="w-full md:w-2/3 bg-black flex flex-col">
          <video 
            key={activeLesson.videoUrl} // Key giúp React render lại video khi đổi URL
            className="w-full max-h-[500px] outline-none" 
            controls 
            autoPlay
          >
            <source src={activeLesson.videoUrl} type="video/mp4" />
            Trình duyệt của bạn không hỗ trợ thẻ video.
          </video>
          
          <div className="p-6 bg-white flex-grow">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              {activeLesson.title}
            </h2>
            <p className="text-gray-600">
              {activeLesson.desc}
            </p>
          </div>
        </div>

        {/* Khu vực Lộ trình / Danh sách bài học (Bên phải) */}
        <div className="w-full md:w-1/3 bg-gray-50 flex flex-col border-t md:border-t-0 md:border-l border-gray-200">
          <div className="p-5 bg-white border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-800">Lộ trình học tập</h3>
          </div>
          
          <ul className="flex-1 overflow-y-auto max-h-[500px]">
            {courseData.milestones.map((lesson, index) => (
              <li 
                key={lesson.id}
                onClick={() => setActiveLesson(lesson)}
                className={`flex items-center p-4 cursor-pointer transition-colors border-b border-gray-100 hover:bg-gray-100 
                  ${activeLesson.id === lesson.id ? 'bg-blue-50 border-l-4 border-l-blue-600' : 'border-l-4 border-l-transparent'}
                `}
              >
                <span className={`flex justify-center items-center min-w-[30px] h-[30px] rounded-full mr-4 text-sm font-bold
                  ${activeLesson.id === lesson.id ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'}
                `}>
                  {index + 1}
                </span>
                <span className={`text-sm ${activeLesson.id === lesson.id ? 'font-semibold text-blue-800' : 'text-gray-700'}`}>
                  {lesson.title}
                </span>
              </li>
            ))}
          </ul>
        </div>

      </div>
    </div>
  );
};

export default CourseDetail;