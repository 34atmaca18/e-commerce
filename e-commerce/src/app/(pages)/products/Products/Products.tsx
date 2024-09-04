'use client'
import React,{useEffect,useState} from 'react'
import styles from './index.module.scss'
import Image from 'next/image'
import { useAuth } from '@/context/AuthContext'
import { useProduct } from '@/context/ProductContext'
import {ProductLoader} from '@/app/const/const'
import { Loader } from '@mantine/core';
import Link from 'next/link';


const Products = () => {
  const [fetchLoading, setFetchLoading] = useState<boolean>(true)
  const {currentUser} = useAuth()
  const {electronicproducts,foodproducts,likedList,
    handleAddLike,handleRemoveLike,fetchUpdate,
    handleAddToCartWithState,productStates,handleAddtoLocalCart} = useProduct()
  
    useEffect(() => {
      if (currentUser) {
        fetchUpdate(currentUser)
      }
    }, [currentUser,fetchUpdate])
  
    useEffect(() => {
      if (electronicproducts.length === 0 || foodproducts.length === 0) {
        setFetchLoading(true);
      } else {
        setFetchLoading(false)
      }
    }, [electronicproducts, foodproducts])
  

  return (
    <div className={styles.productsContainer}>
      <h2 className={styles.productsTitle}>All Products</h2>
      <div className={styles.electronicContainer}>
        <h2 className={styles.electronicTitle}>Electronic Devices</h2>
        {fetchLoading ? (<ProductLoader />) : (
          <ul className={styles.electronicProductsContainer}>
          {electronicproducts.map((product) => {
            const isLiked = likedList.some(item => item.name === product.name);
            const productState = productStates[product.id] || { loading: false, added: false };

            return (
              <li key={product.id} className={styles.electronicProducts}>
                {currentUser && (
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
                    src={product.image}
                    alt={product.name}
                    width={200}
                    height={200}
                    priority
                  />
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
                          handleAddtoLocalCart(product.id,product);
                        }
                      }}
                    >
                      {productState.loading ? <Loader size='sm' color='white' /> : productState.added ? 'Added to Cart' : 'Add to Cart'}
                    </button>
                </div>
              </li>
            );
          })}
        </ul>
        )}
      </div>
      <div className={styles.foodContainer}>
        <h2 className={styles.foodTitle}>Foods</h2>
        {
          fetchLoading ? ( <ProductLoader /> ) : (
            <ul className={styles.foodProductsContainer}>
        {foodproducts.map((product) => {
            const isLiked = likedList.some(item => item.name === product.name);
            const productState = productStates[product.id] || { loading: false, added: false };
            
            return (
              <li key={product.id} className={styles.electronicProducts}>
                {currentUser && (
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
                <Link className={styles.imageLink} href={`/products/food/${product.id}`}></Link>
                  <Image 
                    className={styles.productsImages} 
                    src={product.image}
                    alt={product.name}
                    width={200}
                    height={200}
                    priority
                  />
                </div>
                <Link className={styles.titleLink} href={`/products/food/${product.id}`}>
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
                          handleAddtoLocalCart(product.id,product);
                        }
                      }}
                    >
                      {productState.loading ? <Loader size='sm' color='white'/> : productState.added ? 'Added to Cart' : 'Add to Cart'}
                    </button>
                </div>
              </li>
            );
          })}
        </ul>
          )
        }
      </div>
    </div>
  )
}

export default Products