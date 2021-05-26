const express = require("express");
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
