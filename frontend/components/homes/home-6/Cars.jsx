"use client";
import Link from "next/link";
import Slider from "react-slick";
import Image from "next/image";
import { useEffect, useState } from "react";
import Button from "@/components/ui/button/Button";
import { IoIosArrowDown } from "react-icons/io";

const buttons = [
  { label: "New cars", isActive: true },
  { label: "Used Cars", isActive: false },
  { label: "In Stock", isActive: false },
];

export default function Cars() {
  const [bikes, setBikes] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(buttons[0]);
  const [isLoading, setIsLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    const fetchBikes = async () => {
      try {
        const response = await fetch(`${API_URL}/bikes/`);
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

    // Определяем, мобильное ли устройство
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize(); // первоначальная проверка
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [API_URL]);

  // Настройки для слайдера на мобильных устройствах
  const mobileSliderSettings = {
    slidesToScroll: 1,
    slidesToShow: 1,
    arrows: true,
  };

  return (
      <section id="bikes" className="cars-section-three cars-home">
        <div className="boxcar-container">
          <div className="boxcar-title wow fadeInUp">
            <h2>СТОИМОСТЬ АРЕНДЫ <span className="orange">Deli-Bike</span></h2>
            <p>Цены указаны без учёта партнёрских скидок. Скидки согласуются и предоставляются индивидуально.</p>
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
              {isMobile ? (
                  <Slider
                      {...mobileSliderSettings}
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
                                    bike.tags[0] === "Great Price" ? "two" : ""
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
                                              width: "377px",
                                              height: "220px",
                                              objectFit: "cover",
                                              display: "block",
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
                              <div
                                  className="select-wrapper"
                                  style={{ position: "relative" }}
                              >
                                <select className="car-select w-full mb-2">
                                  {bike.prices.map((prices, i) => (
                                      <option value={prices.price} key={i}>
                                        {prices.priceCategory.name} -{" "}
                                        {Math.round(prices.price).toLocaleString("ru-RU")}{" "}
                                        ₸
                                      </option>
                                  ))}
                                </select>
                                <IoIosArrowDown className="icon" />
                              </div>
                              <ul className="specs-list">
                                <li className="spec-item">
                                  <span className="spec-title">Макс. скорость</span>
                                  <span className="spec-value">{bike.maxSpeed}</span>
                                </li>
                                <li className="spec-item">
                            <span className="spec-title">
                              Пробег на 1 заряде:
                            </span>
                                  <span className="spec-value">
                              {bike.rangePerCharge}
                            </span>
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
                                <Button
                                    className="w-full mb-4 !ml-0"
                                    variant="primary-outline"
                                >
                                  Арендовать
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                    ))}
                  </Slider>
              ) : (
                  <div className="row car-slider-three" data-preview="4.8">
                    {bikes.map((bike, index) => (
                        <div
                            key={index}
                            className="box-car car-block-three style-2 col-lg-4 col-md-6 col-sm-12"
                        >
                          <div className="inner-box">
                            <div
                                className={`image-box ${
                                    bike.tags[0] === "Great Price" ? "two" : ""
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
                                              width: "377px",
                                              height: "220px",
                                              objectFit: "cover",
                                              display: "block",
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
                              {/*<div*/}
                              {/*    className="select-wrapper"*/}
                              {/*    style={{ position: "relative" }}*/}
                              {/*>*/}
                                {/*<select className="car-select w-full mb-2">*/}
                                {/*  {bike.prices.map((prices, i) => (*/}
                                {/*      <option value={prices.price} key={i}>*/}
                                {/*        {prices.priceCategory.name} -{" "}*/}
                                {/*        {Math.round(prices.price).toLocaleString("ru-RU")}{" "}*/}
                                {/*        ₸*/}
                                {/*      </option>*/}
                                {/*  ))}*/}
                                {/*</select>*/}
                                {/*<IoIosArrowDown className="icon" />*/}
                              {/*</div>*/}
                              <ul className="specs-list">
                                <li className="spec-item">
                                  <span className="spec-title">Макс. скорость</span>
                                  <span className="spec-value">Ограничена до {Math.round(bike.max_speed)} км/ч</span>
                                </li>
                                <li className="spec-item">
                            <span className="spec-title">
                              Пробег на 1 заряде:
                            </span>
                                  <span className="spec-value">
                              {bike.range_per_charge} км (зависит от АКБ)
                            </span>
                                </li>
                                <li className="spec-item">
                                  <span className="spec-title">Время зарядки</span>
                                  <span className="spec-value">{bike.charge_time} ч</span>
                                </li>
                                <li className="spec-item">
                                  <span className="spec-title">Макс. нагрузка</span>
                                  <span className="spec-value">до {Math.round(bike.max_load)} кг</span>
                                </li>
                                <li className="spec-item">
                                  <span className="spec-title">Вес</span>
                                  <span className="spec-value">{Math.round(bike.weight)} кг</span>
                                </li>
                                <li className="spec-item">
                                  <span className="spec-title">Подвеска</span>
                                  <span className="spec-value">{bike.suspension}</span>
                                </li>
                                <li className="spec-item">
                                  <span className="spec-title">Тормоза</span>
                                  <span className="spec-value">Дисковые</span>
                                </li>
                              </ul>
                              <div className="btn-box">
                                <Link href={`/bike/${bike.id}`}>
                                  <Button
                                      className="w-full mb-4 !ml-0"
                                      variant="primary-outline"
                                  >
                                    Арендовать
                                  </Button>
                                </Link>
                              </div>
                            </div>
                          </div>
                        </div>
                    ))}
                  </div>
              )}
            </div>
          </div>
        </div>
      </section>
  );
}