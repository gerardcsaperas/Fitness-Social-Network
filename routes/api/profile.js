const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { body, validationResult } = require('express-validator');

const Profile = require('../../models/Profile');
const User = require('../../models/User');

// @route   GET api/profile/me
// @desc    Get current user's profile
// @access  Private
router.get('/me', auth, async (req, res) => {
	try {
		const profile = await Profile.findOne({ user: req.user.id });

		if (!profile) {
			return res.status(400).json({ msg: 'There is no profile for this user' });
		}

		res.json(profile);
	} catch (err) {
		console.log(err.message);
		res.status(500).send('Server Error');
	}
});

// @route   POST api/profile
// @desc    Create or update a user's profile
// @access  Private
router.post(
	'/',
	[
		auth,
		[
			body('trainingYears', 'Your training age is required').isNumeric(),
			body('trainingModality', 'Your training modality of interest is required').notEmpty()
		]
	],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		const {
			age,
			height,
			weight,
			gym,
			location,
			trainingYears,
			trainingModality,
			currentStatus,
			bio,
			githubusername,
			competitions,
			youtube,
			instagram,
			twitter,
			facebook
		} = req.body;

		// Build profile object
		const profileFields = {};

		// Add fields to profile object if parsed by the user
		profileFields.user = req.user.id;
		profileFields.username = req.user.username;
		if (age) profileFields.age = age;
		if (height) profileFields.height = height;
		if (weight) profileFields.weight = weight;
		if (gym) profileFields.gym = gym;
		if (location) profileFields.location = location;
		profileFields.trainingYears = trainingYears;
		profileFields.trainingModality = trainingModality.split(',').map((modality) => modality.trim());
		if (currentStatus) profileFields.currentStatus = currentStatus;
		if (bio) profileFields.bio = bio;
		if (githubusername) profileFields.githubusername = githubusername;
		if (competitions) profileFields.competitions = competitions;

		// Build social profile object
		profileFields.social = {};

		// Populate social profile object
		if (youtube) profileFields.social.youtube = youtube;
		if (facebook) profileFields.social.facebook = facebook;
		if (twitter) profileFields.social.twitter = twitter;
		if (instagram) profileFields.social.instagram = instagram;

		try {
			let profile = await Profile.findOne({ user: req.user.id });
		} catch (error) {
			console.log(error.message);
			res.status(500).send('Server Error');
		}
	}
);

module.exports = router;
