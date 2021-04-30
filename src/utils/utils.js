const Song = require("../models/song");

// { genere: 'rock' }
async function getSongCollection(collection) {
	console.log(collection);
	return await Song.find(collection);
}

module.exports = { getSongCollection };
