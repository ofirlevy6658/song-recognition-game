const express = require("express");
const cors = require("cors");
const songRouter = require("./routers/song");
const Song = require("./models/song");
require("./db/mongoose");

const app = express();
app.use(cors());
app.use(express.json());
app.use(songRouter);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
	console.log(`listening on port ${PORT}`);
});

const s = new Song({
	name: "song1",
	genere: "rock",
	file:
		"https://p.scdn.co/mp3-preview/2726a9595503bf33fdf44d0e85ae8abc7d876d44?cid=774b29d4f13844c495f206cafdad9c86",
});
