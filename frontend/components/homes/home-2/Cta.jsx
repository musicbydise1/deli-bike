import React from "react";
import Image from "next/image";
import Link from "next/link";
import InteractiveBike from "@/components/ui/interactive/InteractiveBike";
import {MdSunny} from "react-icons/md";
import {FaTenge} from "react-icons/fa";
export default function Cta() {
  return (
    <section className="boxcar-pricing-section-two home-cta pt-0 pb-0">
      <div className="boxcar-container">
        <div className="row">
          {/* content-column */}
          <div className="content-column cta-home-text col-lg-7 col-md-6 col-sm-12">
            <div className="inner-column wow fadeInUp">
              <div className="boxcar-title">
                <h2>
                  <span style={{ color:"#ff5500" }}>БРЕНДИРОВАНИЕ</span>. Получите фирменный транспорт с вашим логотипом
                </h2>
                <div className="desc-boxes">
                  <div className="desc-box">
                    <div className="icon-box">
                      <MdSunny size={60} color="#ff5500"/>
                    </div>
                    <div className="texxt-box">
                      <div className="title">
                        <h2>Яркая реклама</h2>
                      </div>
                      <div className="text">
                        Вы превращаете электровелосипед в передвижную рекламу. Логотип заметен и работает лучше любого
                        баннера — всегда на виду.
                        Размещайте логотип на раме (1), АКБ (2) и термоконтейнере (3), чтобы выделиться еще сильнее.
                      </div>
                    </div>
                  </div>
                  <div className="desc-box">
                    <div className="icon-box">
                      <FaTenge size={60} color="#ff5500"/>
                    </div>
                    <div className="texxt-box">
                      <div className="title">
                        <h2>Дополнительная прибыль</h2>
                      </div>
                      <div className="text">
                        Вы можете привлечь спонсоров и окупить аренду или покупку.
                        Дополнительная реклама на вашем транспорте приносит доход без лишних затрат.
                        Ваши поездки превращаются в источник прибыли, а не только расходов.
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* image-column */}
          <div className="image-column cta-home col-lg-5 col-md-6 col-sm-12">
            <div className="inner-column wow fadeInUp">
              <div className="image-box">
                <InteractiveBike/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
