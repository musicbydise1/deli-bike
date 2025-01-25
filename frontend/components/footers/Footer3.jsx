"use client";
import {
  carBrands,
  contactItems,
  navItems,
  socialMediaLinks,
  vehicleTypes,
} from "@/data/footerLinks";
import Link from "next/link";
import React from "react";

export default function Footer3({
  parenttClass = "boxcar-footer footer-style-five",
}) {
  return (
    <footer className={parenttClass}>
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
              <form
                onSubmit={(e) => e.preventDefault()}
                method="post"
                action="#"
              >
                <div className="form-group">
                  <input
                    type="email"
                    name="email"
                    className="email"
                    defaultValue=""
                    placeholder="Ваш email"
                    required
                  />
                  <button
                    type="button"
                    className="theme-btn btn-style-one hover-light"
                  >
                    <span className="btn-title">Отправить</span>
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
            <div className="footer-column-two col-lg-9 col-md-6 col-sm-12">
              <div className="row">
                <div className="col-lg-3 col-md-6 col-sm-12">
                  <div className="footer-widget links-widget wow fadeInUp">
                    <h4 className="widget-title">Полезные ссылки</h4>
                    <div className="widget-content">
                      <ul className="user-links style-two">
                        {navItems.map((elm, i) => (
                          <li key={i}>
                            <Link href="#">{elm.name}</Link>
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
              </div>
            </div>
            {/* footer column */}
            <div className="footer-column col-lg-3 col-md-6 col-sm-12">
              <div
                className="footer-widget social-widget wow fadeInUp"
                data-wow-delay="400ms"
              >
                <h4 className="widget-title"></h4>
                <div className="widget-content">
                  <div className="text">
                    Понедельник - Пятница: 09:00 - 19:00
                  </div>
                  <div className="social-icons">
                    <h6 className="title">Найдите нас</h6>
                    <ul>
                      {socialMediaLinks.map((social, index) => (
                        <li key={index}>
                          <a href={social.link}>
                            <i className={social.iconClass} />
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
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
            <ul className="footer-nav wow fadeInUp" data-wow-delay="100ms">
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
