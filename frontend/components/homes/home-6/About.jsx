import React from "react";
import Image from "next/image";
import Link from "next/link";

export default function About() {
    return (
        <section className="boxcar-pricing-section-five">
            <div className="row g-0">
                {/* image-column */}
                <div className="image-column col-lg-6 col-md-6 col-sm-12">
                    <div className="inner-column wow fadeInUp">
                        <div className="image-box">
                            <figure className="image">
                                <Image
                                    alt="Map of Almaty"
                                    src="/images/resource/pricing5-1.jpg"
                                    width={776}
                                    height={600}
                                />
                            </figure>
                        </div>
                    </div>
                </div>
                {/* content-column */}
                <div className="content-column col-lg-6 col-md-6 col-sm-12">
                    <div className="inner-column wow fadeInUp" data-wow-delay="100ms">
                        <div className="boxcar-title light">
                            <h2>Общая информация</h2>
                            <div className="text">
                                <p><strong>Ассортимент:</strong> Отработанная и адаптированная линейка электровелосипедов и аксессуаров для работы курьеров.</p>
                                <p><strong>Штат:</strong> 20 сотрудников, включая сервисменов, водителей, административных работников.</p>
                                <p><strong>Площадь:</strong> Склады и сервисный центр – 450 м², офис.</p>
                                <p><strong>Контроль качества и система менеджмента:</strong> Производство на базе собственных техзаданий и документации для тяжелых условий эксплуатации (горная местность).</p>
                                <p><strong>Сервисный центр:</strong> Собственный сервисный центр в Алматы; планируется открытие в Астане, Караганде и др.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
