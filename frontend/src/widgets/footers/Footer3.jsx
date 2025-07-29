'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { Button } from '@mantine/core';
import Modal from '@/widgets/homes/home-6/Modal';
import FormModalContent from '@/widgets/homes/home-6/FormModalContent';
import {
  carBrands,
  contactItems,
  navItems,
  socialMediaLinks,
  vehicleTypes,
} from '@/data/footerLinks';
import Image from 'next/image';
import { useTranslation } from 'react-i18next';

export default function Footer3({ parenttClass = 'boxcar-footer footer-style-five' }) {
  // Состояние для открытия модального окна
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { t } = useTranslation();

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      <footer className={parenttClass}>
        <div className="footer-top">
          <div className="boxcar-container">
            <div className="right-box">
              <div className="top-left wow fadeInUp">
                <div className="mb-4">
                  <Image
                    alt="Logo"
                    title="DeliBike"
                    src="/images/logo-deli2.svg"
                    width={111}
                    height={48}
                  />
                  <div style={{ lineHeight: '5px' }}>
                    <span className="logo-text white-text">{t('home.footer.logo.speed')}</span>
                    <span className="logo-text white-text">{t('home.footer.logo.freedom')}</span>
                    <span className="logo-text white-text">{t('home.footer.logo.style')}</span>
                  </div>
                </div>
                <div className="text">
                  {t('home.footer.subscriptionText')}
                </div>
              </div>
              <div className="subscribe-form wow fadeInUp" data-wow-delay="100ms">
                <Button variant="filled" color="#ff5500" onClick={openModal}>
                  {t('home.footer.submitButton')}
                </Button>
              </div>
            </div>
          </div>
        </div>
        <div className="widgets-section">
          <div className="boxcar-container">
            <div className="row">
              {/* Footer Column */}
              <div className="footer-column-two col-lg-9 col-md-6 col-sm-12">
                <div className="row">
                  <div className="col-lg-6 col-md-6 col-sm-12">
                    <div className="footer-widget links-widget wow fadeInUp">
                      <h4 className="widget-title">{t('home.footer.sections.usefulLinks')}</h4>
                      <div className="widget-content">
                        <ul className="user-links style-two">
                          {navItems.map((elm, i) => (
                            <li key={i}>
                              <Link href={elm.link}>{elm.name}</Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                  {/* Остальные колонки можно добавить по необходимости */}
                  <div className="col-lg-6 col-md-6 col-sm-12">
                    <div className="footer-widget links-widget wow fadeInUp" data-wow-delay="200ms">
                      <h4 className="widget-title">
                        {t('home.footer.sections.ebikes')} <span className="orange">Deli-bike</span>
                      </h4>
                      <div className="widget-content">
                        <ul className="user-links style-two">
                          {vehicleTypes.map((elm, i) => (
                            <li key={i}>
                              <Link href={elm.link}>{elm.name}</Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Footer Column */}
              <div className="footer-column col-lg-3 col-md-6 col-sm-12">
                <div className="footer-widget social-widget wow fadeInUp" data-wow-delay="400ms">
                  <h4 className="widget-title">{t('home.footer.sections.serviceCenter')}</h4>
                  <div className="widget-content">
                    <div className="text">{t('home.footer.workingHours')}</div>
                    <div className="social-icons">
                      <h6 className="title">{t('home.footer.findUs')}</h6>
                      <ul>
                        {socialMediaLinks.map((social, index) => (
                          <li className="mr-2 ml-2" key={index}>
                            <a href={social.link}>
                              <i
                                style={{ fontSize: '25px', color: '#ff5500' }}
                                className={social.iconClass}
                              />
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Footer Bottom */}
        <div className="footer-bottom">
          <div className="boxcar-container">
            <div className="inner-container">
              <div className="copyright-text wow fadeInUp">
                <p>
                  © 2025 <span className="uppercase orange">Deli-Bike</span>. Все права защищены.
                </p>
              </div>
              <ul className="footer-nav wow fadeInUp" data-wow-delay="100ms">
                <li>
                  <a href="/terms">Политика конфиденциальности</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
      {/* Модальное окно с формой заявки */}
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <FormModalContent />
      </Modal>
    </>
  );
}
