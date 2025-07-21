import React from 'react';
import Image from 'next/image';
export default function Service() {
  return (
    <section className="boxcar-service-section pt-0">
      <div className="large-container">
        <div className="right-box">
          <div className="row">
            {/* content-column */}
            <div className="content-column col-xl-6 col-lg-12 col-md-12 col-sm-12">
              <div className="inner-column wow fadeInUp">
                <h2 className="title">TERMO-BOX для Партнера</h2>
                <div className="text">Цветной TERMOBOX брендируется по заказу Партнера</div>
                {/*<div className="btn-box">*/}
                {/*    <a href="#" className="store">*/}
                {/*        <Image*/}
                {/*            src="/images/resource/apple.png"*/}
                {/*            width={24}*/}
                {/*            height={29}*/}
                {/*            alt=""*/}
                {/*        />*/}
                {/*        <span>Download on the</span>*/}
                {/*        <h6 className="title">Apple Store</h6>*/}
                {/*    </a>*/}
                {/*    <a href="#" className="store two">*/}
                {/*        <Image*/}
                {/*            src="/images/resource/play-2.png"*/}
                {/*            width={23}*/}
                {/*            height={26}*/}
                {/*            alt=""*/}
                {/*        />*/}
                {/*        <span>Get in on</span>*/}
                {/*        <h6 className="title">Google Play</h6>*/}
                {/*    </a>*/}
                {/*</div>*/}
              </div>
            </div>
            {/* image-column */}
            <div className="image-column col-lg-6 col-md-6 col-sm-12">
              <div className="inner-column">
                <div className="image-box">
                  <figure className="image">
                    <Image alt="" src="/images/resource/termo-box.png" width={350} height={350} />
                  </figure>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
