import React, { useEffect, useContext } from "react";
import { Context } from "../store/appContext.js";

export const PlanetDetails = () => {
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
                            <p>Climate: {store.currentInfo.properties.climate}</p>
                            <p>Diameter: {store.currentInfo.properties.diameter}</p>
                            <p>Gravity: {store.currentInfo.properties.gravity}</p>
                            <p>Orbital period: {store.currentInfo.properties.orbital_period}</p>
                            <p>Population: {store.currentInfo.properties.population}</p>
                            <p>Rotation period: {store.currentInfo.properties.rotation_period}</p>
                            <p>Surface water: {store.currentInfo.properties.surface_water}</p>
                            <p>Terrain: {store.currentInfo.properties.terrain}</p>
                        </div>

                    </div>
                }
            </div>
        </div>
    )
}