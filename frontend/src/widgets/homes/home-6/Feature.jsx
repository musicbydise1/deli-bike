'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useTranslation } from 'react-i18next';

export default function Feature() {
  const [userRole, setUserRole] = useState('courier');
  const [isClient, setIsClient] = useState(false);
  const { t } = useTranslation('common');

  // Set isClient to true when component mounts (client-side only)
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Получаем роль пользователя из cookies вместо localStorage
  useEffect(() => {
    const cookies = document.cookie.split(';').map(cookie => cookie.trim());
    const roleCookie = cookies.find(cookie => cookie.startsWith('userRole='));
    if (roleCookie) {
      const role = roleCookie.split('=')[1];
      setUserRole(role);
    }
  }, []);

  return (
    <section className="why-choose-us-section">
      <div className="boxcar-container">
        <div className="boxcar-title wow fadeInUp !mb-[30px]">
          <h2 className="title">
            {isClient ? t('home.feature.whyChooseUs') : 'ПОЧЕМУ ВЫБИРАЮТ'}{' '}
            {userRole === 'courier'
              ? isClient
                ? t('home.feature.singular')
                : 'ЭЛЕКТРОВЕЛОСИПЕД'
              : isClient
                ? t('home.feature.plural')
                : 'ЭЛЕКТРОВЕЛОСИПЕДЫ'}{' '}
            <span className="hero-title-small-text">Deli-Bike</span>
          </h2>
        </div>
        <div className="row choose-us-blocks">
          {/* choose-us-block */}
          <div className="choose-us-block col-lg-2 col-md-6 col-sm-12">
            <div className="inner-box wow fadeInUp" data-wow-delay="100ms">
              <div className="content-box">
                <h6 className="title">
                  {isClient ? t('home.feature.blocks.speed.title') : 'Скорость'}
                </h6>
                <div className="text">
                  {isClient
                    ? t('home.feature.blocks.speed.description')
                        .split('\n\n')
                        .map((paragraph, index) => (
                          <React.Fragment key={index}>
                            {index > 0 && <span className="orange font-bold">{paragraph}</span>}
                            {index === 0 && paragraph}
                          </React.Fragment>
                        ))
                    : 'Высокая скорость, манёвренность, передвижение по тротуару, доставка по прямой, без пробок и АЗС.'}
                </div>
              </div>
            </div>
          </div>

          {/* choose-us-block */}
          <div className="choose-us-block col-lg-2 col-md-6 col-sm-12">
            <div className="inner-box wow fadeInUp">
              <div className="content-box">
                <h6 className="title">
                  {isClient ? t('home.feature.blocks.economy.title') : 'Экономия'}
                </h6>
                <div className="text">
                  {isClient
                    ? t('home.feature.blocks.economy.description')
                        .split('\n\n')
                        .map((paragraph, index) => (
                          <React.Fragment key={index}>
                            {index > 0 && <span className="orange font-bold">{paragraph}</span>}
                            {index === 0 && paragraph}
                          </React.Fragment>
                        ))
                    : 'Нет затрат на бензин, штрафы, парковки, техобслуживание, сервис, страхование.'}
                </div>
              </div>
            </div>
          </div>

          {/* choose-us-block */}
          <div className="choose-us-block col-lg-2 col-md-6 col-sm-12">
            <div className="inner-box wow fadeInUp" data-wow-delay="200ms">
              <div className="content-box">
                <h6 className="title">
                  {isClient ? t('home.feature.blocks.capacity.title') : 'Ёмкость'}
                </h6>
                <div className="text">
                  {isClient
                    ? t('home.feature.blocks.capacity.description')
                        .split('\n\n')
                        .map((paragraph, index) => (
                          <React.Fragment key={index}>
                            {index > 0 && <span className="orange font-bold">{paragraph}</span>}
                            {index === 0 && paragraph}
                          </React.Fragment>
                        ))
                    : 'Пробег до 90 км на одном заряде. Всегда есть запасной АКБ. Пока вы на доставке, АКБ на зарядке — нет потери времени и денег на АЗС.'}
                </div>
              </div>
            </div>
          </div>

          {/* choose-us-block */}
          <div className="choose-us-block col-lg-2 col-md-6 col-sm-12">
            <div className="inner-box wow fadeInUp" data-wow-delay="300ms">
              <div className="content-box">
                <h6 className="title">
                  {isClient ? t('home.feature.blocks.warranty.title') : 'Гарантия'}
                </h6>
                <div className="text">
                  {isClient
                    ? t('home.feature.blocks.warranty.description')
                        .split('\n\n')
                        .map((paragraph, index) => (
                          <React.Fragment key={index}>
                            {index > 0 && <span className="orange font-bold">{paragraph}</span>}
                            {index === 0 && paragraph}
                          </React.Fragment>
                        ))
                    : 'Наш сервис быстро решает любые технические вопросы, чтобы вы не простаивали.'}
                </div>
              </div>
            </div>
          </div>

          {/* choose-us-block */}
          <div className="choose-us-block col-lg-2 col-md-6 col-sm-12">
            <div className="inner-box wow fadeInUp" data-wow-delay="300ms">
              <div className="content-box">
                <h6 className="title">
                  {isClient ? t('home.feature.blocks.environment.title') : 'Экологичность'}
                </h6>
                <div className="text">
                  {isClient
                    ? t('home.feature.blocks.environment.description')
                        .split('\n\n')
                        .map((paragraph, index) => (
                          <React.Fragment key={index}>
                            {index > 0 && <span className="orange font-bold">{paragraph}</span>}
                            {index === 0 && paragraph}
                          </React.Fragment>
                        ))
                    : 'Стильный транспорт наступившего будущего, скоростной и бесшумный, не раздражает горожан, заботится об экологии.'}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
