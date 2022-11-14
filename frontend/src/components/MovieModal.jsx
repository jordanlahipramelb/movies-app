import React from "react";
import { AiOutlineClose } from "react-icons/ai";
import "../styles/Modal.scss";

function MovieModal({ open, onClose, name, overview, release_date, genres }) {
	if (!open) return null;

	return (
		<div className="overlay">
			<div className="modal-container">
				<div className="header">
					<h3>{name}TEST</h3>
					<h6>{release_date}</h6>
					<div className="right">
						<AiOutlineClose onClick={onClose} />
					</div>
				</div>
				<div className="content">
					<p>{overview}</p>
					<ul className="d-flex text-center">
						{/* {genres.map((genre) => (
							<li key={genre}>{genre}</li>
						))} */}
					</ul>
					<div className="footer">
						<button>Add to List</button>
					</div>
				</div>
			</div>
		</div>
	);
}

export default MovieModal;
