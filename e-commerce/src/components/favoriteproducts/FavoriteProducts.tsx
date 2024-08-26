'use client'
import React,{useState,useEffect} from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import styles from './index.module.scss';
import '../../app/globals.css'
import Image from 'next/image'
import { Productstype } from '@/lib/types'
import { useAuth } from '@/context/AuthContext';
import { useProduct } from '@/context/ProductContext';
import { Loader } from '@mantine/core';
import Link from 'next/link';

const FavoriteProducts: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [products, setProducts] = useState<Productstype[]>([])
  const {currentUser,isLoggedIn} = useAuth()
  const {likedList,handleAddToCartWithState,handleRemoveLike,handleAddLike,
    productStates,electronicproducts,fetchUpdate} = useProduct()


  useEffect(() => {
    if (currentUser) {
      fetchUpdate(currentUser)
    }    
  }, [currentUser])

  useEffect(() => {
      if (electronicproducts.length > 0) {
        setProducts(electronicproducts.slice(0, 4));
        setLoading(false);
      }
    }, [electronicproducts]);
  
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
          {products.map((product,index) => {
            const isLiked = likedList.some(item => item.name === product.name);
            const productState = productStates[product.id] || { loading: false, added: false };
            
            return (
            <li 
            key={index}
            className={styles.products}>
              {isLoggedIn && (
                  <button 
                    onClick={() => {
                      if (currentUser) {
                        if (isLiked) {
                          handleRemoveLike(currentUser, product); 
                        } else {
                          handleAddLike(currentUser, product);
                        }
                      }
                    }}
                    className={styles.likeButton}
                  >
                    {isLiked ? 'Remove Like' : 'Add Like'}
                  </button>
                )}
              <div className={styles.imageContainer}>
                <Link className={styles.imageLink} href={`/products/electronic/${product.id}`}></Link>
                <Image 
                className={styles.productsImages}
                alt={product.name}
                width={200}
                height={200}
                src={product.image}/>
              </div>
              <Link className={styles.titleLink} href={`/products/electronic/${product.id}`}>
                 <h2 className={styles.productTitle}>{product.name}</h2>
              </Link>
              <p className={styles.productInfo}>{product.info}</p>
              <div className={styles.bottomContainer}>
                <p>{product.price.toFixed(2)}$</p>
                <button
                  className={`${productState.loading || productState.added ? styles.disabledButton : styles.pointerButton}`}
                  disabled={productState.loading || productState.added}
                  onClick={() => {
                    if (currentUser) {
                      handleAddToCartWithState(product.id, product,currentUser);
                    } else {
                      alert('Please log in first!')
                    }
                  }}
                >
                  {productState.loading ? <Loader size='sm' color='white' /> : productState.added ? 'Added to Cart' : 'Add to Cart'}
                </button>
              </div>
            </li>
          )})}
        </Slider>
      </ul>
    </div>
  );
};

export default FavoriteProducts;
