'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { clients, testimonials2 } from '@/data/testimonials';
import Button from '@/components/ui/button/Button';
import Modal from '@/components/homes/home-6/Modal';
import FormModalContent from '@/components/homes/home-6/FormModalContent';

export default function Testimonials() {
  const [userRole, setUserRole] = useState('courier');
  const [userRoleCookie, setUserRoleCookie] = useState('courier');

  // Состояние для открытия модального окна
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Получаем роль пользователя из cookies
  useEffect(() => {
    const cookies = document.cookie.split(';').map(cookie => cookie.trim());
    const roleCookie = cookies.find(cookie => cookie.startsWith('userRole='));
    if (roleCookie) {
      const role = roleCookie.split('=')[1];
      setUserRole(role);
    }
  }, []);

  // Функции открытия/закрытия модального окна
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const toggleUserRole = () => {
    const newRole = userRole === 'courier' ? 'corporate' : 'courier';
    document.cookie = `userRole=${newRole}; path=/; max-age=31536000`;
    window.location.reload();
  };

  return (
    <>
      <section className="boxcar-testimonial-section-three">
        <div className="large-container">
          <div className="right-box">
            <div className="row">
              {/* content-column */}
              <div className="content-column col-lg-6 col-md-12 col-sm-12">
                <div className="inner-column">
                  <div className="boxcar-title textiominal-title light">
                    <h2>Кому Deli-bike подойдет?</h2>
                    <div className="text">
                      Электровелосипеды DELI-BIKE сокращают расходы и <br />
                      повышают скорость доставки. <br />
                      DELI-BIKE подходит как для Курьеров, так и для компаний, <br />
                      занимающихся доставкой (розничные сети, общепит, <br />
                      службы доставки и т.д.).
                    </div>
                  </div>
                  <div className="image-box">
                    <Image
                      alt="DeliBike banner"
                      title="DeliBike"
                      src="/images/testiominals-bike1.png"
                      width={500}
                      height={371}
                      className="testiominals-img"
                    />
                  </div>
                </div>
              </div>
              {/* testimonial-block */}
              <div className="col-lg-6 col-md-12 col-sm-12">
                <div className="row">
                  {clients.map((client, index) => (
                    <div
                      key={index}
                      className="testimonial-block-three col-lg-6 col-md-6 col-sm-12"
                    >
                      <div className="inner-box">
                        <div className="content-box">
                          {/* Заголовок */}
                          <h3 className="client-title">{client.title}</h3>
                          {/* Список описаний */}
                          <ul className="client-description">
                            {client.description.map((item, idx) => (
                              <li key={idx}>
                                <strong>{item.title}</strong>
                                <br />
                                <small>{item.text}</small>
                              </li>
                            ))}
                            <div className="button-container">
                              {userRole === client.type ? (
                                <Button
                                  className="m-0 w-full"
                                  variant="secondary"
                                  onClick={openModal}
                                >
                                  Оставить заявку
                                </Button>
                              ) : (
                                <Button
                                  onClick={toggleUserRole}
                                  className="m-0 w-full"
                                  variant="primary-outline"
                                >
                                  Подробнее
                                </Button>
                              )}
                            </div>
                          </ul>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Модальное окно с формой заявки */}
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <FormModalContent />
      </Modal>
    </>
  );
}
