"use client";
import React, { useState } from "react";
import Image from "next/image";

import Overview from "./sections/Overview/Overview";
import { Gallery, Item } from "react-photoswipe-gallery";
import ModalVideo from "react-modal-video";
import Link from "next/link";
import "../../public/css/pages/bike-single/Bike-Single.css";
import SidebarComponent from "@/components/carSingles/sections/Sidebar/SidebarComponent";
import { FiInfo } from "react-icons/fi";
import { CiShare1 } from "react-icons/ci";
import { pricingPlans } from "@/data/pricing"; // <-- Тарифы «Стандарт»/«Премиум»
import { useUser } from "@/context/UserContext"; // <-- Импорт вашего контекста

// Функция форматирования цены
function formatPrice(value, currency) {
  // Если currency === "by", используем "руб", иначе "₸"
  const symbol = currency === "by" ? "руб" : "₸";
  return `${Math.round(value).toLocaleString("ru-RU")} ${symbol}`;
}

export default function Single1({ carItem }) {
  const {
    name,
    model,
    max_speed,
    range_per_charge,
    imageUrls,
    prices,
    accessories,
    tags,
      translations,
  } = carItem || {};

  // Из контекста достаём location, чтобы знать, какая валюта
  const { location } = useUser();


  const [isOpen, setOpen] = useState(false);


  // 1. Состояние срока аренды
  const [selectedRentalOption, setSelectedRentalOption] = useState(
      prices && prices.length > 0
          ? {
            price: prices[0].price,
            categoryName: prices[0].priceCategory.name,
          }
          : { price: 0, categoryName: "" }
  );

  // 2. Состояние гарантии (Стандарт/Премиум)
  const [selectedWarranty, setSelectedWarranty] = useState(
      pricingPlans && pricingPlans.length > 0
          ? pricingPlans[0]
          : { plan: "Стандартная гарантия", price: "0", value: "standard" }
  );

  // 3. Состояние дополнительных опций и АКБ
  const [selectedAdditional, setSelectedAdditional] = useState([]);
  const [selectedBattery, setSelectedBattery] = useState(null);

  // 4. Состояние «Расширенной гарантии» (чекбокс)
  const [extendedWarrantyChecked, setExtendedWarrantyChecked] = useState(false);

  return (
      <>
        <section className="inventory-section pb-0 layout-radius single-bike">
          <div className="boxcar-container single-bike-container">
            <div className="boxcar-title-three">
              <ul className="breadcrumb">
                <li>
                  <Link href={`/`}>Главная</Link>
                </li>
                <li>
                <span>
                  {name} {model}
                </span>
                </li>
              </ul>

              <div className="single-title">
                <h2>
                  {name} {model}
                </h2>
              </div>

              <ul className="spectes-list">
                <li>
                <span>
                  <FiInfo size={20} className="mr-2 align-[-4px]" />
                  {tags?.[0]}
                </span>
                </li>
                <li>
                <span>
                  <FiInfo size={20} className="mr-2 align-[-4px]" />
                  Скорость ограничена до {Math.round(max_speed)} км/ч
                </span>
                </li>
                <li>
                <span>
                  <FiInfo size={20} className="mr-2 align-[-4px]" />
                  {range_per_charge} км на одном заряде
                </span>
                </li>
              </ul>

              <div className="content-box">
                <div className="btn-box">
                  <div className="share-btn">
                    <a href="#" className="share">
                      <span>Поделиться</span>
                      <CiShare1 size={14} color="#ff5500" />
                    </a>
                  </div>
                  <div className="share-second">
                    <a href="#">
                      <span>Оплата и условия аренды</span>
                    </a>
                  </div>
                </div>

                {/* Вместо жёсткого "₸" используем formatPrice и передаём location */}
                <h3 className="title">
                  {formatPrice(selectedRentalOption.price, location)}
                </h3>
                <span className="price-type">
                Стоимость аренды за {selectedRentalOption.categoryName}
              </span>
              </div>
            </div>

            {/* Галерея */}
            <Gallery>
              <div className="gallery-sec">
                <div className="row">
                  <div className="image-column item1 col-lg-7 col-md-12 col-sm-12">
                    <div className="inner-column">
                      <div className="image-box">
                        <figure className="image">
                          <Item
                              original={imageUrls?.[0]}
                              thumbnail={imageUrls?.[0]}
                              width={805}
                              height={550}
                              style={{
                                width: "805px",
                                height: "550px",
                                objectFit: "cover",
                                display: "block",
                              }}
                          >
                            {({ ref, open }) => (
                                <a onClick={open}>
                                  <Image
                                      alt=""
                                      src={imageUrls?.[0]}
                                      width={805}
                                      height={550}
                                      ref={ref}
                                      style={{
                                        width: "805px",
                                        height: "550px",
                                        objectFit: "cover",
                                        display: "block",
                                      }}
                                  />
                                </a>
                            )}
                          </Item>
                        </figure>
                      </div>
                    </div>
                  </div>

                  <div className="col-lg-5 col-md-12 col-sm-12">
                    <div className="row">
                      {imageUrls?.slice(1).map((url, idx) => (
                          <div
                              key={idx}
                              className={`image-column-two item${idx + 2} col-6`}
                          >
                            <div className="inner-column">
                              <div className="image-box">
                                <figure className="image">
                                  <Item
                                      original={url}
                                      thumbnail={url}
                                      width={285}
                                      height={269}
                                      style={{
                                        width: "285px",
                                        height: "269px",
                                        objectFit: "cover",
                                        display: "block",
                                      }}
                                  >
                                    {({ ref, open }) => (
                                        <a onClick={open} className="fancybox">
                                          <Image
                                              ref={ref}
                                              alt=""
                                              src={url}
                                              width={285}
                                              height={269}
                                              style={{
                                                width: "285px",
                                                height: "269px",
                                                objectFit: "cover",
                                                display: "block",
                                              }}
                                          />
                                        </a>
                                    )}
                                  </Item>
                                </figure>
                              </div>
                            </div>
                          </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </Gallery>

            {/* Блок с Overview и Sidebar */}
            <div className="row">
              <div className="inspection-column col-lg-8 col-md-12 col-sm-12">
                <div className="inner-column">
                  <div className="overview-sec">
                    <Overview
                        price={prices}
                        accessories={accessories}
                        warrantyOptions={pricingPlans}
                    />
                  </div>
                </div>
              </div>

              <div className="side-bar-column style-1 col-lg-4 col-md-12 col-sm-12">
                <div className="inner-column">
                  <SidebarComponent product={carItem} />
                </div>
              </div>
            </div>
          </div>
        </section>

        <ModalVideo
            channel="youtube"
            youtube={{ mute: 0, autoplay: 0 }}
            isOpen={isOpen}
            videoId="7e90gBu4pas"
            onClose={() => setOpen(false)}
        />
      </>
  );
}