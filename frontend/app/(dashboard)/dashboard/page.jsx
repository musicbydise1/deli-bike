"use client";

import Footer1 from "@/components/footers/Footer1";
import HeaderDashboard from "@/components/headers/HeaderDashboard";
import React, { useEffect, useState } from "react";
import DashboardCourier from "@/components/dashboard/DashboardCourier";
import DashboardCorporate from "@/components/dashboard/DashboardCorporate";
import DashboardAdmin from "@/components/dashboard/admin/DashboardAdmin";
import Header6 from "@/components/headers/Header6";

export default function DashboardPage() {
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    // Извлечение данных пользователя из localStorage
    const userData = localStorage.getItem("userData");

    if (userData) {
      const parsedData = JSON.parse(userData);
      // Получаем первую роль пользователя
      const roleName = parsedData.roles?.[0]?.name || null;

      // Устанавливаем роль: "Courier" или "Corporate"
      setUserRole(roleName);
    }
  }, []);

  if (!userRole) {
    // Пока роль не определена, можно показывать лоадер
    return <div>Загрузка...</div>;
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