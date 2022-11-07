import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchGenres, fetchMovies } from "../store";
import "../styles/Movies.scss";
import { firebaseAuth } from "../utils/firebase-config";
import { onAuthStateChanged } from "firebase/auth";
import SelectGenre from "../components/SelectGenre";
import Card from "../components/Card";
import NoneAvailable from "../components/NoneAvailable";

const Movies = () => {
	// Access Redux store state
	const genresLoaded = useSelector((state) => state.moviesApp.genresLoaded);
	const genres = useSelector((state) => state.moviesApp.genres);
	const movies = useSelector((state) => state.moviesApp.movies);

	// Run (dispatch) functions in redux store
	const dispatch = useDispatch();
	const navigate = useNavigate();

	useEffect(() => {
		dispatch(fetchGenres());
	}, []);

	// Run whenever genresLoaded state changes
	useEffect(() => {
		if (genresLoaded) dispatch(fetchMovies({ type: "movie" }));
	}, [genresLoaded]);

	onAuthStateChanged(firebaseAuth, (currentUser) => {
		if (!currentUser) navigate("/login");
	});

	// console.log(movies);
	// console.log("genres", genres);

	return (
		<div className="movies-page">
			<div className="container">
				<div className="d-flex justify-content-center justify-content-md-end pb-5">
					<SelectGenre genres={genres} type="movie" />
				</div>

				<div className="row">
					{movies ? (
						<>
							{movies.map((movie) => (
								<div className="col d-flex justify-content-center">
									<Card movieData={movie} />
								</div>
							))}
						</>
					) : (
						<NoneAvailable />
					)}
				</div>
			</div>
		</div>
	);
};

export default Movies;
