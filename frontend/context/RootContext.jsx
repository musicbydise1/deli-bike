'use client';
import React from 'react';
import { CartProvider } from './CartContext';
import { TariffProvider } from './TariffContext';
import { UserProvider } from './UserContext';
import { WishlistProvider } from './WishlistContext';

export default function RootContext({ children }) {
  return (
    <UserProvider>
      <WishlistProvider>
        <CartProvider>
          <TariffProvider>{children}</TariffProvider>
        </CartProvider>
      </WishlistProvider>
    </UserProvider>
  );
}
