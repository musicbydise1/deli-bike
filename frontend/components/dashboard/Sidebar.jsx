"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";

export default function Sidebar({ userRole }) {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    router.push("/login");
  };

  // Общие пункты меню
  const commonMenuItems = [
    {
      href: "/dashboard",
      src: "/images/icons/dash1.svg",
      width: 18,
      height: 18,
      label: "Личный кабинет",
    },
    {
      href: "/messages",
      src: "/images/icons/dash6.svg",
      width: 18,
      height: 18,
      label: "Сообщения",
    },
    {
      href: "/my-listings",
      src: "/images/icons/dash2.svg",
      width: 22,
      height: 22,
      label: "Объявления",
    },
    {
      href: "/add-listings",
      src: "/images/icons/dash3.svg",
      width: 22,
      height: 22,
      label: "Добавить объявление",
    },
    {
      href: "/favorite",
      src: "/images/icons/dash4.svg",
      width: 18,
      height: 18,
      label: "Избранное",
    },
    {
      href: "/saved",
      src: "/images/icons/dash5.svg",
      width: 18,
      height: 18,
      label: "Сохранённые поиски",
    },
    {
      href: "/profile",
      src: "/images/icons/dash7.svg",
      width: 18,
      height: 18,
      label: "Мой профиль",
    },
    {
      href: "#",
      src: "/images/icons/dash8.svg",
      width: 18,
      height: 18,
      label: "Выйти",
      isLogout: true,
    },
  ];

  // Уникальные пункты меню для курьеров
  const courierMenuItems = [
    {
      href: "/deliveries",
      src: "/images/icons/dash9.svg",
      width: 18,
      height: 18,
      label: "Мои доставки",
    },
    {
      href: "/earnings",
      src: "/images/icons/dash10.svg",
      width: 18,
      height: 18,
      label: "Мой доход",
    },
  ];

  // Уникальные пункты меню для корпоративных клиентов
  const corporateMenuItems = [
    {
      href: "/my-orders",
      src: "/images/icons/dash11.svg",
      width: 18,
      height: 18,
      label: "Мои заказы",
    },
    {
      href: "/company-profile",
      src: "/images/icons/dash12.svg",
      width: 18,
      height: 18,
      label: "Профиль компании",
    },
  ];

  // Формируем итоговое меню в зависимости от роли
  const roleSpecificMenuItems =
      userRole === "courier" ? courierMenuItems : corporateMenuItems;

  const menuItems = [...commonMenuItems, ...roleSpecificMenuItems];

  return (
      <div className="side-bar">
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
                      <Image
                          alt=""
                          src={item.src}
                          width={item.width}
                          height={item.height}
                      />
                      {item.label}
                    </a>
                ) : (
                    <Link
                        href={item.href}
                        className={pathname === item.href ? "menuActive" : ""}
                    >
                      <Image
                          alt=""
                          src={item.src}
                          width={item.width}
                          height={item.height}
                      />
                      {item.label}
                    </Link>
                )}
              </li>
          ))}
        </ul>
      </div>
  );
}