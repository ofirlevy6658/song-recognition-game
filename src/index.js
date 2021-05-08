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
	"BQC66Uy95uCBS5sXmmKgy84KyjYG96V60aGlwseffhiNp02V6bbUCaAmMm7U7RNeIw0-_WiSFF3jGV-4-5E";
const response2 = async () => {
	const { data } = await axios(
		`https://api.spotify.com/v1/playlists/7s17jTD83GgeKajAMogIen/tracks`,
		{
			method: "GET",
			headers: {
				Authorization: "Bearer " + token,
			},
		}
	);
	const { items } = await data;
	let a;
	for (let i = 0; i < items.length; i++) {
		if (items[i].track.preview_url) {
			new Song({
				name: items[i].track.name,
				genere: "hip hop",
				file: items[i].track.preview_url,
			}).save();
		}
	}
};
response2();
