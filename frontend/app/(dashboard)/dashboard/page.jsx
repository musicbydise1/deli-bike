"use client";
import Footer1 from "@/components/footers/Footer1";
import HeaderDashboard from "@/components/headers/HeaderDashboard";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import DashboardCourier from "@/components/dashboard/courier/DashboardCourier";
import DashboardCorporate from "@/components/dashboard/corporate/DashboardCorporate";
import DashboardAdmin from "@/components/dashboard/admin/DashboardAdmin";
import Header6 from "@/components/headers/Header6";

export default function DashboardPage() {
  const [userRole, setUserRole] = useState(null);
  const [loading, setLoading] = useState(true); // Для отображения состояния загрузки
  const router = useRouter();

  useEffect(() => {
    // Проверяем наличие accessToken в localStorage
    const accessToken = localStorage.getItem("accessToken");

    if (!accessToken) {
      // Если токена нет, перенаправляем на страницу входа
      router.push("/login");
      return;
    }

    // Получаем роль пользователя из cookies
    const cookies = document.cookie.split(";").map(cookie => cookie.trim());
    const roleCookie = cookies.find(cookie => cookie.startsWith("userRole="));
    const roleName = roleCookie ? roleCookie.split("=")[1] : null;
    setUserRole(roleName);

    // Устанавливаем флаг загрузки как завершённый
    setLoading(false);
  }, [router]);

  if (loading) {
    // Пока проверяется токен и роль, показываем индикатор загрузки
    return <div>Загрузка...</div>;
  }

  if (!userRole) {
    // Если роль пользователя не определена
    return <div>Ошибка: Роль пользователя не найдена.</div>;
  }

  return (
      <>
        <div style={{ background: "var(--theme-color-dark)" }}>
          <Header6 />
          {/* Условный рендеринг компонентов в зависимости от роли */}
          {userRole === "courier" && <DashboardCourier />}
          {userRole === "corporate" && <DashboardCorporate />}
          {userRole === "admin" && <DashboardAdmin />}
        </div>
      </>
  );
}