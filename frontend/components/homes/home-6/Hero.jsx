"use client";

import React, {useEffect, useState} from "react";
import Button from "@/components/ui/button/Button";
import Image from "next/image";
// import { useTranslation } from "react-i18next";
export default function Hero() {

  const [userRole, setUserRole] = useState(null);

  // Check user role from localStorage
  useEffect(() => {
    const role = localStorage.getItem("userRole"); // Assuming "userRole" is the key in localStorage
    setUserRole(role);
  }, []);

  // const { t } = useTranslation();

  return (
    <section className="boxcar-banner-section-six">
      <div className="boxcar-container">
        <div className="row">
          <div className="content-column col-md-12 col-sm-12">
            <div className="inner-column">
              <div className="left-banner">
                <h1 className="wow fadeInUp mb-0" data-wow-delay="100ms">
                  АРЕНДА ЭЛЕКТРОВЕЛОСИПЕДОВ{" "}
                  <span style={{color: "#ff5500", marginBottom: "15px", textTransform: "uppercase"}}>
                    {userRole === "courier" ? "ДЛЯ КУРЬЕРОВ" : "ДЛЯ бизнеса"}
                  </span>
                </h1>
                <span className="wow fadeInUp" data-wow-delay="100ms">
                  {userRole === "courier" ? (
                      <>
                        Разгон до 55 км/ч и до 90 км на одном заряде.{" "}
                        <span style={{fontWeight: 500, marginBottom: 0}}>
                        Больше доставок → больше денег.
                      </span>
                      </>
                    ) : (
                      <>
                        Сократите транспортные расходы на 50% для вашей компании.{" "}
                        <span style={{fontWeight: 500, marginBottom: 0}}>
                        Меньше расходов → больше денег.
                      </span>
                      </>
                  )}
                </span>
                <div className="btn-box">
                  <Button className="!ml-0" variant="primary">Арендовать электровелосипеды</Button>
                  <Button variant="primary-outline">Получить консультацию</Button>
                </div>
                <div className="right-box wow fadeInUp" data-wow-delay="100ms">
                  <ul className="service-list">
                    <li>
                      <a href="#">
                        До <span class="big-text" style={{
                        fontSize: "48px",
                        margin: "0px 8px",
                        lineHeight: "13.25px",
                        verticalAlign: "text-top"
                      }}>55</span> км/ч разгон
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        До <span style={{
                        fontSize: "48px",
                        margin: "0px 8px",
                        lineHeight: "13.25px",
                        verticalAlign: "text-top"
                      }}>90</span> км запас хода
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        До <span style={{
                        fontSize: "48px",
                        margin: "0px 8px",
                        lineHeight: "13.25px",
                        verticalAlign: "text-top"
                      }}>50</span> % экономии
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="right-banner wow fadeInUp" data-wow-delay="100ms">
                <div className="right-banner-box">
                  <p>окупается быстрее любого другого транспорта</p>
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
    </section>
  );
}
