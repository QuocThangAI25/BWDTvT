const express = require('express');
const router = express.Router();

// BẮT BUỘC IMPORT CÁC THƯ VIỆN & MODEL NÀY KHI DÙNG DATABASE
const User = require('../models/User'); // Import model Database của bạn
const bcrypt = require('bcryptjs');     // Thư viện so sánh mật khẩu
const jwt = require('jsonwebtoken');    // Thư viện tạo Token đăng nhập
const crypto = require('crypto');

// Route xử lý Đăng ký: POST /api/auth/register
router.post('/register', async (req, res) => {
  try {
    // 1. Nhận dữ liệu từ Frontend gửi lên (từ file Register.jsx của bạn)
    const { name, email, password } = req.body;

    // Validate cơ bản (Frontend đã làm rồi nhưng Backend vẫn nên check lại cho chắc)
    if (!name || !email || !password) {
      return res.status(400).json({ success: false, error: 'Vui lòng điền đầy đủ thông tin' });
    }

    // === LOGIC DATABASE CỦA NHÓM (Bạn mở comment và sửa lại theo DB đang dùng) ===
    
    // 2. Kiểm tra xem email đã tồn tại trong DB chưa
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ success: false, error: 'Email đã được sử dụng' });
    }

    // 3. Mã hóa mật khẩu trước khi lưu
    // const salt = await bcrypt.genSalt(10);
    // const hashedPassword = await bcrypt.hash(password, salt);

    // 4. Tạo user mới và lưu vào DB
    user = new User({
      name,
      email,
      password: password
    });
    await user.save();

    // 5. Trả phản hồi thành công về cho Frontend
    // Nếu kết quả trả về có success: true, file Register.jsx của bạn sẽ nhảy về trang chủ ("/")
    res.status(201).json({ 
      success: true, 
      message: 'Đăng ký tài khoản thành công!' 
      // Có thể trả về thêm token ở đây nếu muốn login luôn sau khi đăng ký
    });

  } catch (error) {
    console.error('Lỗi khi đăng ký:', error);
    res.status(500).json({ success: false, error: 'Lỗi Server Backend' });
  }
});

// Route xử lý Đăng nhập: POST /api/auth/login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1. Kiểm tra xem user có nhập đủ email và password không
    if (!email || !password) {
      return res.status(400).json({ success: false, error: 'Vui lòng nhập email và mật khẩu' });
    }

    // === LOGIC DATABASE CỦA NHÓM (Mở comment và sửa lại theo DB đang dùng) ===
    
    // 2. Tìm user trong Database dựa vào email
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      return res.status(400).json({ success: false, error: 'Email hoặc mật khẩu không đúng' });
    }

    // 3. So sánh mật khẩu người dùng nhập với mật khẩu đã mã hóa trong DB
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ success: false, error: 'Email hoặc mật khẩu không đúng' });
    }

    // 4. Tạo JWT Token để Frontend lưu lại (giữ trạng thái đăng nhập)
    // Lưu ý: Cần có biến môi trường JWT_SECRET trong file .env
    const token = jwt.sign(
      { id: user._id, name: user.name }, 
      process.env.JWT_SECRET || 'chuoi_bi_mat_mac_dinh', 
      { expiresIn: '1d' } // Token sống 1 ngày
    );

    // 5. Trả về thành công kèm theo token và thông tin user
    res.json({
      success: true,
      message: 'Đăng nhập thành công',
      token: token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      }
    });
    

  } catch (error) {
    console.error('Lỗi khi đăng nhập:', error);
    res.status(500).json({ success: false, error: 'Lỗi Server Backend' });
  }
});

router.post('/forgot-password', async (req, res) => {
  try {
    const { email } = req.body;
    
    // Tìm user, ép viết thường và xóa khoảng trắng thừa cho chắc chắn
    const cleanEmail = email.trim().toLowerCase();
    const user = await User.findOne({ email: cleanEmail });

    if (!user) {
      return res.status(404).json({ success: false, error: 'Không tìm thấy tài khoản với email này.' });
    }

    // 1. Tạo ra một mã Reset Token ngẫu nhiên
    const resetToken = crypto.randomBytes(20).toString('hex');
    
    // (Lưu ý: Để lưu token vào DB, bạn sẽ cần thêm trường resetPasswordToken vào file models/User.js sau)
    // Tạm thời chúng ta sẽ in thẳng Link ra Terminal để test trước
    const resetUrl = `http://localhost:3000/reset-password/${resetToken}`;

    console.log('===============================');
    console.log('--- LINK ĐỔI MẬT KHẨU CỦA BẠN ---');
    console.log(resetUrl);
    console.log('===============================');
    
    // Báo về Frontend là đã gửi thành công
    res.json({ 
        success: true, 
        message: 'Hướng dẫn đã được gửi! (Vui lòng kiểm tra Terminal Backend để lấy link test)' 
    });

  } catch (error) {
    console.error("Lỗi Quên mật khẩu:", error);
    res.status(500).json({ success: false, error: 'Lỗi server backend' });
  }
});

// ==========================================
// 1. MIDDLEWARE: KIỂM TRA TOKEN HỢP LỆ KHÔNG
// ==========================================
const verifyToken = (req, res, next) => {
  // Lấy token từ header (Frontend đã tự động gắn qua file api.js)
  const token = req.headers.authorization?.split(" ")[1];
  
  if (!token) {
    return res.status(401).json({ success: false, error: "Không tìm thấy Token, vui lòng đăng nhập lại" });
  }

  try {
    // Giải mã token xem có đúng không
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'chuoi_bi_mat_mac_dinh');
    req.user = decoded; // Lưu id user vào req để dùng ở API dưới
    next();
  } catch (error) {
    return res.status(401).json({ success: false, error: "Token không hợp lệ hoặc đã hết hạn" });
  }
};

// ==========================================
// 2. ROUTE: LẤY THÔNG TIN USER HIỆN TẠI (GET /api/auth/me)
// ==========================================
router.get('/me', verifyToken, async (req, res) => {
  try {
    // Tìm user trong database dựa vào id đã giải mã từ token
    const user = await User.findById(req.user.id);
    
    if (!user) {
      return res.status(404).json({ success: false, error: "Không tìm thấy thông tin người dùng" });
    }

    // Trả thông tin về cho Frontend (KHÔNG trả về password)
    res.json({
      success: true,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
        points: user.points || 0
      }
    });

  } catch (error) {
    console.error("Lỗi lấy thông tin /me:", error);
    res.status(500).json({ success: false, error: "Lỗi Server Backend" });
  }
});

module.exports = router;