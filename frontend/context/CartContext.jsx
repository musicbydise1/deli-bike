'use client';
import React, { createContext, useState, useEffect, useContext } from 'react';

export const CartContext = createContext(null);

export function useCart() {
  return useContext(CartContext);
}

export function CartProvider({ children }) {
  const [cartProducts, setCartProducts] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [products, setProducts] = useState([]);

  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  // Загрузка товаров с API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(`${API_URL}/bikes/`);
        const json = await res.json();
        const data = Array.isArray(json.data) ? json.data : [];
        setProducts(data);
      } catch (error) {
        console.error('Ошибка загрузки товаров:', error);
      }
    };

    fetchProducts();
  }, [API_URL]);

  // Загрузка корзины из localStorage
  useEffect(() => {
    const items = JSON.parse(localStorage.getItem('cartList'));
    if (items?.length) {
      setCartProducts(items);
    }
  }, []);

  // Сохранение корзины в localStorage
  useEffect(() => {
    localStorage.setItem('cartList', JSON.stringify(cartProducts));
  }, [cartProducts]);

  // Пересчёт итоговой суммы
  useEffect(() => {
    const subtotal = cartProducts.reduce(
      (acc, product) => acc + product.quantity * product.price,
      0,
    );
    setTotalPrice(subtotal);
  }, [cartProducts]);

  // Метод добавления товара в корзину
  const addProductToCart = (id, qty, price) => {
    // если товар ещё не в корзине
    if (!cartProducts.some(item => item.id === id)) {
      // ищем товар в списке, полученном с API
      const found = products.find(p => p.id === id);
      if (!found) return;
      const newItem = {
        ...found,
        quantity: qty || 1,
        price: price || 0,
      };
      setCartProducts(prev => [...prev, newItem]);
    }
  };

  const isAddedToCartProducts = id => {
    return cartProducts.some(item => item.id === id);
  };

  const value = {
    products,
    setProducts,
    cartProducts,
    setCartProducts,
    totalPrice,
    addProductToCart,
    isAddedToCartProducts,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
