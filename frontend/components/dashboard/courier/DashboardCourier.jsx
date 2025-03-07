"use client";

import React, { useState } from "react";
import SidebarCourier from "./SidebarCourier";

// Импортируем наши табы
import DashboardTab from "./tabs/dashboard/DashboardTab";
import RentTab from "./tabs/RentTab";
import ProfileTab from "./tabs/ProfileTab";
import RentPolicyTab from "./tabs/RentPolicyTab";
import ReturnPolicyTab from "./tabs/ReturnPolicyTab";
import RenterResponsibilityTab from "./tabs/RenterResponsibilityTab";
import SupportTab from "./tabs/support/SupportTab";

export default function DashboardCourier() {
  const [activeTab, setActiveTab] = useState("dashboard");

  // Логика выхода
  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    window.location.href = "/login"; // Или router.push("/login")
  };

  // Определяем, что рендерить в зависимости от activeTab
  const renderActiveTabContent = () => {
    switch (activeTab) {
      case "dashboard":
        return <DashboardTab setActiveTab={setActiveTab} />;
      case "rent":
        return <RentTab />;
      case "profile":
        return <ProfileTab />;
      case "rentPolicy":
        return <RentPolicyTab />;
      case "returnPolicy":
        return <ReturnPolicyTab />;
      case "renterResponsibility":
        return <RenterResponsibilityTab />;
      case "support":
        return <SupportTab />;
      default:
        return <DashboardTab setActiveTab={setActiveTab} />;
    }
  };

  return (
      <section className="dashboard-widget">
        <div className="right-box">
          <SidebarCourier
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              onLogout={handleLogout}
          />
          <div className="content-column">
            <div className="inner-column">
              {renderActiveTabContent()}
            </div>
          </div>
        </div>
      </section>
  );
}