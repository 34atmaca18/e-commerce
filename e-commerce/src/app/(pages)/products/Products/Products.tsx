'use client'
import React,{useEffect,useState} from 'react'
import styles from './index.module.scss'
import { fetchElectronicProducts,fetchFoodProducts,addProductToCart,addLiketoDb,fetchLikedListFromDb,removeLikefromDb } from '@/lib/db'
import { Productstype,User,cardProducts } from '@/lib/types'
import Image from 'next/image'
import { useAuth } from '@/context/AuthContext'

const Products = () => {
  const [electronicproducts, setElectronicProducts] = useState<Productstype[]>([]);
  const [foodproducts, setFoodProducts] = useState<Productstype[]>([]);
  const [likedList, setLikedList] = useState<Productstype[]>([])
  const {currentUser,isLoggedIn} = useAuth()

  const fetchProducts = async () => {
    try {
      const electronicData = await fetchElectronicProducts();
      const foodData = await fetchFoodProducts();
      const electronicProductsWithCategory = electronicData.map(product => ({
        ...product,
        category: 'electronicproducts' as const
      }));

      const foodProductsWithCategory = foodData.map(product => ({
        ...product,
        category: 'foodproducts' as const
      }));

      setElectronicProducts(electronicProductsWithCategory);
      setFoodProducts(foodProductsWithCategory);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };
  
  const handleAddToCart = async(currentUser:User,product:Productstype) => {
    try {
      await addProductToCart(currentUser,product);
      await fetchLikedList(currentUser);
    } catch (error:any) {
      console.error('failed while adding to cart',error.message)
    }
  }

  const fetchLikedList = async(user:User) => {
    try {
      const likedList = await fetchLikedListFromDb(user);
      setLikedList(likedList);

    } catch (error) {
      console.error('failed while fetching..',error)
    }
  }

  useEffect(() => {
    fetchProducts();
    if(currentUser){
      fetchLikedList(currentUser);
    }
  }, [currentUser])

  const handleAddLike = async(user:User,product:Productstype) => {
    try {
      await addLiketoDb(user,product);
      if(currentUser){
        fetchLikedList(currentUser);
      }
    } catch (error:any) {
      console.error('Error..',error.message)
    }
  }

  const handleRemoveLike = async (user: User, product: Productstype) => {
    try {
      await removeLikefromDb(user, product);
      if (currentUser) {
        fetchLikedList(currentUser);
      }
    } catch (error: any) {
      console.error('Error removing like:', error.message);
    }
  };

  return (
    <div className={styles.productsContainer}>
      <h2 className={styles.productsTitle}>All Products</h2>
      <div className={styles.electronicContainer}>
        <h2 className={styles.electronicTitle}>Electronic Devices</h2>
        <ul className={styles.electronicProductsContainer}>
          {electronicproducts.map((product) => {
            const isLiked = likedList.some(item => item.name === product.name);

            return (
              <li key={product.id} className={styles.electronicProducts}>
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
                  <Image 
                    className={styles.productsImages} 
                    src={product.image}
                    alt={product.name}
                    width={200}
                    height={200}
                    priority
                  />
                </div>
                <h2 className={styles.productTitle}>{product.name}</h2>
                <p className={styles.productInfo}>{product.info}</p>
                <div className={styles.bottomContainer}>
                  <p>{product.price}$</p>
                  <button 
                    onClick={() => {
                      if (currentUser) {
                        handleAddToCart(currentUser, product);
                      } else {
                        console.error('User is not logged in');
                      }
                    }}
                  >
                    Add to Cart
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
      <div className={styles.foodContainer}>
        <h2 className={styles.foodTitle}>Foods</h2>
        <ul className={styles.foodProductsContainer}>
        {foodproducts.map((product) => {
            const isLiked = likedList.some(item => item.name === product.name);
            
            return (
              <li key={product.id} className={styles.electronicProducts}>
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
                  <Image 
                    className={styles.productsImages} 
                    src={product.image}
                    alt={product.name}
                    width={200}
                    height={200}
                    priority
                  />
                </div>
                <h2 className={styles.productTitle}>{product.name}</h2>
                <p className={styles.productInfo}>{product.info}</p>
                <div className={styles.bottomContainer}>
                  <p>{product.price}$</p>
                  <button 
                    onClick={() => {
                      if (currentUser) {
                        handleAddToCart(currentUser, product);
                      } else {
                        console.error('User is not logged in');
                      }
                    }}
                  >
                    Add to Cart
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  )
}

export default Products