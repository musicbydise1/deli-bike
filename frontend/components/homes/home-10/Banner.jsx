'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';

export default function Banner() {
  const [userRole, setUserRole] = useState('courier');

  useEffect(() => {
    const cookies = document.cookie.split(';').map(cookie => cookie.trim());
    const roleCookie = cookies.find(cookie => cookie.startsWith('userRole='));
    if (roleCookie) {
      const role = roleCookie.split('=')[1];
      setUserRole(role);
    }
  }, []);

  return (
    <section className="boxcar-pricing-section-five" id="service">
      <div className="boxcar-container">
        <div className="row g-0 boxcar-pricing-box">
          {/* image-column */}
          <div className="image-column col-lg-6 col-md-12 col-sm-12" style={{ height: '100%' }}>
            <div className="inner-column wow fadeInUp" style={{ height: '100%' }}>
              <div className="image-box" style={{ position: 'relative', height: '100%' }}>
                <figure
                  className="image work-box work-box-image"
                  style={{ borderRadius: '10px', height: '100%' }}
                >
                  <Image
                    alt=""
                    src="/images/banner-work1.png"
                    width={700}
                    height={390}
                    className="pricing-img"
                  />
                </figure>
                <div className="overlay-text">
                  <h2 className="overlay-title">КАК МЫ РАБОТАЕМ?</h2>
                  <p className="overlay-subtitle">Всего три шага — и вы на электровелосипеде.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="content-column col-lg-6 col-md-12 col-sm-12">
            <div
              className="inner-column wow fadeInUp banner-text-box"
              style={{ backgroundColor: 'transparent', padding: '40px 50px 20px 40px' }}
              data-wow-delay="100ms"
            >
              <div className="boxcar-title work-box dark">
                <div className="nums">1</div>
                <div>
                  <h2>Выбираете тариф на сайте</h2>
                  <ul className="corporate-banner-items">
                    <li className="corporate-banner-item">Юрлицо или физлицо</li>
                    <li className="corporate-banner-item">
                      Выбираете модель сотрудничества (гарантийная, депозитная, тарифная)
                    </li>
                    <li className="corporate-banner-item">Подбираете оптимальный план аренды</li>
                    <li className="corporate-banner-item">Согласуем скидку партнера</li>
                  </ul>
                </div>
              </div>

              <div className="boxcar-title work-box dark">
                <div className="nums">2</div>
                <div>
                  <h2>Приезжаете к нам</h2>
                  <ul className="corporate-banner-items">
                    <li className="corporate-banner-item">Оформляем договор</li>
                    <li className="corporate-banner-item">Подтверждаете оплату</li>
                    <li className="corporate-banner-item">Забираете электровелосипед</li>
                  </ul>
                </div>
              </div>

              <div className="boxcar-title work-box dark">
                <div className="nums">3</div>
                <div>
                  <h2>Садитесь и едете</h2>
                  <ul className="corporate-banner-items">
                    <li className="corporate-banner-item">Можно сразу приступить к работе</li>
                    <li className="corporate-banner-item">
                      АКБ заряжены, электровелосипед подготовлен к работе
                    </li>
                  </ul>
                </div>
              </div>
              <div className="boxcar-title work-box dark">
                <div className="nums">4</div>
                <div>
                  <h2>Сервис</h2>
                  <ul className="corporate-banner-items">
                    <li className="corporate-banner-item">
                      Оперативно устраняем неполадки, чтобы вы не простаивали
                    </li>
                    <li className="corporate-banner-item">
                      Возможна подмена электровелосипеда на время ремонта
                    </li>
                    <li className="corporate-banner-item">
                      Предоставляем расширенные гарантии на детали
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
