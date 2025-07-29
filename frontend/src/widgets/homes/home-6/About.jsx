import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
export default function About() {
  const { t } = useTranslation('common');
  return (
    <>
      <section className="about-inner-one about-home">
        <div className="upper-box">
          <div className="boxcar-container">
            <div className="row wow fadeInUp">
              <div className="col-lg-6 col-md-6 col-sm-12">
                <div className="boxcar-title">
                  <h2>
                    {t('home.about.title')} <span className="orange">DELI-BIKE</span>{' '}
                    {t('home.about.titleEnd')}
                  </h2>
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
                    <div className="ext-text-box">
                      <h2 className="title">
                        {t('home.about.helmet.title')} <br />{' '}
                        <span className="black">Deli-bike</span>
                      </h2>
                      <div className="text">{t('home.about.helmet.description')}</div>
                    </div>
                    <Image
                      alt=""
                      title="DeliBike"
                      src="/images/deli-hat2.png"
                      width={208}
                      height={208}
                      className="deli-hat-img"
                    />
                  </div>
                  <div className="image-box second-box">
                    <div className="ext-text-box second-text">
                      <h2 className="title">
                        {t('home.about.lock.title')} <span className="orange">Deli-bike</span>
                      </h2>
                      <div className="text">{t('home.about.lock.description')}</div>
                    </div>
                    <Image
                      alt=""
                      title="DeliBike"
                      src="/images/zamok.png"
                      width={266}
                      height={208}
                      className="deli-zamok-img"
                    />
                  </div>
                </div>
              </div>

              <div className="image-block style-center col-md-5 col-sm-12 second-box-box">
                <div className="image-box">
                  <div className="ext-text-box second-text">
                    <h2 className="title">
                      {t('home.about.container.title')} <span className="orange">Deli-bike</span>
                    </h2>
                    <div className="text">
                      <ul className="about-list">
                        <li>{t('home.about.container.features.1')}</li>
                        <li>{t('home.about.container.features.2')}</li>
                        <li>{t('home.about.container.features.3')}</li>
                        <li>{t('home.about.container.features.4')}</li>
                      </ul>
                    </div>
                  </div>
                  <div className="box-image">
                    <Image
                      alt=""
                      width={567}
                      height={530}
                      src="/images/about-bike2.png"
                      className="about-bike-img"
                    />
                  </div>
                </div>
              </div>

              <div className="image-block col-md-5 col-sm-12">
                <div className="image-box two second-box-box mb-[27px]">
                  <div className="ext-text-box second-text">
                    <h2 className="title text-[var(--theme-color1)]">
                      {t('home.about.laser.title')} <span className="black">Deli-bike</span>
                    </h2>
                    <div className="text pb-[25px]">{t('home.about.laser.description')}</div>
                  </div>
                </div>
                <div className="row box-double-img">
                  <div className="image-block col-lg-6 col-6">
                    <div className="image-box last-home-box">
                      <div className="exp-box">
                        <div className="ext-text-box">
                          <h2 className="title">
                            {t('home.about.raincoat.title')} <br />{' '}
                            <span className="black">Deli-bike</span>
                          </h2>
                          <div className="text">{t('home.about.raincoat.description')}</div>
                        </div>
                        <Image
                          alt=""
                          title="DeliBike"
                          src="/images/rain1.png"
                          width={266}
                          height={208}
                          className="deli-rain-img"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="image-block second-box last-home-box-box col-lg-6 col-6">
                    <div className="image-box">
                      <div className="image-box">
                        <div className="ext-text-box second-text">
                          <h2 className="title">
                            {t('home.about.smartphone.title')} <br />{' '}
                            <span className="orange">Deli-bike</span>
                          </h2>
                          <div className="text">{t('home.about.smartphone.description')}</div>
                        </div>
                        <Image
                          alt=""
                          title="DeliBike"
                          src="/images/smartphone.png"
                          width={266}
                          height={208}
                          className="deli-phone-img"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
