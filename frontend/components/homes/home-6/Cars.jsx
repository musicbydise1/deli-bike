'use client';
import Link from 'next/link';
import Slider from 'react-slick';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import Button from '@/components/ui/button/Button';
import { IoIosArrowDown } from 'react-icons/io';
import { AiOutlineLoading } from 'react-icons/ai';
import { useRouter } from 'next/navigation';

const buttons = [
  { label: 'New cars', isActive: true },
  { label: 'Used Cars', isActive: false },
  { label: 'In Stock', isActive: false },
];

export default function Cars() {
  const router = useRouter();
  const [bikes, setBikes] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(buttons[0]);
  const [isLoading, setIsLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [isInnerTouchActive, setIsInnerTouchActive] = useState(false);
  const [rentingBikeId, setRentingBikeId] = useState(null);
  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    const fetchBikes = async () => {
      try {
        const response = await fetch(`${API_URL}/bikes/`);
        if (!response.ok) {
          throw new Error('Ошибка при загрузке данных о байках');
        }
        const result = await response.json();
        // Сортируем байки по id
        const sortedBikes = result.data.sort((a, b) => a.id - b.id);
        setBikes(sortedBikes);
      } catch (error) {
        console.error('Ошибка:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBikes();

    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [API_URL]);

  const handleRentClick = bikeId => {
    setRentingBikeId(bikeId);
    router.push(`/bike/${bikeId}`);
  };

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
            СТОИМОСТЬ АРЕНДЫ <span className="orange">Deli-Bike</span>
          </h2>
          <p>
            Цены указаны без учёта партнёрских скидок. Скидки согласуются и предоставляются
            индивидуально.
          </p>
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
                        onTouchStartCapture={e => {
                          e.stopPropagation();
                          e.nativeEvent.stopImmediatePropagation();
                          setIsInnerTouchActive(true);
                        }}
                        onTouchMoveCapture={e => {
                          e.stopPropagation();
                          e.nativeEvent.stopImmediatePropagation();
                          setIsInnerTouchActive(true);
                        }}
                        onTouchEndCapture={e => {
                          e.stopPropagation();
                          e.nativeEvent.stopImmediatePropagation();
                          setIsInnerTouchActive(false);
                        }}
                        onTouchCancelCapture={e => {
                          e.stopPropagation();
                          e.nativeEvent.stopImmediatePropagation();
                          setIsInnerTouchActive(false);
                        }}
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
                                  alt="Изображение велосипеда"
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
                              <span className="text-[12px]">Ограничена до</span>{' '}
                              {Math.round(bike.max_speed)} км/ч
                            </span>
                          </li>
                          <li className="spec-item">
                            <span className="spec-title">Пробег на 1 заряде:</span>
                            <span className="spec-value">
                              {bike.range_per_charge} км{' '}
                              <span className="text-[12px]">(зависит от АКБ)</span>
                            </span>
                          </li>
                          <li className="spec-item">
                            <span className="spec-title">Время зарядки</span>
                            <span className="spec-value">{bike.charge_time} ч</span>
                          </li>
                          <li className="spec-item">
                            <span className="spec-title">Макс. нагрузка</span>
                            <span className="spec-value">
                              <span className="text-[12px]">до</span> {Math.round(bike.max_load)} кг
                            </span>
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
                              'Арендовать'
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
                        onTouchStart={e => e.stopPropagation()}
                        onTouchMove={e => e.stopPropagation()}
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
                                  alt="Изображение велосипеда"
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
                              'Арендовать'
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
