const express = require("express");
// const axios = require("axios");
// const Song = require("./models/song");
const cors = require("cors");
const songRouter = require("./routers/song");
const userRouter = require("./routers/user");
const path = require("path");
require("./db/mongoose");
const app = express();

const publicDirectory = path.join(__dirname, "../client/build");
app.use(express.static(publicDirectory));
app.use(cors());
app.use(express.json());
app.use(userRouter);
app.use(songRouter);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
	console.log(`listening on port ${PORT}`);
});
