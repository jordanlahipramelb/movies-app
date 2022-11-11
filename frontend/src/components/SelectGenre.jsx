import React from "react";
import { useDispatch } from "react-redux";
import "../styles/SelectGenre.scss";

import { fetchDataByGenre } from "../store";

const SelectGenre = ({ genres, type }) => {
	const dispatch = useDispatch();

	return (
		<select
			className="selectgenre d-flex"
			// Dispatch function when data changes
			onChange={(e) => {
				dispatch(
					fetchDataByGenre({
						genres,
						genre: e.target.value,
						type,
					})
				);
			}}
		>
			{genres.map((genre) => {
				return (
					<option value={genre.id} key={genre.id}>
						{genre.name}
					</option>
				);
			})}
		</select>
	);
};

export default SelectGenre;
