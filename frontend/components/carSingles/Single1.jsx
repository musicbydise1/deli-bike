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
  const [isOpen, setOpen] = useState(false);

  const {
    name,
    model,
    description,
    maxSpeed,
    rangePerCharge,
    chargeTime,
    imageUrls,
    prices,
    tags
  } = carItem || {};

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
              <h3 className="title">₸  {Math.round(prices[0].price)}</h3>
              <span className="price-type">
                Стоимость аренды за 1 неделю
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
                          original="/images/resource/inventory1-1.jpg"
                          thumbnail="/images/resource/inventory1-1.jpg"
                          width={805}
                          height={550}
                        >
                          {({ ref, open }) => (
                            <a onClick={open}>
                              <Image
                                alt=""
                                src="/images/resource/inventory1-1.jpg"
                                width={805}
                                height={550}
                                ref={ref}
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
                    <div className="image-column-two item2 col-6">
                      <div className="inner-column">
                        <div className="image-box">
                          <figure className="image">
                            <Item
                              original="/images/resource/car-single-1.png"
                              thumbnail="/images/resource/car-single-1.png"
                              width={285}
                              height={269}
                            >
                              {({ ref, open }) => (
                                <a onClick={open} className="fancybox">
                                  <Image
                                    ref={ref}
                                    alt=""
                                    src="/images/resource/inventory1-2.jpg"
                                    width={285}
                                    height={269}
                                  />
                                </a>
                              )}
                            </Item>
                          </figure>
                        </div>
                      </div>
                    </div>
                    <div className="image-column-two item3 col-6">
                      <div className="inner-column">
                        <div className="image-box">
                          <figure className="image">
                            <Item
                              original="/images/resource/car-single-2.png"
                              thumbnail="/images/resource/car-single-2.png"
                              width={285}
                              height={269}
                            >
                              {({ ref, open }) => (
                                <a onClick={open}>
                                  <Image
                                    ref={ref}
                                    alt=""
                                    src="/images/resource/inventory1-3.png"
                                    width={285}
                                    height={269}
                                  />
                                </a>
                              )}
                            </Item>
                          </figure>
                        </div>
                      </div>
                    </div>
                    <div className="image-column-two item4 col-6">
                      <div className="inner-column">
                        <div className="image-box">
                          <figure className="image">
                            <Item
                              original="/images/resource/car-single-3.png"
                              thumbnail="/images/resource/car-single-3.png"
                              width={285}
                              height={269}
                            >
                              {({ ref, open }) => (
                                <a
                                  href="/images/resource/car-single-3.png"
                                  onClick={open}
                                >
                                  <Image
                                    ref={ref}
                                    alt=""
                                    src="/images/resource/inventory1-4.jpg"
                                    width={285}
                                    height={269}
                                  />
                                </a>
                              )}
                            </Item>
                          </figure>
                        </div>
                      </div>
                    </div>
                    <div className="image-column-two item5 col-6">
                      <div className="inner-column">
                        <div className="image-box">
                          <figure className="image">
                            <Item
                              original="/images/resource/car-single-4.png"
                              thumbnail="/images/resource/car-single-4.png"
                              width={285}
                              height={269}
                            >
                              {({ ref, open }) => (
                                <a onClick={open}>
                                  <Image
                                    ref={ref}
                                    alt=""
                                    src="/images/resource/inventory1-5.png"
                                    width={285}
                                    height={269}
                                  />
                                </a>
                              )}
                            </Item>
                          </figure>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>{" "}
          </Gallery>
          <div className="row">
            <div className="inspection-column col-lg-8 col-md-12 col-sm-12">
              <div className="inner-column">
                {/* overview-sec */}
                <div className="overview-sec">
                  <Overview price={prices} />
                </div>
              </div>
            </div>
            <div className="side-bar-column style-1 col-lg-4 col-md-12 col-sm-12">
              <div className="inner-column">
               <SidebarComponent />
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
        youtube={{ mute: 0, autoplay: 0 }}
        isOpen={isOpen}
        videoId="7e90gBu4pas"
        onClose={() => setOpen(false)}
      />{" "}
    </>
  );
}
