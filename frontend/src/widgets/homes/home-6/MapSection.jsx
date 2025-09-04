'use client';
import React from 'react';
import { FaWhatsapp, FaTelegramPlane, FaInstagram } from 'react-icons/fa';
import Link from 'next/link';
import { useUser } from '@/context/UserContext';
import { useTranslation } from 'react-i18next';

export default function MapSection() {
  // Состояние для локации; по умолчанию "kz"
  const { location } = useUser();
  const { t } = useTranslation('common');

  if (location === 'by') {
    console.log(true);
  }

  // Определяем src iframe в зависимости от локации
  const iframeSrc =
    location === 'by'
      ? 'https://yandex.ru/map-widget/v1/?um=constructor:cedc916a1e067d662fd8202b5c998c9e2b85a6e9942d1e5f6b84c247db681562&source=constructor'
      : 'https://yandex.ru/map-widget/v1/?um=constructor:09c4e22b62a7827151b5ea69039726e84e1b3736e427800011c793151882ad35&source=constructor';

  return (
    <section className="map-section">
      <div className="goole-iframe">
        <iframe
          src={iframeSrc}
          width="100%"
          height="450"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>

      <div className="boxcar-container">
        <div className="map-box">
          <h2>{t('home.mapSection.title')}</h2>

          {/* Блок с иконками */}
          <div className="flex items-center space-x-4 mb-2">
            <a
              href="https://wa.me/+77088892879"
              target="_blank"
              rel="noopener noreferrer"
              className="text-green-500 hover:text-green-600 text-3xl mr-2"
            >
              <FaWhatsapp />
            </a>
            <a
              href="https://t.me/+77088892879"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:text-blue-600 text-3xl"
            >
              <FaTelegramPlane />
            </a>
            <a
              href="https://instagram.com/deli_bikes"
              target="_blank"
              rel="noopener noreferrer"
              className="text-pink-500 hover:text-pink-600 text-3xl"
            >
              <FaInstagram />
            </a>
          </div>

          {/* Ссылки на сайты и телефон */}
          <div className="mb-2">
            <a
              href="https://deli-bike.kz"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#ff5500] hover:underline block"
            >
              www.deli-bike.kz
            </a>
            <br />
            <a
              href="https://deli-bike.by"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#ff5500] hover:underline block"
            >
              www.deli-bike.by
            </a>
            <br />
            <a href="tel:+77078253696" className="text-[#ff5500] hover:underline">
              +7 (707) 825-3696
            </a>
          </div>

          <p className="text-sm text-gray-700 mb-2">
            <strong>{t('home.mapSection.contacts.general')}:</strong> info@deli-bike.kz (
            {t('home.mapSection.contacts.inKZ')})
            <br />
            <strong>{t('home.mapSection.contacts.cooperation')}:</strong>
            <br /> Sales_KZ@deli-bike.kz ({t('home.mapSection.contacts.inKZ')}), <br />{' '}
            Sales_BY@deli-bike.kz ({t('home.mapSection.contacts.inBY')})
            <br />
            <strong>{t('home.mapSection.contacts.marketing')}:</strong> marketing@deli-bike.kz (
            {t('home.mapSection.contacts.allCountries')})
            <br />
            <strong>{t('home.mapSection.contacts.service')}:</strong>
            <br /> service_KZ@deli-bike.kz ({t('home.mapSection.contacts.inKZ')}), <br />{' '}
            service_BY@deli-bike.kz ({t('home.mapSection.contacts.inBY')})
            <br />
            <strong>{t('home.mapSection.contacts.employment')}:</strong> HR@deli-bike.kz (
            {t('home.mapSection.contacts.allCountries')})
          </p>

          <p className="text-sm text-gray-700 mb-4">
            <strong>{t('home.mapSection.serviceCenter.title')}:</strong>
            <br />
            {t('home.mapSection.serviceCenter.addressKZ')}
            <br />
            {t('home.mapSection.serviceCenter.addressBY')}
            <br />
            {t('home.mapSection.serviceCenter.workingHours')}
          </p>

          <div>
            <ul className="mb-2 space-y-1">
              <li>
                <Link href="/terms" className="text-sm text-[#ff5500] hover:underline">
                  {t('home.mapSection.links.privacy')}
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-sm text-[#ff5500] hover:underline">
                  {t('home.mapSection.links.terms')}
                </Link>
              </li>
            </ul>
            <span className="text-xs font-bold text-gray-500">
              {t('home.mapSection.companyName')}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
