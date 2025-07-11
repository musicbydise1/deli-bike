import React from 'react';
import Image from 'next/image';
import { vacancies } from '@/data/vacancies';
import Link from 'next/link';
import Pagination from '../common/Pagination';
export default function Dealer() {
  return (
    <section className="dealer-ship-section layout-radius">
      <div className="boxcar-container">
        <div className="boxcar-title-three wow fadeInUp">
          <ul className="breadcrumb">
            <li>
              <Link href={`/`}>Главная</Link>
            </li>
            <li>
              <span>/</span>
            </li>
            <li>
              <span>Вакансии</span>
            </li>
          </ul>
          <h2>Список вакансий</h2>
          <span>Показано 1–6 из 6 вакансий</span>
        </div>
        <div className="row">
          {vacancies.map((vacancy, index) => (
            <div key={index} className="dealer-block col-lg-3 col-md-6 col-sm-12">
              <div className="inner-box">
                <div className="content-box">
                  <h6 className="title">
                    <Link href={`/vacancy-single/${vacancy.id}`}>{vacancy.title}</Link>
                  </h6>
                  <div className="text">{vacancy.location}</div>
                  <Link href={`/vacancy-single/${vacancy.id}`} className="deal-btn">
                    Подробнее
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width={15}
                      height={14}
                      viewBox="0 0 15 14"
                      fill="none"
                    >
                      <g clipPath="url(#clip0_801_908)">
                        <path
                          d="M14.1106 0H5.55509C5.34013 0 5.16619 0.173943 5.16619 0.388901C5.16619 0.603859 5.34013 0.777802 5.55509 0.777802H13.1719L0.613453 13.3362C0.461531 13.4881 0.461531 13.7342 0.613453 13.8861C0.689396 13.962 0.788927 14 0.888422 14C0.987917 14 1.08741 13.962 1.16339 13.8861L13.7218 1.3277V8.94447C13.7218 9.15943 13.8957 9.33337 14.1107 9.33337C14.3256 9.33337 14.4996 9.15943 14.4996 8.94447V0.388901C14.4995 0.173943 14.3256 0 14.1106 0Z"
                          fill="#405FF2"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_801_908">
                          <rect width={14} height={14} fill="white" transform="translate(0.5)" />
                        </clipPath>
                      </defs>
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="pagination-sec">
          <nav aria-label="Page navigation example">
            <ul className="pagination">
              <Pagination />
            </ul>
            <div className="text">Показаны результаты 1–6 из 6</div>
          </nav>
        </div>
      </div>
    </section>
  );
}
