'use client'
import React,{useEffect,useState} from 'react'
import styles from './index.module.scss'
import { useAuth } from '@/context/AuthContext'
import { useProduct } from '@/context/ProductContext'
import Image from 'next/image'
import { ProductLoader } from '@/app/const/const'
import { Loader } from '@mantine/core'
import Link from 'next/link'

const LikedProducts = () => {
  const [fetchLoading, setfetchLoading] = useState<boolean>(true)
  const {currentUser} = useAuth()
  const {likedList,handleAddLike,handleRemoveLike,
    fetchUpdate,handleAddToCartWithState,productStates} = useProduct()

  useEffect(() => {
    if(currentUser){
      fetchUpdate(currentUser).then(() => {
        setfetchLoading(false);
      });
    }
  }, [currentUser,fetchUpdate])

  return (
      <div className={styles.wrapper}>
        <div className={styles.likedListContainer}>
        <h2 className={styles.likedTitle}>Your Favorites</h2>
        {fetchLoading ? (<ProductLoader />) : (
          likedList.length === 0 ? (<div>Add your favorite products here!</div>) : 
          <ul className={styles.likedProductsContainer}>
          {likedList.map((product) => {
            const isLiked = likedList.some(item => item.name === product.name);
            const productState = productStates[product.id] || { loading: false, added: false };

            return (
              <li key={product.id} className={styles.likedProducts}>
                {
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
                }
                <div className={styles.imageContainer}>
                <Link className={styles.imageLink} href={`/products/${product.category}/${product.id}`}></Link>
                  <Image 
                    className={styles.productsImages} 
                    src={product.image}
                    alt={product.name}
                    width={200}
                    height={200}
                    priority
                  />
                </div>
                <Link className={styles.titleLink} href={`/products/${product.category}/${product.id}`}>
                  <h2 className={styles.productTitle}>{product.name}</h2>
                </Link>
                <p className={styles.productInfo}>{product.info}</p>
                <div className={styles.bottomContainer}>
                  <p>{product.price}$</p>
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
            );
          })}
          </ul>
        )}
        </div>
      </div>
  )
}

export default LikedProducts