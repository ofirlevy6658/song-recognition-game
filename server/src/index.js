const express = require("express");
// const axios = require("axios");
const cors = require("cors");
const songRouter = require("./routers/song");
const userRouter = require("./routers/user");
// const Song = require("./models/song");
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
