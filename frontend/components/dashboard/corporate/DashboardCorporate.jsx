"use client";

import React, { useState } from "react";
import SidebarCorporate from "./SidebarCorporate";

// Импортируем табы
import DashboardTab from "./tabs/DashboardTab";
import RentTab from "./tabs/RentTab";
import ProfileTab from "./tabs/ProfileTab";
import RentPolicyTab from "./tabs/RentPolicyTab";
import ReturnPolicyTab from "./tabs/ReturnPolicyTab";
import RenterResponsibilityTab from "./tabs/RenterResponsibilityTab";
import SupportTab from "./tabs/SupportTab";

export default function DashboardCorporate() {
  const [activeTab, setActiveTab] = useState("dashboard");

  // Логика выхода
  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    window.location.href = "/login"; // или router.push("/login");
  };

  // Определяем, что рендерить
  const renderActiveTabContent = () => {
    switch (activeTab) {
      case "dashboard":
        return <DashboardTab />;
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
        return <DashboardTab />;
    }
  };

  return (
      <section className="dashboard-widget">
        <div className="right-box">
          <SidebarCorporate
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