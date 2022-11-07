import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import "../styles/Card.scss";
import { BiChevronDown } from "react-icons/bi";
import { BsCheck } from "react-icons/bs";
import { UserAuth } from "../context/AuthContext";

import { AiOutlinePlus } from "react-icons/ai";
import { onAuthStateChanged } from "firebase/auth";
import axios from "axios";
import { firebaseAuth } from "../utils/firebase-config";
import { removeMovieFromLiked } from "../store";

// React.memo allows component to render its functions if it has changed any of its props

export default React.memo(function Card({ index, movieData, isLiked = false }) {
	const [isHovered, setIsHovered] = useState(false);
	const [email, setEmail] = useState(undefined);

	const { user } = UserAuth();
	const navigate = useNavigate();
	const dispatch = useDispatch();

	onAuthStateChanged(firebaseAuth, (currentUser) => {
		if (currentUser) {
			setEmail(currentUser.email);
		} else navigate("/login");
	});

	const addToList = async () => {
		try {
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
										<BsCheck
											title="Remove from List"
											onClick={() =>
												dispatch(
													removeMovieFromLiked({ movieId: movieData.id, email })
												)
											}
										/>
									) : (
										<AiOutlinePlus title="Add to my list" onClick={addToList} />
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
									<li>{genre}</li>
								))}
							</ul>
						</div>
					</div>
				</div>
			)}
		</div>
	);
});
