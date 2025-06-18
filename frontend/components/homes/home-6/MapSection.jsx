'use client';
import React, { useState, useEffect } from 'react';
import { FaWhatsapp, FaTelegramPlane, FaInstagram } from 'react-icons/fa';
import Link from 'next/link';
import { useUser } from '@/context/UserContext';

export default function MapSection() {
  // Состояние для локации; по умолчанию "kz"
  const { location } = useUser();

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
          <h2>Контакты</h2>

          {/* Блок с иконками */}
          <div className="flex items-center space-x-4 mb-2">
            <a
              href="https://wa.me/+77088892879"
              target="_blank"
              rel="noopener noreferrer"
              className="text-green-500 hover:text-green-600 text-3xl"
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
          <div className="mb-4">
            <a
              href="https://deli-bike.kz"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#ff5500] hover:underline block"
            >
              www.deli-bike.kz
            </a>
            <a
              href="https://deli-bike.by"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#ff5500] hover:underline block"
            >
              www.deli-bike.by
            </a>
            <a href="tel:+77078253696" className="text-[#ff5500] hover:underline">
              +7 (707) 825-3696
            </a>
          </div>

          <p className="text-sm text-gray-700 mb-4">
            <strong>Общие вопросы:</strong> info@deli-bike.kz (в РК)
            <br />
            <strong>Сотрудничество:</strong>
            <br /> Sales_KZ@deli-bike.kz (в РК), <br /> Sales_BY@deli-bike.kz (в РБ)
            <br />
            <strong>Реклама и сотрудничество с юрлицами:</strong> marketing@deli-bike.kz (все
            страны)
            <br />
            <strong>Сервис:</strong>
            <br /> service_KZ@deli-bike.kz (в РК), <br /> service_BY@deli-bike.kz (в РБ)
            <br />
            <strong>Трудоустройство:</strong> HR@deli-bike.kz (все страны)
          </p>

          <p className="text-sm text-gray-700 mb-4">
            <strong>СЕРВИС-ЦЕНТР:</strong>
            <br />
            РК, Алматы, пр. Суюнбая, ул. Бекмаханова, д. 419/2
            <br />
            РБ, Минск, ул. Притыцкого, д. 2, корп. 1.
            <br />
            График работы: Ежедневно 10:00–19:00
          </p>

          <div>
            <ul className="mb-2 space-y-1">
              <li>
                <Link href="/terms" className="text-sm text-[#ff5500] hover:underline">
                  Политика конфиденциальности
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-sm text-[#ff5500] hover:underline">
                  Договор на использование сервиса
                </Link>
              </li>
            </ul>
            <span className="text-xs font-bold text-gray-500">ТОО «MD Line (МД Лайн)»</span>
          </div>
        </div>
      </div>
    </section>
  );
}
