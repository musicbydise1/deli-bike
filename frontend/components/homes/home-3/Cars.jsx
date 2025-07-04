'use client';
import { carData } from '@/data/cars';
import Slider from 'react-slick';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
const navButtons = [
  {
    label: 'SUV',
    svg: (
      <svg
        width={34}
        height={34}
        viewBox="0 0 34 34"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clipPath="url(#clip0_47_1028)">
          <path
            d="M32.8913 21.4348H31.7826V15.8914C31.7826 14.0573 30.2905 12.5653 28.4565 12.5653H24.8209L23.3616 8.1873C22.908 6.82704 21.6399 5.91309 20.2061 5.91309C20.0334 5.91309 8.04731 5.91309 7.76083 5.91309C6.31543 5.91309 5.08313 6.84005 4.62546 8.13046H3.32609C1.49208 8.13046 0 9.62254 0 11.4565V15.8914C0 17.7254 1.49208 19.2174 3.32609 19.2174H4.43481V21.4348H3.32609C2.71382 21.4348 2.21737 21.9312 2.21737 22.5435C2.21737 23.1559 2.71376 23.6523 3.32609 23.6523C4.36442 23.6523 5.6104 23.6523 6.65218 23.6523C6.65218 26.0976 8.64164 28.0871 11.087 28.0871C13.5323 28.0871 15.5218 26.0976 15.5218 23.6523H20.6957C20.6957 26.0976 22.6852 28.0871 25.1305 28.0871C27.5759 28.0871 29.5653 26.0976 29.5653 23.6523C30.6074 23.6523 31.8538 23.6523 32.8914 23.6523C33.5037 23.6523 34.0001 23.1559 34.0001 22.5435C34.0001 21.9312 33.5036 21.4348 32.8913 21.4348ZM4.43481 17H3.32609C2.71475 17 2.21737 16.5026 2.21737 15.8913V11.4565C2.21737 10.8451 2.71475 10.3478 3.32609 10.3478H4.43481C4.43481 11.0542 4.43481 16.315 4.43481 17ZM15.5217 8.13046H17.3696H20.2061C20.6841 8.13046 21.1068 8.43513 21.2579 8.88848L22.4834 12.5652H15.5217V8.13046ZM6.65218 9.23911C6.65218 8.62777 7.14956 8.13039 7.7609 8.13039H13.3044V12.5652H6.65218V9.23911ZM11.087 25.8696C9.86432 25.8696 8.86962 24.8749 8.86962 23.6522C8.86962 22.4295 9.86432 21.4348 11.087 21.4348C12.3097 21.4348 13.3044 22.4295 13.3044 23.6522C13.3044 24.8749 12.3097 25.8696 11.087 25.8696ZM25.1304 25.8696C23.9078 25.8696 22.9131 24.8749 22.9131 23.6522C22.9131 22.4295 23.9078 21.4348 25.1304 21.4348C26.3531 21.4348 27.3478 22.4295 27.3478 23.6522C27.3478 24.8749 26.3531 25.8696 25.1304 25.8696ZM29.5652 21.4348H28.9686C28.2005 20.1106 26.7683 19.2174 25.1304 19.2174C23.4926 19.2174 22.0604 20.1106 21.2923 21.4348H14.9251C14.1571 20.1106 12.7248 19.2174 11.087 19.2174C9.44914 19.2174 8.01689 20.1106 7.24884 21.4348H6.65225V18.1087V14.7826C8.46022 14.7826 27.2694 14.7826 28.4566 14.7826C29.0679 14.7826 29.5653 15.28 29.5653 15.8914V21.4348H29.5652Z"
            fill="#050B20"
          />
          <path
            d="M18.8478 17H16.6304C16.0182 17 15.5217 17.4964 15.5217 18.1087C15.5217 18.721 16.0181 19.2174 16.6304 19.2174H18.8478C19.4601 19.2174 19.9565 18.7211 19.9565 18.1087C19.9565 17.4964 19.4602 17 18.8478 17Z"
            fill="#050B20"
          />
        </g>
        <defs>
          <clipPath id="clip0_47_1028">
            <rect width={34} height={34} fill="white" />
          </clipPath>
        </defs>
      </svg>
    ),
  },
  {
    label: 'Sedan',
    svg: (
      <svg
        width={34}
        height={34}
        viewBox="0 0 34 34"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M30.759 15.5873L24.8898 14.6086C24.5466 14.0512 23.8644 13.0429 22.8725 12.0327C20.8927 10.0164 18.6133 8.95068 16.2806 8.95068H6.7225C5.16993 8.95068 3.73044 9.79012 2.96577 11.1414L0.331898 15.7962C0.327648 15.8037 0.324461 15.8115 0.32041 15.8191C0.116676 16.1837 0 16.6033 0 17.0499V21.9548C0 22.5049 0.445984 22.9508 0.996094 22.9508H4.18632C4.65455 24.176 5.848 25.0494 7.24339 25.0494C8.63879 25.0494 9.83224 24.176 10.3005 22.9508H22.672C23.1402 24.176 24.3336 25.0494 25.729 25.0494C27.1244 25.0494 28.3178 24.176 28.786 22.9508H33.0039C33.554 22.9508 34 22.5049 34 21.9548V19.3178C34 17.4492 32.6077 15.8482 30.759 15.5873ZM22.3976 14.5182H15.222V10.9429H16.2806C19.104 10.9429 21.2363 13.0302 22.3976 14.5182ZM7.60615 14.5182H0C0 13.0302 2.13225 10.9429 4.62239 10.9429H5.69559V14.5182H7.60615ZM22.3605 20.4842H13.2923C12.8536 20.4842 12.5 20.8872 12.5 21.3901C12.5 21.8851 12.8536 22.2616 13.2923 22.2616H22.3605C22.7993 22.2616 23.1529 21.8851 23.1529 21.3901C23.1529 20.8872 22.7993 20.4842 22.3605 20.4842ZM28.786 20.5168C28.2554 20.5168 27.9595 20.8769 27.9562 21.3901C27.9562 21.8851 28.2554 22.2616 28.786 22.2616C29.3166 22.2616 29.6156 21.8851 29.6156 21.3901C29.6156 20.8769 29.3166 20.5168 28.786 20.5168ZM10.3005 20.5168C9.76993 20.5168 9.47301 20.8769 9.4698 21.3901C9.4698 21.8851 9.76993 22.2616 10.3005 22.2616C10.8311 22.2616 11.1302 21.8851 11.1302 21.3901C11.1302 20.8769 10.8311 20.5168 10.3005 20.5168Z"
          fill="#050B20"
        />
      </svg>
    ),
  },
  {
    label: 'Hatchback',
    svg: (
      <svg
        width={34}
        height={34}
        viewBox="0 0 34 34"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M32.2751 14.0524H30.6807V10.6363C30.6807 9.09074 29.1346 7.82843 27.6667 7.82843H22.6683L21.3481 5.14292C20.7424 3.86804 19.1742 3.00391 17.6405 3.00391C17.5889 3.00391 17.5377 3.00391 17.4873 3.00391C15.9999 3.00391 14.6714 4.17348 14.2486 5.82843H10.515C8.60349 5.82843 7.08752 7.32029 7.08752 9.22806V10.6363H2.56338C1.41722 10.6363 0.614929 11.3929 0.614929 12.5088V18.9581C0.614929 20.074 1.41722 20.8306 2.56338 20.8306H3.8177C3.87499 22.4761 5.10962 23.6523 6.65248 23.6523C8.19534 23.6523 9.42997 22.4761 9.48727 20.8306H24.7454C24.8028 22.4761 26.0374 23.6523 27.5803 23.6523C29.1232 23.6523 30.3578 22.4761 30.4151 20.8306H32.2751C33.4213 20.8306 34.2246 20.074 34.2246 18.9581V12.5088C34.2246 11.3929 33.4213 10.6363 32.2751 10.6363H32.2751ZM4.62339 12.5088H29.7762V16.0775H4.62339V12.5088ZM5.88456 20.8306C5.67519 21.5103 4.9476 22.0047 4.18625 22.0047C3.4249 22.0047 2.69731 21.5103 2.48794 20.8306H5.88456ZM27.5803 22.0047C26.8205 22.0047 26.0929 21.5103 25.8835 20.8306H29.2802C29.0698 21.5103 28.3422 22.0047 27.5803 22.0047Z"
          fill="#050B20"
        />
      </svg>
    ),
  },
  {
    label: 'Coupe',
    svg: (
      <svg
        width={34}
        height={34}
        viewBox="0 0 34 34"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M32.3946 15.0442H30.7416C30.3865 13.2998 28.9018 11.9555 27.2865 11.9555H24.3447L22.6894 8.75682C22.0564 7.08086 20.3141 6.00094 18.5353 6.00094C17.2323 6.00094 16.0713 6.72445 15.4472 7.86434H10.6865C10.0545 6.72445 8.89347 6.00094 7.59046 6.00094C5.9709 6.00094 4.22819 7.08086 3.59619 8.75682L1.94085 11.9555H0.413998C0.133132 11.9555 -0.00318535 12.2984 0.00318535 12.5858V16.2441C0.00318535 17.0119 0.632626 17.5752 1.55241 17.5752H2.53213C2.55678 18.5583 3.19868 19.3914 4.06307 19.3914C4.92747 19.3914 5.56936 18.5583 5.59402 17.5752H29.1503C29.1749 18.5583 29.8168 19.3914 30.6812 19.3914C31.5462 19.3914 32.1881 18.5583 32.2128 17.5752H33.1984C34.139 17.5752 34.7871 17.0119 34.7871 16.2441V12.5858C34.7871 12.2984 34.6398 15.0442 32.3946 15.0442ZM22.8024 12.7675H11.5245V8.16556H22.8024V12.7675ZM7.59046 9.82205C6.65374 9.82205 5.89075 10.6708 5.89075 11.6438C5.89075 12.6156 6.65374 13.4643 7.59046 13.4643C8.52717 13.4643 9.29016 12.6156 9.29016 11.6438C9.29016 10.6708 8.52717 9.82205 7.59046 9.82205ZM26.0945 12.7675H22.8024C22.8024 10.7498 25.0813 9.80412 25.8892 9.80412C26.6073 9.80412 27.2767 10.5108 27.2767 11.6438C27.2767 12.6156 26.6073 12.7675 26.0945 12.7675ZM5.59402 19.3914C5.19145 19.3914 4.92747 19.0187 4.92747 18.4301C4.92747 17.8415 5.19145 17.5752 5.59402 17.5752C5.99658 17.5752 6.26056 17.9916 6.26056 18.4301C6.26056 18.8685 5.99658 19.3914 5.59402 19.3914ZM29.6502 19.3914C29.2476 19.3914 28.9837 19.0187 28.9837 18.4301C28.9837 17.8415 29.2476 17.5752 29.6502 17.5752C30.0528 17.5752 30.3167 17.9916 30.3167 18.4301C30.3167 18.8685 30.0528 19.3914 29.6502 19.3914Z"
          fill="#050B20"
        />
      </svg>
    ),
  },
  {
    label: 'Convertible',
    svg: (
      <svg
        width={34}
        height={34}
        viewBox="0 0 34 34"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M28.043 11.7656H25.4702C25.2144 10.8718 24.1455 10.2398 23.013 10.2398H19.4461L18.6131 8.05424C18.1574 7.11664 17.1592 6.51978 16.0201 6.51978C15.5799 6.51978 15.1203 6.77119 14.7488 7.20183H13.5016C13.1301 6.77119 12.6704 6.51978 12.2302 6.51978C11.0911 6.51978 10.0928 7.11664 9.63722 8.05424L8.03576 10.2398H4.47084C3.31178 10.2398 2.25101 10.872 2.00523 11.7656H0.00012207C-0.267529 11.7656 -0.48583 12.0287 -0.48583 12.3183V15.9986C-0.48583 16.2882 -0.267529 16.5513 0.00012207 16.5513H1.45538C1.5595 18.1976 2.90335 19.3914 4.62373 19.3914C6.34411 19.3914 7.68803 18.1976 7.79215 16.5513H26.2063C26.3105 18.1976 27.6544 19.3914 29.3748 19.3914C31.0952 19.3914 32.4391 18.1976 32.5433 16.5513H33.0001C33.2676 16.5513 33.4858 16.2882 33.4858 15.9986V12.3183C33.4858 12.0287 33.2676 11.7656 33.0001 11.7656H28.043ZM6.73045 12.3183H27.2681V15.4765H6.73045V12.3183ZM3.96367 13.0997H6.73045V14.2324H3.96367V13.0997ZM27.2681 13.0997H30.0348V14.2324H27.2681V13.0997Z"
          fill="#050B20"
        />
      </svg>
    ),
  },
];

