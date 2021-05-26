const express = require("express");
const router = new express.Router();
const User = require("../models/user");
const auth = require("../middleware/auth");

//create user
router.post("/api/users", async (req, res) => {
	const user = new User(req.body);
	try {
		await user.save();
		const token = await user.generateAuthToken(); // login immediately after create user
		res.status(201).send({ user, token });
	} catch (e) {
		res.status(400).send(e.message);
	}
});

//update score
router.patch("/api/users", auth, async (req, res) => {
	try {
		const user = req.user;
		const { score } = req.body;
		user.score = score;
		user.save();
		res.status(201).send("score update");
	} catch (e) {
		res.status(400).send(e.message);
	}
});

// update best score
router.patch("/api/bestscore", auth, async (req, res) => {
	try {
		const { genre, score } = req.body;
		if (score > 50) return res.status(400).send("Invalid");
		const user = req.user;
		user.bestScore[genre] = score;
		const bestScore = { ...user.bestScore };
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
		const user = req.user;
		const { genre } = req.body;
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
		const users = await User.find({});
		// take only the necessary data
		const cleanUsers = users.map((el) => {
			return { bestScore: el.bestScore, name: el.name };
		});
		const BestScore = [];
		// sort every genre by best score
		for (let i of genres) {
			cleanUsers.sort((a, b) => {
				return a.bestScore[i] - b.bestScore[i];
			});
			BestScore.push(cleanUsers.slice(cleanUsers.length - 5)); // push the best 5 of every genre into array
		}
		res.status(201).send(BestScore);
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
