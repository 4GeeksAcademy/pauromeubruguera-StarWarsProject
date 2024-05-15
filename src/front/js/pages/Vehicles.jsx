import React, { useEffect, useContext } from "react";
import { Context } from "../store/appContext.js";
import { Link } from "react-router-dom";
import { Pagination } from "../component/Pagination.jsx";

export const Vehicles = () => {
    const { store, actions } = useContext(Context);

    const handleCharacter = (url) => {
        actions.setURL(url)
    }

    useEffect(() => {
        actions.pagination("https://www.swapi.tech/api/vehicles?page=1&limit=12")
        actions.changePage("vehicles")
        actions.getInfo()
    }, [])

    return (
        <div className="container-fluid my-4">
        <Pagination />
            <div className="row">
                {!store.info ?
                    ""
                    :
                    <>
                        {store.info.map((item) =>
                            <div className="col-2" key={item.uid}>
                                <div className="card">
                                    <img src={`https://starwars-visualguide.com/assets/img/${store.page}/${item.uid}.jpg`} className="card-img-top" alt="..." />
                                    <div className="card-body">
                                        <h5 className="card-title">{item.name}</h5>
                                        <Link to={`/vehicle-details/${item.uid}`} className="btn btn-primary" onClick={() => handleCharacter(item.url)}>Details</Link>
                                    </div>
                                </div>
                            </div>
                        )}
                    </>
                }
            </div>
        </div>
    )
}