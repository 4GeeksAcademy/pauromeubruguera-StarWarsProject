const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			info: [],
			page: "home",
			totalPages: null,
			currentPagination: 1,
			infoUrl: "",
			currentInfo: null,
			currentInfoUrl: sessionStorage.getItem('currentInfoUrl') ? sessionStorage.getItem('currentInfoUrl') : '',
			favoritos: sessionStorage.getItem('favorites') ? JSON.parse(sessionStorage.getItem('favorites')) : [],
			theme: "empire",
			apiContact: 'https://playground.4geeks.com/contact',
			agenda: 'spain',
			contacts: null,
			deleteContact: null,
			editContact: null
		},
		actions: {
			// Use getActions to call a function within a fuction
			getInfo: async () => {
				if (sessionStorage.getItem(getStore().page+getStore().currentPagination)) {
					setStore({ info: JSON.parse(sessionStorage.getItem(getStore().page+getStore().currentPagination)) });
					if(getStore().page == "characters") setStore({ totalPages: JSON.parse(sessionStorage.getItem('characterPages')) });
					if(getStore().page == "planets") setStore({ totalPages: JSON.parse(sessionStorage.getItem('planetsPages')) });
					if(getStore().page == "vehicles") setStore({ totalPages: JSON.parse(sessionStorage.getItem('vehiclesPages')) });
					return;
				} 
				const response = await fetch(getStore().infoUrl);
				if (!response.ok) {
					console.log("Error");
					return
				}
				const data = await response.json();
				setStore({ info: data.results });
				setStore({ totalPages: data.total_pages });
				sessionStorage.setItem(getStore().page+getStore().currentPagination, JSON.stringify(data.results))
				
				if(getStore().page == "characters") sessionStorage.setItem('characterPages', JSON.stringify(data.total_pages))
				if(getStore().page == "planets") sessionStorage.setItem('planetsPages', JSON.stringify(data.total_pages))
				if(getStore().page == "vehicles") sessionStorage.setItem('vehiclesPages', JSON.stringify(data.total_pages))
			},
			changePage: (page) => {
				if(page != getStore().page) {
					setStore({ currentPagination: 1 })
				}
				setStore({ page: page })
				sessionStorage.setItem('page', page)
			},
			pagination: () => {
				if(getStore().page == "characters"){
					setStore({ infoUrl: `https://www.swapi.tech/api/people?page=${getStore().currentPagination}&limit=12` })
				} else {
					setStore({ infoUrl: `https://www.swapi.tech/api/${getStore().page}?page=${getStore().currentPagination}&limit=12` })
				}			
				getActions().getInfo()
			},
			setCurrentPagination: (currentPage) => {
				setStore({ currentPagination: currentPage })
				getActions().pagination()
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
				console.log(getStore().favoritos)
				sessionStorage.setItem('favorites', JSON.stringify(getStore().favoritos))
			},
			deleteFavorties: (item) => {
				const filterFav = getStore().favoritos.filter(((el) => (el.id !== item.id) && (el.name !== item.name)))
				setStore({ favoritos: filterFav });
				sessionStorage.setItem('favorites', JSON.stringify(filterFav))
			},
			setTheme: (theme) => {
				setStore({ theme: theme });
			},
			getContacts: async () => {
				const uri = getStore().apiContact + '/agendas/' + getStore().agenda + '/contacts';
				const response = await fetch(uri);
				if(!response.ok) {
					console.log('error', response.status, response.statusText);
					return
				}
				const data = await response.json();
				setStore({contacts: data.contacts})
			},
			addContact: async (dataToSend) => {
				const uri = getStore().apiContact + '/agendas/' + getStore().agenda + '/contacts';
				const options = {
					method: 'POST',
					headers: {
						'Content-type': 'application/json'
					},
					body: JSON.stringify(dataToSend)
				}
				const response = await fetch(uri, options);
				if (!response.ok) {
					console.log('error ', response.status, response.statusText);
					return
				}
				// const data = await response.json();
				getActions().getContacts();
			},
			editContact: async (dataToEdit) => {
				const uri = getStore().apiContact + '/agendas/' + getStore().agenda + '/contacts/' + getStore().editContact.id;
				const options = {
					method: 'PUT',
					headers: {
						'Content-type': 'application/json'
					},
					body: JSON.stringify(dataToEdit)
				}
				const response = await fetch(uri, options);
				if (!response.ok) {
					console.log('error ', response.status, response.statusText);
					return
				}
				// const data = await response.json();
				getActions().getContacts();
			},
			deleteContact: async (dataToDelete) => {
				const uri = getStore().apiContact + '/agendas/' + getStore().agenda + '/contacts/' + dataToDelete.id;
				const options = {
					method: 'DELETE'
				}
				const response = await fetch(uri, options);
				if (!response.ok) {
					console.log('error ', response.status, response.statusText);
					return
				}
				// const data = await response.json();
				getActions().getContacts();
			},
			deleteConfirmation: (item) => {
				setStore({deleteContact: item})
			},
			editConfirmation: (item) => {
				setStore({editContact: item})
			}
		}
	};
};

export default getState;
