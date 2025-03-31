import About from "@/components/homes/home-6/About";
import React from "react";
import Header6 from "@/components/headers/Header6";
import Features from "@/components/homes/home-6/Features";
import Footer3 from "@/components/footers/Footer3";
import "../../../public/css/pages/home/Home.css"
import Link from "next/link";

export default function AboutPage() {
  return (
    <>
        <Header6 />
        <section className="contact-us-section layout-radius">
            <div className="boxcar-container">
                    <ul className="breadcrumb">
                        <li>
                            <Link href={`/`}>Главная</Link>
                        </li>
                        <li>
                            <span>О нас</span>
                        </li>
                    </ul>
                <div className="row">
                    <div className="col-lg-6 col-md-6 col-sm-12">
                        <div className="boxcar-title">
                            <h2>О нас</h2>
                            <div className="text">
                                Мы ценим наших клиентов и хотим, чтобы у них остались приятные впечатления
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-6 col-md-6 col-sm-12">
                        <div className="content-box">
                            <div className="text">
                                Мы — команда, увлеченная инновациями и экологией, и мы рады предложить вам современное и
                                удобное решение для передвижения по городу — аренду электробайков.
                            </div>
                            <div className="text">
                                Наша миссия — сделать передвижение простым, экологичным и доступным для каждого.
                            </div>
                        </div>
                    </div>
                </div>
                    <About/>
                    <Features/>
            </div>
        </section>
        <Footer3 parenttClass="boxcar-footer footer-style-five v6"/>
    </>
  );
}
