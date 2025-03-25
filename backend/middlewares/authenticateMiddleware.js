const jwt = require("jsonwebtoken");
const authenticateMiddleware = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res
        .status(401)
        .json({ message: "Unauthorized: Token missing or malformed" });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
  // const authHeader = req.headers["authorization"];
  // const token = authHeader && authHeader.split(" ")[1]; // Format "Bearer TOKEN"
  // if (!token) {
  //   return res.status(401).json({ message: "Access token is missing" });
  // }
  // jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
  //   if (err) {
  //     return res.status(401).json({ message: "Invalid or expired token" });
  //   }
  //   req.user = user;
  //   next();
  // });
};

module.exports = authenticateMiddleware;
