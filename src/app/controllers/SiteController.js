const Course = require('../models/Course');
const bcrypt = require('bcrypt');
const User = require("../models/User");
const {multtipleMongooseToObject} = require('../../unti/mongoose')

class SiteController {
  // [GET] /
  async index(req, res, next) {
    Course.find({})
      .then((courses) => {
        res.render('home', {
           courses : multtipleMongooseToObject(courses)
          });
      })
      .catch(next);
  }
  // [GET] /search
  search(req, res) {
    res.render('search');
  }

  //[GET] / check  login
  async handleLogin(req, res) {
    const { username, password } = req.body;

    try {
      // Tìm người dùng trong cơ sở dữ liệu bằng username
      const user = await User.findOne({ username });

      // Kiểm tra xem người dùng tồn tại và mật khẩu hợp lệ
      if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.json({ code: 400, error: 'Tài khoản hoặc mật khẩu không chính xác.' });
      }

      // Lưu thông tin người dùng vào session để đánh dấu đã đăng nhập
      req.session.user = { id: user._id, username: user.username,avatar:user.avatar };

      res.status(200).json({ code: 200, message: 'Đăng nhập thành công' });
    } catch (error) {
      res.status(500).json({ code: 500, error: 'Đã xảy ra lỗi, vui lòng thử lại.' });
    }
  }
  //POST /Account
  async handleSignup(req, res) {
    const { username, email, password, repassword } = req.body;

    // Kiểm tra các trường dữ liệu có đầy đủ không
    if (!username || !email || !password || !repassword) {
      return res.status(400).json({ error: 'Vui lòng điền đầy đủ thông tin.' });
    }

    // Kiểm tra mật khẩu và mật khẩu xác nhận có khớp không
    if (password !== repassword) {
      return res.status(400).json({ error: 'Mật khẩu không khớp.' });
    }

    // Kiểm tra độ dài mật khẩu
    if (password.length < 6) {
      return res.status(400).json({ error: 'Mật khẩu phải có ít nhất 6 ký tự.' });
    }

    try {
      // Kiểm tra xem email đã tồn tại chưa
      const existingUser = await User.findOne({email})
      if (existingUser) {
          return res.json({ code: 400, error: 'Email đã được sử dụng.' });
      }
      // Mã hóa mật khẩu
      const hashedPassword = await bcrypt.hash(password, 10);
      // Tạo người dùng mới với mật khẩu đã mã hóa
      const newUser = new User({
        username,
        email,
        password: hashedPassword,
      });

      await newUser.save();
      res.status(200).json({code: 200, message: 'Đăng ký thành công' });
    } catch (error) {
      res.status(500).json({ code: 500,error: 'Đã xảy ra lỗi, vui lòng thử lại.' });
    }
  }
  //Account 
   async handleSignupSocial(req, res) {
    const { username, email, avatar } = req.body;

    // Kiểm tra các trường dữ liệu có đầy đủ không
    if (!username || !email || !avatar) {
      return res.status(400).json({ error: 'Vui lòng điền đầy đủ thông tin.' });
    }

    try {
      // Kiểm tra xem email đã tồn tại chưa
      const existingUser = await User.findOne({email})
      if (existingUser) {
          req.session.user = { id: existingUser._id, username: existingUser.username ,avatar:existingUser.avatar};
          return res.json({ code: 200, message: 'Đăng nhập thành công' });
      }
      const newUser = new User({
          username,
          email,
          avatar
      });

      await newUser.save();
      req.session.user = { id: newUser._id, username: newUser.username ,avatar:existingUser.avatar};
      res.status(200).json({code: 200, message: 'Đăng ký thành công' });
      
      
    } catch (error) {
      res.status(500).json({ code: 500,error: 'Đã xảy ra lỗi, vui lòng thử lại.' });
    }
  }

  logout(req,res){
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).json({ code: 500, error: 'Đã xảy ra lỗi, vui lòng thử lại.' });
      }else{
          res.clearCookie('connect.sid'); // Xóa cookie session
          return res.redirect('/');
      }
    });
  }
}

module.exports = new SiteController();
