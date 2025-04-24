const logger = require("../config/logger");
const errorMiddleware = (err, req, res, next) => {
  logger.error(`
    [ERROR]
    URL     : ${req.originalUrl}
    Method  : ${req.method}
    Status  : ${res.statusCode}
    Message : ${err.message}
    Stack   : ${err.stack}
  `);

  const statusCode = err.status || 500;
  const env = process.env.NODE_ENV || "development";
  const errorResponse = {
    success: false,
    message: err.message || "Something went wrong"
  };

  if (env === "development") {
    errorResponse.stack = err.stack;
  }

  return res.status(statusCode).json(errorResponse);
};

module.exports = errorMiddleware;
