const express = require("express");
const axios = require("axios");
const Song = require("./src/models/song");

const cors = require("cors");
const songRouter = require("./src/routers/song");
const userRouter = require("./src/routers/user");
const path = require("path");
require("./src/db/mongoose");

const app = express();

const publicDirectory = path.join(__dirname, "../client/build");
console.log(publicDirectory);
app.use(express.static(publicDirectory));
app.use(cors());
app.use(express.json());
app.use(userRouter);
app.use(songRouter);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
	console.log(`listening on port ${PORT}`);
});

// add collection
const token =
	"BQA8SUPLmX8QqgXy6AWGa-EWvSzJetUVEGcWNIY-wqFGcbb4XaRLj9iISN7q2HEqnLedi3l4dexl2vBHk0o";
const response2 = async () => {
	const { data } = await axios(
		`https://api.spotify.com/v1/playlists/5dO82NBt1BVH3mL9bYrXjY/tracks`,
		{
			method: "GET",
			headers: {
				Authorization: "Bearer " + token,
			},
		}
	);
	const { items } = await data;
	const arr = [];
	for (let i = 0; i < items.length; i++) {
		if (items[i].track.preview_url) {
			arr.push(
				new Song({
					name: items[i].track.name,
					genere: "‎90s Israeli Rock",
					file: items[i].track.preview_url,
				})
			);
		}
	}
	for (let i = 0; i < arr.length; i++) {
		arr[i].save();
	}
};
