"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";

const menuItems = [
    { href: "/dashboard", label: "Главная", icon: "/images/icons/admin-dashboard.svg" },
    { href: "/admin/users", label: "Пользователи", icon: "/images/icons/users.svg" },
    { href: "/admin/orders", label: "Заказы", icon: "/images/icons/orders.svg" },
    { href: "/admin/couriers", label: "Курьеры", icon: "/images/icons/couriers.svg" },
    { href: "/admin/reports", label: "Отчёты", icon: "/images/icons/reports.svg" },
    { href: "/admin/settings", label: "Настройки", icon: "/images/icons/settings.svg" },
    { href: "#", label: "Выйти", icon: "/images/icons/logout.svg", isLogout: true },
];

export default function SidebarAdmin() {
    const pathname = usePathname();
    const router = useRouter();

    const handleLogout = () => {
        localStorage.removeItem("accessToken");
        router.push("/login");
    };

    return (
        <div className="side-bar admin-sidebar">
            <ul className="nav-list">
                {menuItems.map((item, index) => (
                    <li key={index}>
                        {item.isLogout ? (
                            <a
                                href="#"
                                onClick={(e) => {
                                    e.preventDefault();
                                    handleLogout();
                                }}
                            >
                                <Image alt={item.label} src={item.icon} width={20} height={20} />
                                {item.label}
                            </a>
                        ) : (
                            <Link href={item.href} className={pathname === item.href ? "menuActive" : ""}>
                                <Image alt={item.label} src={item.icon} width={20} height={20} />
                                {item.label}
                            </Link>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
}