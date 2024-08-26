'use client'
import React,{useEffect,useState} from 'react'
import styles from './index.module.scss'
import Image from 'next/image'
import { useAuth } from '@/context/AuthContext'
import { useProduct } from '@/context/ProductContext'
import { User,cardProducts } from '@/lib/types'
import { CardLoader } from '@/components/skeletons/Skeletons'
import { fetchCardProducts,decreaseProductQuantity,increaseProductQuantity,
    deleteProductsFromCard,deleteSelectedProductsFromCard } from '@/lib/db'

const Card = () => {
    const [shoppingCardProducts, setCardProducts] = useState<cardProducts[]>([])
    const [totalPrice, setTotalPrice] = useState<number>(0)
    const {currentUser} = useAuth()
    const {localCartItems,clearLocalCart,
        increaseLocalProductQuantity,
        decreaseLocalProductQuantity,removeProductFromLocalCart} = useProduct()
    const [coupon, setCoupon] = useState<string>('');
    const [discount, setDiscount] = useState<number>(0);
    const [couponUsed, setCouponUsed] = useState(false);
    const [fetchLoading, setfetchLoading] = useState<boolean>(true)

    const handleApplyCoupon = (e: React.FormEvent) => {
        e.preventDefault();

        if(!currentUser) {
            alert('Please login to use coupon!')
        }
        else {
            if (shoppingCardProducts.length === 0) {
                alert('Add products to cart first!');
                return;
              }
              
            if (couponUsed) {
              alert('You already used discount code!');
              return;
            }
        
            if (coupon === 'DX20') {
              setDiscount(0.20);
              setCouponUsed(true); 
              alert('Discount applied!');
            } else {
              setDiscount(0); 
              alert('Invalid coupon code');
            }
        }
      };

      const fetchProductstoCard = async (user?: User) => {
        try {
          setfetchLoading(true);  
          if(user){
            const fetchedCardProducts = await fetchCardProducts(user);
            setCardProducts(fetchedCardProducts);
            setfetchLoading(false)
          }
          else {
            setCardProducts(localCartItems)
            setfetchLoading(false)
          }
        } catch (error) {
          console.error('Failed to fetch card products:', error);
        } 
      };

    useEffect(() => {
        if (currentUser) {
          fetchProductstoCard(currentUser);
        }
        else {
            fetchProductstoCard();
        }
      }, [currentUser,localCartItems]);
    
      const fetchTotalPricetoCard = () => {
        const total = shoppingCardProducts.reduce((acc, product) => {
          return acc + (product.price * (product.quantity || 1));
        }, 0);
      
        const discountedTotal = total - (total * discount); 
        setTotalPrice(discountedTotal);
      };
      
      useEffect(() => {
        fetchTotalPricetoCard();
      }, [shoppingCardProducts, discount]); 

      const handleDecreaseQuantity = async(product:cardProducts,user?:User) => {
        try {
            if(user) {
                await decreaseProductQuantity(user,product)
                await fetchProductstoCard(user);
            }
            else {
                decreaseLocalProductQuantity(product.id)
                await fetchProductstoCard();
            }
        } catch (error) {
            console.error('Error while decreasing..',error)
        }
      }
        
      const handleIncreaseQuantity = async(product:cardProducts,user?:User) => {
        try {
            if(user) {
                await increaseProductQuantity(user,product)
                await fetchProductstoCard(user);
            }
            else {
                increaseLocalProductQuantity(product.id)
                await fetchProductstoCard()
            }
        } catch (error) {
            console.error('Error while increasing..',error)
        }
      }

      const handleDeleteAllProducts = async(user?:User) => {
        try {
            if(user) {
                await deleteProductsFromCard(user);
            }
            else {
                clearLocalCart();
            }
            await fetchProductstoCard(user);
        } catch (error) {
            console.error('error while deleting products',error)
        }
      }

      const handleDeleteSelectedProducts = async(product:cardProducts,user?:User) => {
        try {
            if(user){
                await deleteSelectedProductsFromCard(user,product)
                await fetchProductstoCard(user);
            }else {
                removeProductFromLocalCart(product.id);
                await fetchProductstoCard();
            }
        } catch (error) {
            console.error('error while deleting products',error)
        }
      }
        
    return (
        <div className={styles.cardContainer}>
            <div className={styles.innerContainer}>
                <div className={styles.innerLeft}>
                    <div 
                    onClick={() => {
                        if(currentUser){
                            handleDeleteAllProducts(currentUser)
                        }
                        else{
                            handleDeleteAllProducts();
                        }
                    }}
                    className={styles.emptyCardContainer}>
                        <span>Empty the Card</span>
                        <Image 
                        src={'/icons/trash.svg'}
                        alt='trash'
                        width={18}
                        height={18}/>
                    </div>
                    {fetchLoading ? <CardLoader /> : shoppingCardProducts.length === 0 ? <div className={styles.emptyCart}>Your Cart is Empty..</div> :
                        <ul className={styles.productsList}>
                            {shoppingCardProducts.map((product, index) =>
                            (
                            <li 
                            key={index}
                            className={styles.products}>
                                <div className={styles.deleteContainer}>
                                    <Image 
                                    onClick={
                                        () => {
                                            if(currentUser){
                                                handleDeleteSelectedProducts(product,currentUser);
                                            }
                                            else{
                                                handleDeleteSelectedProducts(product);
                                            }
                                        }
                                    }
                                    className={styles.deleteIcon}
                                    src={'/icons/close.svg'}
                                    alt='close'
                                    width={17}
                                    height={17}/>
                                </div>
                                <Image 
                                className={styles.productImage}
                                alt={product.name}
                                src={product.image}
                                width={100}
                                height={100}/>
                                <div className={styles.productInfo}>
                                    <div className={styles.productTitles}>
                                        <h2>{product.name}</h2>
                                        <p>{product.info}</p>
                                    </div>
                                    <p className={styles.productPrice}>{product.price}$</p>
                                </div>
                                <div className={styles.counterContainer}>
                                    <div className={styles.counter}>
                                        <Image 
                                        onClick={() => {
                                            if(currentUser){
                                                handleDecreaseQuantity(product,currentUser)
                                            }
                                            else{
                                                handleDecreaseQuantity(product)
                                            }
                                        }}
                                        className={styles.counterImages}
                                        src={'/icons/trash.svg'} 
                                        alt='xx'
                                        width={13}
                                        height={13}/>
                                        <span className={styles.count}>{product.quantity}</span>
                                        <Image 
                                        onClick={() => {
                                            if(currentUser){
                                                handleIncreaseQuantity(product,currentUser)
                                            }
                                            else{
                                                handleIncreaseQuantity(product)
                                            }
                                        }}
                                        className={styles.counterImages}
                                        src={'/icons/plus.svg'} 
                                        alt='xx' 
                                        width={13}
                                        height={13}/>
                                    </div>
                                </div>
                            </li>
                        ))}
                            </ul>
                        }
                </div>
                <div className={styles.innerRight}>
                    <div className={styles.rightTop}>
                        <h2 className={styles.shoppingTitle}>Shopping Card</h2>
                        <h2 className={styles.shoppingTotalTitle}>Total</h2>
                        <p>{totalPrice.toFixed(2)}$</p>
                    </div>
                    <div className={styles.formContainer}>
                        <form className={styles.formShopping}>
                            <div className={styles.couponContainer}>
                                <h2 className={styles.couponTitle}>Coupon</h2>
                                <div className={styles.inputContainer}>
                                    <input 
                                        type="text" 
                                        placeholder="Your coupon.." 
                                        value={coupon}
                                        onChange={(e) => setCoupon(e.target.value)}
                                    />
                                    <button onClick={(e) => handleApplyCoupon(e)}>APPLY</button>
                                </div>
                            </div>
                            <div className={styles.completeContainer}>
                                <p>{totalPrice.toFixed(2)}$</p>
                                <button>COMPLETE SHOPPING</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
    }

export default Card

