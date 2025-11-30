import React, {createContext, useContext, useState} from 'react';

const FavoritesContext = createContext();

export const useFavorites = () => {
    const context = useContext(FavoritesContext);
    if (!context) {
        throw new Error('useFavorites must be used within a FavoritesProvider');
    }
    return context;
};

export const FavoritesProvider = ({children}) => {
    const [favorites, setFavorites] = useState([]);

    const addToFavorites = (product) => {
        setFavorites((prev) => {
            if (!prev.find((item) => item.id === product.id)) {
                return [...prev, product];
            }
            return prev;
        });
    };

    const removeFromFavorites = (productId) => {
        setFavorites((prev) => prev.filter((item) => item.id !== productId));
    };

    const isFavorite = (productId) => {
        return favorites.some((item) => item.id === productId);
    };

    const toggleFavorite = (product) => {
        if (isFavorite(product.id)) {
            removeFromFavorites(product.id);
        } else {
            addToFavorites(product);
        }
    };

    const value = {
        favorites,
        addToFavorites,
        removeFromFavorites,
        isFavorite,
        toggleFavorite,
    };

    return (
        <FavoritesContext.Provider value={value}>
            {children}
        </FavoritesContext.Provider>
    );
};

export default FavoritesContext;
