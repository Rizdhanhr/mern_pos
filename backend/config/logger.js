const { createLogger, format, transports } = require("winston");
const { combine, timestamp, printf } = format;
const fs = require("fs-extra");
const path = require("path");

// Fungsi untuk membuat path log berdasarkan tanggal
const getLogPath = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");

  const dir = path.join(__dirname, `../logs/${year}/${month}/${day}`);
  fs.ensureDirSync(dir);
  return path.join(dir, `node.log`);
};

// Format log
const logFormat = printf(({ level, message, timestamp }) => {
  if (typeof message === "object") {
    message = JSON.stringify(message, null, 2); // Format lebih readable
  }
  return `${timestamp} [${level.toUpperCase()}]: ${message}`;
});

// Logger instance
const logger = createLogger({
  format: combine(timestamp({ format: "YYYY-MM-DD HH:mm:ss" }), logFormat),
  transports: [
    new transports.Console(),
    new transports.File({
      filename: getLogPath() // File log untuk error
    })
  ]
});

module.exports = logger;
