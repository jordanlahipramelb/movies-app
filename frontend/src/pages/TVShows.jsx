import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchGenres, fetchMovies } from "../store";
import "../styles/TVShows.scss";
import { firebaseAuth } from "../utils/firebase-config";
import { onAuthStateChanged } from "firebase/auth";
import SelectGenre from "../components/SelectGenre";
import Card from "../components/Card";
import NoneAvailable from "../components/NoneAvailable";

function TVShows() {
	// Access Redux store state
	const genresLoaded = useSelector((state) => state.moviesApp.genresLoaded);
	const genres = useSelector((state) => state.moviesApp.genres);
	const tvShows = useSelector((state) => state.moviesApp.movies);

	// Run (dispatch) functions in redux store
	const dispatch = useDispatch();
	const navigate = useNavigate();

	useEffect(() => {
		dispatch(fetchGenres());
	}, []);

	// Run whenever genresLoaded state changes
	useEffect(() => {
		if (genresLoaded) dispatch(fetchMovies({ type: "tv" }));
	}, [genresLoaded]);

	onAuthStateChanged(firebaseAuth, (user) => {
		if (!user) navigate("/login");
	});

	return (
		<div className="tvshows-page">
			<div className="container">
				<div className="d-flex justify-content-center justify-content-md-end pb-5">
					<SelectGenre genres={genres} type="tv" />
				</div>

				<div className="row">
					{tvShows ? (
						<>
							{tvShows.map((movie) => (
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
}

export default TVShows;
