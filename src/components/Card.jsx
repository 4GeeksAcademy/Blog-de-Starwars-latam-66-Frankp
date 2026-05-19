import React from "react";
import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";

export const Card = ({ item, type }) => {
    const { store, dispatch } = useGlobalReducer();

    if (!item) return null;

    // 🚀 EXTRACCIÓN DIRECTA DESDE LA URL PROVISTA
    // Convertimos el uid en número. Si no es válido, por defecto usamos 1.
    const itemId = parseInt(item.uid) || 1;
    
    // Como el servidor provisto tiene exactamente 5 imágenes válidas (image1.jpg a image5.jpg),
    // usamos la operación módulo (%) para asegurar que cualquier ID asigne cíclicamente una foto real.
    const imageNumber = ((itemId - 1) % 5) + 1;
    
    // Construimos la ruta apuntando exactamente a la carpeta de imágenes que me diste
    const imgUrl = `https://rodrijok.github.io/Star_Wars_Page/images/image${imageNumber}.jpg`;

    // Comprobamos si el elemento ya está guardado en los favoritos globales
    const isFav = store?.favorites?.some(fav => fav.uid === item.uid && fav.type === type) || false;

    return (
        <div className="card bg-dark text-white border border-secondary m-2 shadow" style={{ minWidth: "18rem", maxWidth: "18rem" }}>
            <div style={{ height: "320px", overflow: "hidden", position: "relative", backgroundColor: "#111" }}>
                <img 
                    src={imgUrl} 
                    className="card-img-top" 
                    alt={item.name}
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
            </div>
            <div className="card-body d-flex flex-column justify-content-between">
                <h5 className="card-title text-warning fw-bold text-truncate" title={item.name}>{item.name}</h5>
                <div className="d-flex justify-content-between mt-3">
                    <Link to={`/single/${type}/${item.uid}`} className="btn btn-outline-primary btn-sm">
                        Learn more!
                    </Link>
                    <button 
                        className={`btn btn-sm ${isFav ? "btn-warning" : "btn-outline-warning"}`} 
                        onClick={() => dispatch({ type: "TOGGLE_FAVORITE", payload: { uid: item.uid, name: item.name, type: type } })}
                    >
                        <i className={`${isFav ? "fas" : "far"} fa-heart`}></i>
                    </button>
                </div>
            </div>
        </div>
    );
};