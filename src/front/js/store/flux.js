const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			characters: [],
			page: "",
			charactersPages: null,
			charactersUrl: "https://www.swapi.tech/api/people?page=1&limit=10",
			currentCharacter: null,
			currentCharacterUrl: sessionStorage.getItem('currentCharacterUrl') ? sessionStorage.getItem('currentCharacterUrl') : ''
		},
		actions: {
			// Use getActions to call a function within a fuction
			getCharacters: async () => {
				const response = await fetch(getStore().charactersUrl);
				if(!response.ok) {
					console.log("Error");
					return
				}
				const data = await response.json();
				setStore({characters: data.results});
				setStore({charactersPages: data.total_pages});
			},
			changePage: (page) => {
				setStore({page: page})
			},
			characterPagination: (pagination) => {
				setStore({charactersUrl: pagination})
				getActions().getCharacters()
			},
			setCharacterURL: (text) => {
				setStore({currentCharacterUrl: text})
				sessionStorage.setItem('currentCharacterUrl', text)
			},
			getCharacterDetails: async () => {
				const response = await fetch(getStore().currentCharacterUrl);
				if(!response.ok) {
					console.log("Error");
					return
				}
				const data = await response.json();
				setStore({currentCharacter: data.result});
			}
		}
	};
};

export default getState;
