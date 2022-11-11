import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";

function SearchBar({ searchFor }) {
	const [searchValue, setSearchValue] = useState("");

	const handleChange = (e) => {
		setSearchValue(e.target.value);
	};

	const handleSearch = (e) => {
		e.preventDefault();
		searchFor(searchValue.trim());

		setSearchValue("");
	};

	return (
		<form className="search" onClick={handleSearch}>
			<FaSearch />
			<input
				type="text"
				value={searchValue}
				onChange={handleChange}
				placeholder="Search"
			/>
		</form>
	);
}

export default SearchBar;
