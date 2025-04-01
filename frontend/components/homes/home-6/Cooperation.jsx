"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { TbShieldLockFilled } from "react-icons/tb";

export default function Cooperation() {
    const [userRole, setUserRole] = useState("courier");

    // Получаем роль пользователя из cookies вместо localStorage
    useEffect(() => {
        const cookies = document.cookie.split(";").map((cookie) => cookie.trim());
        const roleCookie = cookies.find((cookie) => cookie.startsWith("userRole="));
        if (roleCookie) {
            const role = roleCookie.split("=")[1];
            setUserRole(role);
        }
    }, []);

    return (
        <section className="cooperation-section">
            <div className="boxcar-container">
                <div className="boxcar-title wow fadeInUp !mb-[30px]">
                    <h2 className="title">
                        Варианты сотрудничества{" "}
                        <span className="hero-title-small-text">Deli-Bike</span>
                    </h2>
                    <p>Индивидуальные решения для Партнёров</p>
                </div>
                <div className="cooperation-main-block">
                    <div className="inner-box wow fadeInUp" data-wow-delay="100ms">
                        <div className="content-box">
                            <h6 className="title">Договор (Юр.лицо)</h6>
                        </div>
                    </div>
                </div>
                <div className="row">
                    {/* cooperation-block */}
                    <div className="cooperation-block col-lg-4 col-md-6 col-sm-12">
                        <div className="inner-box wow fadeInUp" data-wow-delay="100ms">
                            <div className="content-box">
                                <h6 className="title">Депозитная Модель</h6>
                                <div className="text">
                                    Соглашение о сотрудничестве с компанией, оплачивающей аренду; договор с курьером; за транспорт отвечает курьер.
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* cooperation-block */}
                    <div className="cooperation-block col-lg-4 col-md-6 col-sm-12">
                        <div className="inner-box wow fadeInUp">
                            <div className="content-box">
                                <h6 className="title">Гарантийная Модель</h6>
                                <div className="text">
                                    Договор с компанией, оплачивающей аренду; за транспорт отвечает компания.
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* cooperation-block */}
                    <div className="cooperation-block col-lg-4 col-md-6 col-sm-12">
                        <div className="inner-box wow fadeInUp" data-wow-delay="200ms">
                            <div className="content-box">
                                <h6 className="title">Тарифная Модель</h6>
                                <div className="text">
                                    Договор с курьером, оплачивающим аренду полностью/частично; скидки компании распространяются на курьера; за транспорт отвечает курьер.
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row tariffs">
                    <div className="col-lg-6 col-md-6 col-sm-12">
                        <div className="tariff-title">
                            <h5>Тарифы</h5>
                        </div>
                        <div className="row">
                            <div className="cooperation-block col-lg-6 col-md-12 col-sm-12">
                                <div className="inner-box wow fadeInUp" data-wow-delay="100ms">
                                    <div className="content-box">
                                        <h6 className="title">Стандарт</h6>
                                        <div className="text">
                                            Стандартный пакет аренды, услуг и сервисного обслуживания Оборудования
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* cooperation-block */}
                            <div className="cooperation-block col-lg-6 col-md-12 col-sm-12">
                                <div className="inner-box wow fadeInUp" data-wow-delay="200ms">
                                    <div className="content-box">
                                        <h6 className="title">премиум</h6>
                                        <div className="text">
                                            Аренда с бесплатным сервисным обслуживанием определенных элементов Оборудования
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* cooperation-block */}
                    <div className="cooperation-block text-center garrantue col-lg-5 col-md-6 col-sm-12">
                        <div className="inner-box wow fadeInUp">
                            <div className="content-box">
                                <div className="tariff-icon">
                                    <TbShieldLockFilled size={80} />
                                </div>
                                <h6 className="title">расширенная гарантия</h6>
                                <div className="text">
                                    Бесплатное сервисное обслуживание расширенного пакета элементов Оборудования
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}