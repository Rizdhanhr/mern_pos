const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

async function authLogin(req, res, next) {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "These credentials doesn't match our records."
      });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(404).json({
        success: false,
        message: "These credentials doesn't match our records."
      });
    }

    const payload = {
      id: user.id,
      name: user.name,
      email: user.email
    };

    const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: "10m"
    });
    const refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {
      expiresIn: "7d"
    });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // hanya kirim cookie jika di HTTPS
      sameSite: process.env.NODE_ENV === "production" ? "Strict" : "Lax", // Mencegah CSRF
      maxAge: 7 * 24 * 60 * 60 * 1000 // 7 hari
    });

    return res
      .status(200)
      .json({ success: true, data: payload, token: accessToken });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  authLogin
};
