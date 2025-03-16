"use client";

import React, { useEffect, useState } from "react";

export default function Cooperation() {

    const [userRole, setUserRole] = useState(null);

    // Check user role from localStorage
    useEffect(() => {
        const role = localStorage.getItem("userRole"); // Assuming "userRole" is the key in localStorage
        setUserRole(role);
    }, []);

    return (
        <section className="cooperation-section">
            <div className="boxcar-container">
                <div className="boxcar-title wow fadeInUp !mb-[30px]">
                    <h2 className="title">Варианты сотрудничества <span className="hero-title-small-text">Deli-Bike</span></h2>
                    <p>Индивидуальные решения для Партнёров</p>
                </div>
                <div className="row">
                    {/* cooperation-block */}
                    <div className="cooperation-block col-lg-4 col-md-6 col-sm-12">
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
                    <div className="cooperation-block col-lg-4 col-md-6 col-sm-12">
                        <div className="inner-box wow fadeInUp">
                            <div className="content-box">
                                <h6 className="title">расширенная гарантия</h6>
                                <div className="text">
                                    Расширенный пакет защиты элементов Оборудования с бесплатным сервисным обслуживанием
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* cooperation-block */}
                    <div className="cooperation-block col-lg-4 col-md-6 col-sm-12">
                        <div className="inner-box wow fadeInUp" data-wow-delay="200ms">
                            <div className="content-box">
                                <h6 className="title">премиум</h6>
                                <div className="text">
                                    Увеличенный пакет аренды, услуг и защиты элементов Оборудования с бесплатным сервисным обслуживанием
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}