const mongoose = require("mongoose");

const Song = mongoose.model("Song", {
	name: {
		type: String,
		required: true,
		unique: true,
	},
	genere: {
		type: String,
		required: true,
	},
	file: {
		type: String,
		required: true,
		unique: true,
	},
});

module.exports = Song;
