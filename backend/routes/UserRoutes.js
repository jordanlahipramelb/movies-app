const express = require("express");
const router = express.Router();

const {
	addToLikedMovies,
	fetchLikedMovies,
	removeFromLikedMovies,
} = require("../controllers/UserController");

router.get("/liked/:email", fetchLikedMovies);
router.post("/add", addToLikedMovies);
router.post("/remove", removeFromLikedMovies);

module.exports = router;
