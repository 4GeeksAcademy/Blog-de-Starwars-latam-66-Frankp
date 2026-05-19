import React from "react";
import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";

export const Navbar = () => {
    const { store, dispatch } = useGlobalReducer();
    const favoritesList = store?.favorites || [];

    return (
        <nav className="navbar navbar-dark bg-black border-bottom border-secondary px-5 py-3">
            <div className="container-fluid d-flex justify-content-between align-items-center">
                {/* LOGO DE STAR WARS (Ruta directa de producción) */}
                <Link to="/">
                    <img 
                        src="https://rodrijok.github.io/Star_Wars_Page/images/Star-wars-logo.webp" 
                        alt="Star Wars Logo" 
                        style={{ height: "45px", objectFit: "contain" }} 
                    />
                </Link>
                
                {/* CONTENEDOR DEL DROPDOWN */}
                <div className="dropdown">
                    <button 
                        className="btn btn-primary btn-lg dropdown-toggle d-flex align-items-center gap-2" 
                        type="button" 
                        id="dropdownFavorites" 
                        data-bs-toggle="dropdown" 
                        data-bs-auto-close="outside" // 🚀 EVITA QUE SE CIERRE AL BORRAR UN ELEMENTO
                        aria-expanded="false"
                    >
                        Favorites 
                        <span className="badge bg-warning text-dark rounded-pill fw-bold ms-1">
                            {favoritesList.length}
                        </span>
                    </button>
                    
                    <ul 
                        className="dropdown-menu dropdown-menu-end bg-dark border border-secondary p-2 shadow-lg" 
                        aria-labelledby="dropdownFavorites" 
                        style={{ minWidth: "260px" }}
                    >
                        {favoritesList.length === 0 ? (
                            <li className="text-center text-muted py-3 small font-monospace">(Empty)</li>
                        ) : (
                            favoritesList.map((fav, index) => (
                                <li 
                                    key={index} 
                                    className="d-flex justify-content-between align-items-center border-bottom border-secondary/25 mx-1 py-2 px-2 rounded"
                                    style={{ backgroundColor: "#1a1b1e", marginBottom: "4px" }}
                                >
                                    {/* Link interno con truncado por si el nombre del personaje es muy largo */}
                                    <Link 
                                        to={`/single/${fav.type}/${fav.uid}`} 
                                        className="text-decoration-none text-light text-truncate small pe-2"
                                        style={{ maxWidth: "180px" }}
                                    >
                                        <i className="fas fa-jedi text-warning me-2 small"></i>
                                        {fav.name}
                                    </Link>

                                    {/* Icono de eliminación interactivo */}
                                    <span 
                                        className="text-danger px-1" 
                                        style={{ cursor: "pointer", transition: "transform 0.2s" }}
                                        onClick={() => dispatch({ type: "TOGGLE_FAVORITE", payload: fav })}
                                        title="Remove from favorites"
                                    >
                                        <i className="fas fa-trash-alt small"></i>
                                    </span>
                                </li>
                            ))
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
};