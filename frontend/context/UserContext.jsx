"use client";
import React, { createContext, useState, useEffect, useContext } from "react";

export const UserContext = createContext(null);

export function useUser() {
    return useContext(UserContext);
}

export function UserProvider({ children }) {
    // userRole: admin / corporate / courier / ...
    const [userRole, setUserRole] = useState();
    // location: "kz" / "by" и т.д.
    const [location, setLocation] = useState();

    const [language, setLanguage] = useState();

    // При монтировании читаем location из cookies, если он есть
    useEffect(() => {
        const cookies = document.cookie.split(";").map(cookie => cookie.trim());
        const locationCookie = cookies.find(cookie => cookie.startsWith("location="));
        if (locationCookie) {
            const loc = locationCookie.split("=")[1];
            setLocation(loc);
        }
    }, []);

    useEffect(() => {
        const cookies = document.cookie.split(";").map(cookie => cookie.trim());
        const languageCookie = cookies.find(cookie => cookie.startsWith("lang="));
        if (languageCookie) {
            const lang = languageCookie.split("=")[1];
            setLanguage(lang);
        }
    }, []);

    // При изменении location обновляем cookie (с max-age на год)

    const value = {
        userRole,
        setUserRole,
        location,
        setLocation,
        language,
        setLanguage,
    };

    return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}