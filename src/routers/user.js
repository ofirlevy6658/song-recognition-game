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

//get user info
router.get("/api/users/me", auth, (req, res) => {
	res.send(req.user);
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
		console.log("logout");
		console.log(req.user.tokens);
		req.user.tokens = req.user.tokens.filter((token) => {
			return token.token !== req.token;
		});
		await req.user.save();
		res.send();
	} catch (e) {
		res.status(500).send();
	}
});

router.post("/api/users/logoutAll", auth, async (req, res) => {
	try {
		req.user.tokens = [];
		await req.user.save();
		res.send();
	} catch (e) {
		res.status(500).send();
	}
});

module.exports = router;
