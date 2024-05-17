import React, { useEffect, useContext } from "react";
import { Context } from "../store/appContext.js";

export const VehicleDetails = () => {
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
                            <p>Cargo capacity: {store.currentInfo.properties.cargo_capacity}kg</p>
                            <p>Crew: {store.currentInfo.properties.crew}</p>
                            <p>Consumables: {store.currentInfo.properties.consumables}</p>
                            <p>Length: {store.currentInfo.properties.length}m</p>
                            <p>Manufacturer: {store.currentInfo.properties.manufacturer}</p>
                            <p>Max Atmosphering Speed: {store.currentInfo.properties.max_atmosphering_speed}km/h</p>
                            <p>Model: {store.currentInfo.properties.model}</p>
                            <p>Passengers: {store.currentInfo.properties.passengers}</p>
                        </div>

                    </div>
                }
            </div>
        </div>
    )
}