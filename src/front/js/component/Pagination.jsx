import React, { useContext } from "react";
import { Context } from "../store/appContext";

export const Pagination = () => {
	const { store, actions } = useContext(Context);

    const handlePage = (page) => {
        actions.setCurrentPagination(page)
    }

    const index = [];
    for (var i = 1; i <= store.totalPages; i++) {
        index.push(i);
    }

	return (
		<div className="pagination">
                {!store.totalPages ? 
                ""
                :
                <>
                    {index.map((item)=>
                        <a key={item} onClick={() => handlePage(item)} className={store.currentPagination == item ? "active btn btn-pagination" : "btn btn-pagination"}>{item}</a>
                    )}
                </>
                }
            </div>
	);
};
