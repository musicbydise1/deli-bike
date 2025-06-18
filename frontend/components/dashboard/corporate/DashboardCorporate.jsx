'use client';

import React, { useState } from 'react';
import SidebarCorporate from './SidebarCorporate';

// Импортируем табы
import DashboardTab from './tabs/dashboard/DashboardTab';
import RentTab from './tabs/RentTab';
import ProfileTab from './tabs/ProfileTab';
import RentPolicyTab from './tabs/RentPolicyTab';
import ReturnPolicyTab from './tabs/ReturnPolicyTab';
import RenterResponsibilityTab from './tabs/RenterResponsibilityTab';
import SupportTab from './tabs/support/SupportTab';
import CouriersTab from '@/components/dashboard/corporate/tabs/CouriersTab';
import { useRouter } from 'next/navigation';

export default function DashboardCorporate() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const router = useRouter();

  // Логика выхода
  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    router.push('/other-login');
  };

  // Определяем, что рендерить
  const renderActiveTabContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardTab />;
      case 'rent':
        return <RentTab />;
      case 'couriers':
        return <CouriersTab />;
      case 'profile':
        return <ProfileTab />;
      case 'rentPolicy':
        return <RentPolicyTab />;
      case 'returnPolicy':
        return <ReturnPolicyTab />;
      case 'renterResponsibility':
        return <RenterResponsibilityTab />;
      case 'support':
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
          <div className="inner-column">{renderActiveTabContent()}</div>
        </div>
      </div>
    </section>
  );
}
