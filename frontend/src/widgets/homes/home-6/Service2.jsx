import React from 'react';
import Image from 'next/image';
export default function Services() {
  return (
    <section className="boxcar-service-section v7 pt-0">
      <div className="boxcar-container">
        <div className="right-box">
          <div className="row">
            {/* content-column */}
            <div className="content-column col-xl-6 col-lg-12 col-md-12 col-sm-12">
              <div className="inner-column wow fadeInUp">
                <h2 className="title">Идеальные решения для корпоративных клиентов</h2>
                <div className="text">
                  Станьте нашим партнером и предоставьте вашей команде гибкие и экологичные варианты
                  передвижения. Независимо от того, нужен ли вам надежный транспорт для повседневной
                  работы или для специальных мероприятий, наши корпоративные решения созданы, чтобы
                  соответствовать потребностям вашего бизнеса. Наслаждайтесь эксклюзивными
                  преимуществами, выгодными тарифами и персональной поддержкой для вашей компании.
                </div>
                <div className="btn-box">
                  <a href="#" className="tf-btn fourth">
                    Узнать цены
                    <svg
                      width={14}
                      height={14}
                      viewBox="0 0 14 14"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M13.6111 0H5.05558C4.84062 0 4.66668 0.173943 4.66668 0.388901C4.66668 0.603859 4.84062 0.777802 5.05558 0.777802H12.6723L0.113941 13.3362C-0.0379805 13.4881 -0.0379805 13.7342 0.113941 13.8861C0.189884 13.962 0.289415 14 0.38891 14C0.488405 14 0.5879 13.962 0.663879 13.8861L13.2222 1.3277V8.94447C13.2222 9.15943 13.3962 9.33337 13.6111 9.33337C13.8261 9.33337 14 9.15943 14 8.94447V0.388901C14 0.173943 13.8261 0 13.6111 0Z"
                        fill="#050B20"
                      />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
            {/* image-column */}
            <div className="image-column col-xl-6 col-lg-12 col-md-6 col-sm-12">
              <div className="inner-column">
                <div className="image-box">
                  <figure className="image">
                    <Image alt="" src="/images/resource/service6.jpg" width={686} height={601} />
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
