const { body } = require('express-validator');

// Middleware validasi
const loginValidator = [
    body('email').notEmpty().withMessage('Email is required.').isEmail().withMessage('Invalid email format.'),
    body('password').notEmpty().withMessage('Password is required.')
];

module.exports = loginValidator;
