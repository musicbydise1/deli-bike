"use client";

import React, { useCallback, useEffect, useState } from "react";
import Button from "@/components/ui/button/Button";
import Image from "next/image";
import { useTranslation, Trans } from "react-i18next";
import Modal from "@/components/homes/home-6/Modal";
import FormModalContent from "@/components/homes/home-6/FormModalContent";
import Link from "next/link";

export default function Hero() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  // Состояние для роли пользователя, по умолчанию "courier"
  const [userRoleCookie, setUserRoleCookie] = useState("courier");
  const range = "90";
  const { t } = useTranslation();

  useEffect(() => {
    // Чтение cookies для получения userRole
    const cookies = document.cookie.split(";").map(cookie => cookie.trim());
    const roleCookie = cookies.find(cookie => cookie.startsWith("userRole="));
    if (roleCookie) {
      const role = roleCookie.split("=")[1];
      setUserRoleCookie(role);
    }
  }, []);

  const toggleModal = useCallback(() => {
    setIsModalOpen((prev) => !prev);
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
                    {t("home_title")}{" "}
                    <span className="orange !mb-[15px] uppercase">
                    {userRoleCookie === "courier" ? t("for_courier") : t("for_business")}
                  </span>
                  </h1>
                  <span className="wow fadeInUp" data-wow-delay="100ms">
                  {userRoleCookie === "courier" ? (
                      <>
                        {t("home.hero.courier_text")} <br />
                        <span className="font-medium mb-0">
                        {t("home.hero.courier_text_second")}
                      </span>
                      </>
                  ) : (
                      <>
                        {t("home.hero.business_text")} <br />
                        <span className="font-medium mb-0">
                        {t("home.hero.business_text_second")}
                      </span>
                      </>
                  )}
                </span>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-3 w-full hero-btn-box">
                    <Link href="/#bikes">
                      <Button className="!ml-0 w-full sm:w-auto" variant="primary">
                        {t("home.hero.rent_bike")}
                      </Button>
                    </Link>
                    <Button
                        className="w-full sm:w-auto !ml-0"
                        variant="primary-outline"
                        onClick={toggleModal}
                    >
                      {t("home.hero.get_consultation")}
                    </Button>
                  </div>
                  <div className="right-box wow fadeInUp" data-wow-delay="100ms">
                    <ul className="service-list">
                      <ServiceItem title={t("home.hero.in_city_title")}>
                        <span className="big-text">№1</span> {t("home.hero.in_city")}
                      </ServiceItem>
                      <ServiceItem title={t("home.hero.range_title")}>
                        <Trans i18nKey="home.hero.range" values={{ value: range }}>
                          <span className="big-text">{range}</span>
                        </Trans>
                      </ServiceItem>
                      <ServiceItem title={t("home.hero.savings_title")}>
                        <Trans i18nKey="home.hero.savings" values={{ value: "80%" }}>
                          <span className="big-text">80%</span>
                        </Trans>
                      </ServiceItem>
                    </ul>
                  </div>
                </div>
                <div className="right-banner wow fadeInUp" data-wow-delay="100ms">
                  <div className="right-banner-box">
                    <p>{t("home.hero.payback")}</p>
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