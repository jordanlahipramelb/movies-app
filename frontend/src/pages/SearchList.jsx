import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchSearch } from "../store";
import "../styles/SearchList.scss";
import { firebaseAuth } from "../utils/firebase-config";
import { onAuthStateChanged } from "firebase/auth";
import SearchBar from "../components/SearchBar";
import Card from "../components/Card";
import NoneAvailable from "../components/NoneAvailable";

function SearchList() {
	// Access Redux store state
	const genresLoaded = useSelector((state) => state.moviesApp.genresLoaded);
	const genres = useSelector((state) => state.moviesApp.genres);
	const movies = useSelector((state) => state.moviesApp.movies);

	// Run (dispatch) functions in redux store
	const dispatch = useDispatch();
	const navigate = useNavigate();

	useEffect(() => {
		dispatch(fetchSearch());
	}, []);

	onAuthStateChanged(firebaseAuth, (currentUser) => {
		if (!currentUser) navigate("/login");
	});

	const search = async (searchTerm) => {
		await fetchSearch({ searchKey: searchTerm });
	};
	return (
		<div className="movies-page">
			<div className="container">
				<div className="d-flex justify-content-center pb-5">
					<SearchBar searchFor={search} />
				</div>

				<div className="row">
					{movies.length ? (
						<>
							{movies.map((movie) => (
								<div
									key={movie.id}
									className="col d-flex justify-content-center"
								>
									<Card movieData={movie} key={movie.id} index={movie.id} />
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

export default SearchList;
