import React, { useContext } from "react";
import { Context } from "../store/appContext";

export const Pagination = () => {
	const { store, actions } = useContext(Context);

    const handlePage = (page) => {
        if(store.page == "characters"){
            actions.pagination(`https://www.swapi.tech/api/people?page=${page}&limit=12`)
        } else {
            
            actions.pagination(`https://www.swapi.tech/api/${store.page}?page=${page}&limit=12`)
        }
        actions.setCurrentPagination(page)
    }

    const index = [];
    for (var i = 1; i <= store.pagination; i++) {
        index.push(i);
    }

	return (
		<div>
                {!store.pagination ? 
                ""
                :
                <>
                    {index.map((item)=>
                        <a key={item} onClick={() => handlePage(item)} className={store.currentPagination == item ? "active btn btn-primary" : "btn btn-primary"}>{item}</a>
                    )}
                </>
                }
            </div>
	);
};
