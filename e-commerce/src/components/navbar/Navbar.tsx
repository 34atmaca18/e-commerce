'use client'
import React,{useEffect, useState,useCallback} from 'react'
import Link from 'next/link';
import styles from './index.module.scss'
import Image from 'next/image';
import { useAuth } from '@/context/AuthContext';
import { useProduct } from '@/context/ProductContext';
import { fetchCartProductsCount } from '@/lib/db';
import { UserwithoutPassword } from '@/lib/types';

const Navbar = () => {
    const {currentUser} = useAuth()
    const {localCartItems,userCartItems} = useProduct();
    const [cartCounter, setcartCounter] = useState<number>(0)

    const fetchCartCounter = useCallback(async (user: UserwithoutPassword) => {
        try {
            const counter = await fetchCartProductsCount(user);
            setcartCounter(counter);
        } catch (error) {
            console.error('Error fetching cart counter:', error);
        }
    }, []);

    useEffect(() => {
        if (currentUser) {
            fetchCartCounter(currentUser);
        }
        else{
            const localCounter = localCartItems.length
            setcartCounter(localCounter);
          }
    }, [currentUser, fetchCartCounter,localCartItems,userCartItems]);
    

    return (
        <nav className={styles.navContainer}>
            <Link className={styles.navLeft} href={"/"}>
                <h1 className={styles.navTitle}>flemman.</h1>
            </Link>
            <div className={styles.navRight}>
                <div className={styles.navProducts}>
                    <span>Products</span>
                    <Image 
                    className={styles.arrowdown}
                    src={'/icons/arrow-down.svg'} 
                    alt='arrowdown'
                    width={13}
                    height={13} />
                    <div className={styles.productsGenres}>
                        <Link href={'/products'} className={styles.productGenre}>Electronics</Link>
                        <Link href={'/products'} className={styles.productGenre}>Homestuffs</Link>
                    </div>
                </div>
                {
                    currentUser ? (<Link className={styles.navUser} href={'/profile'}>
                                    <Image 
                                    src={'/icons/user.svg'} 
                                    alt='arrowdown'
                                    width={23}
                                    height={23} />
                                </Link>) :                
                    (
                        <Link className={styles.navUser} href={'/login'}>
                            <Image 
                            src={'/icons/user.svg'} 
                            alt='arrowdown'
                            width={23}
                            height={23} />
                        </Link>
                    )
                }
                <Link className={styles.navCart} href={'/shoppingcard'}>
                    <div className={styles.cartImageContainer}>
                        <Image 
                        src={'/icons/shopping-cart.svg'} 
                        alt='arrowdown'
                        width={23}
                        height={23} />
                        <span className={styles.productsCounter}>{cartCounter}</span>
                    </div>
                </Link>
                {currentUser?.isAdmin && <Link className={styles.adminControl} href={'/adminpanel'}>Admin Dashboard</Link>
            }
            </div>
        </nav>
    )
}

export default Navbar;