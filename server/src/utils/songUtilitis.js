const Song = require("../models/song");

async function getSongCollection(collection) {
	return await Song.find(collection);
}

module.exports = { getSongCollection };
