import React, { useState } from "react";

import "./IntroContent.css";

import image1 from "../../../assets/receipe.jpg";
import image2 from "../../../assets/customer-experience.jpg";
import image3 from "../../../assets/service.jpg";
import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { BsFillHeartFill } from "react-icons/bs";

const IntroContent = () => {
    const [items, setItems] = useState([
        { id: 1, url: image1 },
        { id: 2, url: image2 },
        { id: 3, url: image3 },
    ]);

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 5000,
    };

    return (
        <div className="section">
            <div className="container">
                <div className="amazing-container">
                    <div className="amazing-carousal">
                        <div>
                            <Slider {...settings}>
                                {items.map((item) => (
                                    <div key={item.id}>
                                        <img
                                            src={item.url}
                                            alt="caurosal pic"
                                        />
                                    </div>
                                ))}
                            </Slider>
                        </div>
                    </div>

                    <div className="amazing-content">
                        <h2 className="heading-secondary">
                            <span>
                                <br /> Enjoy Good Service
                            </span>
                        </h2>

                        <blockquote>
                            Welcome to our restaurant! We take pride in offering
                            a unique dining experience that combines delicious
                            food, exceptional service, and a cozy atmosphere.
                            Our menu features a variety of dishes that are
                            prepared with fresh, locally-sourced ingredients to
                            ensure the highest quality and taste. From savory
                            appetizers to mouth-watering entrees, we have
                            something for everyone. Whether you're celebrating a
                            special occasion or just looking for a great meal,
                            our restaurant is the perfect place to relax,
                            unwind, and enjoy the company of family and friends.
                            So come on in and join us for an unforgettable
                            dining experience!
                        </blockquote>
                    </div>
                </div>

                <div className="amazing-card-container">
                    <div className="amazing-card amazing-card-left">
                        <img
                            src={image1}
                            alt="receipe"
                            className="amazing-card-image"
                        />

                        <div className="amazing-card-content">
                            <div className="amazing-card-title">
                                <BsFillHeartFill color="#800080" />
                                <h3 className="heading-tertiary">
                                    <span>Best Receipes</span>
                                </h3>
                            </div>

                            <p>
                                Our menu features a diverse selection of dishes
                                made with fresh, locally-sourced ingredients to
                                ensure the highest quality and taste.
                            </p>
                        </div>
                    </div>

                    <div className="amazing-card amazing-card-middle">
                        <img
                            src={image2}
                            alt="experience"
                            className="amazing-card-image"
                        />

                        <div className="amazing-card-content">
                            <div className="amazing-card-title">
                                <BsFillHeartFill color="#800080" />
                                <h3 className="heading-tertiary">
                                    <span>Unique Experience</span>
                                </h3>
                            </div>

                            <p>
                                We offer a unique dining experience that
                                combines exceptional service, a cozy atmosphere,
                                and a passion for great food.
                            </p>
                        </div>
                    </div>

                    <div className="amazing-card amazing-card-right">
                        <img
                            src={image3}
                            alt="service"
                            className="amazing-card-image"
                        />

                        <div className="amazing-card-content">
                            <div className="amazing-card-title">
                                <BsFillHeartFill color="#800080" />
                                <h3 className="heading-tertiary">
                                    <span>Excellent Service</span>
                                </h3>
                            </div>

                            <p>
                                Our friendly and knowledgeable staff are
                                dedicated to providing you with the best
                                possible dining experience and making you feel
                                right at home.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default IntroContent;
