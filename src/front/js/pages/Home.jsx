import React, { useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";

export const Home = () => {
	const { store, actions } = useContext(Context);

	return (
		<div className="video-responsive text-center mt-5">
			<iframe width="560" height="315" src="https://www.youtube.com/embed/FoeuhJ8lnEQ?si=DoXC2J5AC2n_iAJ2" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; muted" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
		</div>
	);
};
