'use client';

import { customerData } from '@/data/testimonials';
import Slider from 'react-slick';
import { useTranslation } from 'react-i18next';

export default function Testimonials2() {
  const { t } = useTranslation('common');
  return (
    <section className="boxcar-customers-section" id="reviews">
      <div className="boxcar-container">
        <div className="boxcar-title wow fadeInUp">
          <h2>{t('home.testimonials2.title')}</h2>
          {/*<div className="text">*/}
          {/*    {t('testimonials2.subtitle')}*/}
          {/*</div>*/}
        </div>
        <Slider
          className="row car-slider-three wow fadeInUp"
          data-wow-delay="200ms"
          slidesToScroll={1}
          slidesToShow={4}
          responsive={[
            {
              breakpoint: 1600,
              settings: {
                slidesToShow: 4,
                slidesToScroll: 1,
                arrows: true,
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
          ]}
          arrows
        >
          {customerData.map((customer, index) => (
            <div className="customer-block col-lg-3 col-md-6 col-sm-12" key={index}>
              <div className="inner-box">
                <div className="rating-area">
                  <ul className="rating">
                    {Array.from({ length: customer.rating }).map((_, i) => (
                      <li key={i}>
                        <i className="fa fa-star" />
                      </li>
                    ))}
                  </ul>
                  {customer.verified && (
                    <span>
                      <i className="fa-solid fa-circle-check" /> {t('home.testimonials2.verified')}
                    </span>
                  )}
                </div>
                <h6 className="title">
                  <a href="#">{customer.title}</a>
                </h6>
                <div className="text">{customer.text}</div>
                <span>{customer.author}</span>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
}
