'use client';
import { pricingPlans } from '@/data/pricing';
import React, { useState } from 'react';
import Button from '@/components/ui/button/Button';
import { useTariff } from '@/context/TariffContext';
import NotificationModal from '@/components/ui/notifications/NotificationModal'; // Импорт модального окна

export default function Pricing() {
  const {
    selectedWarranty,
    setSelectedWarranty,
    extendedWarrantyStates,
    setExtendedWarrantyStates,
  } = useTariff();

  // Локальное состояние для показа уведомления
  const [showNotification, setShowNotification] = useState(false);

  // Обработка клика по тарифу — сохраняем выбранный тариф и показываем модальное уведомление,
  // если тариф ещё не выбран
  const handlePlanClick = plan => {
    // Если тариф уже выбран, не показываем уведомление
    if (selectedWarranty?.value === plan.value) return;
    setSelectedWarranty(plan);
    setShowNotification(true);
  };

  return (
    <section className="boxcar-pricing-section-seven">
      <div className="boxcar-container">
        <div className="boxcar-title text-center pricing-title">
          <h2>
            Тарифы <span>Deli-Bike</span>
          </h2>
          <p>Аренда, гарантийное обслуживание, сервис, расширенная гарантия</p>
        </div>
        <div className="row">
          {pricingPlans.map((plan, index) => (
            <div
              key={index}
              className={`pricing-block-seven col-lg-6 col-md-6 col-sm-12 ${
                selectedWarranty?.value === plan.value ? 'selected' : ''
              }`}
            >
              <div className="inner-box" onClick={() => handlePlanClick(plan)}>
                <h6 className="title">{plan.plan}</h6>
                <span className="plan"></span>
                <div className="text">{plan.description}</div>

                <ul className="pricing-list">
                  {plan.features.map((feature, idx) => (
                    <li key={idx}>
                      <i className="fa-solid fa-check" /> {feature}
                    </li>
                  ))}
                </ul>

                {/* Чекбокс для расширенной гарантии */}
                <div className="form-check mb-3">
                  <input
                    className="form-check-input custom-checkbox"
                    type="checkbox"
                    id={`extendedWarranty-${plan.value}`}
                    checked={extendedWarrantyStates[plan.value] || false}
                    onChange={e => {
                      e.stopPropagation();
                      setExtendedWarrantyStates(prev => ({
                        ...prev,
                        [plan.value]: !prev[plan.value],
                      }));
                    }}
                  />
                  <label className="form-check-label" htmlFor={`extendedWarranty-${plan.value}`}>
                    <span className="uppercase font-bold">РАСШИРЕННАЯ ГАРАНТИЯ:</span> Бесплатное
                    обслуживание 36 <br />
                    наиболее дорогих элементов Оборудования.
                  </label>
                </div>

                <Button
                  variant="secondary"
                  className="w-full !ml-0"
                  onClick={e => {
                    e.stopPropagation();
                    handlePlanClick(plan);
                  }}
                >
                  {selectedWarranty?.value === plan.value ? (
                    <span className="orange">Выбран</span>
                  ) : (
                    'Выбрать'
                  )}
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Отображение модального окна при выборе тарифа */}
      {showNotification && selectedWarranty && (
        <NotificationModal
          message={
            <div style={{ fontSize: '14px' }}>
              <i className="fa-solid fa-check" style={{ marginRight: '8px', color: '#1890ff' }}></i>
              Тариф выбран: <strong>{selectedWarranty.plan}</strong>.
              <br />
              Выберите электровелосипед, который вам понравился, и нажмите на кнопку{' '}
              <strong>Арендовать</strong>.
            </div>
          }
          onClose={() => setShowNotification(false)}
        />
      )}
    </section>
  );
}
