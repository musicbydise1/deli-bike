import React from "react";
import {IoStatsChart} from "react-icons/io5";
import {FaTenge} from "react-icons/fa";
import {HiMiniWrenchScrewdriver} from "react-icons/hi2";
import {RiSpeedFill} from "react-icons/ri";

export default function Features() {
  return (
      <section className="why-choose-us-section-four why-choose-home">
        <div className="boxcar-container">
          <div className="boxcar-title wow fadeInUp">
            <h2 className="title">Почему выбирают нас?</h2>
          </div>
          <div className="row">
            {/* choose-us-block */}
            <div className="choose-us-block-four col-lg-3 col-md-6 col-sm-12">
              <div className="inner-box wow fadeInUp">
                <div className="icon-box">
                  <IoStatsChart size={50} color="#ff5500"/>
                </div>
                <div className="content-box">
                  <h6 className="title">Экономия 60% </h6>
                  <div className="text">
                    За счёт манёвренности и отсутствия пробок вы сокращаете время доставки вдвое
                  </div>
                </div>
              </div>
            </div>
            {/* choose-us-block */}
            <div className="choose-us-block-four col-lg-3 col-md-6 col-sm-12">
              <div className="inner-box wow fadeInUp" data-wow-delay="100ms">
                <div className="icon-box">
                  <FaTenge size={50} color="#ff5500" />
                </div>
                <div className="content-box">
                  <h6 className="title">Доход +40%</h6>
                  <div className="text">
                    Вы делаете больше заказов за смену и повышаете свой доход в среднем на 40%
                  </div>
                </div>
              </div>
            </div>
            {/* choose-us-block */}
            <div className="choose-us-block-four col-lg-3 col-md-6 col-sm-12">
              <div className="inner-box wow fadeInUp" data-wow-delay="200ms">
                <div className="icon-box">
                  <HiMiniWrenchScrewdriver size={50} color="#ff5500" />
                </div>
                <div className="content-box">
                  <h6 className="title">Обслуживание −80%</h6>
                  <div className="text">
                    Электровелосипед проще, чем мопед или авто: меньше поломок и трат на ремонт
                  </div>
                </div>
              </div>
            </div>
            {/* choose-us-block */}
            <div className="choose-us-block-four col-lg-3 col-md-6 col-sm-12">
              <div className="inner-box wow fadeInUp" data-wow-delay="300ms">
                <div className="icon-box">
                  <RiSpeedFill size={50} color="#ff5500" />
                </div>
                <div className="content-box">
                  <h6 className="title">Время в пути −50%</h6>
                  <div className="text">
                    За счёт манёвренности и отсутствия пробок вы сокращаете время доставки вдвое.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
  );
}
