"use client";

import React, {useEffect, useState} from "react";

export default function Feature() {

  const [userRole, setUserRole] = useState(null);

  // Check user role from localStorage
  useEffect(() => {
    const role = localStorage.getItem("userRole"); // Assuming "userRole" is the key in localStorage
    setUserRole(role);
  }, []);
  return (
    <section className="why-choose-us-section">
      <div className="boxcar-container">
        <div className="boxcar-title wow fadeInUp !mb-[30px]">
          <h2 className="title">ПОЧЕМУ ВЫБИРАЮТ {userRole === "courier" ? "ЭЛЕКТРОВЕЛОСИПЕД" : "ЭЛЕКТРОВЕЛОСИПЕДЫ"} <span className="hero-title-small-text">Deli-Bike</span></h2>
        </div>
        <div className="row">
          {/* choose-us-block */}
          <div className="choose-us-block col-lg-3 col-md-6 col-sm-12">
            <div className="inner-box wow fadeInUp">
              <div className="content-box">
                <h6 className="title">Экономия</h6>
                <div className="text">
                  {userRole === "courier"
                      ? "Вы не тратите по 500–1000 тенге в день на бензин: все деньги остаются в вашем кармане"
                      : "Меньше расходов на топливо и ремонт: используйте сэкономленные средства на рост бизнеса"}
                </div>
              </div>
            </div>
          </div>
          {/* choose-us-block */}
          <div className="choose-us-block col-lg-3 col-md-6 col-sm-12">
            <div className="inner-box wow fadeInUp" data-wow-delay="100ms">
              <div className="content-box">
                <h6 className="title">Скорость</h6>
                <div className="text">
                  {userRole === "courier"
                      ? "До 55 км/ч, лёгкая управляемость и никакие пробки не задержат. Больше доставок за час и больше заработка за день"
                      : "Скорость до 55 км/ч: больше заказов, меньше времени в пробках. Больше доставок за час и больше заработка за день"}
                </div>
              </div>
            </div>
          </div>
          {/* choose-us-block */}
          <div className="choose-us-block col-lg-3 col-md-6 col-sm-12">
            <div className="inner-box wow fadeInUp" data-wow-delay="200ms">
              <div className="content-box">
                <h6 className="title">
                  {userRole === "courier"
                      ? "Ёмкость"
                      : "Брендинг"}
                </h6>
                <div className="text">
                  {userRole === "courier"
                      ? "Проезжаете до 90 км без поиска розеток. А если что — всегда есть запасной аккумулятор"
                      : "Получите фирменный транспорт с вашим логотипом: лого на раме, аккумуляторе и на термоконтейнере"}
                </div>
              </div>
            </div>
          </div>
          {/* choose-us-block */}
          <div className="choose-us-block col-lg-3 col-md-6 col-sm-12">
            <div className="inner-box wow fadeInUp" data-wow-delay="300ms">
              <div className="content-box">
                <h6 className="title">Гарантия</h6>
                <div className="text">
                  Не переживаете о поломках: мы быстро решим любые технические вопросы с гарантией
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
