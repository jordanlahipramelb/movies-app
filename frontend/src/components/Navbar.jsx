import React, { useState } from "react";
import { Link } from "react-router-dom";
// import { FaSearch } from "react-icons/fa";
import { firebaseAuth } from "../utils/firebase-config";
import { UserAuth } from "../context/AuthContext";
import "../styles/Navbar.scss";

function Navbar() {
	const [showSearch, setShowSearch] = useState(false);
	const [inputHover, setInputHover] = useState(false);
	const { user, logOut } = UserAuth();

	const loggedInUser = () => {
		return (
			<button className="logout-btn" onClick={() => logOut(firebaseAuth)}>
				Log Out
			</button>
		);
	};

	const loggedOutUser = () => {
		return (
			<>
				<Link to="/login" className="signin-btn">
					Sign In
				</Link>
				<Link to="/signup" className="signup-btn">
					Sign Up
				</Link>
			</>
		);
	};
	return (
		<div className="nav-container">
			<nav className="d-flex p-4">
				<div className="left d-flex align-items-center">
					<div className="logo d-flex align-items-center justify-content-center">
						<p>M</p>
					</div>

					<ul className="links d-flex">
						<li>
							<Link to="/">Home</Link>
						</li>
						<li>
							<Link to="/movies">Movies</Link>
						</li>
						<li>
							<Link to="/tvshows">TV Shows</Link>
						</li>

						{user ? (
							<li>
								<Link to="/mylist">My List</Link>
							</li>
						) : null}
					</ul>
				</div>
				<div className="right d-flex align-items-center">
					{/* <div className={`search ${showSearch ? "show-search" : ""}`}>
						<button
							onFocus={() => setShowSearch(true)}
							onBlur={() => {
								if (!inputHover) {
									setShowSearch(false);
								}
							}}
						>
							<FaSearch />
						</button>
						<input
							type="text"
							placeholder="Search"
							onMouseEnter={() => setInputHover(true)}
							onMouseLeave={() => setInputHover(false)}
							onBlur={() => {
								setShowSearch(false);
								setInputHover(false);
							}}
						/>
					</div> */}

					{user ? loggedInUser() : loggedOutUser()}
				</div>
			</nav>
		</div>
	);
}
export default Navbar;
