import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function CarsCollection() {
  return (
    <section className="boxcar-pricing-section-four v9 pb-0">
      <div className="boxcar-container">
        <div className="row">
          {/* image-column */}
          <div className="image-column col-lg-6 col-md-6 col-sm-12">
            <div className="inner-column">
              <div className="image-box">
                <figure className="image">
                  <a href="#">
                    <Image alt="" src="/images/resource/pricing9-1.jpg" width={285} height={279} />
                  </a>
                </figure>
                <figure className="image-2">
                  <a href="#">
                    <Image alt="" src="/images/resource/pricing9-2.jpg" width={224} height={224} />
                  </a>
                </figure>
              </div>
              <div className="image-box">
                <figure className="image-3">
                  <a href="#">
                    <Image alt="" src="/images/resource/pricing9-3.jpg" width={336} height={447} />
                  </a>
                </figure>
              </div>
            </div>
          </div>
          <div className="content-column col-lg-6 col-md-6 col-sm-12">
            <div className="inner-column">
              <div className="boxcar-title wow fadeInUp">
                <h2>Get A Fair Price For Your Car Sell To Us Today</h2>
                <div className="text">
                  We are committed to providing our customers with exceptional service, competitive
                  pricing, and a wide range of.
                </div>
              </div>
              <ul className="list-style-one wow fadeInUp" data-wow-delay="100ms">
                <li>
                  <i className="fa-solid fa-check" />
                  We are the UK’s largest provider, with more patrols in more places
                </li>
                <li>
                  <i className="fa-solid fa-check" />
                  You get 24/7 roadside assistance
                </li>
                <li>
                  <i className="fa-solid fa-check" />
                  We fix 4 out of 5 cars at the roadside
                </li>
              </ul>
              <Link href={`/contact`} className="read-more wow fadeInUp" data-wow-delay="200ms">
                get started
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={14}
                  height={14}
                  viewBox="0 0 14 14"
                  fill="none"
                >
                  <g clipPath="url(#clip0_634_2156)">
                    <path
                      d="M13.6106 0H5.05509C4.84013 0 4.66619 0.173943 4.66619 0.388901C4.66619 0.603859 4.84013 0.777802 5.05509 0.777802H12.6719L0.113453 13.3362C-0.0384687 13.4881 -0.0384687 13.7342 0.113453 13.8861C0.189396 13.962 0.288927 14 0.388422 14C0.487917 14 0.587411 13.962 0.663391 13.8861L13.2218 1.3277V8.94447C13.2218 9.15943 13.3957 9.33337 13.6107 9.33337C13.8256 9.33337 13.9996 9.15943 13.9996 8.94447V0.388901C13.9995 0.173943 13.8256 0 13.6106 0Z"
                      fill="white"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_634_2156">
                      <rect width={14} height={14} fill="white" />
                    </clipPath>
                  </defs>
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
