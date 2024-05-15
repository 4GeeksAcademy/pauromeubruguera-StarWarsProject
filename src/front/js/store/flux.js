const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			info: [],
			page: "home",
			pagination: null,
			currentPagination: 1,
			infoUrl: "",
			currentInfo: null,
			currentInfoUrl: sessionStorage.getItem('currentInfoUrl') ? sessionStorage.getItem('currentInfoUrl') : '',
			favoritos: []
		},
		actions: {
			// Use getActions to call a function within a fuction
			getInfo: async () => {
				const response = await fetch(getStore().infoUrl);
				if (!response.ok) {
					console.log("Error");
					return
				}
				const data = await response.json();
				setStore({ info: data.results });
				setStore({ pagination: data.total_pages });
			},
			changePage: (page) => {
				if(page != getStore().page) {
					setStore({ currentPagination: 1 })
				}
				setStore({ page: page })
				sessionStorage.setItem('page', page)
			},
			pagination: (pagination) => {
				setStore({ infoUrl: pagination })
				getActions().getInfo()
			},
			setCurrentPagination: (currentPage) => {
				setStore({ currentPagination: currentPage })
			},
			setURL: (text) => {
				setStore({ currentInfoUrl: text })
				sessionStorage.setItem('currentInfoUrl', text)
			},
			getInfoDetails: async () => {
				const response = await fetch(getStore().currentInfoUrl);
				if (!response.ok) {
					console.log("Error");
					return
				}
				const data = await response.json();
				setStore({ currentInfo: data.result });
			},
			setFavorties: (fav) => {
				getStore().favoritos.push(fav)
				setStore({ favoritos: getStore().favoritos });
			},
			deleteFavorties: (item) => {
				const arr = getStore().favoritos.filter(((el) => (el.id !== item.id) && (el.name !== item.name)))
				setStore({ favoritos: arr });
			}
		}
	};
};

export default getState;
