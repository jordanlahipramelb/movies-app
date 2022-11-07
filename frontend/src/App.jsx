import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Home from "./pages/Home";
import { AuthContextProvider } from "./context/AuthContext";
import Navbar from "./components/Navbar";
import Movies from "./pages/Movies";
import TVShows from "./pages/TVShows";
import UserLikedList from "./pages/UserLikedMovies";

function App() {
	return (
		<BrowserRouter>
			<AuthContextProvider>
				<Navbar />
				<Routes>
					<Route exact path="/" element={<Home />} />
					<Route exact path="/login" element={<Login />} />
					<Route exact path="/signup" element={<SignUp />} />
					<Route exact path="/movies" element={<Movies />} />
					<Route exact path="/tvshows" element={<TVShows />} />
					<Route exact path="/mylist" element={<UserLikedList />} />
				</Routes>
			</AuthContextProvider>
		</BrowserRouter>
	);
}

export default App;
