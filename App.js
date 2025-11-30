import React from 'react';
import {AuthProvider} from './src/context/AuthContext';
import {CartProvider} from './src/context/CartContext';
import {FavoritesProvider} from './src/context/FavoritesContext';
import AppNavigator from './src/navigation/AppNavigator';

export default function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <FavoritesProvider>
          <AppNavigator />
        </FavoritesProvider>
      </CartProvider>
    </AuthProvider>
  );
}