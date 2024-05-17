import React, { useContext } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";
import { BackendURL } from "./component/backendURL";

import { Home } from "./pages/Home.jsx";
import { Characters } from "./pages/Characters.jsx";
import { CharacterDetails } from "./pages/CharacterDetails.jsx";
import { Planets } from "./pages/Planets.jsx";
import { Vehicles } from "./pages/Vehicles.jsx";
import { Contacts } from "./pages/Contacts.jsx"
import injectContext, { Context } from "./store/appContext";

import { Background } from "./component/Background.jsx";
import { Navbar } from "./component/Navbar.jsx";
import { Footer } from "./component/Footer.jsx";
import { PlanetDetails } from "./pages/PlanetDetails.jsx";
import { VehicleDetails } from "./pages/VehicleDetails.jsx";
import { AddContact } from "./pages/AddContact.jsx";

//create your first component
const Layout = () => {
    const { store, actions } = useContext(Context);
    //the basename is used when your project is published in a subdirectory and not in the root of the domain
    // you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
    const basename = process.env.BASENAME || "";

    if(!process.env.BACKEND_URL || process.env.BACKEND_URL == "") return <BackendURL/ >;

    return (
        <div className={store.theme}>
            <BrowserRouter basename={basename}>
                <ScrollToTop>
                    <Background />
                    <Navbar />
                    <Routes>
                        <Route element={<Home />} path="/" />
                        <Route element={<Characters />} path="/characters" />
                        <Route element={<CharacterDetails />} path="/characters-details/:userId" />
                        <Route element={<PlanetDetails />} path="/planets-details/:userId" />
                        <Route element={<VehicleDetails />} path="/vehicles-details/:userId" />
                        <Route element={<Planets />} path="/planets" />
                        <Route element={<Vehicles />} path="/vehicles" />
                        <Route element={<Contacts />} path="/contacts" />
                        <Route element={<AddContact />} path="/add-contact" />
                        <Route element={<h1>Not found!</h1>} path="*" />
                    </Routes>
                    <Footer />
                </ScrollToTop>
            </BrowserRouter>
        </div>
    );
};

export default injectContext(Layout);
