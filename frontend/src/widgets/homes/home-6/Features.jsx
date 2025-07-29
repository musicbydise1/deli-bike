import React from 'react';
import { IoStatsChart } from 'react-icons/io5';
import { FaDollarSign, FaTenge } from 'react-icons/fa';
import { HiMiniWrenchScrewdriver } from 'react-icons/hi2';
import { RiSpeedFill } from 'react-icons/ri';
import { MdEco } from 'react-icons/md';
import { useTranslation } from 'react-i18next';

export default function Features() {
  const { t } = useTranslation('common');
  return (
    <section className="why-choose-us-section-four why-choose-home" id="features">
      <div className="boxcar-container">
        <div className="boxcar-title wow fadeInUp">
          <h2 className="title">
            {t('home.features.title')} <span className="orange">DELI-BIKE</span>
          </h2>
        </div>
        <div className="row">
          {/* choose-us-block */}
          <div className="choose-us-block-four col-lg-3 col-md-6 col-sm-12">
            <div className="inner-box wow fadeInUp">
              <div className="icon-box">
                <IoStatsChart size={50} color="#ff5500" />
              </div>
              <div className="content-box">
                <h6 className="title">{t('home.features.blocks.economy.title')}</h6>
                <div className="text">
                  {t('home.features.blocks.economy.description')}
                </div>
              </div>
            </div>
          </div>
          {/* choose-us-block */}
          <div className="choose-us-block-four col-lg-3 col-md-6 col-sm-12">
            <div className="inner-box wow fadeInUp" data-wow-delay="100ms">
              <div className="icon-box">
                <FaDollarSign size={50} color="#ff5500" />
              </div>
              <div className="content-box">
                <h6 className="title">{t('home.features.blocks.income.title')}</h6>
                <div className="text">
                  {t('home.features.blocks.income.description')}
                </div>
              </div>
            </div>
          </div>
          {/* choose-us-block */}
          <div className="choose-us-block-four col-lg-3 col-md-6 col-sm-12">
            <div className="inner-box wow fadeInUp" data-wow-delay="200ms">
              <div className="icon-box">
                <HiMiniWrenchScrewdriver size={50} color="#ff5500" />
              </div>
              <div className="content-box">
                <h6 className="title">{t('home.features.blocks.maintenance.title')}</h6>
                <div className="text">
                  {t('home.features.blocks.maintenance.description')}
                </div>
              </div>
            </div>
          </div>
          {/* choose-us-block */}
          <div className="choose-us-block-four col-lg-3 col-md-6 col-sm-12">
            <div className="inner-box wow fadeInUp" data-wow-delay="300ms">
              <div className="icon-box">
                <MdEco size={50} color="#ff5500" />
              </div>
              <div className="content-box">
                <h6 className="title">{t('home.features.blocks.eco.title')}</h6>
                <div className="text">
                  {t('home.features.blocks.eco.description')}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
