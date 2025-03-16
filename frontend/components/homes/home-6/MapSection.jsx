import React from "react";
import { FaWhatsapp, FaTelegramPlane, FaInstagram } from "react-icons/fa";

export default function MapSection() {
  return (
      <section className="map-section">
        <div className="goole-iframe">
          <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2901.4430458537927!2d76.964199586225!3d43.34684239773496!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38836d2b9c3841a3%3A0x5bf46e5d424c322c!2z0L_RgNC-0YHQvy4g0KHRg9GO0L3QsdCw0Y8gNDE5LCDQkNC70LzQsNGC0Ys!5e0!3m2!1sru!2skz!4v1733723200524!5m2!1sru!2skz"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>

        <div className="boxcar-container">
          <div className="map-box">
            <h2>Контакты</h2>

            {/* Блок с иконками */}
            <p>
              <a
                  href="https://wa.me/77078253696"
                  target="_blank"
                  rel="noopener noreferrer"
              >
                <FaWhatsapp className="social-icon" />
              </a>{" "}
              <a
                  href="https://t.me/deli_bikes"
                  target="_blank"
                  rel="noopener noreferrer"
              >
                <FaTelegramPlane className="social-icon" />
              </a>{" "}
              <a
                  href="https://instagram.com/deli_bikes"
                  target="_blank"
                  rel="noopener noreferrer"
              >
                <FaInstagram className="social-icon" />
              </a>
            </p>

            {/* Ссылки на сайты и телефон */}
            <p>
              <a
                  href="https://deli-bike.kz"
                  target="_blank"
                  rel="noopener noreferrer"
              >
                deli-bike.kz
              </a>
              <br />
              <a
                  href="https://deli-bike.by"
                  target="_blank"
                  rel="noopener noreferrer"
              >
                deli-bike.by
              </a>
              <br />
              <a href="tel:+77078253696">+7 (707) 825-3696</a>
            </p>

            <p>
              <strong>Общие вопросы:</strong> info@deli-bike.kz (в РК)
              <br />
              <strong>Сотрудничество:</strong> Sales_KZ@deli-bike.kz (в РК), Sales_BY@deli-bike.kz
              (в РБ)
              <br />
              <strong>Реклама и сотрудничество с юрлицами:</strong> marketing@deli-bike.kz (все
              страны)
              <br />
              service_KZ@deli-bike.kz (в РК)
              <br />
              service_BY@deli-bike.kz (в РБ)
              <br />
              HR@deli-bike.kz (все страны)
            </p>

            <p>
              <strong>СЕРВИС-ЦЕНТР:</strong>
              <br />
              РК, Алматы, пр. Суюнбая, ул. Бекмаханова, д. 419/2
              <br />
              График работы: Ежедневно 10:00–20:00
            </p>

            <p>
              Политика конфиденциальности
              <br />
              Договор на использование сервиса
              <br />
              ТОО «MD Line (МД Лайн)»
            </p>
          </div>
        </div>
      </section>
  );
}