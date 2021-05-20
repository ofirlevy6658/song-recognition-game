const express = require("express");
const User = require("../models/user");
const router = new express.Router();
const auth = require("../middleware/auth");

router.post("/api/users", async (req, res) => {
	const user = new User(req.body);
	try {
		await user.save();
		const token = await user.generateAuthToken();
		res.status(201).send({ user, token });
	} catch (e) {
		res.status(400).send(e.message);
	}
});

//update score
router.patch("/api/users", auth, async (req, res) => {
	try {
		const { id, score } = req.body;
		user = await User.findById(id);
		user.score = score;
		user.save();
		res.status(201).send("score update");
	} catch (e) {
		res.status(400).send(e.message);
	}
});
router.patch("/api/bestscore", auth, async (req, res) => {
	try {
		const { id, genre, score } = req.body;
		if (score > 50) return;
		user = await User.findById(id);
		bestScore = { ...user.bestScore };
		bestScore[genre] = parseInt(score);
		user.bestScore = bestScore;
		user.save();
		res.status(201).send("score update");
	} catch (e) {
		res.status(400).send(e.message);
	}
});
//change genre
router.patch("/api/genre", auth, async (req, res) => {
	try {
		const { id, genre } = req.body;
		user = await User.findById(id);
		user.genre = genre;
		user.save();
		res.status(201).send("genre update");
	} catch (e) {
		res.status(400).send(e.message);
	}
});

//get user info
router.get("/api/users/me", auth, (req, res) => {
	res.send(req.user);
});

router.get("/api/leaderscore", async (req, res) => {
	try {
		const genres = [
			"rock classics",
			"hip hop",
			"timeless rock anthems",
			"‎90s Israeli Rock",
		];
		users = await User.find({});
		const cleanUsers = users.map((el) => {
			return { bestScore: el.bestScore, name: el.name };
		});
		constBestScore = [];
		for (let i of genres) {
			cleanUsers.sort((a, b) => {
				return a.bestScore[i] - b.bestScore[i];
			});
			constBestScore.push(cleanUsers.slice(cleanUsers.length - 5));
		}

		res.status(201).send(constBestScore);
	} catch (e) {
		res.status(400).send(e.message);
	}
});

router.post("/api/users/login", async (req, res) => {
	try {
		const user = await User.findByCredentials(
			req.body.email,
			req.body.password
		);
		const token = await user.generateAuthToken();
		res.send({ user, token });
	} catch (e) {
		res.status(400).send(e.message);
	}
});

router.post("/api/users/logout", auth, async (req, res) => {
	try {
		req.user.tokens = req.user.tokens.filter((token) => {
			return token.token !== req.body.token;
		});
		await req.user.save();
		res.send();
	} catch (e) {
		res.status(500).send();
	}
});

router.post("/api/users/logoutall", auth, async (req, res) => {
	try {
		req.user.tokens = [];
		await req.user.save();
		res.send();
	} catch (e) {
		res.status(500).send();
	}
});

module.exports = router;
