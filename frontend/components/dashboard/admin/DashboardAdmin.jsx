"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import "../../../public/css/pages/login/Login.css";

import SidebarAdmin from "./SidebarAdmin";
import Image from "next/image";
import UsersTab from "./tabs/UsersTab";
import OrdersTab from "./tabs/OrdersTab";
import BikesTab from "./tabs/bikes/BikesTab";
import CouriersTab from "./tabs/CouriersTab";
import AccessoriesTab from "./tabs/accessories/AccessoriesTab";

// Иконки
import { RiMoneyDollarCircleLine } from "react-icons/ri";
import { MdElectricBike } from "react-icons/md";
import { FaBoxOpen, FaUsers, FaUserCheck } from "react-icons/fa";

// Chart
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

// Регистрируем компоненты Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function DashboardAdmin() {
    const router = useRouter();

    // Проверяем наличие токена при монтировании компонента
    useEffect(() => {
        const token = localStorage.getItem("accessToken");
        if (!token) {
            router.push("/other-login");
        }
    }, [router]);

    // Состояние для активной вкладки
    const [activeTab, setActiveTab] = useState("dashboard");

    // Состояние для аналитики, полученной с сервера
    const [analytics, setAnalytics] = useState({
        totalUsers: 0,
        activeUsers: 0,
        activeRentals: 0,
        sumTotalPrice: 0,
        oneWeekRentals: [],
        twoWeeksRentals: [],
        oneMonthRentals: [],
    });

    // Период для графика: "oneWeek", "twoWeeks", "oneMonth"
    const [selectedPeriod, setSelectedPeriod] = useState("oneWeek");

    // useEffect для загрузки данных аналитики
    useEffect(() => {
        async function fetchAnalytics() {
            try {
                const token = localStorage.getItem("accessToken");
                const response = await fetch("http://localhost:4000/admin/analytics", {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                });
                const data = await response.json();
                if (data.isSuccess) {
                    setAnalytics(data.data);
                } else {
                    console.error("Ошибка загрузки аналитики:", data.message);
                }
            } catch (error) {
                console.error("Ошибка при запросе аналитики:", error);
            }
        }

        fetchAnalytics();
    }, []);

    // Формируем массив статистики на основе analytics
    const stats = [
        {
            label: "Всего пользователей",
            value: analytics.totalUsers,
            icon: <FaUsers className="w-6 h-6 text-orange-500" />,
        },
        {
            label: "Активных пользователей",
            value: analytics.activeUsers,
            icon: <FaUserCheck className="w-6 h-6 text-orange-500" />,
        },
        {
            label: "Активных аренд",
            value: analytics.activeRentals,
            icon: <MdElectricBike className="w-6 h-6 text-orange-500" />,
        },
        {
            label: "Сумма totalPrice",
            value: Number(analytics.sumTotalPrice).toLocaleString("ru-RU") + " ₸",
            icon: <RiMoneyDollarCircleLine className="w-6 h-6 text-orange-500" />,
        },
    ];

    // -----------------------
    // Функция для подготовки данных для Bar Chart
    // -----------------------
    const prepareBarChartData = (period) => {
        // Выбираем нужный массив: oneWeekRentals, twoWeeksRentals, oneMonthRentals
        let rawData = [];
        if (period === "oneWeek") {
            rawData = analytics.oneWeekRentals || [];
        } else if (period === "twoWeeks") {
            rawData = analytics.twoWeeksRentals || [];
        } else {
            rawData = analytics.oneMonthRentals || [];
        }

        // Преобразуем данные:
        // rawData имеет вид: [{ day, status, count }, ...]
        // 1) Сформируем список уникальных дней (по возрастанию)
        const uniqueDays = Array.from(
            new Set(rawData.map((item) => item.day))
        ).sort((a, b) => new Date(a).getTime() - new Date(b).getTime());

        // 2) Сформируем словарь { day -> { active: number, completed: number } }
        const dayStatusMap = {};
        uniqueDays.forEach((day) => {
            dayStatusMap[day] = { active: 0, completed: 0 };
        });

        rawData.forEach((item) => {
            const { day, status, count } = item;
            if (!dayStatusMap[day]) {
                dayStatusMap[day] = { active: 0, completed: 0 };
            }
            // Приводим count к числу
            const numCount = parseInt(count, 10) || 0;
            if (status === "active") {
                dayStatusMap[day].active += numCount;
            } else if (status === "completed") {
                dayStatusMap[day].completed += numCount;
            }
        });

        // 3) Формируем массив labels (даты) и два массива данных: activeData, completedData
        const labels = uniqueDays.map((day) => {
            // Преобразуем day (ISO string) в локальную дату
            const d = new Date(day);
            return d.toLocaleDateString("ru-RU"); // "дд.мм.гггг"
        });

        const activeData = uniqueDays.map((day) => dayStatusMap[day].active);
        const completedData = uniqueDays.map((day) => dayStatusMap[day].completed);

        // 4) Возвращаем объект для react-chartjs-2
        return {
            labels,
            datasets: [
                {
                    label: "Active",
                    data: activeData,
                    backgroundColor: "rgba(255, 99, 132, 0.6)", // красноватый
                },
                {
                    label: "Completed",
                    data: completedData,
                    backgroundColor: "rgba(54, 162, 235, 0.6)", // синеватый
                },
            ],
        };
    };

    // Настройки для графика
    const barOptions = {
        responsive: true,
        plugins: {
            legend: {
                position: "top",
            },
            title: {
                display: false,
                text: "Аренды по дням",
            },
        },
        scales: {
            x: {
                stacked: false,
            },
            y: {
                stacked: false,
                beginAtZero: true,
            },
        },
    };

    // -----------------------
    // Вспомогательные компоненты для вкладок
    // -----------------------
    const renderDashboardTab = () => {
        // Подготавливаем данные для выбранного периода
        const chartData = prepareBarChartData(selectedPeriod);

        return (
            <>
                <div className="list-title">
                    <h3 className="title">Личный кабинет администратора</h3>
                    <div className="text">Добро пожаловать, администратор!</div>
                </div>

                {/* Карточки со статистикой */}
                <div className="row">
                    {stats.map((stat, index) => (
                        <div className="col-xl-3 col-lg-6" key={index}>
                            <div className="uii-item admin-stat">
                                <span className="uppercase !text-gray-400">{stat.label}</span>
                                <h3 className="text-center" style={{ marginTop: "20px" }}>
                                    {stat.value}
                                </h3>
                                <div className="ui-icon">{stat.icon}</div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* График активности */}
                <div className="graph-content">
                    <div className="widget-graph">
                        <div className="graph-head">
                            <h3>Статистика системы</h3>
                            <p>Просмотр активности за последние 30 дней</p>
                        </div>
                        <div className="widget-content" style={{ background: "#f3f4f6" }}>
                            {/* Выбор периода */}
                            <div className="flex space-x-3 mb-3">
                                <button
                                    onClick={() => setSelectedPeriod("oneWeek")}
                                    className={`px-4 py-2 rounded ${
                                        selectedPeriod === "oneWeek"
                                            ? "bg-orange-500 text-white"
                                            : "bg-gray-100 text-gray-700"
                                    }`}
                                >
                                    Неделя
                                </button>
                                <button
                                    onClick={() => setSelectedPeriod("twoWeeks")}
                                    className={`px-4 py-2 rounded ${
                                        selectedPeriod === "twoWeeks"
                                            ? "bg-orange-500 text-white"
                                            : "bg-gray-100 text-gray-700"
                                    }`}
                                >
                                    2 недели
                                </button>
                                <button
                                    onClick={() => setSelectedPeriod("oneMonth")}
                                    className={`px-4 py-2 rounded ${
                                        selectedPeriod === "oneMonth"
                                            ? "bg-orange-500 text-white"
                                            : "bg-gray-100 text-gray-700"
                                    }`}
                                >
                                    Месяц
                                </button>
                            </div>

                            {/* Bar Chart */}
                            <div style={{ height: 300, padding: "1rem" }}>
                                <Bar data={chartData} options={barOptions} />
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    };

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
                <SidebarAdmin activeTab={activeTab} setActiveTab={setActiveTab} />

                <div className="content-column">
                    <div className="inner-column">
                        {renderActiveTabContent()}
                    </div>
                </div>
            </div>
        </div>
    );
}