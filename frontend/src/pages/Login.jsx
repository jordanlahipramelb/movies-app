import { onAuthStateChanged } from "firebase/auth";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";
import "../styles/Auth.scss";
import { firebaseAuth } from "../utils/firebase-config";

function Login() {
	const [formData, setFormData] = useState({
		email: "",
		password: "",
	});
	const [error, setError] = useState("");
	const { logIn } = UserAuth();
	const navigate = useNavigate();

	/** Updates form field when typing */

	const handleChange = (evt) => {
		const { name, value } = evt.target;
		setFormData((data) => ({
			...data,
			[name]: value,
		}));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setError("");
		try {
			await logIn(formData.email, formData.password);
			navigate("/");
		} catch (error) {
			console.log(error);
			alert(error);
			setError(error.message);
		}
	};

	onAuthStateChanged(firebaseAuth, (currentUser) => {
		if (currentUser) navigate("/");
	});

	return (
		<div className="auth-page">
			<div className="body mx-auto">
				<div className="title">
					<h3>Sign In</h3>
				</div>

				<form onSubmit={handleSubmit}>
					<div className="d-flex flex-column">
						<input
							type="email"
							placeholder="Email Address"
							name="email"
							value={formData.email}
							onChange={handleChange}
						/>

						<input
							type="password"
							placeholder="Password"
							name="password"
							value={formData.password}
							onChange={handleChange}
						/>

						<button>Sign In</button>
					</div>
				</form>
			</div>
		</div>
	);
}

export default Login;
