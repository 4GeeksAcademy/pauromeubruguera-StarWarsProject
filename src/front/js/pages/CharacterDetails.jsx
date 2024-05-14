import React, { useEffect, useContext } from "react";
import { Context } from "../store/appContext.js";

export const CharacterDetails = () => {
    const { store, actions } = useContext(Context);

    useEffect(()=>{
        actions.getCharacterDetails()
    },[])

    return (
        <div className="container-fluid my-4">
            <div className="row">
               {!store.currentCharacter ? 
               "a"
               :
               <>
           
                <h1>{store.currentCharacter.properties.name}</h1> 
             
               </>
               }
            </div>
        </div>
    )
}