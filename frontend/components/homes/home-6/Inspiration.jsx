import React from "react";
import Image from "next/image";
import { carCategories2 } from "@/data/categories";
export default function Inspiration() {
  return (
    <section className="boxcar-inspiration-section-two pt-0">
      <div className="large-container">
        <div className="right-box-two">
          <div className="uper-box">
            <div className="content-box">
              <figure className="icon">
                <a href="#">
                  <Image
                    alt=""
                    src="/images/resource/search.png"
                    width={94}
                    height={94}
                  />
                </a>
              </figure>
              <div className="boxcar-title light">
                <h2>Брендирование Транспорта</h2>
                <div className="text">
                  Опция доступна для юридические лиц
                </div>
              </div>
            </div>
          </div>
          <div className="right-box wow fadeInUp" data-wow-delay="100ms">
            <div className="boxcar-title light wow fadeInUp">
            </div>
            <ul className="service-list">
              {carCategories2.map((category, index) => (
                <li key={index}>
                  <a href="#">{category}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
