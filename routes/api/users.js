const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const { body, validationResult } = require('express-validator');

// Require user's model
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
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		const { username, email, password } = req.body;

		try {
			// See if user exists
			let user = await User.findOne({ email });

			if (user) {
				return res.status(400).json({ errors: [ { msg: 'User already exists' } ] });
			}
			// Get user's gravatar
			const avatar = gravatar.url(email, {
				size: '200',
				rating: 'pg',
				default: 'monsterid'
			});
			// Create a new instance of User
			user = new User({ username, email, password, avatar });
			// Encrypt password using bcrypt
			const salt = await bcrypt.genSalt(10);

			user.password = await bcrypt.hash(password, salt);
			//Save the user
			await user.save();
			// Return jsonwebtoken
			res.send('User registered');
		} catch (err) {
			console.log(err.message);
			res.status(500).send('Server error');
		}

		res.send('User route');
	}
);

module.exports = router;
