import React, { useState } from "react";
import {
  PlayCircleIcon,
  ClockIcon,
  UserGroupIcon,
  StarIcon,
} from "@heroicons/react/24/outline";
import { StarIcon as StarSolidIcon } from "@heroicons/react/24/solid";

const CourseCard = ({ course, type = "ongoing" }) => {
  const [isHovered, setIsHovered] = useState(false);
  const {
    title,
    instructor,
    thumbnail,
    progress,
    duration,
    level,
    students,
    rating = 4.5,
  } = course;

  if (type === "ongoing") {
    return (
      <div
        className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden cursor-pointer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Image Container */}
        <div className="relative overflow-hidden">
          <img
            src={thumbnail}
            alt={title}
            className={`w-full h-52 object-cover transition-transform duration-700 ${isHovered ? "scale-110" : "scale-100"}`}
          />

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

          {/* Progress Bar */}
          <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-gray-200">
            <div
              className="h-full bg-gradient-to-r from-blue-500 to-purple-600 transition-all duration-1000 relative"
              style={{ width: `${progress}%` }}
            >
              <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow-lg"></div>
            </div>
          </div>

          {/* Play Button Overlay */}
          <button
            className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white/90 rounded-full p-4 shadow-xl transition-all duration-300 ${isHovered ? "opacity-100 scale-100" : "opacity-0 scale-75"}`}
          >
            <PlayCircleIcon className="h-8 w-8 text-blue-600" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5">
          <div className="flex items-center justify-between mb-2">
            <span
              className={`text-xs font-semibold px-2 py-1 rounded-full ${
                level === "Cơ bản"
                  ? "bg-green-100 text-green-600"
                  : level === "Trung cấp"
                    ? "bg-yellow-100 text-yellow-600"
                    : "bg-red-100 text-red-600"
              }`}
            >
              {level || "Trung cấp"}
            </span>
            <div className="flex items-center space-x-1">
              <StarIcon className="h-4 w-4 text-yellow-400 fill-current" />
              <span className="text-sm font-semibold text-gray-700">
                {rating}
              </span>
              <span className="text-xs text-gray-500">(2.3k)</span>
            </div>
          </div>

          <h3 className="font-bold text-gray-900 mb-2 line-clamp-2 text-lg group-hover:text-blue-600 transition-colors duration-300">
            {title}
          </h3>

          <p className="text-sm text-gray-600 mb-3 flex items-center space-x-2">
            <UserGroupIcon className="h-4 w-4" />
            <span>{instructor}</span>
          </p>

          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center text-sm text-gray-500">
              <ClockIcon className="h-4 w-4 mr-1" />
              <span>{duration}</span>
            </div>
            <div className="text-sm font-semibold text-blue-600">
              {progress}% hoàn thành
            </div>
          </div>

          <button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-2.5 rounded-xl hover:shadow-lg transform hover:scale-105 transition-all duration-300 font-semibold">
            Tiếp tục học
          </button>
        </div>
      </div>
    );
  }

  // Recommended course card
  return (
    <div
      className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative overflow-hidden">
        <img
          src={thumbnail}
          alt={title}
          className={`w-full h-52 object-cover transition-transform duration-700 ${isHovered ? "scale-110" : "scale-100"}`}
        />

        {/* Discount Badge */}
        <div className="absolute top-3 right-3 bg-gradient-to-r from-red-500 to-orange-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg transform rotate-12">
          -30%
        </div>

        {/* Quick View Button */}
        <button
          className={`absolute bottom-3 left-1/2 transform -translate-x-1/2 bg-white/95 text-gray-800 px-4 py-2 rounded-xl text-sm font-semibold shadow-lg transition-all duration-300 ${isHovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          Xem nhanh
        </button>
      </div>

      <div className="p-5">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-2 py-1 rounded-full">
            Best Seller
          </span>
          <div className="flex items-center space-x-1">
            <StarSolidIcon className="h-4 w-4 text-yellow-400" />
            <span className="text-sm font-semibold">{rating}</span>
          </div>
        </div>

        <h3 className="font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
          {title}
        </h3>

        <p className="text-sm text-gray-500 mb-3">{instructor}</p>

        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center text-sm text-gray-500">
            <ClockIcon className="h-4 w-4 mr-1" />
            <span>{duration}</span>
          </div>
          <div className="flex items-center text-sm text-gray-500">
            <UserGroupIcon className="h-4 w-4 mr-1" />
            <span>{students || "1.2k"} học viên</span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <span className="text-2xl font-bold text-blue-600">399.000đ</span>
            <span className="text-sm text-gray-400 line-through ml-2">
              599.000đ
            </span>
          </div>
          <button className="px-4 py-2 border-2 border-blue-600 text-blue-600 rounded-xl hover:bg-blue-600 hover:text-white transition-all duration-300 font-semibold">
            Đăng ký
          </button>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
