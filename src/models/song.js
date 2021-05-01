const mongoose = require("mongoose");

const Song = mongoose.model("Pop", {
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

// https://p.scdn.co/mp3-preview/2726a9595503bf33fdf44d0e85ae8abc7d876d44?cid=774b29d4f13844c495f206cafdad9c86
