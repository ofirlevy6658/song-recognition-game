const Song = require("./models/song");
require("./db/mongoose");
const axios = require("axios");

const token =
	"BQC73ZDjRTYPRfTQUb4Ku84kRbBOmZYIAtVJBMMGw1Bk8Bui9PXWf6VKrAWHlusH52ywvr71v2uJ-ppqUZY";
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
	const hipHope2000 = [];
	let a;
	for (let i = 0; i < items.length; i++) {
		if (items[i].track.preview_url) {
			a = new Song({
				name: items[i].track.name,
				genere: "Hip Hop",
				file: items[i].track.preview_url,
			}).save();
		}
	}
};
response2();
