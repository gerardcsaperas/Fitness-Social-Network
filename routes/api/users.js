const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const User = require('../models/User');

// @route   POST api/users
// @desc    Register User
// @access  Public
router.post(
	'/',
	[
		// username must be filled
		body('username', 'Username is required').notEmpty(),
		// email is valid and filled
		body('email', 'Valid email is required').isEmail(),
		// password must be at least 6 chars long
		body('password', 'Password must be 6 or more characters long').isLength({ min: 6 })
	],
	(req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		res.send('User route');
	}
);

module.exports = router;
