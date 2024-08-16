'use client'
import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import styles from './index.module.scss';
import '../../app/globals.css'

const FavoriteProducts: React.FC = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: true,
    responsive: [
      {
        breakpoint: 768, 
        settings: {
          slidesToShow: 3, 
        },
      },
      {
        breakpoint: 580, 
        settings: {
          slidesToShow: 2, 
        },
      }
    ],
  };

  return (
    <div className={styles.favoriteContainer}>
      <h2 className={styles.favoriteTitle}>Favorite Products</h2>
      <ul className={styles.sliderContainer}>
        <Slider className={styles.slider} {...settings}>
          <li className={styles.products}>
            <div className={styles.imageContainer}>
              <div className={styles.productsImages}></div>
            </div>
            <h2 className={styles.productTitle}>Sony PS4</h2>
            <p className={styles.productInfo}>Sony Playstation 4 Slim 500 GB Game Console</p>
            <div className={styles.bottomContainer}>
              <p>250$</p>
              <button>Add to Card</button>
            </div>
          </li>
          <li className={styles.products}>
            <div className={styles.imageContainer}>
              <div className={styles.productsImages}></div>
            </div>
            <h2 className={styles.productTitle}>Sony PS4</h2>
            <p className={styles.productInfo}>Sony Playstation 4 Slim 500 GB Game Console</p>
            <div className={styles.bottomContainer}>
              <p>250$</p>
              <button>Add to Card</button>
            </div>
          </li>
          <li className={styles.products}>
            <div className={styles.imageContainer}>
              <div className={styles.productsImages}></div>
            </div>
            <h2 className={styles.productTitle}>Sony PS4</h2>
            <p className={styles.productInfo}>Sony Playstation 4 Slim 500 GB Game Console</p>
            <div className={styles.bottomContainer}>
              <p>250$</p>
              <button>Add to Card</button>
            </div> 
          </li>
          <li className={styles.products}>
            <div className={styles.imageContainer}>
              <div className={styles.productsImages}></div>
            </div>
            <h2 className={styles.productTitle}>Sony PS4</h2>
            <p className={styles.productInfo}>Sony Playstation 4 Slim 500 GB Game Console</p>
            <div className={styles.bottomContainer}>
              <p>250$</p>
              <button>Add to Card</button>
            </div>
          </li>
        </Slider>
      </ul>
    </div>
  );
};

export default FavoriteProducts;
