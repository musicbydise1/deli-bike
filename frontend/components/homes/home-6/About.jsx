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
                                    <h2>АКСЕССУАРЫ <span className="orange">DELI-BIKE</span> ДЛЯ КОМФОРТНОЙ
                                        И БЕЗОПАСОЙ ЕЗДЫ</h2>
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
                                        <h2 className="title">Шлем <br /> <span className="black">Deli-bike</span></h2>
                                        <div className="text">Ваша безопасность – <br />
                                            это наш приоритет</div>
                                    </div>
                                    <Image
                                        alt=""
                                        title="DeliBike"
                                        src="/images/deli-hat2.png"
                                        width={208}
                                        height={208}
                                        className="deli-hat-img"
                                    />
                                </div>
                                <div className="image-box second-box">
                                    <div className="ext-text-box second-text">
                                        <h2 className="title">Велозамок <span className="orange">Deli-bike</span></h2>
                                        <div className="text">Безопасность и <br />
                                            спокойствие</div>
                                    </div>
                                    <Image
                                        alt=""
                                        title="DeliBike"
                                        src="/images/zamok.png"
                                        width={266}
                                        height={208}
                                        className="deli-zamok-img"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="image-block style-center col-md-5 col-sm-12 second-box-box">
                            <div className="image-box">
                                <div className="ext-text-box second-text">
                                    <h2 className="title">Термо-контейнер <span className="orange">Deli-bike</span></h2>
                                    <div className="text">
                                        <ul className="about-list">
                                            <li>Держит температуру</li>
                                            <li>Закрывается на замок</li>
                                            <li>Прочный корпус</li>
                                            <li>Лайтбокс (подсветка)</li>
                                        </ul>
                                    </div>
                                </div>
                                    <div className="box-image">
                                        <Image
                                            alt=""
                                            width={567}
                                            height={530}
                                            src="/images/about-bike2.png"
                                            className="about-bike-img"
                                        />
                                    </div>
                            </div>
                        </div>

                        <div className="image-block col-md-5 col-sm-12">
                            <div className="image-box two second-box-box mb-[27px]">
                                <div className="ext-text-box second-text">
                                    <h2 className="title text-[var(--theme-color1)]">Лазерный свет <span className="black">Deli-bike</span></h2>
                                    <div className="text pb-[25px]">
                                        Фонарь с лазерным наведением, прекрасно видимый
                                        окружающим автомобилям.
                                        Лазерные указатели, которые выступают на дорогу с
                                        обеих сторон велосипеда, определяют безопасную
                                        зону обгона велосипедиста.
                                    </div>
                                </div>
                            </div>
                            <div className="row box-double-img">
                                <div className="image-block col-lg-6 col-6">
                                    <div className="image-box last-home-box">
                                        <div className="exp-box">
                                            <div className="ext-text-box">
                                                <h2 className="title">Дождевик <br /> <span className="black">Deli-bike</span></h2>
                                                <div className="text">Работайте с комфортом в <br />
                                                    любую погоду.</div>
                                            </div>
                                            <Image
                                                alt=""
                                                title="DeliBike"
                                                src="/images/rain1.png"
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
                                                <h2 className="title">Смартфон <br /> <span className="orange">Deli-bike</span></h2>
                                                <div className="text">Нет смартфона или нужен
                                                    дополнительный? <br />
                                                    Можете выгодно арендовать у
                                                    нас.</div>
                                            </div>
                                            <Image
                                                alt=""
                                                title="DeliBike"
                                                src="/images/smartphone.png"
                                                width={266}
                                                height={208}
                                                className="deli-phone-img"
                                            />
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
