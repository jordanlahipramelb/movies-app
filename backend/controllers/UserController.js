const { BadRequestError, NotFoundError } = require("../expressError");
const User = require("../models/UserModel");

class UserController {
	static async fetchLikedMovies(req, res) {
		try {
			const { email } = req.params;
			// console.log(email);
			const user = await User.findOne({ email });
			if (user) {
				return res.json({ msg: "success", movies: user.likedMovies });
			} else throw NotFoundError(`User with email ${email} not found.`);
		} catch (error) {
			throw new BadRequestError(`Error fetching movies.`);
		}
	}

	static async addToLikedMovies(req, res) {
		try {
			const { email, data } = req.body;

			const user = await User.findOne({ email });

			// If user exists, add movie to their list
			if (user) {
				const { likedMovies } = user;

				// Find if the movie is already liked
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
					throw new BadRequestError(`Movie already exists in list.`);
				}
			}
			// If user does not exist in DB, create the User and add the movie to their list
			else await User.create({ email, likedMovies: [data] });

			return res.json({ msg: "Movie successfully added to list." });
		} catch (err) {
			throw new BadRequestError(`Error adding movie to list.`);
		}
	}

	static async removeFromLikedMovies(req, res) {
		try {
			const { email, movieId } = req.body;
			const user = await User.findOne({ email });

			if (user) {
				const movies = user.likedMovies;

				// Find index of movie in likedList in order to remove it
				const movieIdx = movies.findIndex(({ id }) => id === movieId);

				if (!movieIdx) {
					throw NotFoundError(`Movie not found in liked list.`);
				}

				// remove movie from liked movies
				movies.splice(movieIdx, 1);

				// update User table with new likedMovies data
				await User.findByIdAndUpdate(
					user._id,
					{
						likedMovies: movies,
					},
					{ new: true }
				);

				return res.json({
					msg: "Movie removed from list.",
					movies,
				});
			} else return res.json({ msg: "User with given email not found." });
		} catch (error) {
			console.log(error);
			throw new BadRequestError("Error removing movie from liked list");
		}
	}
}

module.exports = UserController;
