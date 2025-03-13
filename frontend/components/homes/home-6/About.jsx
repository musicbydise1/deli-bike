import React from "react";
import Image from "next/image";
import Link from "next/link";
export default function About() {
    return (
        <>
            <section className="about-inner-one about-home">
                <div className="upper-box">
                    <div className="boxcar-container">
                        <div className="row wow fadeInUp">
                            <div className="col-lg-6 col-md-6 col-sm-12">
                                <div className="boxcar-title">
                                    <h2>всё необходимое для комфортной и безопасной работы</h2>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* gallery-sec */}
                <div className="galler-section">
                <div className="boxcar-container">
                    <div className="row">
                        <div className="exp-block col-md-2 col-sm-12">
                            <div className="inner-box">
                                <div className="exp-box">
                                    <div className="ext-text-box">
                                        <h2 className="title">Шлем</h2>
                                        <div className="text">Учитываем все правила безопасности</div>
                                    </div>
                                    <Image
                                        alt=""
                                        title="DeliBike"
                                        src="/images/deli-hat.png"
                                        width={208}
                                        height={208}
                                        className="deli-hat-img"
                                    />
                                </div>
                                <div className="image-box second-box">
                                    <div className="ext-text-box second-text">
                                        <h2 className="title">Велозамок</h2>
                                        <div className="text">Защита от краж и спокойствие</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="image-block style-center col-md-5 col-sm-12 second-box-box">
                            <div className="image-box">
                                <div className="ext-text-box second-text">
                                    <h2 className="title">Термо-контейнер</h2>
                                    <div className="text">Держит температуру, выдерживает нагрузки. Фиксация на велосипеде без лишних движений.
                                        Ударостойкий корпус защищает еду даже при активной езде.</div>
                                </div>
                                    <div className="box-image">
                                        <Image
                                            alt=""
                                            width={567}
                                            height={530}
                                            src="/images/about-bike.png"
                                            className="about-bike-img"
                                        />
                                    </div>
                            </div>
                        </div>

                        <div className="image-block col-md-5 col-sm-12">
                            <div className="image-box two second-box-box mb-[27px]">
                                <div className="ext-text-box second-text">
                                    <h2 className="title text-[var(--theme-color1)]">Лазерный свет</h2>
                                    <div className="text pb-[25px]"><span className="font-medium">Будьте заметны на дороге</span> – задний велосипедный фонарь с лазерным наведением.
                                        Этот мощный фонарь с <span className="font-medium">7 режимами освещения</span> делает вас хорошо заметным для водителей в любое время суток.
                                        Две яркие красные линии создают безопасную зону обгона по обе стороны велосипеда.
                                        Лазерные линии заметны на расстоянии до <span className="font-medium">1,5 км</span> – водители видят вас заранее.
                                    </div>
                                </div>
                            </div>
                            <div className="row box-double-img">
                                <div className="image-block col-lg-6 col-6">
                                    <div className="image-box last-home-box">
                                        <div className="exp-box">
                                            <div className="ext-text-box">
                                                <h2 className="title">Дождевик</h2>
                                                <div className="text">Выполняйте заказы в любую погоду</div>
                                            </div>
                                            <Image
                                                alt=""
                                                title="DeliBike"
                                                src="/images/rain.png"
                                                width={266}
                                                height={208}
                                                className="deli-rain-img"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="image-block second-box last-home-box-box col-lg-6 col-6">
                                    <div className="image-box">
                                        <div className="image-box">
                                            <div className="ext-text-box second-text">
                                                <h2 className="title">Смартфон</h2>
                                                <div className="text">Нет смартфона? Можете выгодно арендовать у нас</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                </div>
            </section>
        </>
    );
}
