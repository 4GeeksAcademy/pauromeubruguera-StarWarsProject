import React from "react";
import { Link } from "react-router-dom";

export const Navbar = () => {

	return (
		<nav className="navbar navbar-light bg-light">
			<div className="container">
				<Link to="/">
					<span className="navbar-brand mb-0 h1">Star Wars Blog</span>
				</Link>
				<Link to="/characters">
					<span className="navbar-brand mb-0 h1">Characters</span>
				</Link>
				<Link to="/planets">
					<span className="navbar-brand mb-0 h1">Planets</span>
				</Link>
				<Link to="/vehicles">
					<span className="navbar-brand mb-0 h1">Vehicles</span>
				</Link>
			</div>
		</nav>
	);
};
