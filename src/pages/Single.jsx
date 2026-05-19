import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";

export const Single = () => {
    const { store } = useGlobalReducer();
    const params = useParams(); // params.type ("people", "planets", "vehicles") y params.theid
    const [element, setElement] = useState(null);

    // Lógica cíclica para las imágenes de tu servidor estático
    const itemId = parseInt(params.theid) || 1;
    const imageNumber = ((itemId - 1) % 5) + 1;
    const imgUrl = `https://rodrijok.github.io/Star_Wars_Page/images/image${imageNumber}.jpg`;

    useEffect(() => {
        if (store && params.type && store[params.type]) {
            const found = store[params.type].find(item => item.uid === params.theid);
            setElement(found);
        }
    }, [params.type, params.theid, store]);

    // 🚀 1. TEXTOS DE INTRODUCCIÓN DINÁMICOS SEGÚN EL TÍTULO / CATEGORÍA
    const getDynamicDescription = () => {
        const name = element?.name || "This entity";
        switch (params.type) {
            case "people":
                return `${name} is a prominent figure whose actions have left a significant mark on galactic history. Recorded within the Jedi and Imperial archives, historical logs detail biological classifications, homeworld origins, and key faction allegiances during critical cosmic conflicts.`;
            case "planets":
                return `${name} is a distinct astronomical body documented within the galactic mapping grid. Local environmental surveys contain vital data regarding planetary biomes, atmospheric compositions, terrain variations, and local sentient population centers.`;
            case "vehicles":
                return `${name} represents a specialized marvel of galactic engineering and transport technology. Registered flight specs and ground mechanics outline its tactical utility, propulsion systems, speed limits, and payload capacities across multiple sectors.`;
            default:
                return `Classified databank records retrieved securely. Authorization cleared by Star Wars North standard protocol.`;
        }
    };

    return (
        <div className="container mt-5 text-white">
            <div className="card bg-dark border border-secondary mb-4 p-4 shadow-lg" style={{ backgroundColor: "#111" }}>
                <div className="row g-0 align-items-center">
                    
                    {/* COLUMNA DE LA IMAGEN */}
                    <div className="col-md-6 text-center" style={{ maxHeight: "400px", overflow: "hidden", borderRadius: "8px" }}>
                        <img 
                            src={imgUrl} 
                            className="img-fluid rounded border border-secondary shadow" 
                            alt={element?.name || "Star Wars Asset"} 
                            style={{ width: "100%", height: "100%", objectFit: "cover" }}
                        />
                    </div>

                    {/* COLUMNA DEL TITULO Y SUBTITULO (SIN LOADING) */}
                    <div className="col-md-6">
                        <div className="card-body px-4">
                            <h1 className="card-title text-warning fw-bold text-uppercase mb-3" style={{ letterSpacing: "1.5px" }}>
                                {element?.name || "Retrieving Databank..."}
                            </h1>
                            <p className="card-text text-muted fs-5" style={{ lineHeight: "1.7", textAlign: "justify" }}>
                                {getDynamicDescription()}
                            </p>
                        </div>
                    </div>
                </div>

                <hr className="border-secondary my-4" />

                {/* 🚀 2. SECCIÓN DE ESPECIFICACIONES TÉCNICAS DINÁMICAS (ESTILO DATABANK) */}
                <div className="row text-center font-monospace gy-3 px-2">
                    
                    {/* Propiedades si es un PERSONAJE (PEOPLE) */}
                    {params.type === "people" && (
                        <>
                            <div className="col-6 col-md-2 border-end border-secondary">
                                <span className="text-muted small d-block uppercase mb-1">GENDER</span>
                                <span className="text-warning fw-bold">Male / Custom</span>
                            </div>
                            <div className="col-6 col-md-2 border-end border-secondary">
                                <span className="text-muted small d-block uppercase mb-1">SPECIES</span>
                                <span className="text-warning fw-bold">Sentient</span>
                            </div>
                            <div className="col-6 col-md-2 border-end border-secondary">
                                <span className="text-muted small d-block uppercase mb-1">HEIGHT</span>
                                <span className="text-warning fw-bold">1.72 m</span>
                            </div>
                            <div className="col-6 col-md-2 border-end border-secondary">
                                <span className="text-muted small d-block uppercase mb-1">INDEX ID</span>
                                <span className="text-warning fw-bold">#{params.theid}</span>
                            </div>
                            <div className="col-6 col-md-2 border-end border-secondary">
                                <span className="text-muted small d-block uppercase mb-1">AFFILIATION</span>
                                <span className="text-warning fw-bold text-truncate d-block">Sector North</span>
                            </div>
                            <div className="col-6 col-md-2">
                                <span className="text-muted small d-block uppercase mb-1">STATUS</span>
                                <span className="text-success fw-bold">Active</span>
                            </div>
                        </>
                    )}

                    {/* Propiedades si es un PLANETA (PLANETS) */}
                    {params.type === "planets" && (
                        <>
                            <div className="col-6 col-md-2 border-end border-secondary">
                                <span className="text-muted small d-block uppercase mb-1">CLIMATE</span>
                                <span className="text-warning fw-bold">Arid / Temperate</span>
                            </div>
                            <div className="col-6 col-md-2 border-end border-secondary">
                                <span className="text-muted small d-block uppercase mb-1">TERRAIN</span>
                                <span className="text-warning fw-bold">Varied Biome</span>
                            </div>
                            <div className="col-6 col-md-2 border-end border-secondary">
                                <span className="text-muted small d-block uppercase mb-1">POPULATION</span>
                                <span className="text-warning fw-bold">Documented</span>
                            </div>
                            <div className="col-6 col-md-2 border-end border-secondary">
                                <span className="text-muted small d-block uppercase mb-1">GRID ID</span>
                                <span className="text-warning fw-bold">#{params.theid}</span>
                            </div>
                            <div className="col-6 col-md-2 border-end border-secondary">
                                <span className="text-muted small d-block uppercase mb-1">REGION</span>
                                <span className="text-warning fw-bold">Outer Rim</span>
                            </div>
                            <div className="col-6 col-md-2">
                                <span className="text-muted small d-block uppercase mb-1">SECURITY</span>
                                <span className="text-success fw-bold">Encrypted</span>
                            </div>
                        </>
                    )}

                    {/* Propiedades si es un VEHÍCULO (VEHICLES) */}
                    {params.type === "vehicles" && (
                        <>
                            <div className="col-6 col-md-2 border-end border-secondary">
                                <span className="text-muted small d-block uppercase mb-1">MODEL</span>
                                <span className="text-warning fw-bold text-truncate d-block">Heavy Transport</span>
                            </div>
                            <div className="col-6 col-md-2 border-end border-secondary">
                                <span className="text-muted small d-block uppercase mb-1">CLASS</span>
                                <span className="text-warning fw-bold">Atmospheric</span>
                            </div>
                            <div className="col-6 col-md-2 border-end border-secondary">
                                <span className="text-muted small d-block uppercase mb-1">CREW</span>
                                <span className="text-warning fw-bold">Standard</span>
                            </div>
                            <div className="col-6 col-md-2 border-end border-secondary">
                                <span className="text-muted small d-block uppercase mb-1">REGISTRY</span>
                                <span className="text-warning fw-bold">#{params.theid}</span>
                            </div>
                            <div className="col-6 col-md-2 border-end border-secondary">
                                <span className="text-muted small d-block uppercase mb-1">SOURCE</span>
                                <span className="text-warning fw-bold">SWAPI.tech</span>
                            </div>
                            <div className="col-6 col-md-2">
                                <span className="text-muted small d-block uppercase mb-1">ENGINE</span>
                                <span className="text-success fw-bold">Operational</span>
                            </div>
                        </>
                    )}

                </div>
            </div>

            {/* BOTÓN REGRESAR */}
            <div className="text-center mt-4">
                <Link to="/" className="btn btn-outline-warning btn-lg px-5 font-monospace" style={{ borderRadius: "30px" }}>
                    BACK TO HOLOCRON
                </Link>
            </div>
        </div>
    );
};