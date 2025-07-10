'use client';
import Link from 'next/link';
import Slider from 'react-slick';
import Image from 'next/image';
import { useEffect, useState, useCallback } from 'react';
import Button from '@/components/ui/button/Button';
import { IoIosArrowDown } from 'react-icons/io';
import { AiOutlineLoading } from 'react-icons/ai';
import { useRouter } from 'next/navigation';
import { useGetBikesQuery } from '@/store/services/bikesApi';
import { useTranslation } from 'react-i18next';

const buttons = [
  { label: 'New cars', isActive: true },
  { label: 'Used Cars', isActive: false },
  { label: 'In Stock', isActive: false },
];

export default function Cars() {
  const router = useRouter();
  const { data, isLoading, error } = useGetBikesQuery();
  const bikes = Array.isArray(data?.data) ? data.data : [];
  const [selectedCategory, setSelectedCategory] = useState(buttons[0]);
  const [isMobile, setIsMobile] = useState(false);
  const [isInnerTouchActive, setIsInnerTouchActive] = useState(false);
  const [rentingBikeId, setRentingBikeId] = useState(null);
  const { t } = useTranslation();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleTouchStart = useCallback(e => {
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();
    setIsInnerTouchActive(true);
  }, []);

  const handleTouchMove = useCallback(e => {
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();
    setIsInnerTouchActive(true);
  }, []);

  const handleTouchEnd = useCallback(e => {
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();
    setIsInnerTouchActive(false);
  }, []);

  const handleTouchCancel = useCallback(e => {
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();
    setIsInnerTouchActive(false);
  }, []);

  const handleRentClick = useCallback(
    bikeId => {
      setRentingBikeId(bikeId);
      router.push(`/bike/${bikeId}`);
    },
    [router],
  );

  if (error) console.error(t('bikes.error_loading'), error);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-40">
        <AiOutlineLoading size={60} className="animate-spin" />
      </div>
    );
  }

  // Базовые настройки для внешнего слайдера
  const mobileSliderSettings = {
    slidesToScroll: 1,
    slidesToShow: 1,
    arrows: true,
  };

  // Если внутренний слайдер активен, выключаем свайп/драг у внешнего
  const mobileSliderSettingsModified = {
    ...mobileSliderSettings,
    swipe: !isInnerTouchActive,
    draggable: !isInnerTouchActive,
  };

  return (
    <section id="bikes" className="cars-section-three cars-home">
      <div className="boxcar-container">
        <div className="boxcar-title wow fadeInUp">
          <h2>
            {t('bikes.rental_cost')} <span className="orange">Deli-Bike</span>
          </h2>
          <p>{t('bikes.price_note')}</p>
        </div>

        <div className="tab-content wow fadeInUp" data-wow-delay="200ms" id="nav-tabContent">
          <div
            className="tab-pane fade show active"
            id="nav-home"
            role="tabpanel"
            aria-labelledby="nav-home-tab"
          >
            {isMobile ? (
              <Slider
                {...mobileSliderSettingsModified}
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
                        className={`image-box ${bike.tags[0] === 'Great Price' ? 'two' : ''}`}
                        onTouchStartCapture={handleTouchStart}
                        onTouchMoveCapture={handleTouchMove}
                        onTouchEndCapture={handleTouchEnd}
                        onTouchCancelCapture={handleTouchCancel}
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
                                  alt={t('bikes.bike_image_alt')}
                                  src={image}
                                  width={377}
                                  height={220}
                                  style={{
                                    width: '377px',
                                    height: '220px',
                                    objectFit: 'cover',
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
                            <span className="spec-title">{t('bikes.specs.max_speed')}</span>
                            <span className="spec-value">
                              <span className="text-[12px]">{t('bikes.specs.limited_to')}</span>{' '}
                              {Math.round(bike.max_speed)} {t('bikes.specs.kmh')}
                            </span>
                          </li>
                          <li className="spec-item">
                            <span className="spec-title">{t('bikes.specs.range_per_charge')}</span>
                            <span className="spec-value">
                              {bike.range_per_charge} {t('bikes.specs.km')}{' '}
                              <span className="text-[12px]">
                                ({t('bikes.specs.depends_on_battery')})
                              </span>
                            </span>
                          </li>
                          <li className="spec-item">
                            <span className="spec-title">{t('bikes.specs.charging_time')}</span>
                            <span className="spec-value">
                              {bike.charge_time} {t('bikes.specs.hours')}
                            </span>
                          </li>
                          <li className="spec-item">
                            <span className="spec-title">{t('bikes.specs.max_load')}</span>
                            <span className="spec-value">
                              <span className="text-[12px]">{t('bikes.specs.up_to')}</span>{' '}
                              {Math.round(bike.max_load)} {t('bikes.specs.kg')}
                            </span>
                          </li>
                          <li className="spec-item">
                            <span className="spec-title">{t('bikes.specs.weight')}</span>
                            <span className="spec-value">
                              {Math.round(bike.weight)} {t('bikes.specs.kg')}
                            </span>
                          </li>
                          <li className="spec-item">
                            <span className="spec-title">{t('bikes.specs.suspension')}</span>
                            <span className="spec-value">{bike.suspension}</span>
                          </li>
                          <li className="spec-item">
                            <span className="spec-title">{t('bikes.specs.brakes')}</span>
                            <span className="spec-value">{bike.brakes}</span>
                          </li>
                        </ul>
                        <div className="btn-box">
                          <Button
                            className="w-full mb-4 !ml-0"
                            variant="primary-outline"
                            onClick={() => handleRentClick(bike.id)}
                            disabled={rentingBikeId === bike.id}
                          >
                            {rentingBikeId === bike.id ? (
                              <AiOutlineLoading className="animate-spin" />
                            ) : (
                              t('bikes.rent')
                            )}
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
                        className={`image-box ${bike.tags[0] === 'Great Price' ? 'two' : ''}`}
                        onTouchStart={handleTouchStart}
                        onTouchMove={handleTouchMove}
                        onTouchEnd={handleTouchEnd}
                        onTouchCancel={handleTouchCancel}
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
                                  alt={t('bikes.bike_image_alt')}
                                  src={image}
                                  width={377}
                                  height={220}
                                  style={{
                                    width: '377px',
                                    height: '220px',
                                    objectFit: 'cover',
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
                            <span className="spec-value">
                              Ограничена до {Math.round(bike.max_speed)} км/ч
                            </span>
                          </li>
                          <li className="spec-item">
                            <span className="spec-title">Пробег на 1 заряде:</span>
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
                            <span className="spec-value">{bike.brakes}</span>
                          </li>
                        </ul>
                        <div className="btn-box">
                          <Button
                            className="w-full mb-4 !ml-0"
                            variant="primary-outline"
                            onClick={() => handleRentClick(bike.id)}
                            disabled={rentingBikeId === bike.id}
                          >
                            {rentingBikeId === bike.id ? (
                              <AiOutlineLoading className="animate-spin" />
                            ) : (
                              t('bikes.rent')
                            )}
                          </Button>
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
