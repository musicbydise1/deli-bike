"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import InteractiveBike from "@/components/ui/interactive/InteractiveBike";
import { MdSunny } from "react-icons/md";
import { FaDollarSign, FaTenge } from "react-icons/fa";
import Button from "@/components/ui/button/Button";
import Modal from "@/components/homes/home-6/Modal";
import FormModalContent from "@/components/homes/home-6/FormModalContent";

export default function Cta() {
  // Состояние для модального окна
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
      <>
        <section className="boxcar-pricing-section-two home-cta pt-0 pb-0">
          <div className="boxcar-container">
            <div className="row">
              {/* content-column */}
              <div className="content-column cta-home-text col-lg-7 col-md-6 col-sm-12">
                <div className="inner-column wow fadeInUp">
                  <div className="boxcar-title">
                    <h2>
                      Брендирование для <span className="orange">ПАРТНЕРА DELI-BIKE</span>
                    </h2>
                    <div className="desc-boxes">
                      <div className="desc-box">
                        <div className="icon-box">
                          <MdSunny size={60} color="#ff5500" />
                        </div>
                        <div className="texxt-box">
                          <div className="title">
                            <h2>Яркая реклама</h2>
                          </div>
                          <div className="text">
                            Превратите электровелосипед в передвижную рекламу. Логотип заметен и работает лучше любого
                            баннера — всегда на виду.
                            Размещайте логотип на раме (1), АКБ (2) и термоконтейнере (3), чтобы выделиться еще сильнее.
                          </div>
                        </div>
                      </div>
                      <div className="desc-box">
                        <div className="icon-box">
                          <FaDollarSign size={60} color="#ff5500" />
                        </div>
                        <div className="texxt-box">
                          <div className="title">
                            <h2>Дополнительная прибыль</h2>
                          </div>
                          <div className="text">
                            Реклама на вашем транспорте приносит доход, а поездки превращаются в источник прибыли.
                          </div>
                        </div>
                      </div>
                      <div className="desc-btn ml-0! mt-[70px]">
                        <Button variant="primary" onClick={openModal}>
                          Оставить заявку
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* image-column */}
              <div className="image-column cta-home col-lg-5 col-md-6 col-sm-12">
                <div className="inner-column wow fadeInUp">
                  <div className="image-box">
                    <InteractiveBike />
                    <h4 className="text-center mt-3">Места для вашего логотипа</h4>
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