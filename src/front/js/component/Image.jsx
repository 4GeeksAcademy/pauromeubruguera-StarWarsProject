import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";

export const Image = (props) => {
    const { store, actions } = useContext(Context);

    const imgError = (event) => {
        event.target.src = 'https://starwars-visualguide.com/assets/img/placeholder.jpg';
    }
    const handleCharacter = (url) => {
        actions.setURL(url)
    }

    return (
        <div className="imgContainer">
            <img src={`https://starwars-visualguide.com/assets/img/${store.page}/${props.item.uid}.jpg`} onError={imgError} className="card-img-top" alt="..." />
            <Link to={`/${store.page}-details/${props.item.uid}`} className="" onClick={() => handleCharacter(props.item.url)}>
                <div className="opacityFilter">
                    <span>Details</span>
                </div>
            </Link>
        </div>
    );
};
