"use client";

import React, { useEffect, useState } from "react";
import Button from "@/components/ui/button/Button";
import Image from "next/image";
import { useTranslation } from "react-i18next";
import Modal from "@/components/homes/home-6/Modal";
import FormModalContent from "@/components/homes/home-6/FormModalContent";
import Link from "next/link";

export default function Hero() {
  const [userRole, setUserRole] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Check user role from localStorage
  useEffect(() => {
    const role = localStorage.getItem("userRole"); // Assuming "userRole" is the key in localStorage
    setUserRole(role);
  }, []);

  useEffect(() => {
    console.log("Modal state changed:", isModalOpen);
  }, [isModalOpen]);

  // const { t } = useTranslation();
  const { i18n, t } = useTranslation();

  return (
      <section className="boxcar-banner-section-six">
        <div className="boxcar-container">
          <div className="row">
            <div className="content-column col-md-12 col-sm-12">
              <div className="inner-column">
                <div className="left-banner">
                  <h1 className="wow fadeInUp mb-0" data-wow-delay="100ms">
                    {t("home_title")} {" "}
                    <span style={{color: "#ff5500", marginBottom: "15px", textTransform: "uppercase"}}>
                    {userRole === "courier" ? t("for_courier") : t("for_business")}
                  </span>
                  </h1>
                  <span className="wow fadeInUp" data-wow-delay="100ms">
                  {userRole === "courier" ? (
                      <>{t("home.hero.courier_text")} <br/>
                        <span style={{fontWeight: 500, marginBottom: 0}}>{t("home.hero.courier_text_second")}</span>
                      </>
                  ) : (
                      <>{t("home.hero.business_text")} <br />
                        <span style={{fontWeight: 500, marginBottom: 0}}>{t("home.hero.business_text_second")}</span>
                      </>
                  )}
                </span>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-3 w-full hero-btn-box">
                    <Link
                        href={`/#bikes`}
                    >
                    <Button className="!ml-0 w-full sm:w-auto" variant="primary">
                      {t("home.hero.rent_bike")}
                    </Button>
                    </Link>
                    <Button
                        className="w-full sm:w-auto !ml-0"
                        variant="primary-outline"
                        onClick={() => {
                          setIsModalOpen(prev => !prev);
                          console.log("Toggled Modal");
                        }}
                    >
                      {t("home.hero.get_consultation")}
                    </Button>
                  </div>
                  <div className="right-box wow fadeInUp" data-wow-delay="100ms">
                    <ul className="service-list">
                      <li>
                        <h6>Скорость</h6>
                        <p>
                           <span className="big-text">№1</span> в городе
                        </p>
                      </li>
                      <li>
                        <h6>запас хода</h6>
                        <p>
                          До <span className="big-text">90</span> км на одном заряде
                        </p>
                      </li>
                      <li>
                        <h6>экономия</h6>
                        <p>
                          До <span className="big-text">50%</span> км на одном заряде
                        </p>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="right-banner wow fadeInUp" data-wow-delay="100ms">
                  <div className="right-banner-box">
                    <p>{t("home.hero.payback")}</p>
                    <Image
                        alt=""
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
