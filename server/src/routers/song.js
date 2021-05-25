const express = require("express");
const router = new express.Router();
const Song = require("../models/song");

router.get("/api/song", async (req, res) => {
	try {
		const songs = await Song.find(req.query);
		res.status(201).send(songs);
	} catch (e) {
		res.status(400).send({ error: e.message });
	}
});

module.exports = router;
