const logger = require("../config/logger");
const errorHandler = (err, req, res, next) => {
  logger.error(`Error: ${err.message}, Stack: ${err.stack}`);
  const statusCode = err.status || 500;
  const env = process.env.NODE_ENV || "development";
  const errorResponse = {
    success: false,
    message: err.message || "Something went wrong",
    ...(env === "development" && { stack: err.stack })
  };
  return res.status(statusCode).json(errorResponse);
};

module.exports = errorHandler;
