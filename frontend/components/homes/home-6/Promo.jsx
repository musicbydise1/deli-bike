'use client';
import React, { useState, useEffect } from 'react';
import Button from '@/components/ui/button/Button';
import Modal from '@/components/homes/home-6/Modal';
import FormModalContent from '@/components/homes/home-6/FormModalContent';
import Image from 'next/image';
// Импортируем нужные иконки
import { FaUserFriends, FaHandsHelping, FaMoneyCheckAlt, FaBoxOpen } from 'react-icons/fa';

export default function Promo() {
  // Локальное состояние для роли пользователя
  const [userRole, setUserRole] = useState('courier');

  // Получаем роль из cookies вместо localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const cookies = document.cookie.split(';').map(cookie => cookie.trim());
      const roleCookie = cookies.find(cookie => cookie.startsWith('userRole='));
      const role = roleCookie ? roleCookie.split('=')[1] : 'courier';
      setUserRole(role);
    }
  }, []);

  // Состояние для открытия/закрытия модального окна
  const [isModalOpen, setIsModalOpen] = useState(false);
  const toggleModal = () => setIsModalOpen(prev => !prev);

  return (
    <section className="boxcar-promo-section-seven">
      <div className="boxcar-container">
        {/* Заголовок блока */}
        <div className="boxcar-title promo-title">
          <h2>
            Промо-программы <span className="orange">Deli-Bike</span>
          </h2>
          <p>(индивидуальные решения)</p>
        </div>

        <div className="row">
          {/* Левая колонка: инфоблоки/предложения */}
          <div className="col-md-8">
            <div className="promo-info-list">
              {/* 1. Блок всегда виден: «Уже сотрудничаете с нами?» */}
              <div className="fancy-promo">
                <div className="icon-wrapper">
                  <FaUserFriends className="promo-icon" />
                </div>
                <div>
                  <h4>Уже сотрудничаете с нами?</h4>
                  <p>
                    Приводи нового Партнёра — получай
                    <br />
                    сниженный тариф
                  </p>
                </div>
              </div>

              {/* 2. Блок только для corporate: «Кросс-Промо для ПАРТНЁРА» */}
              {userRole === 'corporate' && (
                <div className="fancy-promo">
                  <div className="icon-wrapper">
                    <FaHandsHelping className="promo-icon" />
                  </div>
                  <div>
                    <h4>Кросс-Промо для ПАРТНЁРА</h4>
                    <p>(для удержания Курьеров)</p>
                  </div>
                </div>
              )}

              {/* 3. Блок только для courier: «Аренда с выкупом» */}
              {userRole === 'courier' && (
                <div className="fancy-promo">
                  <div className="icon-wrapper">
                    <FaMoneyCheckAlt className="promo-icon" />
                  </div>
                  <div>
                    <h4>Аренда с выкупом</h4>
                    <p>12, 18 и 24 месяца</p>
                  </div>
                </div>
              )}

              {/* 4. TERMОBOX + три фото (блок всегда виден) */}
              <div className="fancy-promo">
                <div className="icon-wrapper">
                  <FaBoxOpen className="promo-icon" />
                </div>
                <div>
                  <h4>TERMОBOX</h4>
                  <p>Брендируется под заказ</p>
                  {/* Галерея из 3 фото */}
                  <div className="termo-photos mt-2">
                    <Image
                      width={30}
                      height={30}
                      src="/images/termo-box1.png"
                      alt="Termobox 1"
                      className="termo-photo"
                    />
                    <Image
                      width={30}
                      height={30}
                      src="/images/termo-box2.png"
                      alt="Termobox 2"
                      className="termo-photo"
                    />
                    <Image
                      width={30}
                      height={30}
                      src="/images/termo-box3.png"
                      alt="Termobox 3"
                      className="termo-photo"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Правая колонка: баннер/изображение + текст/кнопка */}
          <div className="col-md-4">
            <div className="promo-image-container position-relative">
              <Image
                src="/images/promo.png"
                alt="Deli-Bike Promo"
                className="img-fluid w-100"
                width={1200}
                height={600}
              />
              <div className="promo-overlay position-absolute">
                <Button variant="primary" className="mt-2" onClick={toggleModal}>
                  Отправить заявку
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Модальное окно с формой */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <FormModalContent />
      </Modal>

      {/* Стили можно вынести в отдельный CSS/SCSS файл */}
      <style jsx>{`
        .promo-info-list {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        /* Общий стиль заголовков в блоках */
        .fancy-promo h4 {
          color: #fff;
          text-transform: uppercase;
          margin-bottom: 0.2rem;
          font-weight: 600;
        }

        /* Общий стиль описания */
        .fancy-promo p {
          color: #fff;
          margin: 0;
          font-size: 1rem;
          line-height: 1.4;
        }

        /* Красивый фоновый блок для каждого пункта */
        .fancy-promo {
          display: flex;
          gap: 1rem;
          align-items: center;
          background: #ff5500;
          border: 1px solid #ff5500;
          border-radius: 8px;
          padding: 1rem;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
          transition:
            transform 0.3s,
            box-shadow 0.3s;
        }
        .fancy-promo:hover {
          transform: translateY(-3px);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
        }

        /* Контейнер для иконки */
        .icon-wrapper {
          flex-shrink: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 48px;
          height: 48px;
          border-radius: 50%;
          color: #ff5500;
          font-size: 1.5rem;
          background-color: #fff;
        }

        /* Сама иконка */
        .promo-icon {
          color: #fff;
          font-size: 1.5rem;
        }

        /* Галерея фото в TERMОBOX */
        .termo-photos {
          display: flex;
          gap: 0.5rem;
          margin-top: 2rem;
        }
        .termo-photo {
          margin-top: 2rem;
          width: 170px;
          height: 170px;
          object-fit: cover;
          border-radius: 4px;
        }

        /* Правая колонка */
        .promo-image-container {
          overflow: hidden;
          border-radius: 8px;
        }
        .promo-overlay {
          top: 90%;
          left: 50%;
          transform: translate(-50%, -50%);
          color: #fff;
          text-align: center;
          width: 100%;
          padding-bottom: 30px;
        }
        .promo-overlay h3 {
          font-size: 1.5rem;
          font-weight: 700;
          margin-bottom: 0.5rem;
          text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.4);
          color: #ff5500;
        }
        .promo-overlay p {
          font-size: 1.2rem;
          margin-bottom: 1rem;
          text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.4);
          color: #ff5500;
        }
      `}</style>
    </section>
  );
}
