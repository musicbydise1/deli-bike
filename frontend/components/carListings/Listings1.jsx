"use client";
import React, {useEffect, useState} from "react";
import Image from "next/image";
import SelectComponent from "../common/SelectComponent";
import { cars } from "@/data/cars";
import Link from "next/link";
import Pagination from "../common/Pagination";
import Slider from "react-slick";
import {IoIosArrowDown} from "react-icons/io";
import Button from "@/components/ui/button/Button";
export default function Listings1() {

  const [bikes, setBikes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBikes = async () => {
      try {
        const response = await fetch("http://localhost:4000/bikes/");
        const result = await response.json();
        console.log("Fetched bikes:", result);
        setBikes(Array.isArray(result.data) ? result.data : []);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching bikes:", error);
        setLoading(false);
      }
    };

    fetchBikes();
  }, []);

  if (loading) {
    return <div>Загрузка...</div>;
  }



  return (
    <section className="cars-section-four v1 layout-radius">
      <div className="boxcar-container">
        <div className="boxcar-title-three wow fadeInUp">
          <ul className="breadcrumb">
            <li>
              <Link href={`/`}>Главная</Link>
            </li>
            <li>
              <span>Каталог электровелосипедов</span>
            </li>
          </ul>
          <h2>Электровелосипеды</h2>
        </div>
        <div className="text-box">
          <div className="text">Показано {bikes.length} велосипедов</div>
          <form onSubmit={(e) => e.preventDefault()}>
            <div className="form_boxes v3">
              <small>Сортировка</small>

              <SelectComponent options={["DeliBike", "DeliBike", "DeliBike"]} />
            </div>
          </form>{" "}
        </div>
        <div className="row wow fadeInUp">
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
                        key={bike.id}
                        className="slider-thumb"
                    >
                      {bike.imageUrls.map((image, i) => (
                          <div key={i} className="image d-block">
                            <Link href={`/inventory-page-single-v1/${bike.id}`}>
                              <Image
                                  alt=""
                                  src="/images/resource/shop3-1.jpg"
                                  width={329}
                                  height={220}
                              />
                            </Link>
                          </div>
                      ))}
                    </Slider>
                    {bike.tags && <span>{bike.tags[0]}</span>}
                  </div>
                  <div className="content-box">
                    <h6 className="title">
                      <Link href={`/inventory-page-single-v1/${bike.id}`}>
                        {bike.name} - {bike.model}
                      </Link>
                    </h6>
                    <div className="select-wrapper" style={{position: "relative"}}>
                      <select className="car-select w-full mb-2">
                        {bike.prices.map((prices, i) => (
                            <option value={prices.price} key={i}>
                              {prices.priceCategory.name} {prices.price} ₸
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
                          href={`/inventory-page-single-v1/${bike.id}`}
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
        </div>
        <div className="pagination-sec">
          <nav aria-label="Page navigation example">
            <ul className="pagination">
              <Pagination />
            </ul>
            <div className="text">Показаны результаты 1–30 из 1 415</div>
          </nav>
        </div>
      </div>
    </section>
  );
}
