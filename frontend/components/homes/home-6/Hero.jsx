'use client';

import React, { useCallback, useEffect, useState } from 'react';
import Button from '@/components/ui/button/Button';
import Image from 'next/image';
import { useTranslation, Trans } from 'react-i18next';
import Modal from '@/components/homes/home-6/Modal';
import FormModalContent from '@/components/homes/home-6/FormModalContent';
import Link from 'next/link';

export default function Hero() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  // Состояние для роли пользователя, по умолчанию "courier"
  const [userRoleCookie, setUserRoleCookie] = useState('courier');
  const [isClient, setIsClient] = useState(false);
  const range = '90';
  const { t } = useTranslation();

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    // Чтение cookies для получения userRole
    const cookies = document.cookie.split(';').map(cookie => cookie.trim());
    const roleCookie = cookies.find(cookie => cookie.startsWith('userRole='));
    if (roleCookie) {
      const role = roleCookie.split('=')[1];
      setUserRoleCookie(role);
    }
  }, []);

  const toggleModal = useCallback(() => {
    setIsModalOpen(prev => !prev);
  }, []);

  // Отдельный компонент для пункта сервиса
  const ServiceItem = ({ title, children }) => (
    <li>
      <h6>{title}</h6>
      <p>{children}</p>
    </li>
  );

  return (
    <section className="boxcar-banner-section-six">
      <div className="boxcar-container">
        <div className="row">
          <div className="content-column col-md-12 col-sm-12">
            <div className="inner-column">
              <div className="left-banner">
                <h1 className="wow fadeInUp mb-0" data-wow-delay="100ms">
                  {isClient ? t('home_title') : 'Аренда электровелосипедов'}{' '}
                  <span className="orange !mb-[15px] uppercase">
                    {isClient
                      ? userRoleCookie === 'courier'
                        ? t('for_courier')
                        : t('for_business')
                      : userRoleCookie === 'courier'
                        ? 'Для Курьеров'
                        : 'Для Бизнеса'}
                  </span>
                </h1>
                <div className="hero-little-text">
                  <span className="wow fadeInUp" data-wow-delay="100ms">
                    {userRoleCookie === 'courier' ? (
                      <>
                        {isClient
                          ? t('home.hero.courier_text')
                          : 'Сократим на 50% ваши расходы на транспорт, увеличим на 37% скорость доставки.'}{' '}
                        <br />
                        <span className="font-medium mb-0">
                          {isClient
                            ? t('home.hero.courier_text_second')
                            : 'Больше доставок → больше денег.'}
                        </span>
                      </>
                    ) : (
                      <>
                        {isClient
                          ? t('home.hero.business_text')
                          : 'Сократим на 50% ваши расходы на транспорт, увеличим на 37% скорость доставки.'}{' '}
                        <br />
                        <span className="font-medium mb-0">
                          {isClient
                            ? t('home.hero.business_text_second')
                            : 'Меньше расходы → больше Доход.'}
                        </span>
                      </>
                    )}
                  </span>
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center gap-3 w-full hero-btn-box">
                  <Link href="/#bikes">
                    <Button className="!ml-0 w-full sm:w-auto" variant="primary">
                      {isClient ? t('home.hero.rent_bike') : 'Арендовать электровелосипеды'}
                    </Button>
                  </Link>
                  <Button
                    className="w-full sm:w-auto !ml-0"
                    variant="primary-outline"
                    onClick={toggleModal}
                  >
                    {isClient ? t('home.hero.get_consultation') : 'Получить консультацию'}
                  </Button>
                </div>
                <div className="right-box wow fadeInUp" data-wow-delay="100ms">
                  <ul className="service-list">
                    <ServiceItem title={isClient ? t('home.hero.in_city_title') : 'Скорость'}>
                      <span className="big-text">№1</span>{' '}
                      {isClient ? t('home.hero.in_city') : ' в городе'}
                    </ServiceItem>
                    <ServiceItem title={isClient ? t('home.hero.range_title') : 'Запас хода'}>
                      {isClient ? (
                        <Trans i18nKey="home.hero.range" values={{ value: range }}>
                          <span className="big-text">{range}</span>
                        </Trans>
                      ) : (
                        <>
                          До <span className="big-text">{range}</span> км на одном заряде
                        </>
                      )}
                    </ServiceItem>
                    <ServiceItem title={isClient ? t('home.hero.savings_title') : 'Экономия'}>
                      {isClient ? (
                        <Trans i18nKey="home.hero.savings" values={{ value: '80%' }}>
                          <span className="big-text">80%</span>
                        </Trans>
                      ) : (
                        <>
                          До <span className="big-text">80%</span>
                        </>
                      )}
                    </ServiceItem>
                  </ul>
                </div>
              </div>
              <div className="right-banner wow fadeInUp" data-wow-delay="100ms">
                <div className="right-banner-box">
                  <p>
                    {isClient
                      ? t('home.hero.payback')
                      : 'Окупается быстрее любого другого транспорта'}
                  </p>
                  <Image
                    alt="DeliBike banner"
                    title="DeliBike"
                    src="/images/banner-bike1.png"
                    width={442.57}
                    height={376.45}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <FormModalContent />
      </Modal>
    </section>
  );
}