export default function Cars() {
  const [selectedBrand, setSelectedBrand] = useState(navButtons[0]);
  const [filteres, setFilteres] = useState([]);
  useEffect(() => {
    setFilteres([...carData].filter(elm => elm.filterBrands.includes(selectedBrand.label)));
  }, [selectedBrand]);

  return (
    <section className="cars-section-four section-tab-car">
      <div className="boxcar-container">
        <div className="nav nav-tabs nav-car-tab">
          {navButtons.map((elm, i) => (
            <button
              key={i}
              onClick={() => setSelectedBrand(elm)}
              className={`nav-link ${selectedBrand == elm ? 'active' : ''}`}
            >
              {elm.svg}
              <span>{elm.label}</span>
            </button>
          ))}
        </div>
        <div className="tab-content wow fadeInUp" data-wow-delay="200ms">
          <div
            className="tab-pane fade show active"
            id="suv"
            role="tabpanel"
            aria-labelledby="suv-tab"
          >
            <div className="boxcar-title">
              <h2>The Most Searched SUV Cars</h2>
              <a href="#" className="btn-title">
                View All
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={14}
                  height={14}
                  viewBox="0 0 14 14"
                  fill="none"
                >
                  <g clipPath="url(#clip0_601_243)">
                    <path
                      d="M13.6109 0H5.05533C4.84037 0 4.66643 0.173943 4.66643 0.388901C4.66643 0.603859 4.84037 0.777802 5.05533 0.777802H12.6721L0.113697 13.3362C-0.0382246 13.4881 -0.0382246 13.7342 0.113697 13.8861C0.18964 13.962 0.289171 14 0.388666 14C0.488161 14 0.587656 13.962 0.663635 13.8861L13.222 1.3277V8.94447C13.222 9.15943 13.3959 9.33337 13.6109 9.33337C13.8259 9.33337 13.9998 9.15943 13.9998 8.94447V0.388901C13.9998 0.173943 13.8258 0 13.6109 0Z"
                      fill="#050B20"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_601_243">
                      <rect width={14} height={14} fill="white" />
                    </clipPath>
                  </defs>
                </svg>
              </a>
            </div>
            <div className="row">
              {/* car-block-four */}

              {filteres.map((car, index) => (
                <div
                  key={index}
                  className="box-car car-block-four col-xl-3 col-lg-4 col-md-6 col-sm-12"
                >
                  <div className="inner-box">
                    <div className={`image-box ${car.badge == 'Great Price' ? 'two' : ''}`}>
                      <Slider dots slidesToShow={1} key={car.id} className="slider-thumb">
                        {car.images.map((image, i) => (
                          <div key={i} className="image d-block">
                            <Link href={`/inventory-page-single-v1/${car.id}`}>
                              <Image alt="" src={image} width={329} height={220} />
                            </Link>
                          </div>
                        ))}
                      </Slider>
                      {car.badge && <span>{car.badge}</span>}
                      <Link
                        href={`/inventory-page-single-v1/${car.id}`}
                        title=""
                        className="icon-box"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="12"
                          height="12"
                          viewBox="0 0 12 12"
                          fill="none"
                        >
                          <g clipPath="url(#clip0_601_1274)">
                            <path
                              d="M9.39062 12C9.15156 12 8.91671 11.9312 8.71128 11.8009L6.11794 10.1543C6.04701 10.1091 5.95296 10.1096 5.88256 10.1543L3.28869 11.8009C2.8048 12.1082 2.13755 12.0368 1.72722 11.6454C1.47556 11.4047 1.33685 11.079 1.33685 10.728V1.2704C1.33738 0.570053 1.90743 0 2.60778 0H9.39272C10.0931 0 10.6631 0.570053 10.6631 1.2704V10.728C10.6631 11.4294 10.0925 12 9.39062 12ZM6.00025 9.06935C6.24193 9.06935 6.47783 9.13765 6.68169 9.26743L9.27503 10.9135C9.31233 10.9371 9.35069 10.9487 9.39114 10.9487C9.48046 10.9487 9.61286 10.8788 9.61286 10.728V1.2704C9.61233 1.14956 9.51356 1.05079 9.39272 1.05079H2.60778C2.48642 1.05079 2.38817 1.14956 2.38817 1.2704V10.728C2.38817 10.7911 2.41023 10.8436 2.45384 10.8851C2.52582 10.9539 2.63563 10.9708 2.72599 10.9135L5.31934 9.2669C5.52267 9.13765 5.75857 9.06935 6.00025 9.06935Z"
                              fill="black"
                            ></path>
                          </g>
                          <defs>
                            <clippath id="clip0_601_1274">
                              <rect width="12" height="12" fill="white"></rect>
                            </clippath>
                          </defs>
                        </svg>
                      </Link>
                    </div>
                    <div className="content-box">
                      <h6 className="title">
                        <Link href={`/inventory-page-single-v1/${car.id}`}>{car.title}</Link>
                      </h6>
                      <div className="text">{car.description}</div>
                      <ul>
                        {car.specs.map((spec, i) => (
                          <li key={i}>
                            <i className={spec.icon} /> {spec.text}
                          </li>
                        ))}
                      </ul>
                      <div className="btn-box">
                        <span>{car.price}</span>
                        <small>{car.oldPrice}</small>
                        <Link href={`/inventory-page-single-v1/${car.id}`} className="details">
                          View Details
                          {/* SVG content */}
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
