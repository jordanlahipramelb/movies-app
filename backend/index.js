/** Express App for Movies App */

const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

const userRoutes = require("./routes/UserRoutes");

dotenv.config();

// const userRoutes = require("./routes/UserRoutes");

app.use(cors());
app.use(express.json());

mongoose
	.connect(process.env.MONGO_URL, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => {
		console.log("DB Connection Successful");
	})
	.catch((err) => {
		console.log(err.message);
	});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
	console.log("Connected successfully");
});

app.use("/api/user", userRoutes);

app.listen(3001, () => {
	console.log("Server started on port 3001");
});
