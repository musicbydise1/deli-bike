"use client";
import React, { useState } from "react";
import Image from "next/image";

import Overview from "./sections/Overview";
import { Gallery, Item } from "react-photoswipe-gallery";
import ModalVideo from "react-modal-video";
import Link from "next/link";
import "../../public/css/pages/bike-single/Bike-Single.css"
import SidebarComponent from "@/components/carSingles/sections/SidebarComponent";
import {FiInfo} from "react-icons/fi";
import {CiShare1} from "react-icons/ci";

export default function Single1({ carItem }) {

  const warrantyOptions = [
    { label: "Стандартная гарантия", price: "0", value: "standard" },
    { label: "Расширенная гарантия", price: "10000", value: "extended" },
    { label: "Без гарантии", price: "0", value: "none" },
  ];

  const depositOptions = [{ label: "Возвращаемый депозит", price: "30000" }]

  const {
    name,
    model,
    description,
    maxSpeed,
    rangePerCharge,
    chargeTime,
      power,
    imageUrls,
    prices,
    accessories,
    tags,
  } = carItem || {};

  const [isOpen, setOpen] = useState(false);
  const [selectedRentalOption, setSelectedRentalOption] = useState(
      prices && prices.length > 0
          ? {
            price: prices[0].price,
            categoryName: prices[0].priceCategory.name,
          }
          : { price: 0, categoryName: "" }
  );
  const [selectedWarranty, setSelectedWarranty] = useState(
      warrantyOptions && warrantyOptions.length > 0
          ? warrantyOptions[0]
          : { label: "Стандартная гарантия", price: "0", value: "standard" }
  );
  const [selectedAdditional, setSelectedAdditional] = useState([]);
  const [selectedBattery, setSelectedBattery] = useState(null);


  const firstPrice = prices && prices.length > 0 ? prices[0] : null;

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
                <span>{name} {model}</span>
              </li>
            </ul>
            <div className="single-title">
              <h2>{name} {model}</h2>
            </div>
            <ul className="spectes-list">
              <li>
                <span>
                  <FiInfo size={20} className="mr-2 align-[-4px]" />
                  { tags[0] }
                </span>
              </li>
              <li>
                <span>
                  <FiInfo size={20} className="mr-2 align-[-4px]" />
                  Скорость {Math.round(maxSpeed)} км / ч
                </span>
              </li>
              <li>
                <span>
                 <FiInfo size={20} className="mr-2 align-[-4px]" />
                  {Math.round(rangePerCharge)} км на одном заряде
                </span>
              </li>
            </ul>

            <div className="content-box">
              <div className="btn-box">
                <div className="share-btn">
                  <a href="#" className="share">
                    <span>Поделиться</span>
                    <CiShare1 size={14} color="#ff5500"/>
                  </a>
                </div>
                <div className="share-second">
                  <a href="#" className="">
                    <span>Оплата и условия аренды</span>
                  </a>
                </div>
              </div>
              <h3 className="title">₸ {Math.round(selectedRentalOption.price).toLocaleString("ru-RU")}</h3>
              <span className="price-type">
                Стоимость аренды за {selectedRentalOption.categoryName}
              </span>
            </div>
          </div>
          <Gallery>
            <div className="gallery-sec">
              <div className="row">
                <div className="image-column item1 col-lg-7 col-md-12 col-sm-12">
                  <div className="inner-column">
                    <div className="image-box">
                      <figure className="image">
                        <Item
                            original={imageUrls[0]}
                            thumbnail={imageUrls[0]}
                            width={805}
                            height={550}
                            style={{
                              width: '805px',
                              height: '550px',
                              objectFit: 'cover', // изображение заполнит заданную область, сохраняя пропорции и обрезая лишнее
                              display: 'block',
                            }}
                        >
                          {({ref, open}) => (
                              <a onClick={open}>
                                <Image
                                    alt=""
                                    src={imageUrls[0]}
                                    width={805}
                                    height={550}
                                    ref={ref}
                                    style={{
                                      width: '805px',
                                      height: '550px',
                                      objectFit: 'cover', // изображение заполнит заданную область, сохраняя пропорции и обрезая лишнее
                                      display: 'block',
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
                    {imageUrls.slice(1).map((url, idx) => (
                        <div key={idx} className={`image-column-two item${idx + 2} col-6`}>
                          <div className="inner-column">
                            <div className="image-box">
                              <figure className="image">
                                <Item
                                    original={url}
                                    thumbnail={url}
                                    width={285}
                                    height={269}
                                    style={{
                                      width: '285px',
                                      height: '269px',
                                      objectFit: 'cover', // изображение заполнит заданную область, сохраняя пропорции и обрезая лишнее
                                      display: 'block',
                                    }}
                                >
                                  {({ref, open}) => (
                                      <a onClick={open} className="fancybox">
                                        <Image
                                            ref={ref}
                                            alt=""
                                            src={url}
                                            width={285}
                                            height={269}
                                            style={{
                                              width: '285px',
                                              height: '269px',
                                              objectFit: 'cover',
                                              display: 'block',
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
            {" "}
          </Gallery>
          <div className="row">
            <div className="inspection-column col-lg-8 col-md-12 col-sm-12">
              <div className="inner-column">
                {/* overview-sec */}
                <div className="overview-sec">
                  <Overview
                      price={prices}
                      accessories={accessories}
                      onRentalPeriodChange={(option) =>
                          setSelectedRentalOption({ price: option.price, categoryName: option.categoryName })
                      }
                      onWarrantyChange={(option) => setSelectedWarranty(option)}
                      onAdditionalChange={(selected) => setSelectedAdditional(selected)}
                      onBatteryChange={(battery) => setSelectedBattery(battery)}
                      warrantyOptions={warrantyOptions}
                  />
                </div>
              </div>
            </div>
            <div className="side-bar-column style-1 col-lg-4 col-md-12 col-sm-12">
              <div className="inner-column">
                <SidebarComponent
                    product={carItem}
                    selectedRentalOption={selectedRentalOption}
                    selectedWarranty={selectedWarranty}
                    selectedAdditional={selectedAdditional}
                    selectedBattery={selectedBattery}
                />
              </div>
            </div>
          </div>
        </div>
        {/* cars-section-three */}
        {/*<RelatedCars />*/}
        {/* End shop section two */}
      </section>
      <ModalVideo
          channel="youtube"
          youtube={{mute: 0, autoplay: 0}}
          isOpen={isOpen}
          videoId="7e90gBu4pas"
          onClose={() => setOpen(false)}
      />{" "}
    </>
  );
}
