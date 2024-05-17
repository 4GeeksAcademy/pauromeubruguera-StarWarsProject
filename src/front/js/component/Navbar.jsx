import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import empire from '../../img/empire-logo.png';
import rebels from '../../img/rebels-logo.png';

export const Navbar = () => {
	const { store, actions } = useContext(Context);

	const handleTheme = (theme) => {
		actions.setTheme(theme)
	}
	const handleCharacter = (url) => {
		actions.setURL(url)
	}
	const deleteFavorites = (delItem) => {

		store.favoritos.filter((el) => (el.id.includes(delItem.id)) && (el.name.includes(delItem.name))).length > 0
			?
			actions.deleteFavorties(delItem)
			:
			""
	}

	return (
		<nav className="navbar mx-4 navbar-expand-lg bg-body-tertiary">
			<div className="container-fluid">
				<Link to="/" onClick={() => { actions.changePage("home") }} className={store.page == "home" ? "active starWarsFont" : "starWarsFont"}>
					Star Wars
				</Link>
				<button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
					<span className="navbar-toggler-icon"></span>
				</button>
				<div className="collapse navbar-collapse" id="navbarSupportedContent">
					<ul className="navbar-nav me-auto mb-2 mb-lg-0 container-fluid d-flex justify-content-around">
						<li className="nav-item">
							<Link to="/characters" onClick={() => { actions.changePage("characters") }} className={store.page == "characters" ? "active" : ""}>
								Characters
							</Link>
						</li>
						<li className="nav-item">
							<Link to="/planets" onClick={() => { actions.changePage("planets") }} className={store.page == "planets" ? "active" : ""}>
								Planets
							</Link>
						</li>
						<li className="nav-item">
							<Link to="/vehicles" onClick={() => { actions.changePage("vehicles") }} className={store.page == "vehicles" ? "active" : ""}>
								Vehicles
							</Link>
						</li>
						<li className="nav-item dropdown">
							<a className="dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
								Favoritos <span className="position-absolute top-0 start-85 translate-middle badge rounded-pill">{store.favoritos.length}</span>
							</a>
							<ul className="dropdown-menu menu-background">
								{!store.favoritos ?
									""
									:
									<>
										{store.favoritos.length > 0 ?
											<>
												{store.favoritos.map((item, key) =>
													<li key={key} >
														<div className="d-flex justify-content-between favorites-list">
															<Link className="dropdown-item" to={`/character-details/${item.uid}`} onClick={() => handleCharacter(item.url)}>{item.name}</Link>
															<span className="deleteFav" onClick={() => deleteFavorites(item)}>
																<i className="fas fa-trash"></i>
															</span>
														</div>
														<hr></hr>
													</li>

												)}
											</>
											:
											<li className="placeholderFav">
												Añade favoritos
											</li>
										}
									</>
								}
							</ul>
						</li>
						<li className="nav-item">
							<Link to="/contacts" onClick={() => { actions.changePage("contacts") }} className={store.page == "contacts" ? "active" : ""}>
								Contacts
							</Link>
						</li>
					</ul>
					{/* <form className="d-flex" role="search">
						<input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
						<button className="btn btn-outline-success" type="submit">Search</button>
					</form> */}
					<div className="logoContainer d-flex">
						<span className="logo empireLogo" onClick={() => handleTheme("empire")}>
							<img src={empire} />
						</span>
						<span className="logo rebelsLogo" onClick={() => handleTheme("rebels")}>
							<img src={rebels} />
						</span>
					</div>
				</div>

			</div>
		</nav>
	);
};
