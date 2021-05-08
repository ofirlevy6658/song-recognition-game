const mongoose = require("mongoose");

mongoose.connect(
	"mongodb+srv://dbBank:6105935z@cluster0.u2wgr.mongodb.net/music-app?retryWrites=true&w=majority",
	{
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useFindAndModify: false,
		useCreateIndex: true,
	}
);
