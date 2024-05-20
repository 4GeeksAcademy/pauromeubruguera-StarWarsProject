import React, { useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import Video from '../../video/videoHome.mp4'

export const Home = () => {
	const { store, actions } = useContext(Context);

	return (
		<div className="video-responsive text-center mt-5">
			<video src={Video} type="video/mp4" controls="none" muted loop autoplay="true" />
		</div>
	);
};
