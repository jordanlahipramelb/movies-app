/** Redux store in Movies App */

import {
	configureStore,
	createAsyncThunk,
	createSlice,
} from "@reduxjs/toolkit";
import { API_KEY, TMDB_BASE_URL } from "../utils/constants";
import axios from "axios";

const initialState = {
	movies: [],
	genresLoaded: false,
	genres: [],
	searchedMovies: [],
};

/** Fetch movie genres */
export const fetchGenres = createAsyncThunk("movies/genres", async () => {
	const {
		data: { genres },
	} = await axios.get(`${TMDB_BASE_URL}/genre/movie/list?api_key=${API_KEY}`);

	// console.log("fetchGenres:", genres);
	return genres;
});

/** Creates array of raw data from fetchRawData function
 *
 *
 */

const createArrFromRawData = (arr, moviesArr, genres) => {
	// console.log("createArrFromRawData:", arr);
	arr.forEach((movie) => {
		const movieGenres = [];

		// Loop through each genre id and match them with the name of the genre, pushes the name onto the movieGenres array
		movie.genre_ids.forEach((genre) => {
			const name = genres.find(({ id }) => id === genre);
			if (name) movieGenres.push(name.name);
		});

		if (movie.backdrop_path)
			moviesArr.push({
				id: movie.id,
				name: movie?.original_name ? movie.original_name : movie.original_title,
				image: movie.backdrop_path,
				overview: movie.overview,
				release_date: movie.release_date,
				genres: movieGenres.slice(0, 3), // first 3 genres
			});
	});
};

/** Fetch raw data of movies */

const fetchRawData = async (url, genres, paging = false) => {
	const moviesArr = [];

	for (let i = 1; moviesArr.length < 60 && i < 10; i++) {
		const {
			data: { results },
		} = await axios.get(`${url}${paging ? `&page=${i}` : ""}`);

		// console.log("fetchRawData", results);
		createArrFromRawData(results, moviesArr, genres);
	}
	return moviesArr;
};

/** Fetch movie data by genre
 *
 * thunkApi => current state in order to get genres
 * type => movie, tvshow, all
 * moviesApp => movieAppSlice
 */

export const fetchDataByGenre = createAsyncThunk(
	"movies/genre",
	async ({ genre, type }, thunkAPI) => {
		const {
			moviesApp: { genres },
		} = thunkAPI.getState();
		return fetchRawData(
			`${TMDB_BASE_URL}/discover/${type}?api_key=${API_KEY}&with_genres=${genre}`,
			genres
		);
	}
);

/** Fetch Search Movie List
 *
 * thunkApi => current state in order to get genres
 * search => search keyword state
 * moviesApp => movieAppSlice
 */

export const fetchSearch = createAsyncThunk(
	"movies/search",
	async ({ searchKey }, thunkApi) => {
		const {
			moviesApp: { genres },
		} = thunkApi.getState();

		return fetchRawData(
			`${TMDB_BASE_URL}/search/company?api_key=${API_KEY}&query=${searchKey}`,
			genres,
			true
		);
	}
);

/** Fetch trending of the week
 *
 * thunkApi => current state in order to get genres
 * type => movies, tv shows, all
 * moviesApp => movieAppSlice
 */

export const fetchMovies = createAsyncThunk(
	"movies/trending",
	async ({ type }, thunkApi) => {
		const {
			moviesApp: { genres },
		} = thunkApi.getState();

		return fetchRawData(
			`${TMDB_BASE_URL}/trending/${type}/week?api_key=${API_KEY}`,
			genres,
			true
		);
	}
);

export const fetchUsersLikedMovies = createAsyncThunk(
	"movies/getLiked",
	async (email) => {
		const {
			data: { movies },
		} = await axios.get(`http://localhost:3001/api/user/liked/${email}`);
		return movies;
	}
);

export const removeMovieFromLikedMovies = createAsyncThunk(
	"movies/deleteLiked",
	async ({ email, movieId }) => {
		const {
			data: { movies },
		} = await axios.put("http://localhost:3001/api/user/remove", {
			email,
			movieId,
		});
		return movies;
	}
);

const moviesAppSlice = createSlice({
	name: "movies-app",
	initialState,
	extraReducers: (builder) => {
		/** Genres */
		builder.addCase(fetchGenres.fulfilled, (state, action) => {
			state.genres = action.payload;
			state.genresLoaded = true;
		});

		/** Movies */
		builder.addCase(fetchMovies.fulfilled, (state, action) => {
			state.movies = action.payload;
		});

		/** Search */
		builder.addCase(fetchSearch.fulfilled, (state, action) => {
			state.searchedMovies = action.payload;
		});

		/** Data by genre */
		builder.addCase(fetchDataByGenre.fulfilled, (state, action) => {
			state.movies = action.payload;
		});

		/** Users liked movies */
		builder.addCase(fetchUsersLikedMovies.fulfilled, (state, action) => {
			state.movies = action.payload;
		});

		/** Remove movie from list */
		builder.addCase(removeMovieFromLikedMovies.fulfilled, (state, action) => {
			state.movies = action.payload;
		});
	},
});

/** using createSlice
 * createSlice takes an object with three main options fields:

 * name: a string that will be used as the prefix for generated action types
 * initialState: the initial state of the reducer
 * reducers: an object where the keys are strings, and the values are "case reducer" functions that will handle specific actions
 */

/** Redux store */
export const store = configureStore({
	reducer: {
		moviesApp: moviesAppSlice.reducer,
	},
});
