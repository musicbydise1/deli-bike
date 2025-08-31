import React from 'react';
import Image from 'next/image';
import { Tabs, Button } from '@mantine/core';
import { useTranslation } from 'react-i18next';

export default function Features3() {
  const { t } = useTranslation('common');
  return (
    <section className="cars-section">
      <div className="boxcar-container">
        <div className="boxcar-title categ wow fadeInUp">
          <h2>
            {t('home.features3.title')}{' '}
            <span style={{ color: 'var(--theme-color1)' }}>
              {t('home.features3.titleHighlight')}
            </span>
          </h2>
          <p>{t('home.features3.subtitle')}</p>
        </div>

        <Tabs defaultValue="foot" className="wow fadeInUp">
          <Tabs.List mb="xl">
            <Tabs.Tab value="foot" color="#ff5500">
              {t('home.features3.tabs.foot')}
            </Tabs.Tab>
            <Tabs.Tab value="moped" color="#ff5500">
              {t('home.features3.tabs.moped')}
            </Tabs.Tab>
            <Tabs.Tab value="car" color="#ff5500">
              {t('home.features3.tabs.car')}
            </Tabs.Tab>
          </Tabs.List>

          {/* Содержимое вкладок */}
          <div className="wow fadeInUp">
            {/* --- Вкладка «Пешком» --- */}
            <Tabs.Panel value="foot">
              <div className="row">
                {/* Левая часть с таблицей */}
                <div className="col-lg-9 col-md-12 col-sm-12">
                  <table className="comparison-table">
                    <thead>
                      <tr>
                        <th>{t('home.features3.table.header.parameter')}</th>
                        <th>{t('home.features3.table.header.foot')}</th>
                        <th>Deli-Bike</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>{t('home.features3.table.rows.speed')}</td>
                        <td>{t('home.features3.table.foot.speed')}</td>
                        <td>{t('home.features3.table.delibike.speed')}</td>
                      </tr>
                      <tr>
                        <td>{t('home.features3.table.rows.fuel')}</td>
                        <td>{t('home.features3.table.foot.fuel')}</td>
                        <td>{t('home.features3.table.delibike.fuel')}</td>
                      </tr>
                      <tr>
                        <td>{t('home.features3.table.rows.maintenance')}</td>
                        <td>{t('home.features3.table.foot.maintenance')}</td>
                        <td>{t('home.features3.table.delibike.maintenance')}</td>
                      </tr>
                      <tr>
                        <td>{t('home.features3.table.rows.distance')}</td>
                        <td>
                          <span>{t('home.features3.table.foot.distance')}</span>
                        </td>
                        <td>{t('home.features3.table.delibike.distance')}</td>
                      </tr>
                      <tr>
                        <td>{t('home.features3.table.rows.orders')}</td>
                        <td>{t('home.features3.table.foot.orders')}</td>
                        <td>{t('home.features3.table.delibike.orders')}</td>
                      </tr>
                      <tr>
                        <td>{t('home.features3.table.rows.income')}</td>
                        <td style={{ color: '#ac2318' }}>
                          {t('home.features3.table.foot.income')}
                        </td>
                        <td>
                          <span>{t('home.features3.table.delibike.income')}</span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                {/* Правая часть с изображением */}
                <div className="col-lg-3 col-md-12 col-sm-12 d-flex align-items-center">
                  {/* Укажите свои пути, ширину и высоту */}
                  <Image
                    src="/images/foot1.jpg"
                    alt={t('home.features3.tabs.foot')}
                    width={350} // ваша ширина
                    height={350} // ваша высота
                    className="table-images"
                  />
                </div>
              </div>
            </Tabs.Panel>

            {/* --- Вкладка «Мопед» --- */}
            <Tabs.Panel value="moped">
              <div className="row">
                {/* Левая часть с таблицей */}
                <div className="col-lg-9 col-md-12 col-sm-12">
                  <table className="comparison-table">
                    <thead>
                      <tr>
                        <th>{t('home.features3.table.header.parameter')}</th>
                        <th>{t('home.features3.table.header.moped')}</th>
                        <th>Deli-Bike</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>{t('home.features3.table.rows.speed')}</td>
                        <td>{t('home.features3.table.moped.speed')}</td>
                        <td>{t('home.features3.table.moped.delibike.speed')}</td>
                      </tr>
                      <tr>
                        <td>{t('home.features3.table.rows.fuel')}</td>
                        <td>{t('home.features3.table.moped.fuel')}</td>
                        <td>{t('home.features3.table.delibike.fuel')}</td>
                      </tr>
                      <tr>
                        <td>{t('home.features3.table.rows.maintenance')}</td>
                        <td>{t('home.features3.table.moped.maintenance')}</td>
                        <td>{t('home.features3.table.moped.delibike.maintenance')}</td>
                      </tr>
                      <tr>
                        <td>{t('home.features3.table.rows.distance')}</td>
                        <td>{t('home.features3.table.moped.distance')}</td>
                        <td>{t('home.features3.table.moped.delibike.distance')}</td>
                      </tr>
                      <tr>
                        <td>{t('home.features3.table.rows.orders')}</td>
                        <td>{t('home.features3.table.moped.orders')}</td>
                        <td>{t('home.features3.table.moped.delibike.orders')}</td>
                      </tr>
                      <tr>
                        <td>{t('home.features3.table.rows.income')}</td>
                        <td>
                          <span style={{ color: '#ac2318' }}>
                            {t('home.features3.table.moped.income')}
                          </span>
                        </td>
                        <td>
                          <span>{t('home.features3.table.moped.delibike.income')}</span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                {/* Правая часть с изображением */}
                <div className="col-lg-3 col-md-12 col-sm-12 d-flex align-items-center">
                  <Image
                    src="/images/moped.jpg"
                    alt={t('home.features3.tabs.moped')}
                    width={350}
                    height={350}
                    className="table-images"
                  />
                </div>
              </div>
            </Tabs.Panel>

            {/* --- Вкладка «Авто» --- */}
            <Tabs.Panel value="car">
              <div className="row">
                {/* Левая часть с таблицей */}
                <div className="col-lg-9 col-md-12 col-sm-12">
                  <table className="comparison-table">
                    <thead>
                      <tr>
                        <th>{t('home.features3.table.header.parameter')}</th>
                        <th>{t('home.features3.table.header.car')}</th>
                        <th>Deli-Bike</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>{t('home.features3.table.rows.speed')}</td>
                        <td>{t('home.features3.table.car.speed')}</td>
                        <td>{t('home.features3.table.car.delibike.speed')}</td>
                      </tr>
                      <tr>
                        <td>{t('home.features3.table.rows.fuel')}</td>
                        <td>{t('home.features3.table.car.fuel')}</td>
                        <td>{t('home.features3.table.delibike.fuel')}</td>
                      </tr>
                      <tr>
                        <td>{t('home.features3.table.rows.maintenance')}</td>
                        <td>{t('home.features3.table.car.maintenance')}</td>
                        <td>{t('home.features3.table.car.delibike.maintenance')}</td>
                      </tr>
                      <tr>
                        <td>{t('home.features3.table.rows.distance')}</td>
                        <td>{t('home.features3.table.car.distance')}</td>
                        <td>{t('home.features3.table.car.delibike.distance')}</td>
                      </tr>
                      <tr>
                        <td>{t('home.features3.table.rows.orders')}</td>
                        <td>{t('home.features3.table.car.orders')}</td>
                        <td>{t('home.features3.table.car.delibike.orders')}</td>
                      </tr>
                      <tr>
                        <td>{t('home.features3.table.rows.income')}</td>
                        <td>
                          <span style={{ color: '#ac2318' }}>
                            {t('home.features3.table.car.income')}
                          </span>
                        </td>
                        <td>
                          <span>{t('home.features3.table.car.delibike.income')}</span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                {/* Правая часть с изображением */}
                <div className="col-lg-3 col-md-12 col-sm-12 d-flex align-items-center">
                  <Image
                    src="/images/car.jpg"
                    alt={t('home.features3.table.header.car')}
                    width={350}
                    height={350}
                    className="table-images"
                  />
                </div>
              </div>
            </Tabs.Panel>
          </div>
        </Tabs>
      </div>
    </section>
  );
}
