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
  const [selectedCategory, setSelectedCategory] = useState(buttons[0]);
  const [sortedItems, setSortedItems] = useState([...carData]);
  useEffect(() => {
    setSortedItems([
      ...carData.filter((elm) =>
        elm.filterCategories.includes(selectedCategory.label)
      ),
    ]);
  }, [selectedCategory]);
  return (
    <section className="cars-section-three cars-home">
      <div className="boxcar-container">
        <div className="boxcar-title wow fadeInUp">
          <h2>СТОИМОСТЬ АРЕНДЫ</h2>
          <Link href={`/inventory-list-01`} className="btn-title">
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
              {sortedItems.map((car, index) => (
                <div
                  key={index}
                  className="box-car car-block-three style-2 col-lg-3 col-md-6 col-sm-12"
                >
                  <div className="inner-box">
                    <div
                      className={`image-box ${
                        car.badge == "Great Price" ? "two" : ""
                      }`}
                    >
                      <Slider
                        dots
                        slidesToShow={1}
                        key={car.id}
                        className="slider-thumb"
                      >
                        {car.images.map((image, i) => (
                          <div key={i} className="image d-block">
                            <Link href={`/inventory-page-single-v1/${car.id}`}>
                              <Image
                                alt=""
                                src={image}
                                width={329}
                                height={220}
                              />
                            </Link>
                          </div>
                        ))}
                      </Slider>
                      {car.badge && <span>{car.badge}</span>}
                    </div>
                    <div className="content-box">
                      <h6 className="title">
                        <Link href={`/inventory-page-single-v1/${car.id}`}>
                          {car.title}
                        </Link>
                      </h6>
                      <div className="select-wrapper" style={{position: "relative"}}>
                        <select className="car-select w-full mb-2">
                          {car.pricing.map((pricing, i) => (
                              <option value={pricing.value} key={i}>
                                {pricing.title} ₸
                              </option>
                          ))}
                        </select>
                        {/* Иконка стрелки */}
                        <IoIosArrowDown className="icon"/>
                      </div>
                      <ul className="specs-list">
                        {car.specs.map((spec, i) => (
                            <li key={i} className="spec-item">
                              <span className="spec-title">{spec.title}</span>
                              <span className="spec-value">{spec.text}</span>
                            </li>
                        ))}
                      </ul>
                      <div className="btn-box">
                        <Link
                            href={`/inventory-page-single-v1/${car.id}`}
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
