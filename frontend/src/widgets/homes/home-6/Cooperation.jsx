'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { TbShieldLockFilled } from 'react-icons/tb';
import { useTranslation } from 'react-i18next';

export default function Cooperation() {
  const [userRole, setUserRole] = useState('courier');
  const { t } = useTranslation('common');

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
    <section className="cooperation-section">
      <div className="boxcar-container">
        <div className="boxcar-title wow fadeInUp !mb-[30px]">
          <h2 className="title">
            {t('home.cooperation.title')} <span className="hero-title-small-text">Deli-Bike</span>
          </h2>
          <p>{t('home.cooperation.subtitle')}</p>
        </div>
        <div className="cooperation-main-block">
          <div className="inner-box wow fadeInUp" data-wow-delay="100ms">
            <div className="content-box">
              <h6 className="title">{t('home.cooperation.contract')}</h6>
            </div>
          </div>
        </div>
        <div className="row">
          {/* cooperation-block */}
          <div className="cooperation-block col-lg-4 col-md-6 col-sm-12">
            <div className="inner-box wow fadeInUp" data-wow-delay="100ms">
              <div className="content-box">
                <h6 className="title">{t('home.cooperation.models.deposit.title')}</h6>
                <div className="text">{t('home.cooperation.models.deposit.description')}</div>
              </div>
            </div>
          </div>

          {/* cooperation-block */}
          <div className="cooperation-block col-lg-4 col-md-6 col-sm-12">
            <div className="inner-box wow fadeInUp">
              <div className="content-box">
                <h6 className="title">{t('home.cooperation.models.warranty.title')}</h6>
                <div className="text">{t('home.cooperation.models.warranty.description')}</div>
              </div>
            </div>
          </div>

          {/* cooperation-block */}
          <div className="cooperation-block col-lg-4 col-md-6 col-sm-12">
            <div className="inner-box wow fadeInUp" data-wow-delay="200ms">
              <div className="content-box">
                <h6 className="title">{t('home.cooperation.models.tariff.title')}</h6>
                <div className="text">{t('home.cooperation.models.tariff.description')}</div>
              </div>
            </div>
          </div>
        </div>

        <div className="row tariffs">
          <div className="col-lg-6 col-md-6 col-sm-12">
            <div className="tariff-title">
              <h5>{t('home.cooperation.tariffs.title')}</h5>
            </div>
            <div className="row">
              <div className="cooperation-block col-lg-6 col-md-12 col-sm-12">
                <div className="inner-box wow fadeInUp" data-wow-delay="100ms">
                  <div className="content-box">
                    <h6 className="title">{t('home.cooperation.tariffs.standard.title')}</h6>
                    <div className="text">{t('home.cooperation.tariffs.standard.description')}</div>
                  </div>
                </div>
              </div>

              {/* cooperation-block */}
              <div className="cooperation-block col-lg-6 col-md-12 col-sm-12">
                <div className="inner-box wow fadeInUp" data-wow-delay="200ms">
                  <div className="content-box">
                    <h6 className="title">{t('home.cooperation.tariffs.premium.title')}</h6>
                    <div className="text">{t('home.cooperation.tariffs.premium.description')}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* cooperation-block */}
          <div className="cooperation-block text-center garrantue col-lg-5 col-md-6 col-sm-12">
            <div className="inner-box wow fadeInUp">
              <div className="content-box">
                <div className="tariff-icon">
                  <TbShieldLockFilled size={80} />
                </div>
                <h6 className="title">{t('home.cooperation.tariffs.extendedWarranty.title')}</h6>
                <div className="text">
                  {t('home.cooperation.tariffs.extendedWarranty.description')}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
