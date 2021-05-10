const express = require("express");
const axios = require("axios");
const cors = require("cors");
const songRouter = require("./routers/song");
const userRouter = require("./routers/user");
const Song = require("./models/song");
require("./db/mongoose");

const app = express();
app.use(cors());
app.use(express.json());
app.use(userRouter);
app.use(songRouter);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
	console.log(`listening on port ${PORT}`);
});

//////////////////////////
//////////////////////////
/////////////////////////
//////////////////////

const token =
	"BQB3_5qpje4D-7MzXQOzBdqJrOY30rfEsl3MLe1mcfSPx29L66oDs1fbZKcK73fmZNC4K8SyDYruwmysetI";
const response2 = async () => {
	const { data } = await axios(
		`https://api.spotify.com/v1/playlists/3zVs85cbaznZsWHI1iqToi/tracks`,
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
					genere: "timeless rock anthems",
					file: items[i].track.preview_url,
				})
			);
		}
	}
	for (let i = 0; i < arr.length; i++) {
		arr[i].save();
	}
};
