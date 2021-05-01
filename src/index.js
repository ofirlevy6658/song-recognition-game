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

const s2 = new Song({
	name: "Comfortably Numb",
	genere: "rock",
	file:
		"https://p.scdn.co/mp3-preview/daf1a7a5cf0ca8fc212ce61ac3d058fb12e2814f?cid=f5f3734148864c72a4e179d08395e341",
});
const s1 = new Song({
	name: "Aerials",
	genere: "rock",
	file:
		"https://p.scdn.co/mp3-preview/17c08cf40c2f21a4b3e65fd092749a3e35e59b68?cid=f5f3734148864c72a4e179d08395e341",
});

const s3 = new Song({
	name: "Road Trippin'",
	genere: "rock",
	file:
		"https://p.scdn.co/mp3-preview/044c9f913db571f0ee2a146cb8814de9f8da6896?cid=f5f3734148864c72a4e179d08395e341",
});

const s4 = new Song({
	name: "Hotel California",
	genere: "rock",
	file:
		"https://p.scdn.co/mp3-preview/50e82c99c20ffa4223e82250605bbd8500cb3928?cid=f5f3734148864c72a4e179d08395e341",
});

const s5 = new Song({
	name: "Special Needs",
	genere: "rock",
	file:
		"https://p.scdn.co/mp3-preview/f34d8e1a586e6873c7f1b62ddacbfed2a6bc319c?cid=f5f3734148864c72a4e179d08395e341",
});

const s8 = new Song({
	name: "Back In Black",
	genere: "rock",
	file:
		"https://p.scdn.co/mp3-preview/506bc9a0485990973449b0467791e06174371284?cid=f5f3734148864c72a4e179d08395e341",
});

const s6 = new Song({
	name: "Rebel Rebel",
	genere: "rock",
	file:
		"https://p.scdn.co/mp3-preview/392a6a4c64a5129a088460dc6257c1ef740b54ab?cid=f5f3734148864c72a4e179d08395e341",
});

const s9 = new Song({
	name: "The Chain",
	genere: "rock",
	file:
		"https://p.scdn.co/mp3-preview/39267f043904cef22e6652c0ce761114321953fd?cid=f5f3734148864c72a4e179d08395e341",
});

const s7 = new Song({
	name: "The Chain",
	genere: "rock",
	file:
		"https://p.scdn.co/mp3-preview/39267f043904cef22e6652c0ce761114321953fd?cid=f5f3734148864c72a4e179d08395e341",
});

const s10 = new Song({
	name: "More Than a Feeling",
	genere: "rock",
	file:
		"https://p.scdn.co/mp3-preview/97aaefeb43d0e2368526778487c7097607d5d78d?cid=f5f3734148864c72a4e179d08395e341",
});

const s10 = new Song({
	name: "Sultans of Swing",
	genere: "rock",
	file:
		"https://p.scdn.co/mp3-preview/36d1b1b99357ff707acec4dddb357aa59d50c0b5?cid=f5f3734148864c72a4e179d08395e341",
});

const s11 = new Song({
	name: "A Horse with No Name",
	genere: "rock",
	file:
		"https://p.scdn.co/mp3-preview/39160b959b9c3ef5eb82314160eb168af167ac3b?cid=f5f3734148864c72a4e179d08395e341",
});
