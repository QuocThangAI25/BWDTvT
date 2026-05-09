import React, { useState, useRef, useEffect } from "react";
import {
  ChatBubbleLeftRightIcon,
  XMarkIcon,
  PaperAirplaneIcon,
  SparklesIcon,
  MicrophoneIcon,
  FaceSmileIcon,
} from "@heroicons/react/24/outline";

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: "bot",
      text: "Xin chào! Tôi là trợ lý ảo thông minh của TvT. Tôi có thể giúp gì cho bạn hôm nay? 🎓✨",
      timestamp: new Date(),
    },
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    const userMessage = {
      id: messages.length + 1,
      type: "user",
      text: inputMessage,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMessage]);
    setInputMessage("");
    setIsTyping(true);

    setTimeout(() => {
      const responses = [
        "Cảm ơn bạn đã quan tâm! TvT có hơn 200+ khóa học chất lượng cao. Bạn muốn học lĩnh vực nào? 🚀",
        "Tuyệt vời! Theo sở thích của bạn, tôi đề xuất khóa học React & Next.js. Bạn có muốn xem chi tiết không? 💡",
        "Chúng tôi có khóa học phù hợp với trình độ của bạn. Hãy xem danh sách đề xuất ở trang chủ nhé! 🌟",
      ];
      const botMessage = {
        id: messages.length + 2,
        type: "bot",
        text: responses[Math.floor(Math.random() * responses.length)],
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMessage]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <>
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 group"
        >
          <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full blur opacity-75 group-hover:opacity-100 transition duration-300 animate-pulse"></div>
          <div className="relative bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-transform duration-300">
            <ChatBubbleLeftRightIcon className="h-6 w-6" />
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center animate-bounce">
              1
            </span>
          </div>
        </button>
      )}

      {isOpen && (
        <div className="fixed bottom-6 right-6 w-96 h-[600px] bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-2xl flex flex-col z-50 border border-gray-200 animate-slide-up overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <div className="absolute inset-0 bg-white rounded-full blur-md opacity-50 animate-pulse"></div>
                  <SparklesIcon className="relative h-8 w-8 text-white" />
                </div>
                <div>
                  <h3 className="text-white font-bold">TvT AI Assistant</h3>
                  <p className="text-blue-100 text-xs flex items-center">
                    <span className="inline-block w-2 h-2 bg-green-400 rounded-full mr-1 animate-pulse"></span>
                    Online • Tư vấn miễn phí
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white hover:bg-white/20 rounded-lg p-1 transition-colors"
              >
                <XMarkIcon className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.type === "user" ? "justify-end" : "justify-start"} animate-fadeInUp`}
              >
                <div
                  className={`max-w-[80%] ${msg.type === "user" ? "order-2" : "order-1"}`}
                >
                  <div className="flex items-start space-x-2">
                    {msg.type === "bot" && (
                      <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg">
                        <SparklesIcon className="h-4 w-4 text-white" />
                      </div>
                    )}
                    <div
                      className={`rounded-2xl p-3 ${
                        msg.type === "user"
                          ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg"
                          : "bg-white text-gray-800 shadow-md border border-gray-100"
                      }`}
                    >
                      <p className="text-sm">{msg.text}</p>
                      <span
                        className={`text-xs mt-1 block ${msg.type === "user" ? "text-blue-100" : "text-gray-400"}`}
                      >
                        {msg.timestamp.toLocaleTimeString()}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start animate-fadeInUp">
                <div className="bg-white rounded-2xl p-3 shadow-md">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                    <div
                      className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                      style={{ animationDelay: "0.2s" }}
                    />
                    <div
                      className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                      style={{ animationDelay: "0.4s" }}
                    />
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 border-t border-gray-200 bg-white">
            <div className="flex items-center space-x-2">
              <button className="p-2 text-gray-400 hover:text-blue-600 transition-colors">
                <FaceSmileIcon className="h-5 w-5" />
              </button>
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                placeholder="Nhập câu hỏi của bạn..."
                className="flex-1 border border-gray-300 rounded-xl p-2 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              />
              <button
                onClick={handleSendMessage}
                disabled={!inputMessage.trim()}
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-2 rounded-xl hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <PaperAirplaneIcon className="h-5 w-5" />
              </button>
            </div>
            <p className="text-xs text-center text-gray-400 mt-2">
              ✨ TvT AI gợi ý khóa học phù hợp với bạn
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default Chatbot;
