import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Card from "../components/Card";
import { fetchGenres, fetchMovies } from "../store";
import "../styles/Home.scss";

function Home() {
	// Access Redux store state
	const genresLoaded = useSelector((state) => state.moviesApp.genresLoaded);
	const movies = useSelector((state) => state.moviesApp.movies);
	// Run (dispatch) functions in redux store
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(fetchGenres());
	}, []);

	// Run whenever genresLoaded state changes
	useEffect(() => {
		if (genresLoaded) dispatch(fetchMovies({ type: "all" }));
	}, [genresLoaded]);

	return (
		<div className="home-page">
			<div className="container">
				<h1 className="text-center">Trending Now</h1>

				<div className="row">
					{movies.map((movie) => (
						<div className="col d-flex justify-content-center">
							<Card movieData={movie} />
						</div>
					))}
				</div>
			</div>
		</div>
	);
}

export default Home;
