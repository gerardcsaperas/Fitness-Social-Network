const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const jwt = require('jsonwebtoken');
const config = require('config');
const bcrypt = require('bcryptjs');
const { body, validationResult } = require('express-validator');

const User = require('../../models/User');

// @route   GET api/auth
// @desc    Authenticate user
// @access  Public
router.get('/', auth, async (req, res) => {
	// We want the route to return the user's data
	try {
		const user = await User.findById(req.user.id).select('-password');
		res.json(user);
	} catch (err) {
		console.log(err.message);
		res.status(500).send('Server Error');
	}
});

// @route   POST api/users
// @desc    Authenticate user and get token
// @access  Public
router.post(
	'/',
	[
		body('email', 'Valid email is required').isEmail(),
		// password must be at least 6 chars long
		body('password', 'Password is required').exists()
	],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		const { email, password } = req.body;

		try {
			// See if user exists
			let user = await User.findOne({ email });

			if (!user) {
				return res.status(400).json({ errors: [ { msg: 'Invalid credentials' } ] });
			}

			// Match user's email and password
			const isMatch = await bcrypt.compare(password, user.password);

			if (!isMatch) {
				return res.status(400).json({ errors: [ { msg: 'Invalid credentials' } ] });
			} else {
				res.status();
			}

			// Return jsonwebtoken
			const payload = {
				user: {
					id: user.id
				}
			};

			jwt.sign(payload, config.get('jwtSecret'), { expiresIn: '10h' }, (err, token) => {
				if (err) throw err;
				res.json({ token });
			});
		} catch (err) {
			console.log(err.message);
			res.status(500).send('Server error');
		}
	}
);

module.exports = router;
