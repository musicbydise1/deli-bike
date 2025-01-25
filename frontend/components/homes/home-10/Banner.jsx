"use client";
import React, {useEffect, useState} from "react";
import Image from "next/image";
export default function Banner() {
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    const role = localStorage.getItem("userRole"); // Assuming "userRole" is the key in localStorage
    setUserRole(role);
  }, []);

  return (
    <section className="boxcar-pricing-section-five">
      <div className="boxcar-container">
        <div className="row g-0" style={{background: "#fff", height: "390px", borderRadius: "10px", boxShadow: "0px 4px 12px 0px #00000012" }}>
          {/* image-column */}
          <div className="image-column col-lg-6 col-md-6 col-sm-12" style={{maxHeight: "390px"}}>
            <div className="inner-column wow fadeInUp">
              <div className="image-box" style={{position: "relative"}}>
                <figure
                    className="image work-box work-box-image"
                    style={{borderRadius: "10px"}}
                >
                  <Image
                      alt=""
                      src="/images/banner-work1.png"
                      width={700}
                      height={390}
                      style={{height: "390px"}}
                  />
                </figure>
                <div className="overlay-text">
                  <h2 className="overlay-title">
                    {userRole === "courier"
                        ? "КАК МЫ РАБОТАЕМ?"
                        : "ВАРИАНТЫ СОТРУДНИЧЕСТВА"}
                  </h2>
                  <p className="overlay-subtitle">
                    {userRole === "courier"
                        ? "Всего три шага — и вы на электровелосипеде."
                        : "Легко внедрить в ваш бизнес – всего три шага"}
                  </p>
                </div>
              </div>
            </div>
          </div>


          <div className="content-column col-lg-6 col-md-6 col-sm-12">
            <div
                className="inner-column wow fadeInUp"
                style={{
                  backgroundColor: "transparent",
                  padding: userRole === "courier" ? "40px 50px 40px 40px" : "40px 20px 40px 40px"
                }}
                data-wow-delay="100ms"
            >
              <div className="boxcar-title work-box dark">
                <div className="nums">
                  1
                </div>
                <div>
                  <h2>
                    {userRole === "courier"
                        ? "Выбираете тариф на сайте"
                        : "Депозитная модель"}
                  </h2>
                  {userRole === "courier" ? (
                      <p>
                        Решаете, что вам ближе: аренда или покупка. Подбираете оптимальный план.
                      </p>
                  ) : (
                      <ul class="corporate-banner-items">
                        <li class="corporate-banner-item">Заключаем соглашение о сотрудничестве с компанией, которая
                          оплачивает аренду;
                        </li>
                        <li class="corporate-banner-item">Заключаем договор с курьером;</li>
                        <li class="corporate-banner-item">За транспорт отвечает курьер.</li>
                      </ul>
                  )}
                </div>
              </div>

              <div className="boxcar-title work-box dark">
                <div className="nums">
                  2
                </div>
                <div>
                  <h2>
                    {userRole === "courier"
                        ? "Приезжаете к нам"
                        : "Гарантийная модель"}
                  </h2>
                  {userRole === "courier" ? (
                      <p>
                        Оформляете договор и получаете полностью заряженный электровелосипед
                      </p>
                  ) : (
                      <ul class="corporate-banner-items">
                        <li class="corporate-banner-item">Заключаем договор с компанией, которая оплачивает аренду;
                        </li>
                        <li class="corporate-banner-item">Мы доставляем транспорт бесплатно;</li>
                        <li class="corporate-banner-item">За транспорт отвечает компания.</li>
                      </ul>
                  )}
                </div>
              </div>

              <div className="boxcar-title work-box dark">
                <div className="nums">
                  3
                </div>
                <div>
                  <h2>
                    {userRole === "courier"
                        ? "Садитесь и едете"
                        : "Тарифная модель"}
                  </h2>
                  {userRole === "courier" ? (
                      <p>
                        Начинаете доставлять заказы, объезжать пробки и экономить на топливе
                      </p>
                  ) : (
                      <ul class="corporate-banner-items">
                        <li class="corporate-banner-item">Заключаем договор с курьером, который оплачивает аренду;</li>
                        <li class="corporate-banner-item">Мы предоставляем промо-матрериалы и скидки для компаний;</li>
                        <li class="corporate-banner-item">За транспорт отвечает курьер.</li>
                      </ul>
                  )}
                </div>
              </div>
              {userRole === "courier" ? (
              <div className="boxcar-title work-box dark">
                <div className="nums">
                  4
                </div>
                <div>
                  <h2>
                    Обслуживание без проблем
                  </h2>
                  <p>
                    При необходимости приезжаете на сервис: мы быстро устраним любые неполадки
                  </p>
                </div>
              </div>
                  ) : (
                      <></>
              )
              }
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
