import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";

export const Navbar = () => {
	const { store, actions } = useContext(Context);

	return (
		<nav className="navbar navbar-expand-lg bg-body-tertiary">
			<div className="container-fluid">
				<Link to="/" onClick={() => { actions.changePage("home") }} className={store.page == "home" ? "active" : ""}>
					<span className="navbar-brand mb-0 h1">Star Wars Blog</span>
				</Link>
				<button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
					<span className="navbar-toggler-icon"></span>
				</button>
				<div className="collapse navbar-collapse" id="navbarSupportedContent">
					<ul className="navbar-nav me-auto mb-2 mb-lg-0">
						<li className="nav-item">
							<Link to="/characters" onClick={() => { actions.changePage("characters") }} className={store.page == "characters" ? "active" : ""}>
								<span className="navbar-brand mb-0 h1">Characters</span>
							</Link>
						</li>
						<li className="nav-item">
							<Link to="/planets" onClick={() => { actions.changePage("planets") }} className={store.page == "planets" ? "active" : ""}>
								<span className="navbar-brand mb-0 h1">Planets</span>
							</Link>
						</li>
						<li className="nav-item">
							<Link to="/vehicles" onClick={() => { actions.changePage("vehicles") }} className={store.page == "vehicles" ? "active" : ""}>
								<span className="navbar-brand mb-0 h1">Vehicles</span>
							</Link>
						</li>
						<li className="nav-item dropdown">
							<a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
								Favoritos
							</a>
							<ul className="dropdown-menu">
								{store.favoritos.length > 0 ?
									<>
										{store.favoritos.map((item, key) =>
											<li key={key}>
												<a className="dropdown-item" href="#">{item.name}</a>
											</li>
										)}
									</>
									:
									"Añade favoritos"
								}
							</ul>
						</li>
					</ul>
					<form className="d-flex" role="search">
						<input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
						<button className="btn btn-outline-success" type="submit">Search</button>
					</form>
				</div>
			</div>
		</nav>
	);
};
