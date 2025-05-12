"use client";
import React, { createContext, useState, useEffect, useContext } from "react";

export const UserContext = createContext(null);

export function useUser() {
    return useContext(UserContext);
}

export function UserProvider({ children }) {
    const [userRole, setUserRole] = useState();
    const [location, setLocation] = useState();
    const [language, setLanguage] = useState();

    // 1) При монтировании — читаем из cookie или определяем по домену
    useEffect(() => {
        // попробуем достать из cookie
        const cookies = document.cookie
            .split(";")
            .map((c) => c.trim());
        const locCookie = cookies.find((c) => c.startsWith("location="));
        let initialLoc = locCookie
            ? locCookie.split("=")[1]
            : undefined;

        // если в куках нет — определяем по hostname
        if (!initialLoc) {
            const host = window.location.hostname.toLowerCase();
            if (host.endsWith(".kz")) initialLoc = "kz";
            else if (host.endsWith(".by")) initialLoc = "by";
            else initialLoc = "kz"; // дефолт, если домен неизвестен
        }

        setLocation(initialLoc);
    }, []);

    // 2) При изменении location пишем куку на год
    useEffect(() => {
        if (!location) return;
        // max-age в секундах: 365 дней
        const maxAge = 60 * 60 * 24 * 365;
        document.cookie = `location=${location}; max-age=${maxAge}; path=/`;
    }, [location]);

    // 3) При монтировании читаем lang из cookie (как раньше)
    useEffect(() => {
        const cookies = document.cookie
            .split(";")
            .map((c) => c.trim());
        const langCookie = cookies.find((c) => c.startsWith("lang="));
        if (langCookie) {
            setLanguage(langCookie.split("=")[1]);
        }
    }, []);

    const value = {
        userRole,
        setUserRole,
        location,
        setLocation,
        language,
        setLanguage,
    };

    return (
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    );
}