const User = require("../models/UserModel");

module.exports.fetchLikedMovies = async (req, res) => {
	try {
		const { email } = req.params;
		const user = await User.findOne({ email });
		if (user) {
			return res.json({ msg: "success", movies: user.likedMovies });
		} else return res.json({ msg: "Email not found." });
	} catch (error) {
		return res.json({ msg: "Error fetching movies." });
	}
};

module.exports.addToLikedMovies = async (req, res) => {
	try {
		const { email, data } = req.body;

		const user = await User.findOne({ email });

		// If user exists, add movie to their list
		if (user) {
			const { likedMovies } = user;
			const alreadyLiked = likedMovies.find(({ id }) => id === data.id);

			// If movies not liked, find the user and spread its previous movies/add new movie
			if (!alreadyLiked) {
				await User.findByIdAndUpdate(
					user._id,
					{
						likedMovies: [...user.likedMovies, data],
					},
					{ new: true }
				);
			} else {
				return res.json({ msg: "Movie already exists in list." });
			}
		} else {
			// If user does not exist, create the User and add the movie to their list
			await User.create({ email, likedMovies: [data] });
		}

		return res.json({ msg: "Movie successfully added to list." });
	} catch (err) {
		return res.json({ msg: "Error adding movie to list." });
	}
};

module.exports.removeFromLikedMovies = async (req, res) => {
	try {
		const { email, movieId } = req.body;
		const user = await User.findOne({ email });
		if (user) {
			const { likedMovies } = user;
			const movieIndex = movies.findIndex(({ id }) => id === movieId);
			if (!movieIndex) {
				res.status(400).send({ msg: "Movie not found." });
			}
			movies.splice(movieIndex, 1);
			await User.findByIdAndUpdate(
				user._id,
				{
					likedMovies,
				},
				{ new: true }
			);
			return res.json({
				msg: "Movie successfully removed.",
				likedMovies: likedMovies,
			});
		} else return res.json({ msg: "User with given email not found." });
	} catch (error) {
		return res.json({ msg: "Error removing movie to the liked list" });
	}
};
