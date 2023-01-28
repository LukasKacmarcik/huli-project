import React from "react";
//// Solution from https://bobbyhadz.com/blog/typescript-could-not-find-a-declaration-file-for-module-react
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import gal1 from "../../../images/gal1.jpg";
import gal2 from "../../../images/gal2.jpg";
import gal3 from "../../../images/gal3.jpg";
import gal4 from "../../../images/gal4.jpg";

import styles from "./Galery.module.scss";

const Galery: React.FC = () => {
  var settings = {
    dots: false,
    infinite: true,
    slidesToShow: 2,
    slidesToScroll: 1,
    autoplay: true,
    speed: 1200,
    autoplaySpeed: 3500,
    cssEase: "linear",
    responsive: [
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  const images = [gal1, gal2, gal3, gal4];
  const listOfImages = images.map((image, idx) => {
    return (
      <div key={idx} style={{}}>
        <img
          style={{ width: "95%", margin: "0 auto", borderRadius: "20px" }}
          src={image}
          alt="galery pic"
        ></img>
      </div>
    );
  });

  return (
    <div className={styles.galeryWrapper}>
      <h1>GALÉRIA</h1>
      <Slider {...settings}>{listOfImages}</Slider>
    </div>
  );
};

export default Galery;
