import React, { useState } from "react";

import { UserAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "../styles/Auth.scss";

function SignUp() {
	const [formData, setFormData] = useState({
		email: "",
		password: "",
	});
	const navigate = useNavigate();
	const { user, signUp } = UserAuth();

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
		try {
			await signUp(formData.email, formData.password);
			navigate("/");
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div className="auth-page">
			<div className="body mx-auto">
				<div className="title">
					<h3>Sign Up</h3>
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

						<button>Sign Up</button>
					</div>
				</form>
			</div>
		</div>
	);
}

export default SignUp;
