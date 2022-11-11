import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import "../styles/Card.scss";
import { BiChevronDown } from "react-icons/bi";
import { UserAuth } from "../context/AuthContext";

import { AiOutlinePlus, AiOutlineClose } from "react-icons/ai";
import { onAuthStateChanged } from "firebase/auth";
import axios from "axios";
import { firebaseAuth } from "../utils/firebase-config";
import { removeMovieFromLikedMovies } from "../store";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// React.memo allows component to render its functions if it has changed any of its props

export default React.memo(function Card({ index, movieData, isLiked = false }) {
	const [isHovered, setIsHovered] = useState(false);

	// email state in order to retrieve email for POST request (adding to list)
	const [email, setEmail] = useState(undefined);

	const { user } = UserAuth();
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const showAddMsg = () => {
		toast.success("Movie Added!");
	};

	onAuthStateChanged(firebaseAuth, (currentUser) => {
		if (currentUser) {
			setEmail(currentUser.email);
		} else navigate("/login");
	});

	const addToList = async () => {
		try {
			// retrieve email in order to match email in users DB
			await axios.post("http://localhost:3001/api/user/add", {
				email,
				data: movieData,
			});
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div
			key={index}
			className="card-container"
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}
		>
			<img
				src={`https://image.tmdb.org/t/p/w500${movieData.image}`}
				alt="card"
			/>

			{isHovered && (
				<div className="hover">
					<div className="info-container d-flex flex-column">
						<p className="text-center">{movieData.name}</p>
						<div className="icons d-flex justify-content-between">
							{user ? (
								<div className="controls d-flex">
									{isLiked ? (
										<AiOutlineClose
											title="Remove from List"
											onClick={() =>
												dispatch(
													removeMovieFromLikedMovies({
														email,
														movieId: movieData.id,
													})
												)
											}
										/>
									) : (
										<>
											<AiOutlinePlus
												title="Add to my list"
												onClick={() => {
													showAddMsg();
													addToList();
												}}
											/>
											<ToastContainer
												position="top-center"
												autoClose={1000}
												hideProgressBar={false}
												newestOnTop
												closeOnClick
												rtl={false}
												pauseOnFocusLoss
												draggable
												pauseOnHover
												theme="colored"
											/>
										</>
									)}
								</div>
							) : null}

							<div className="info">
								<BiChevronDown title="More Info" />
							</div>
						</div>
						<div className="genres d-flex justify-content-center">
							<ul className="d-flex text-center">
								{movieData.genres.map((genre) => (
									<li key={genre}>{genre}</li>
								))}
							</ul>
						</div>
					</div>
				</div>
			)}
		</div>
	);
});
