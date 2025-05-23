const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const logger = require("../config/logger");

class AuthController {
  static async login(req, res, next) {
    try {
      const { email, password } = req.body;
      const user = await User.scope("withPassword").findOne({
        where: { email }
      });
      const failedResponse = {
        success: false,
        message: "These credentials doesn't match our records."
      };

      if (!user) return res.status(404).json(failedResponse);

      const isValidPassword = await bcrypt.compare(password, user.password);
      if (!isValidPassword) return res.status(404).json(failedResponse);

      const payload = {
        id: user.id,
        name: user.name,
        email: user.email
      };

      const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "120m"
      });
      const refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {
        expiresIn: "1d"
      });

      // res.cookie("refreshToken", refreshToken, {
      //   httpOnly: true,
      //   secure: process.env.NODE_MODE === "production",
      //   sameSite: process.env.NODE_ENV === "production" ? "Strict" : "Lax",
      //   maxAge: 7 * 24 * 60 * 60 * 1000
      // });

      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_MODE === "server",
        sameSite: process.env.NODE_ENV === "server" ? "None" : "Lax",
        maxAge: 7 * 24 * 60 * 60 * 1000
      });

      return res
        .status(200)
        .json({ success: true, data: payload, token: accessToken });
    } catch (error) {
      next(error);
    }
  }

  static async refreshToken(req, res, next) {
    try {
      const refreshToken = req.cookies.refreshToken;
      if (!refreshToken) {
        return res.status(401).json({
          success: false,
          message: "Refresh token is required."
        });
      }

      jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        (err, user) => {
          if (err) {
            return res.status(401).json({
              success: false,
              message: "Invalid token."
            });
          }

          const payload = { id: user.id, name: user.name, email: user.email };
          const accessToken = jwt.sign(
            payload,
            process.env.ACCESS_TOKEN_SECRET,
            {
              expiresIn: "120m"
            }
          );

          return res.status(200).json({ success: true, token: accessToken });
        }
      );
    } catch (error) {
      next(error);
    }
  }
}

module.exports = AuthController;
