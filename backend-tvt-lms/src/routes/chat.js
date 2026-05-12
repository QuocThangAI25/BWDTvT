const express = require("express");
const router = express.Router();

router.post("/send", async (req, res) => {
  try {
    const { message } = req.body;
    console.log("📨 Message:", message);
    const now = new Date();
    const today = now.toLocaleDateString("vi-VN", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    const time = now.toLocaleTimeString("vi-VN");

    // Prompt cho phép AI trả lời mọi câu hỏi
    const systemPrompt = `Hôm nay là ${today}. Bây giờ là ${time}.
    Bạn là trợ lý AI thông minh của TvT Learn.
Bạn có thể trả lời MỌI CÂU HỎI về:
- Mọi lĩnh vực (thời gian, khoa học, đời sống, giải trí...)
- Tư vấn khóa học của TvT Learn (React, Python, Data Science, UI/UX, Machine Learning)

QUY TẮC:
- Trả lời tự nhiên, thân thiện, hữu ích
- Nếu hỏi về khóa học TvT: giới thiệu chi tiết
- Nếu hỏi về chủ đề khác: trả lời bình thường như AI assistant
- KHÔNG được nói "Tôi chỉ biết về TvT"

DANH SÁCH KHÓA HỌC TVT:
- React & Next.js Mastery: 25h, 499.000đ
- Python for Data Science: 40h, 599.000đ
- UI/UX Design: 15h, 399.000đ
- Machine Learning: 35h, 799.000đ

Câu hỏi: ${message}

Trả lời:`;

    const response = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=" +
        process.env.GEMINI_API_KEY,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: systemPrompt }] }],
          generationConfig: {
            maxOutputTokens: 1000,
            temperature: 0.8,
          },
        }),
      },
    );

    const data = await response.json();
    let aiResponse =
      data.candidates?.[0]?.content?.parts?.[0]?.text ||
      "Xin lỗi, tôi chưa hiểu câu hỏi của bạn.";

    res.json({ success: true, response: aiResponse });
  } catch (error) {
    console.error("Error:", error);
    res.json({
      success: true,
      response: "Xin lỗi, AI đang bận. Thử lại sau 🙏",
    });
  }
});

module.exports = router;
