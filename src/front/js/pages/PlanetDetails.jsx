import React, { useEffect, useContext } from "react";
import { Context } from "../store/appContext.js";

export const PlanetDetails = () => {
    const { store, actions } = useContext(Context);

    useEffect(()=>{
        actions.getInfoDetails()
    },[])

    return (
        <div className="container-fluid my-4">
            <div className="row">
               {!store.currentInfo ? 
               ""
               :
               <>
                <h1>{store.currentInfo.properties.name}</h1>  
               </>
               }
            </div>
        </div>
    )
}