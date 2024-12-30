import React from "react";
import Image from "next/image";
import {clients, testimonials2} from "@/data/testimonials";
export default function Testimonials() {
  return (
    <section className="boxcar-testimonial-section-three">
      <div className="large-container">
        <div className="right-box">
          <div className="row">
            {/* content-column */}
            <div className="content-column col-lg-4 col-md-12 col-sm-12">
              <div className="inner-column">
                <div className="boxcar-title light">
                  <h2>Кому это подойдет?</h2>
                  <div className="text">
                    Мы предлагаем уникальные условия сотрудничества как для курьеров,
                    так и для корпоративных клиентов.
                  </div>
                </div>
              </div>
            </div>
            {/* testimonial-block */}
            <div className="col-lg-8 col-md-12 col-sm-12">
              <div className="row">
                {clients.map((client, index) => (
                  <div
                    key={index}
                    className={`testimonial-block-three col-lg-6 col-md-6 col-sm-12`}
                  >
                    <div className={`inner-box ${client.styleClass}`}>
                      <div className="content-box">
                        <ul className="rating">
                          <li>
                            <i className={`fa ${client.icon}`}/>
                          </li>
                        </ul>
                        <span>{client.title}</span>
                        <small>{client.description}</small>

                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
