import React from "react";
import {IoStatsChart} from "react-icons/io5";
import {FaTenge} from "react-icons/fa";
import {HiMiniWrenchScrewdriver} from "react-icons/hi2";
import {RiSpeedFill} from "react-icons/ri";
import {MdEco} from "react-icons/md";

export default function Features() {
  return (
      <section className="why-choose-us-section-four why-choose-home" id="features">
        <div className="boxcar-container">
          <div className="boxcar-title wow fadeInUp">
            <h2 className="title">Почему выбирают <span className="orange">DELI-BIKE</span></h2>
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
                    Скорость, манёвренность, передвижение по тротуару, доставка по прямой, без <br /> пробок и АЗС.
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
                    Тратите меньше времени на заказ, больше заказов в день.
                    Повышаете свой доход
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
                    Нет затрат на бензин, штрафы, парковки, ремонт, страховку, техосмотр, шины зима-лета и т.д.
                  </div>
                </div>
              </div>
            </div>
            {/* choose-us-block */}
            <div className="choose-us-block-four col-lg-3 col-md-6 col-sm-12">
              <div className="inner-box wow fadeInUp" data-wow-delay="300ms">
                <div className="icon-box">
                  <MdEco size={50} color="#ff5500" />
                </div>
                <div className="content-box">
                  <h6 className="title">ЗАБОТА О ГОРОДЕ</h6>
                  <div className="text">
                    Экологичный, транспорт будущего, не раздражает <br/> шумом и не нервирует автолюбителей на дорогах
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
  );
}
