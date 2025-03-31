"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";

export default function Feature() {
  const [userRole, setUserRole] = useState("courier");

  // Получаем роль пользователя из cookies вместо localStorage
  useEffect(() => {
    const cookies = document.cookie.split(";").map(cookie => cookie.trim());
    const roleCookie = cookies.find(cookie => cookie.startsWith("userRole="));
    if (roleCookie) {
      const role = roleCookie.split("=")[1];
      setUserRole(role);
    }
  }, []);

  return (
      <section className="why-choose-us-section">
        <div className="boxcar-container">
          <div className="boxcar-title wow fadeInUp !mb-[30px]">
            <h2 className="title">
              ПОЧЕМУ ВЫБИРАЮТ{" "}
              {userRole === "courier" ? "ЭЛЕКТРОВЕЛОСИПЕД" : "ЭЛЕКТРОВЕЛОСИПЕДЫ"}{" "}
              <span className="hero-title-small-text">Deli-Bike</span>
            </h2>
          </div>
          <div className="row choose-us-blocks">
            {/* choose-us-block */}
            <div className="choose-us-block col-lg-2 col-md-6 col-sm-12">
              <div className="inner-box wow fadeInUp" data-wow-delay="100ms">
                <div className="content-box">
                  <h6 className="title">Скорость</h6>
                  <div className="text">
                    Высокая скорость, манёвренность, <br />
                    передвижение по тротуару, доставка <br />
                    по прямой, без пробок и АЗС.
                    <span className="orange font-bold">
                    Больше заказов за час – <br />
                    больше заработок.
                  </span>
                  </div>
                </div>
              </div>
            </div>

            {/* choose-us-block */}
            <div className="choose-us-block col-lg-2 col-md-6 col-sm-12">
              <div className="inner-box wow fadeInUp">
                <div className="content-box">
                  <h6 className="title">Экономия</h6>
                  <div className="text">
                    Нет затрат на бензин,
                    штрафы, парковки, техобслуживание,
                    сервис, страхование.
                    <span className="orange font-bold">
                    Все деньги остаются в вашем кармане.
                  </span>
                  </div>
                </div>
              </div>
            </div>

            {/* choose-us-block */}
            <div className="choose-us-block col-lg-2 col-md-6 col-sm-12">
              <div className="inner-box wow fadeInUp" data-wow-delay="200ms">
                <div className="content-box">
                  <h6 className="title">Ёмкость</h6>
                  <div className="text">
                    Пробег до 90 км на одном заряде.
                    Всегда есть запасной АКБ. Пока вы на доставке АКБ на зарядке, нет потери времени и денег на АЗС.
                    <span className="orange font-bold">Растёт ваш доход.</span>
                  </div>
                </div>
              </div>
            </div>

            {/* choose-us-block */}
            <div className="choose-us-block col-lg-2 col-md-6 col-sm-12">
              <div className="inner-box wow fadeInUp" data-wow-delay="300ms">
                <div className="content-box">
                  <h6 className="title">Гарантия</h6>
                  <div className="text">
                    Наш сервис быстро решает любые технические вопросы, чтобы вы не простаивали.
                    <span className="orange font-bold">
                    Мы хотим, чтобы вы больше зарабатывали и делаем все для этого.
                  </span>
                  </div>
                </div>
              </div>
            </div>

            {/* choose-us-block */}
            <div className="choose-us-block col-lg-2 col-md-6 col-sm-12">
              <div className="inner-box wow fadeInUp" data-wow-delay="300ms">
                <div className="content-box">
                  <h6 className="title">Экологичность</h6>
                  <div className="text">
                    Стильный транспорт наступившего <br />
                    будущего, скоростной и бесшумный, <br />
                    не раздражает горожан, заботится <br />
                    об экологии.
                    <span className="orange font-bold">
                    Вклад в общее здоровье нации.
                  </span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>
  );
}