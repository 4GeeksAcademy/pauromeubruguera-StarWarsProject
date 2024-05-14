import React, { useEffect, useContext } from "react";
import { Context } from "../store/appContext.js";
import { Link } from "react-router-dom";

export const Characters = () => {
    const { store, actions } = useContext(Context);


    const handlePage = (page) => {
        actions.characterPagination(page)
    }

    const handleCharacter = (url) => {
        actions.setCharacterURL(url)
    }

    useEffect(() => {
        actions.characterPagination("https://www.swapi.tech/api/people?page=1&limit=10")
        actions.changePage("characters")
        actions.getCharacters()
    }, [])

    const index = [];
    for (var i = 1; i <= store.charactersPages; i++) {
        index.push(i);
    }


    return (
        <div className="container-fluid my-4">
            <div className="row">
                {!store.charactersPages ? 
                "a"
                :
                <>
                    {index.map((item)=>
                        <a key={item} onClick={() => handlePage(`https://www.swapi.tech/api/people?page=${item}&limit=10`)} className="btn btn-primary">{item}</a>
                    )}
                </>
                }
            </div>
            <div className="row">
                {!store.characters ?
                    "a"
                    :
                    <>
                        {store.characters.map((item) =>
                            <div className="col-2" key={item.uid}>
                                <div className="card">
                                    <img src={`https://starwars-visualguide.com/assets/img/characters/${item.uid}.jpg`} className="card-img-top" alt="..." />
                                    <div className="card-body">
                                        <h5 className="card-title">{item.name}</h5>
                                        <Link to={`/character-details/${item.uid}`} className="btn btn-primary" onClick={() => handleCharacter(item.url)}>Details</Link>
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