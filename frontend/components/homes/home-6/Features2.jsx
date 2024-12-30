import React from "react";

export default function Features2() {
  return (
      <section className="why-choose-us-section v2 pt-0">
        <div className="boxcar-container">
          <div className="boxcar-title text-center wow fadeInUp">
            <h2 className="title">Почему выбирают нас?</h2>
          </div>
          <div className="row">
            {/* choose-us-block */}
            <div className="choose-us-block col-lg-6 col-md-6 col-sm-12">
              <div className="inner-box wow fadeInUp">
                <div className="icon-box">
                  {/* Иконка */}
                </div>
                <div className="content-box">
                  <h6 className="title">Быстрая доставка</h6>
                  <div className="text">
                    С нашими электровелосипедами скорость доставки увеличивается
                    на 54% по сравнению с пешими курьерами и на 37% по сравнению
                    с обычными велосипедами.
                  </div>
                </div>
              </div>
            </div>
            {/* choose-us-block */}
            <div className="choose-us-block col-lg-6 col-md-6 col-sm-12">
              <div className="inner-box wow fadeInUp" data-wow-delay="100ms">
                <div className="icon-box">
                  {/* Иконка */}
                </div>
                <div className="content-box">
                  <h6 className="title">Экономия затрат</h6>
                  <div className="text">
                    Сокращение расходов на обслуживание и заработную плату курьеров
                    и сервисменов до 50%.
                  </div>
                </div>
              </div>
            </div>
            {/* choose-us-block */}
            <div className="choose-us-block col-lg-6 col-md-6 col-sm-12">
              <div className="inner-box wow fadeInUp" data-wow-delay="200ms">
                <div className="icon-box">
                  {/* Иконка */}
                </div>
                <div className="content-box">
                  <h6 className="title">Экологичность</h6>
                  <div className="text">
                    Мы предлагаем экологически чистые решения для доставки, которые
                    помогают снизить углеродный след.
                  </div>
                </div>
              </div>
            </div>
            {/* choose-us-block */}
            <div className="choose-us-block col-lg-6 col-md-6 col-sm-12">
              <div className="inner-box wow fadeInUp" data-wow-delay="300ms">
                <div className="icon-box">
                  {/* Иконка */}
                </div>
                <div className="content-box">
                  <h6 className="title">Высокая надежность</h6>
                  <div className="text">
                    Подменный фонд и профессиональный сервис гарантируют
                    бесперебойную работу ваших курьеров.
                  </div>
                </div>
              </div>
            </div>
            {/* choose-us-block */}
            <div className="choose-us-block col-lg-6 col-md-6 col-sm-12">
              <div className="inner-box wow fadeInUp" data-wow-delay="400ms">
                <div className="icon-box">
                  {/* Иконка */}
                </div>
                <div className="content-box">
                  <h6 className="title">Адаптация под задачи</h6>
                  <div className="text">
                    Специально разработанные модели электровелосипедов, адаптированные
                    для работы в сложных условиях, таких как горная местность.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
  );
}
