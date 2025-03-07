"use client";
import Link from "next/link";
import { carData } from "@/data/cars";
import Slider from "react-slick";
import Image from "next/image";
import { useEffect, useState } from "react";
import Button from "@/components/ui/button/Button";
import {IoIosArrowDown} from "react-icons/io";
const buttons = [
  { label: "New cars", isActive: true },
  { label: "Used Cars", isActive: false },
  { label: "In Stock", isActive: false },
];

export default function Cars() {
  const [bikes, setBikes] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(buttons[0]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const fetchBikes = async () => {
      try {
        const response = await fetch("http://91.243.71.138:4000/bikes/");
        if (!response.ok) {
          throw new Error("Ошибка при загрузке данных о байках");
        }
        const result = await response.json();
        setBikes(result.data); // Извлекаем массив байков из `data`
      } catch (error) {
        console.error("Ошибка:", error);
      } finally {
        setIsLoading(false); // Завершаем загрузку
      }
    };

    fetchBikes();
  }, []);


  return (
    <section className="cars-section-three cars-home">
      <div className="boxcar-container">
        <div className="boxcar-title wow fadeInUp">
          <h2>СТОИМОСТЬ АРЕНДЫ</h2>
          <Link href={`/bikes`} className="btn-title">
            Посмотреть
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={14}
              height={14}
              viewBox="0 0 14 14"
              fill="none"
            >
              <g clipPath="url(#clip0_601_243)">
                <path
                  d="M13.6109 0H5.05533C4.84037 0 4.66643 0.173943 4.66643 0.388901C4.66643 0.603859 4.84037 0.777802 5.05533 0.777802H12.6721L0.113697 13.3362C-0.0382246 13.4881 -0.0382246 13.7342 0.113697 13.8861C0.18964 13.962 0.289171 14 0.388666 14C0.488161 14 0.587656 13.962 0.663635 13.8861L13.222 1.3277V8.94447C13.222 9.15943 13.3959 9.33337 13.6109 9.33337C13.8259 9.33337 13.9998 9.15943 13.9998 8.94447V0.388901C13.9998 0.173943 13.8258 0 13.6109 0Z"
                  fill="#050B20"
                />
              </g>
              <defs>
                <clipPath id="clip0_601_243">
                  <rect width={14} height={14} fill="white" />
                </clipPath>
              </defs>
            </svg>
          </Link>
        </div>

        <div
          className="tab-content wow fadeInUp"
          data-wow-delay="200ms"
          id="nav-tabContent"
        >
          <div
            className="tab-pane fade show active"
            id="nav-home"
            role="tabpanel"
            aria-labelledby="nav-home-tab"
          >
            <Slider
              slidesToScroll={1}
              slidesToShow={4}
              responsive={[
                {
                  breakpoint: 1600,
                  settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    infinite: true,
                  },
                },
                {
                  breakpoint: 1300,
                  settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    infinite: true,
                  },
                },
                {
                  breakpoint: 991,
                  settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    infinite: true,
                  },
                },
                {
                  breakpoint: 767,
                  settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                  },
                },
                {
                  breakpoint: 576,
                  settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                  },
                },
                {
                  breakpoint: 480,
                  settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                  },
                },
                // You can unslick at a given breakpoint now by adding:
                // settings: "unslick"
                // instead of a settings object
              ]}
              arrows
              className="row car-slider-three"
              data-preview="4.8"
            >
              {bikes.map((bike, index) => (
                <div
                  key={index}
                  className="box-car car-block-three style-2 col-lg-3 col-md-6 col-sm-12"
                >
                  <div className="inner-box">
                    <div
                      className={`image-box ${
                        bike.tags[0] == "Great Price" ? "two" : ""
                      }`}
                    >
                      <Slider
                          dots
                          slidesToShow={1}
                          infinite={false} // отключаем бесконечное пролистывание
                          key={bike.id}
                          className="slider-thumb"
                      >
                        {bike.imageUrls.map((image, i) => (
                            <div key={i} className="image d-block">
                              <Link href={`/bike/${bike.id}`}>
                                <Image
                                    alt="Изображение велосипеда"
                                    src={image}
                                    width={377}
                                    height={220}
                                    style={{
                                      width: '377px',
                                      height: '220px',
                                      objectFit: 'cover', // изображение заполнит заданную область, сохраняя пропорции и обрезая лишнее
                                      display: 'block',
                                    }}
                                />
                              </Link>
                            </div>
                        ))}
                      </Slider>
                      {bike.tags && <span>{bike.tags[0]}</span>}
                    </div>
                    <div className="content-box">
                      <h6 className="title">
                        <Link href={`/bike/${bike.id}`}>
                          {bike.name} - {bike.model}
                        </Link>
                      </h6>
                      <div className="select-wrapper" style={{position: "relative"}}>
                        <select className="car-select w-full mb-2">
                          {bike.prices.map((prices, i) => (
                              <option value={prices.price} key={i}>
                                {prices.priceCategory.name} - {Math.round(prices.price).toLocaleString("ru-RU")} ₸
                              </option>
                          ))}
                        </select>
                        {/* Иконка стрелки */}
                        <IoIosArrowDown className="icon"/>
                      </div>
                      <ul className="specs-list">
                        <li className="spec-item">
                          <span className="spec-title">Макс. скорость</span>
                          <span className="spec-value">{bike.maxSpeed}</span>
                        </li>

                        <li className="spec-item">
                          <span className="spec-title">Пробег на 1 заряде:</span>
                          <span className="spec-value">{bike.rangePerCharge}</span>
                        </li>

                        <li className="spec-item">
                          <span className="spec-title">Время зарядки</span>
                          <span className="spec-value">{bike.chargeTime}</span>
                        </li>

                        <li className="spec-item">
                          <span className="spec-title">Макс. нагрузка</span>
                          <span className="spec-value">{bike.maxLoad}</span>
                        </li>

                        <li className="spec-item">
                          <span className="spec-title">Вес</span>
                          <span className="spec-value">{bike.weight}</span>
                        </li>

                        <li className="spec-item">
                          <span className="spec-title">Мощность</span>
                          <span className="spec-value">{bike.power}</span>
                        </li>

                        <li className="spec-item">
                          <span className="spec-title">Подвеска</span>
                          <span className="spec-value">{bike.suspension}</span>
                        </li>
                      </ul>
                      <div className="btn-box">
                        <Link
                            href={`/bike/${bike.id}`}
                            className="details"
                        >
                          <Button className="w-full mb-2 !ml-0" variant="secondary">Подробнее</Button>
                        </Link>
                        <Button className="w-full mb-4 !ml-0" variant="primary-outline">Арендовать</Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </Slider>
          </div>
        </div>
      </div>
    </section>
  );
}
