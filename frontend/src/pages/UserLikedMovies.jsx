import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchUsersLikedMovies } from "../store";
import "../styles/UserLikedList.scss";
import { firebaseAuth } from "../utils/firebase-config";
import { onAuthStateChanged } from "firebase/auth";
import Card from "../components/Card";

function UserLikedList() {
	const movies = useSelector((state) => state.moviesApp.movies);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [email, setEmail] = useState(undefined);

	onAuthStateChanged(firebaseAuth, (currentUser) => {
		if (currentUser) setEmail(currentUser.email);
		else navigate("/login");
	});

	useEffect(() => {
		if (email) {
			dispatch(fetchUsersLikedMovies(email));
		}
	}, [email]);
	return (
		<div className="mylist-page">
			<div className="container">
				<div className="row">
					{movies.length ? (
						<>
							{movies.map((movie, index) => (
								<div
									className="col d-flex justify-content-center"
									index={index}
									key={movie.id}
								>
									<Card
										movieData={movie}
										index={index}
										key={movie.id}
										isLiked={true}
									/>
								</div>
							))}
						</>
					) : (
						<div className="text-center">
							<p>No movies/TV shows in list.</p>
						</div>
					)}
				</div>
			</div>
		</div>
	);
}

export default UserLikedList;
