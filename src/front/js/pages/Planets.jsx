import React, { useEffect, useContext } from "react";
import { Context } from "../store/appContext.js";
import { Pagination } from "../component/Pagination.jsx";
import { Favorites } from "../component/Favorites.jsx";
import { Image } from "../component/Image.jsx";

export const Planets = () => {
    const { store, actions } = useContext(Context);

    useEffect(() => {
        actions.changePage("planets")
        actions.pagination()
    }, [])

    return (
        <div className="container-fluid my-4 px-4">
            <Pagination />
            <div className="row">
                {!store.info ?
                    ""
                    :
                    <>
                        {store.info.map((item) =>
                            <div className="col-2" key={item.uid}>
                                <div className="card my-4">
                                    <Image item={item} />
                                    <div className="card-body d-flex justify-content-between">
                                        <h5 className="card-title">{item.name}</h5>
                                        <Favorites id={item.uid} url={item.url} name={item.name} />
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