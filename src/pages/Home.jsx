import React, { useEffect } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { Card } from "../components/Card";

export const Home = () => {
    const { store, dispatch } = useGlobalReducer();

    // 🚀 PETICIONES DIRECTAS A SWAPI.TECH (Reemplazan al mapActions que no existía)
    useEffect(() => {
        // Cargar Personajes si no se han cargado antes
        if (!store?.people || store.people.length === 0) {
            fetch("https://www.swapi.tech/api/people")
                .then(res => res.json())
                .then(data => {
                    if (data.results) {
                        dispatch({ type: "SET_PEOPLE", payload: data.results });
                    }
                })
                .catch(err => console.error("Error loading people:", err));
        }

        // Cargar Planetas si no se han cargado antes
        if (!store?.planets || store.planets.length === 0) {
            fetch("https://www.swapi.tech/api/planets")
                .then(res => res.json())
                .then(data => {
                    if (data.results) {
                        dispatch({ type: "SET_PLANETS", payload: data.results });
                    }
                })
                .catch(err => console.error("Error loading planets:", err));
        }

        // Cargar Vehículos si no se han cargado antes
        if (!store?.vehicles || store.vehicles.length === 0) {
            fetch("https://www.swapi.tech/api/vehicles")
                .then(res => res.json())
                .then(data => {
                    if (data.results) {
                        dispatch({ type: "SET_VEHICLES", payload: data.results });
                    }
                })
                .catch(err => console.error("Error loading vehicles:", err));
        }
    }, [dispatch, store?.people, store?.planets, store?.vehicles]);

    return (
        <div className="container mt-4 pb-5 text-white">
            {/* SECCIÓN PERSONAJES */}
            <h2 className="text-warning my-4 font-monospace"><i className="fas fa-users me-2"></i>Characters</h2>
            <div className="d-flex flex-row overflow-auto border border-secondary p-3 rounded bg-dark bg-gradient">
                {!store?.people || store.people.length === 0 ? (
                    <span className="text-muted p-2">Loading characters from the Holocron...</span>
                ) : (
                    store.people.map(person => <Card key={person.uid} item={person} type="people" />)
                )}
            </div>

            {/* SECCIÓN PLANETAS */}
            <h2 className="text-warning my-4 font-monospace"><i className="fas fa-globe me-2"></i>Planets</h2>
            <div className="d-flex flex-row overflow-auto border border-secondary p-3 rounded bg-dark bg-gradient">
                {!store?.planets || store.planets.length === 0 ? (
                    <span className="text-muted p-2">Loading planets from the Holocron...</span>
                ) : (
                    store.planets.map(planet => <Card key={planet.uid} item={planet} type="planets" />)
                )}
            </div>

            {/* SECCIÓN VEHÍCULOS */}
            <h2 className="text-warning my-4 font-monospace"><i className="fas fa-space-shuttle me-2"></i>Vehicles</h2>
            <div className="d-flex flex-row overflow-auto border border-secondary p-3 rounded bg-dark bg-gradient">
                {!store?.vehicles || store.vehicles.length === 0 ? (
                    <span className="text-muted p-2">Loading vehicles from the Holocron...</span>
                ) : (
                    store.vehicles.map(vehicle => <Card key={vehicle.uid} item={vehicle} type="vehicles" />)
                )}
            </div>
        </div>
    );
};