"use client";
import React, { createContext, useState, useEffect, useContext } from "react";

export const WishlistContext = createContext(null);

export function useWishlist() {
    return useContext(WishlistContext);
}

export function WishlistProvider({ children }) {
    const [wishList, setWishList] = useState([]);

    // Загрузка из localStorage
    useEffect(() => {
        const items = JSON.parse(localStorage.getItem("wishlist"));
        if (items?.length) {
            setWishList(items);
        }
    }, []);

    // Сохранение
    useEffect(() => {
        localStorage.setItem("wishlist", JSON.stringify(wishList));
    }, [wishList]);

    const addToWishlist = (id) => {
        if (!wishList.includes(id)) {
            setWishList((prev) => [...prev, id]);
        }
    };
    const removeFromWishlist = (id) => {
        setWishList((prev) => prev.filter((item) => item !== id));
    };
    const isAddedtoWishlist = (id) => wishList.includes(id);

    const value = {
        wishList,
        setWishList,
        addToWishlist,
        removeFromWishlist,
        isAddedtoWishlist,
    };

    return <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>;
}