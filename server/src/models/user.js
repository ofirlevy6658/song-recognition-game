const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const userSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		trim: true,
	},
	email: {
		type: String,
		unique: true,
		required: true,
		trim: true,
		lowercase: true,
		validate(value) {
			if (!validator.isEmail(value)) {
				throw new Error("Email is invalid");
			}
		},
	},
	password: {
		type: String,
		required: true,
		minlength: 7,
		trim: true,
		validate(value) {
			if (value.toLowerCase().includes("password")) {
				throw new Error('Password cannot contain "password"');
			}
		},
	},
	score: {
		type: Number,
		required: true,
		default: 0,
	},
	bestScore: {
		type: {},
		required: true,
		default: {
			"rock classics": 0,
			"hip hop": 0,
			"timeless rock anthems": 0,
			"‎90s Israeli Rock": 0,
		},
	},
	genre: {
		type: String,
		required: true,
		default: "rock classics",
	},
	tokens: [
		{
			token: {
				type: String,
				require: true,
			},
		},
	],
});

//prevent sending unnecessary data to the user
userSchema.methods.toJSON = function () {
	const user = this;
	const userObject = user.toObject();
	delete userObject.password;
	return userObject;
};

//check credentials before login
userSchema.statics.findByCredentials = async (email, password) => {
	const user = await User.findOne({ email });
	if (!user) {
		throw new Error("Unable to login");
	}
	const isMatch = await bcrypt.compare(password, user.password);
	if (!isMatch) {
		throw new Error("Unable to login");
	}
	return user;
};
//generate token after login
userSchema.methods.generateAuthToken = async function () {
	const user = this;
	const token = jwt.sign({ _id: user._id.toString() }, process.env.SECRET_KEY);
	user.tokens = user.tokens.concat({ token });
	await user.save();
	return token;
};

// Hash the plain text password before saving
userSchema.pre("save", async function (next) {
	const user = this;
	if (user.isModified("password")) {
		user.password = await bcrypt.hash(user.password, 8);
	}
	next();
});

const User = mongoose.model("User", userSchema);

module.exports = User;
