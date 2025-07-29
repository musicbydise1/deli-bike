'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useTranslation } from 'react-i18next';

export default function Banner() {
  const [userRole, setUserRole] = useState('courier');
  const { t } = useTranslation('common');

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
                  <h2 className="overlay-title">{t('home.banner.howWeWork')}</h2>
                  <p className="overlay-subtitle">{t('home.banner.threeSteps')}</p>
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
                  <h2>{t('home.banner.steps.1.title')}</h2>
                  <ul className="corporate-banner-items">
                    <li className="corporate-banner-item">{t('home.banner.steps.1.items.1')}</li>
                    <li className="corporate-banner-item">
                      {t('home.banner.steps.1.items.2')}
                    </li>
                    <li className="corporate-banner-item">{t('home.banner.steps.1.items.3')}</li>
                    <li className="corporate-banner-item">{t('home.banner.steps.1.items.4')}</li>
                  </ul>
                </div>
              </div>

              <div className="boxcar-title work-box dark">
                <div className="nums">2</div>
                <div>
                  <h2>{t('home.banner.steps.2.title')}</h2>
                  <ul className="corporate-banner-items">
                    <li className="corporate-banner-item">{t('home.banner.steps.2.items.1')}</li>
                    <li className="corporate-banner-item">{t('home.banner.steps.2.items.2')}</li>
                    <li className="corporate-banner-item">{t('home.banner.steps.2.items.3')}</li>
                  </ul>
                </div>
              </div>

              <div className="boxcar-title work-box dark">
                <div className="nums">3</div>
                <div>
                  <h2>{t('home.banner.steps.3.title')}</h2>
                  <ul className="corporate-banner-items">
                    <li className="corporate-banner-item">{t('home.banner.steps.3.items.1')}</li>
                    <li className="corporate-banner-item">
                      {t('home.banner.steps.3.items.2')}
                    </li>
                  </ul>
                </div>
              </div>
              <div className="boxcar-title work-box dark">
                <div className="nums">4</div>
                <div>
                  <h2>{t('home.banner.steps.4.title')}</h2>
                  <ul className="corporate-banner-items">
                    <li className="corporate-banner-item">
                      {t('home.banner.steps.4.items.1')}
                    </li>
                    <li className="corporate-banner-item">
                      {t('home.banner.steps.4.items.2')}
                    </li>
                    <li className="corporate-banner-item">
                      {t('home.banner.steps.4.items.3')}
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
