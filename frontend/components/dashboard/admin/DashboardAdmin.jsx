"use client";

import React from "react";
import SidebarAdmin from "./SidebarAdmin";
import Image from "next/image";

const stats = [
    { label: "Количество пользователей", value: "1,245", icon: "/images/icons/users.svg" },
    { label: "Активные заказы", value: "532", icon: "/images/icons/orders.svg" },
    { label: "Доход за месяц", value: "$12,450", icon: "/images/icons/revenue.svg" },
    { label: "Курьеры онлайн", value: "45", icon: "/images/icons/couriers.svg" },
];

export default function DashboardAdmin() {
    return (
        <div className="dashboard-widget">
            <div className="right-box">
                <SidebarAdmin />
                <div className="content-column">
                    <div className="inner-column">
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
                                    {/* Здесь можно подключить график, например, через Chart.js */}
                                    <div style={{ height: 300, background: "#f3f4f6" }}>
                                        <p>График активности (в разработке)</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}