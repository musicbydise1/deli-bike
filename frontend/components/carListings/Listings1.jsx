"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import SelectComponent from "../common/SelectComponent";
import Link from "next/link";
import Pagination from "../common/Pagination";
import Slider from "react-slick";
import { IoIosArrowDown } from "react-icons/io";
import Button from "@/components/ui/button/Button";
// Импортируем контекст корзины
import { useCart } from "@/context/CartContext";
import process from "next/dist/build/webpack/loaders/resolve-url-loader/lib/postcss";

export default function Listings1() {
  const { addProductToCart, isAddedToCartProducts } = useCart();
  const [bikes, setBikes] = useState([]);
  const [loading, setLoading] = useState(true);
  // Состояние для выбранной цены для каждого велосипеда: { [bike.id]: selectedPrice }
  const [selectedPrice, setSelectedPrice] = useState({});
  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    const fetchBikes = async () => {
      try {
        const response = await fetch(`${API_URL}/bikes/`);
        const result = await response.json();
        console.log("Fetched bikes:", result);
        const bikesData = Array.isArray(result.data) ? result.data : [];
        setBikes(bikesData);
        // Инициализируем для каждого bike выбранную цену по умолчанию (первый элемент массива цен)
        const initialPrices = {};
        bikesData.forEach((bike) => {
          if (bike.prices && bike.prices.length > 0) {
            initialPrices[bike.id] = bike.prices[0].price;
          }
        });
        setSelectedPrice(initialPrices);
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
                <span>/</span>
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
            </form>
          </div>
          <div className="row wow fadeInUp">
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
                          infinite={false}
                          key={bike.id}
                          className="slider-thumb"
                      >
                        {bike.imageUrls.map((image, i) => (
                            <div key={i} className="image d-block">
                              <Link href={`/bike/${bike.id}`}>
                                <Image
                                    alt=""
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
                      <ul className="specs-list">
                        <li className="spec-item">
                          <span className="spec-title">Макс. скорость</span>
                          <span className="spec-value">Ограничена до {Math.round(bike.max_speed)} км/ч</span>
                        </li>
                        <li className="spec-item">
                          <span className="spec-title">Пробег на 1 заряде:</span>
                          <span className="spec-value">{bike.range_per_charge} км (зависит от АКБ)</span>
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
                          <span className="spec-value">{bike.brakes}</span>
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
          <div className="pagination-sec">
            <nav aria-label="Page navigation example">
              <ul className="pagination">
                <Pagination />
              </ul>
              <div className="text">Показаны результаты 1 из 1</div>
            </nav>
          </div>
        </div>
      </section>
  );
}