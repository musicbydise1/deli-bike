"use client";
import React, { useEffect, useState, useContext } from "react";

const dataContext = React.createContext();
export const useContextElement = () => {
  return useContext(dataContext);
};

export default function Context({ children }) {
  const [cartProducts, setCartProducts] = useState([]);
  const [wishList, setWishList] = useState([1, 2, 3]);
  const [quickViewItem, setQuickViewItem] = useState(null);
  const [quickAddItem, setQuickAddItem] = useState(1);
  const [totalPrice, setTotalPrice] = useState(0);
  // Состояние для продуктов, загруженных с API
  const [products, setProducts] = useState([]);
  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  // Загружаем продукты (велосипеды) с API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(`${API_URL}/bikes/`);
        const json = await res.json();
        const data = Array.isArray(json.data) ? json.data : [];
        setProducts(data);
        if (data.length > 0) {
          setQuickViewItem(data[0]);
        }
      } catch (error) {
        console.error("Error fetching bikes:", error);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    const subtotal = cartProducts.reduce((accumulator, product) => {
      return accumulator + product.quantity * product.price;
    }, 0);
    setTotalPrice(subtotal);
  }, [cartProducts]);

  const addProductToCart = (id, qty, price) => {
    if (!cartProducts.some((elm) => elm.id == id)) {
      const item = {
        ...products.find((elm) => elm.id == id),
        quantity: qty ? qty : 1,
        price: price ? price : 0,
      };
      setCartProducts((prev) => [...prev, item]);
      // openCart();
    }
  };

  const isAddedToCartProducts = (id) => {
    return cartProducts.some((elm) => elm.id == id);
  };

  const addToWishlist = (id) => {
    if (!wishList.includes(id)) {
      setWishList((prev) => [...prev, id]);
    }
  };

  const removeFromWishlist = (id) => {
    if (wishList.includes(id)) {
      setWishList((prev) => prev.filter((elm) => elm !== id));
    }
  };

  const isAddedtoWishlist = (id) => {
    return wishList.includes(id);
  };

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem("cartList"));
    if (items?.length) {
      setCartProducts(items);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("cartList", JSON.stringify(cartProducts));
  }, [cartProducts]);

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem("wishlist"));
    if (items?.length) {
      setWishList(items);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishList));
  }, [wishList]);

  const contextElement = {
    cartProducts,
    setCartProducts,
    totalPrice,
    addProductToCart,
    isAddedToCartProducts,
    removeFromWishlist,
    addToWishlist,
    isAddedtoWishlist,
    quickViewItem,
    wishList,
    setQuickViewItem,
    quickAddItem,
    setQuickAddItem,
    products, // Добавляем список продуктов в контекст, если понадобится
  };

  return (
      <dataContext.Provider value={contextElement}>
        {children}
      </dataContext.Provider>
  );
}