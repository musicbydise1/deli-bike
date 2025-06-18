// app/components/Single1.jsx
'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import '../../public/css/pages/bike-single/Bike-Single.css';
import { Gallery, Item } from 'react-photoswipe-gallery';
import ModalVideo from 'react-modal-video';
import Slider from 'react-slick';

import Overview from './sections/Overview/Overview';
import SidebarComponent from '@/components/carSingles/sections/Sidebar/SidebarComponent';
import { FiInfo } from 'react-icons/fi';
import { CiShare1 } from 'react-icons/ci';
import { pricingPlans } from '@/data/pricing';
import { useUser } from '@/context/UserContext';
import { useTariff } from '@/context/TariffContext';

// вы можете вынести утилиту в отдельный файл; оставляю здесь для компактности
function formatPrice(value, currency) {
  const symbol = currency === 'by' ? 'руб' : '₸';
  return `${Math.round(value).toLocaleString('ru-RU')} ${symbol}`;
}

export default function Single1({ carItem }) {
  /* ---------------------------- исходные данные --------------------------- */
  const {
    name,
    model,
    max_speed,
    range_per_charge,
    imageUrls,
    prices = [],
    accessories,
    tags,
  } = carItem || {};

  /* ------------------------ глобальные/контекстные данные ------------------------ */
  const { location } = useUser(); // 'by' | 'kz'
  const { rentalPeriod, setRentalPeriod } = useTariff();

  /* ---------------------------- локальные состояния ----------------------------- */
  const [isOpen, setOpen] = useState(false);
  const [selectedWarranty, setSelectedWarranty] = useState(
    pricingPlans[0] ?? { plan: 'Стандартная гарантия', price: '0', value: 'standard' },
  );
  const [selectedAdditional, setSelectedAdditional] = useState([]);
  const [selectedBattery, setSelectedBattery] = useState(null);
  const [extendedWarrantyChecked, setExtendedWarrantyChecked] = useState(false);

  /* ---------- определяем мобильную ширину экрана, чтобы переключать слайдер ------- */
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  /* ---------------------- 1. мемоизируем вычисление опций ------------------------ */
  const computedRentalOptions = useMemo(() => {
    if (!prices.length) return [];

    return prices.map(item => ({
      label: `${item.priceCategory.name} – ${Math.round(item.price).toLocaleString('ru-RU')} ${
        location === 'by' ? 'руб' : '₸'
      }`,
      value: item.priceCategory.rental_duration,
      price: item.price,
      categoryName: item.priceCategory.name,
    }));
  }, [prices, location]);

  /* ---------- 2. устанавливаем значение по умолчанию только при необходимости ---- */
  useEffect(() => {
    if (computedRentalOptions.length && !rentalPeriod) {
      setRentalPeriod(computedRentalOptions[0]);
    }
  }, [computedRentalOptions, rentalPeriod, setRentalPeriod]);

  /* ------------------------- вспомогательные данные ------------------------------ */
  const mobileSliderSettings = {
    dots: true,
    arrows: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    infinite: false,
  };

  /* --------------------------------- JSX ---------------------------------------- */
  return (
    <>
      <section className="inventory-section pb-0 layout-radius single-bike">
        <div className="boxcar-container single-bike-container">
          {/* ------------------------- хлебные крошки и заголовок ------------------------- */}
          <div className="boxcar-title-three">
            <ul className="breadcrumb">
              <li>
                <Link href="/">Главная</Link>
              </li>
              <li>
                <span>/</span>
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

            {/* -------- краткие характеристики -------- */}
            <ul className="spectes-list">
              <li>
                <span>
                  <FiInfo className="info-icons" /> {tags?.[0]}
                </span>
              </li>
              <li>
                <span>
                  <FiInfo className="info-icons" /> Скорость ограничена до {Math.round(max_speed)}{' '}
                  км/ч
                </span>
              </li>
              <li>
                <span>
                  <FiInfo className="info-icons" /> {range_per_charge} км на одном заряде
                </span>
              </li>
            </ul>

            {/* -------- цена и дополнительные действия -------- */}
            <div className="content-box">
              <div className="btn-box">
                <div className="share-btn">
                  <a href="#" className="share">
                    <span>Поделиться</span> <CiShare1 size={14} color="#ff5500" />
                  </a>
                </div>
                <div className="share-second">
                  <Link href="/terms">
                    <span>Оплата и условия аренды</span>
                  </Link>
                </div>
              </div>

              {rentalPeriod ? (
                <>
                  <h3 className="title">{formatPrice(rentalPeriod.price, location)}</h3>
                  <span className="price-type">
                    Стоимость аренды за {rentalPeriod.categoryName}
                  </span>
                </>
              ) : (
                <p>Загрузка...</p>
              )}
            </div>
          </div>

          {/* ---------------------------- галерея изображений --------------------------- */}
          <Gallery>
            {isMobile ? (
              <Slider {...mobileSliderSettings} className="mobile-gallery-slider">
                {imageUrls?.map((url, idx) => (
                  <div key={idx}>
                    <Item original={url} thumbnail={url} width={805} height={550}>
                      {({ ref, open }) => (
                        <a onClick={open}>
                          <Image
                            alt=""
                            src={url}
                            width={805}
                            height={550}
                            ref={ref}
                            style={{
                              width: '100%',
                              height: 'auto',
                              objectFit: 'cover',
                              display: 'block',
                            }}
                          />
                        </a>
                      )}
                    </Item>
                  </div>
                ))}
              </Slider>
            ) : (
              <div className="gallery-sec">
                <div className="row">
                  {/* большое фото слева */}
                  <div className="image-column item1 col-lg-7 col-md-12 col-sm-12">
                    <div className="inner-column">
                      <div className="image-box">
                        <figure className="image">
                          <Item
                            original={imageUrls?.[0]}
                            thumbnail={imageUrls?.[0]}
                            width={805}
                            height={550}
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
                                    width: '805px',
                                    height: '550px',
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
                  {/* небольшие фото справа */}
                  <div className="col-lg-5 col-md-12 col-sm-12">
                    <div className="row">
                      {imageUrls?.slice(1).map((url, idx) => (
                        <div key={idx} className={`image-column-two item${idx + 2} col-6`}>
                          <div className="inner-column">
                            <div className="image-box">
                              <figure className="image">
                                <Item original={url} thumbnail={url} width={285} height={269}>
                                  {({ ref, open }) => (
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
            )}
          </Gallery>

          {/* ------------------------ блок Overview + Sidebar ------------------------ */}
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

      {/* ----------------------------- модальное видео ------------------------------ */}
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
