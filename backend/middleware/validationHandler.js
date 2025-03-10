const { validationResult } = require("express-validator");
const validationHandler = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    // Jika ada error, kembalikan respons dengan status 422
    return res.status(422).json({
      message: "Validation error",
      errors: errors.array({ onlyFirstError: true })
    });
  }
  next(); // Lanjutkan ke middleware/controller berikutnya jika validasi lolos
};

module.exports = {
  validationHandler
};
