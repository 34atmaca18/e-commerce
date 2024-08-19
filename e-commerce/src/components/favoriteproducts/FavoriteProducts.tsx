'use client'
import React,{useState,useEffect} from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import styles from './index.module.scss';
import '../../app/globals.css'
import Image from 'next/image'
import { Productstype } from '@/lib/types'
import { fetchElectronicProducts } from '@/lib/db'

const FavoriteProducts: React.FC = () => {
  const [products, setProducts] = useState<Productstype[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productData = await fetchElectronicProducts();
        setProducts(productData.slice(0,4));
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) return <div>Loading...</div>;
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
          {products.map((product,index) => (
            <li 
            key={index}
            className={styles.products}>
              <div className={styles.imageContainer}>
                <Image 
                className={styles.productsImages}
                alt={product.name}
                width={200}
                height={200}
                src={product.image}/>
              </div>
              <h2 className={styles.productTitle}>{product.name}</h2>
              <p className={styles.productInfo}>{product.info}</p>
              <div className={styles.bottomContainer}>
                <p>{product.price}</p>
                <button>Add to Card</button>
              </div>
            </li>
          ))}
        </Slider>
      </ul>
    </div>
  );
};

export default FavoriteProducts;
