'use client';
import React from 'react';
import Image from 'next/image';
import {
  carBrands,
  contactItems,
  navItems,
  socialMediaLinks,
  vehicleTypes,
} from '@/data/footerLinks';
import Link from 'next/link';
export default function Footer1({ parentClass = 'boxcar-footer footer-style-one cus-st-1' }) {
  return (
    <footer className={parentClass}>
      <div className="footer-top">
        <div className="boxcar-container">
          <div className="right-box">
            <div className="top-left wow fadeInUp">
              <h6 className="title">DeliBike</h6>
              <div className="text">
                Получайте обновления цен, советы по покупкам &amp; многое другое!
              </div>
            </div>
            <div className="subscribe-form wow fadeInUp" data-wow-delay="100ms">
              <form onSubmit={e => e.preventDefault()} method="post" action="#">
                <div className="form-group">
                  <input
                    type="email"
                    name="email"
                    className="email"
                    defaultValue=""
                    placeholder="Ваш email"
                    required
                  />
                  <button type="button" className="theme-btn btn-style-one hover-light">
                    <span className="btn-title">Зарегистрироваться</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div className="widgets-section">
        <div className="boxcar-container">
          <div className="row">
            {/* Footer COlumn */}
            <div className="footer-column-two col-lg-9 col-md-12 col-sm-12">
              <div className="row">
                <div className="col-lg-3 col-md-6 col-sm-12">
                  <div className="footer-widget links-widget wow fadeInUp">
                    <h4 className="widget-title">Полезные ссылки</h4>
                    <div className="widget-content">
                      <ul className="user-links style-two">
                        {navItems.map((elm, i) => (
                          <li key={i}>
                            <Link href={elm.link}>{elm.name}</Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
                {/*<div className="col-lg-3 col-md-6 col-sm-12">*/}
                {/*  <div*/}
                {/*    className="footer-widget links-widget wow fadeInUp"*/}
                {/*    data-wow-delay="100ms"*/}
                {/*  >*/}
                {/*    <h4 className="widget-title">Quick Links</h4>*/}
                {/*    <div className="widget-content">*/}
                {/*      <ul className="user-links style-two">*/}
                {/*        {contactItems.map((elm, i) => (*/}
                {/*          <li key={i}>*/}
                {/*            <Link href={elm.link}>{elm.name}</Link>*/}
                {/*          </li>*/}
                {/*        ))}*/}
                {/*      </ul>*/}
                {/*    </div>*/}
                {/*  </div>*/}
                {/*</div>*/}
                {/*<div className="col-lg-3 col-md-6 col-sm-12">*/}
                {/*  <div*/}
                {/*    className="footer-widget links-widget wow fadeInUp"*/}
                {/*    data-wow-delay="200ms"*/}
                {/*  >*/}
                {/*    <h4 className="widget-title">Our Brands</h4>*/}
                {/*    <div className="widget-content">*/}
                {/*      <ul className="user-links style-two">*/}
                {/*        {carBrands.map((elm, i) => (*/}
                {/*          <li key={i}>*/}
                {/*            <Link href={elm.link}>{elm.name}</Link>*/}
                {/*          </li>*/}
                {/*        ))}*/}
                {/*      </ul>*/}
                {/*    </div>*/}
                {/*  </div>*/}
                {/*</div>*/}
                {/*<div className="col-lg-3 col-md-6 col-sm-12">*/}
                {/*  <div*/}
                {/*    className="footer-widget links-widget wow fadeInUp"*/}
                {/*    data-wow-delay="300ms"*/}
                {/*  >*/}
                {/*    <h4 className="widget-title">Vehicles Type</h4>*/}
                {/*    <div className="widget-content">*/}
                {/*      <ul className="user-links style-two">*/}
                {/*        {vehicleTypes.map((elm, i) => (*/}
                {/*          <li key={i}>*/}
                {/*            <Link href={elm.link}>{elm.name}</Link>*/}
                {/*          </li>*/}
                {/*        ))}*/}
                {/*      </ul>*/}
                {/*    </div>*/}
                {/*  </div>*/}
                {/*</div>*/}
              </div>
            </div>
            {/* footer column */}
            {/*<div className="footer-column col-lg-3 col-md-12 col-sm-12">*/}
            {/*  <div*/}
            {/*    className="footer-widget social-widget wow fadeInUp"*/}
            {/*    data-wow-delay="400ms"*/}
            {/*  >*/}
            {/*    <h4 className="widget-title">Vehicles Type</h4>*/}
            {/*    <div className="widget-content">*/}
            {/*      <a href="#" className="store">*/}
            {/*        <Image*/}
            {/*          src="/images/resource/apple.png"*/}
            {/*          width={24}*/}
            {/*          height={29}*/}
            {/*          alt=""*/}
            {/*        />*/}
            {/*        <span>Download on the</span>*/}
            {/*        <h6 className="title">Apple Store</h6>*/}
            {/*      </a>*/}
            {/*      <a href="#" className="store two">*/}
            {/*        <Image*/}
            {/*          src="/images/resource/play-2.png"*/}
            {/*          width={23}*/}
            {/*          height={26}*/}
            {/*          alt=""*/}
            {/*        />*/}
            {/*        <span>Get in on</span>*/}
            {/*        <h6 className="title">Google Play</h6>*/}
            {/*      </a>*/}
            {/*      <div className="social-icons">*/}
            {/*        <h6 className="title">Connect With Us</h6>*/}
            {/*        <ul>*/}
            {/*          {socialMediaLinks.map((social, index) => (*/}
            {/*            <li key={index}>*/}
            {/*              <a href={social.link}>*/}
            {/*                <i className={social.iconClass} />*/}
            {/*              </a>*/}
            {/*            </li>*/}
            {/*          ))}*/}
            {/*        </ul>*/}
            {/*      </div>*/}
            {/*    </div>*/}
            {/*  </div>*/}
            {/*</div>*/}
          </div>
        </div>
      </div>
      {/*  Footer Bottom */}
      <div className="footer-bottom">
        <div className="boxcar-container">
          <div className="inner-container">
            <div className="copyright-text wow fadeInUp">
              © <a href="#">2024 DeliBike. Все права защищены.</a>
            </div>
            <ul className="footer-nav wow fadeInUp" data-wow-delay="200ms">
              <li>
                <a href="#">Политика конфиденциальности</a>
              </li>
              <li>
                <a href="#"></a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
