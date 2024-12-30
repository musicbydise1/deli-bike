import React from "react";
import Image from "next/image";
import Link from "next/link";
export default function About() {
  return (
    <>
      <div className="upper-box">
        <div className="boxcar-container">
          <div className="row wow fadeInUp">
            <div className="col-lg-6 col-md-6 col-sm-12">
              <div className="boxcar-title">
                <h2>О нас</h2>
                <div className="text">
                  Мы ценим наших клиентов и хотим, чтобы у них остались приятные впечатления
                </div>
              </div>
            </div>
            <div className="col-lg-6 col-md-6 col-sm-12">
              <div className="content-box">
                <div className="text">
                  Мы — команда, увлеченная инновациями и экологией, и мы рады предложить вам современное и
                  удобное решение для передвижения по городу — аренду электробайков.
                </div>
                <div className="text">
                  Наша миссия — сделать передвижение простым, экологичным и доступным для каждого.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* gallery-sec */}
      <div className="galler-section">
        <div className="boxcar-container">
          <div className="row">
            <div className="exp-block col-md-2 col-sm-12">
              <div className="inner-box">
                <div className="exp-box">
                  <h2 className="title">10</h2>
                  <div className="text">лет на рынке</div>
                </div>
                <div className="image-box">
                  <figure className="image">
                    <Image
                      alt=""
                      width={210}
                      height={210}
                      src="/images/resource/about-inner1-1.jpg"
                    />
                  </figure>
                </div>
              </div>
            </div>
            <div className="image-block style-center col-md-5 col-sm-12">
              <div className="image-box">
                <figure className="image">
                  <Image
                    alt=""
                    width={567}
                    height={540}
                    src="/images/resource/about-inner1-2.jpg"
                  />
                </figure>
              </div>
            </div>
            <div className="image-block col-md-5 col-sm-12">
              <div className="image-box two">
                <figure className="image">
                  <Image
                    alt=""
                    width={567}
                    height={300}
                    src="/images/resource/about-inner1-3.jpg"
                  />
                </figure>
              </div>
              <div className="row box-double-img">
                <div className="image-block col-lg-5 col-5">
                  <div className="image-box">
                    <figure className="image">
                      <Image
                        alt=""
                        width={210}
                        height={210}
                        src="/images/resource/about-inner1-4.jpg"
                      />
                    </figure>
                  </div>
                </div>
                <div className="image-block col-lg-7 col-7">
                  <div className="image-box">
                    <figure className="image">
                      <Image
                        alt=""
                        width={329}
                        height={210}
                        src="/images/resource/about-inner1-5.jpg"
                      />
                    </figure>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
