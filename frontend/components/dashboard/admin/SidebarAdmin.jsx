"use client";

import React from "react";
import { useRouter } from "next/navigation";
import {
    MdDashboard,
    MdPeople,
    MdAssignment,
    MdDirectionsBike,
    MdLocalShipping,
    MdBuild,
    MdLogout,
} from "react-icons/md"; // импортируем нужные иконки

const menuItems = [
    { key: "dashboard", label: "Главная", icon: <MdDashboard  size={24} /> },
    { key: "users", label: "Пользователи", icon: <MdPeople size={24} /> },
    { key: "orders", label: "Заказы", icon: <MdAssignment size={24} /> },
    { key: "bikes", label: "Велосипеды", icon: <MdDirectionsBike size={24} /> },
    { key: "couriers", label: "Курьеры", icon: <MdLocalShipping  size={24} /> },
    { key: "accessories", label: "Аксессуары", icon: <MdBuild size={24} /> },
    { key: "logout", label: "Выйти", icon: <MdLogout size={24} />, isLogout: true },
];

export default function SidebarAdmin({ activeTab, setActiveTab }) {
    const router = useRouter();

    const handleLogout = (e) => {
        e.preventDefault();
        localStorage.removeItem("accessToken");
        router.push("/login");
    };

    return (
        <div className="side-bar admin-sidebar">
            <ul className="nav-list">
                {menuItems.map((item, index) => (
                    <li key={index}>
                        {item.isLogout ? (
                            <a href="#" onClick={handleLogout}>
                                <span className="icon">{item.icon}</span>
                                {item.label}
                            </a>
                        ) : (
                            <a
                                href="#"
                                className={activeTab === item.key ? "menuActive" : ""}
                                onClick={(e) => {
                                    e.preventDefault();
                                    setActiveTab(item.key);
                                }}
                            >
                                <span className="icon mr-2">{item.icon}</span>
                                {item.label}
                            </a>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
}