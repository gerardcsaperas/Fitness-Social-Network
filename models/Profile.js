const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
	username: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'user'
	},
	age: {
		type: Number
	},
	height: {
		type: Number
	},
	weight: {
		type: Number
	},
	gym: {
		type: String
	},
	location: {
		type: String
	},
	trainingYears: {
		type: Number,
		required: true
	},
	trainingModality: {
		type: [ String ],
		required: true
	},
	currentStatus: {
		type: String
	},
	bio: {
		type: String
	},
	githubusername: {
		type: String
	},
	competitions: [
		{
			name: {
				type: String,
				required: true
			},
			year: {
				type: Number,
				required: true
			},
			location: {
				type: String,
				required: true
			},
			position: {
				type: Number
			},
			deadlift: {
				type: Number
			},
			benchPress: {
				type: Number
			},
			squat: {
				type: Number
			}
		}
	],
	social: {
		youtube: {
			type: String
		},
		twitter: {
			type: String
		},
		facebook: {
			type: String
		},
		instagram: {
			type: String
		}
	},
	date: {
		type: Date,
		default: Date.now()
	}
});

module.exports = Profile = mongoose.model('Profile', ProfileSchema);
