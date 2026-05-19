// Al inicio de tu src/store.js, define el estado inicial como un OBJETO plano
export const initialStore = {
    favorites: [],      // Lista global de favoritos
    people: [],         // Tus personajes de la API
    planets: [],        // Tus planetas
    vehicles: []        // Tus vehículos
};

// Define tu función reducer con el nombre exacto 'reducer'
export const reducer = (state, action) => {
    switch (action.type) {
        case "TOGGLE_FAVORITE": {
            const item = action.payload;
            const exists = state.favorites.some(
                fav => fav.uid === item.uid && fav.type === item.type
            );

            if (exists) {
                return {
                    ...state,
                    favorites: state.favorites.filter(
                        fav => !(fav.uid === item.uid && fav.type === item.type)
                    )
                };
            } else {
                return {
                    ...state,
                    favorites: [...state.favorites, item]
                };
            }
        }
            
        // 🚀 CASOS AGREGADOS PARA GUARDAR LOS DATOS DE LAS PETICIONES FETCH:
        case "SET_PEOPLE":
            return {
                ...state,
                people: action.payload
            };

        case "SET_PLANETS":
            return {
                ...state,
                planets: action.payload
            };

        case "SET_VEHICLES":
            return {
                ...state,
                vehicles: action.payload
            };

        default:
            return state;
    }
};