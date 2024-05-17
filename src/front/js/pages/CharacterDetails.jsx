import React, { useEffect, useContext } from "react";
import { Context } from "../store/appContext.js";

export const CharacterDetails = () => {
    const { store, actions } = useContext(Context);

    const imgError = (event) => {
        event.target.src = 'https://starwars-visualguide.com/assets/img/placeholder.jpg';
    }

    useEffect(() => {
        actions.getInfoDetails()
    }, [])

    return (
        <div className="container-fluid my-4">
            <div className="row">
                {(!store.currentInfo) ?
                    ""
                    :
                    <div className="detailsContainer row">
                        <div className="detailsImage">
                            <img src={`https://starwars-visualguide.com/assets/img/${store.page}/${store.currentInfo.uid}.jpg`} onError={imgError} className="card-img-top" alt="..." />
                        </div>
                        <div className="detailsText">
                            <h3>{store.currentInfo.properties.name}</h3>
                            <p>{store.currentInfo.description}</p>
                            <p>Birth year: {store.currentInfo.properties.birth_year}</p>
                            <p>Gender: {store.currentInfo.properties.gender}</p>
                            <p>Eye color: {store.currentInfo.properties.eye_color}</p>
                            <p>Height: {store.currentInfo.properties.height}cm</p>
                            <p>Mass: {store.currentInfo.properties.mass}kg</p>
                            <p>Skin color: {store.currentInfo.properties.skin_color}</p>
                        </div>

                    </div>
                }
            </div>
        </div>
    )
}