import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: "AIzaSyD1mCJwf0DdF-i-38aRjjyGFBhTEzBJNMw",
	authDomain: "movies-app-a4a71.firebaseapp.com",
	projectId: "movies-app-a4a71",
	storageBucket: "movies-app-a4a71.appspot.com",
	messagingSenderId: "1097959234015",
	appId: "1:1097959234015:web:c37c66b1d08eba8a194c6a",
	measurementId: "G-2MLJWGS9TC",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const firebaseAuth = getAuth(app);

/** getAuth() ****

Returns the Auth instance associated with the provided FirebaseApp. If no instance exists, initializes an Auth instance with platform-specific default dependencies.
*/
