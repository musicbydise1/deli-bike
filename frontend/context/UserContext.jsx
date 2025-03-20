"use client";
import React, { createContext, useState, useEffect, useContext } from "react";

export const UserContext = createContext(null);

export function useUser() {
    return useContext(UserContext);
}

export function UserProvider({ children }) {
    // userRole: admin / corporate / courier / ...
    const [userRole, setUserRole] = useState(null);
    // location: "kz" / "by" и т.д.
    const [location, setLocation] = useState("kz");

    // Пример загрузки роли из localStorage
    useEffect(() => {
        const storedRole = localStorage.getItem("userRole");
        if (storedRole) {
            setUserRole(storedRole);
        }
    }, []);

    const value = {
        userRole,
        setUserRole,
        location,
        setLocation,
    };

    return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}