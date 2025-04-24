const { validationResult } = require("express-validator");
const validationMiddleware = (req, res, next) => {
  const errors = validationResult(req).array({ onlyFirstError: true });
  if (req.validationErrors) {
    errors.push(...req.validationErrors);
  }

  if (errors.length > 0) {
    return res.status(422).json({ message: "Validation error", errors });
  }

  next();
};

module.exports = validationMiddleware;
