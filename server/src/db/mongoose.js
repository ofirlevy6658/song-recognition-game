const mongoose = require("mongoose");
require("dotenv").config();

mongoose.connect(process.env.MONGODB_SERVER, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useFindAndModify: false,
	useCreateIndex: true,
});

// https://www.youtube.com/watch?v=17UVejOw3zA
