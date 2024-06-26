import React, { useEffect, useContext } from "react";
import { Context } from "../store/appContext.js";

export const Favorites = (props) => {
    const { store, actions } = useContext(Context);

    const handleFavorites = () => {
        const fav = {
            "name": props.name,
            "id": props.id,
            "url": props.url
        }
        store.favoritos.filter((el) => (el.id.includes(props.id)) && (el.name.includes(props.name))).length > 0 
            ? 
            "" 
            : 
            actions.setFavorties(fav)
    }
    const deleteFavorites = () => {
     
        store.favoritos.filter((el) => (el.id.includes(props.id)) && (el.name.includes(props.name))).length > 0 
            ? 
            actions.deleteFavorties(props)
            : 
            ""
    }
    useEffect(() => {

    }, [])

    return (
        <>
            {store.favoritos.filter((el) => (el.id.includes(props.id)) && (el.name.includes(props.name))).length > 0 ?
                <span onClick={deleteFavorites} id={props.id} className="btn-fav">
                    {<i className="fa-solid fa-star"></i>}
                </span>
                :
                <span onClick={handleFavorites} id={props.id} className="btn-fav">
                    <i className="fa-regular fa-star"></i>
                </span>
            }

        </>
    )
}