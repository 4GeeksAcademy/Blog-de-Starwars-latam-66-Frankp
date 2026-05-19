import React, { useContext, useReducer, createContext } from "react";
// Importamos de manera nombrada usando llaves exactas
import { initialStore, reducer } from "../store.js";

const StoreContext = createContext();

export function StoreProvider({ children }) {
    // Pasamos 'reducer' e 'initialStore' directamente sin ejecutar paréntesis
    const [store, dispatch] = useReducer(reducer, initialStore);
    
    return (
        <StoreContext.Provider value={{ store, dispatch }}>
            {children}
        </StoreContext.Provider>
    );
}

export default function useGlobalReducer() {
    const context = useContext(StoreContext);
    if (!context) {
        throw new Error("useGlobalReducer debe ser usado dentro de un StoreProvider");
    }
    return { dispatch: context.dispatch, store: context.store };
}