import React, { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchSearch } from "../store";
import "../styles/SearchList.scss";
import { firebaseAuth } from "../utils/firebase-config";
import { onAuthStateChanged } from "firebase/auth";
import SearchBar from "../components/SearchBar";
import Card from "../components/Card";
import NoneAvailable from "../components/NoneAvailable";
import { API_KEY, TMDB_BASE_URL } from "../utils/constants";
import axios from "axios";

function SearchList() {
	// Run (dispatch) functions in redux store
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const [searchValue, setSearchValue] = useState("");
	const [content, setContent] = useState([]);

	const fetchSearch = async (e) => {
		try {
			const { data } = await axios.get(
				`${TMDB_BASE_URL}/search/company?api_key=${API_KEY}&query=${searchValue}`
			);
			setContent(data.results);
			// console.log(data);
		} catch (error) {
			console.error(error);
		}
	};

	// useEffect(() => {
	// 	window.scroll(0, 0);
	// 	fetchSearch();
	// 	// eslint-disable-next-line
	// }, []);

	onAuthStateChanged(firebaseAuth, (currentUser) => {
		if (!currentUser) navigate("/login");
	});

	console.log(content);

	return (
		<div className="search-page">
			<div className="container">
				<div className="d-flex justify-content-center pb-5">
					<div className="search">
						<button onClick={fetchSearch}>
							<FaSearch />
						</button>
						<input
							type="text"
							value={searchValue}
							onChange={(e) => setSearchValue(e.target.value)}
							placeholder="Search"
						/>
					</div>
				</div>

				<div className="row">
					{content.length ? (
						<>
							{content.map((content) => (
								<div
									key={content.id}
									className="col d-flex justify-content-center"
								>
									<Card
										movieData={content}
										key={content.id}
										index={content.id}
									/>
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
