"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation"; // для редиректа
import SidebarAdmin from "./SidebarAdmin";
import Image from "next/image";
import UsersTab from "./tabs/UsersTab";
import OrdersTab from "./tabs/OrdersTab";
import BikesTab from "./tabs/BikesTab";
import CouriersTab from "./tabs/CouriersTab";
import AccessoriesTab from "./tabs/AccessoriesTab";

export default function DashboardAdmin() {
    const router = useRouter();

    // Проверяем наличие токена при монтировании компонента
    useEffect(() => {
        const token = localStorage.getItem("accessToken");
        if (!token) {
            // Если токен отсутствует, перенаправляем на страницу входа
            router.push("/login");
        }
    }, [router]);

    // Состояние для активной вкладки
    const [activeTab, setActiveTab] = useState("dashboard");

    // Сюда выносите данные для дашборда (статистика и т.д.)
    const stats = [
        { label: "Количество пользователей", value: "1,245", icon: "/images/icons/users.svg" },
        { label: "Активные заказы", value: "532", icon: "/images/icons/orders.svg" },
        { label: "Доход за месяц", value: "$12,450", icon: "/images/icons/revenue.svg" },
        { label: "Курьеры онлайн", value: "45", icon: "/images/icons/couriers.svg" },
    ];

    // Вспомогательные компоненты для вкладок (можете вынести их в отдельные файлы)
    const renderDashboardTab = () => (
        <>
            <div className="list-title">
                <h3 className="title">Личный кабинет администратора</h3>
                <div className="text">Добро пожаловать, администратор!</div>
            </div>
            <div className="row">
                {stats.map((stat, index) => (
                    <div className="col-xl-3 col-lg-6" key={index}>
                        <div className="uii-item admin-stat">
                            <h3>{stat.value}</h3>
                            <span>{stat.label}</span>
                            <div className="ui-icon">
                                <Image alt={stat.label} width={50} height={50} src={stat.icon} />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className="graph-content">
                <div className="widget-graph">
                    <div className="graph-head">
                        <h3>Статистика системы</h3>
                        <p>Просмотр активности за последние 30 дней</p>
                    </div>
                    <div className="widget-content">
                        {/* Например, здесь подключайте ваш график Chart.js */}
                        <div style={{ height: 300, background: "#f3f4f6" }}>
                            <p>График активности (в разработке)</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );

    const renderUsersTab = () => (
        <div>
            <UsersTab />
        </div>
    );

    const renderOrdersTab = () => (
        <div>
            <OrdersTab />
        </div>
    );

    const renderBikesTab = () => (
        <div>
            <BikesTab />
        </div>
    );

    const renderCouriersTab = () => (
        <div>
            <CouriersTab />
        </div>
    );

    const renderAccessoriesTab = () => (
        <div>
            <AccessoriesTab />
        </div>
    );

    // Функция, возвращающая нужный контент на основе активной вкладки
    const renderActiveTabContent = () => {
        switch (activeTab) {
            case "dashboard":
                return renderDashboardTab();
            case "users":
                return renderUsersTab();
            case "orders":
                return renderOrdersTab();
            case "bikes":
                return renderBikesTab();
            case "couriers":
                return renderCouriersTab();
            case "accessories":
                return renderAccessoriesTab();
            default:
                return renderDashboardTab();
        }
    };

    return (
        <div className="dashboard-widget">
            <div className="right-box">
                {/* Передаём текущее состояние вкладки и метод для смены вкладки */}
                <SidebarAdmin activeTab={activeTab} setActiveTab={setActiveTab} />

                <div className="content-column">
                    <div className="inner-column">
                        {/* Показываем нужный контент в зависимости от выбранной вкладки */}
                        {renderActiveTabContent()}
                    </div>
                </div>
            </div>
        </div>
    );
}