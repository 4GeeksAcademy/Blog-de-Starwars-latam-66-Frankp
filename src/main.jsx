import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'  // Estilos globales de tu aplicación
import { StoreProvider } from './hooks/useGlobalReducer';  // Proveedor del estado global

// 🚀 CAMBIO CLAVE: Importamos el componente por defecto (el Layout que configuramos antes)
import Layout from "./routes";  

const Main = () => {
    return (
        <React.StrictMode>  
            {/* Proveedor global de Flux/Reducer */}
            <StoreProvider> 
                {/* 🚀 Renderizamos directamente tu componente Layout que ya tiene el BrowserRouter dentro */}
                <Layout />
            </StoreProvider>
        </React.StrictMode>
    );
}

// Renderizamos el componente Main en el elemento raíz del DOM.
ReactDOM.createRoot(document.getElementById('root')).render(<Main />)