"use client";

import React from "react";
import Image from "next/image";

// Новый массив вкладок для Курьера
const courierTabs = [
    {
        key: "dashboard", // Личный кабинет
        label: "Личный кабинет",
        icon: "/images/icons/dash1.svg",
    },
    {
        key: "rent",
        label: "Аренда",
        icon: "/images/icons/dash2.svg",
    },
    {
        key: "profile",
        label: "Профиль",
        icon: "/images/icons/dash7.svg",
    },
    {
        key: "rentPolicy",
        label: "Политика аренды",
        icon: "/images/icons/dash3.svg",
    },
    {
        key: "returnPolicy",
        label: "Политика возврата",
        icon: "/images/icons/dash4.svg",
    },
    {
        key: "renterResponsibility",
        label: "Ответственность арендатора",
        icon: "/images/icons/dash5.svg",
    },
    {
        key: "support",
        label: "Поддержка",
        icon: "/images/icons/dash6.svg",
    },
    {
        key: "logout",
        label: "Выйти",
        icon: "/images/icons/dash8.svg",
        isLogout: true,
    },
];

export default function SidebarCourier({ activeTab, setActiveTab, onLogout }) {
    // Клик по пункту меню
    const handleClick = (item) => {
        if (item.isLogout) {
            onLogout();
        } else {
            setActiveTab(item.key);
        }
    };

    return (
        <div className="side-bar">
            <ul className="nav-list">
                {courierTabs.map((item) => (
                    <li key={item.key}>
                        <a
                            href="#"
                            className={activeTab === item.key ? "menuActive" : ""}
                            onClick={(e) => {
                                e.preventDefault();
                                handleClick(item);
                            }}
                        >
                            <Image alt="" src={item.icon} width={18} height={18} />
                            {item.label}
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    );
}