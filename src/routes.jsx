import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

// 🚀 REEMPLAZO CON LAS CARPETAS REALES DE TU PROYECTO
import { Home } from "./pages/Home.jsx";      // Cambiado de views a pages
import { Single } from "./pages/Single.jsx";  // Cambiado de views a pages
import { Navbar } from "./components/Navbar.jsx";
import { Footer } from "./components/Footer.jsx";

const Layout = () => {
    return (
        <BrowserRouter>
            {/* La Navbar va una sola vez arriba de todo */}
            <Navbar /> 
            
            <Routes>
                <Route path="/" element={<Home />} />
                
                {/* Ruta única para la vista detallada */}
                <Route path="/single/:type/:theid" element={<Single />} />
                
                <Route path="*" element={<h1 className="text-white text-center mt-5">Not found!</h1>} />
            </Routes>
            
            <Footer />
        </BrowserRouter>
    );
};

export default Layout;