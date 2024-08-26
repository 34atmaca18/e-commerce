'use client'
import React from 'react'
import Link from 'next/link';
import styles from './index.module.scss'
import Image from 'next/image';
import { useAuth } from '@/context/AuthContext';
import { useProduct } from '@/context/ProductContext';

const Navbar = () => {
    const {isLoggedIn,isAdmin} = useAuth()

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
                    isLoggedIn ? (<Link className={styles.navUser} href={'/profile'}>
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
                        <span className={styles.productsCounter}>0</span>
                    </div>
                </Link>
                
                {
                    isAdmin && (
                        <Link className={styles.adminControl} href={'/adminpanel'}>Admin Dashboard</Link>
                    )
                }
            </div>
        </nav>
    )
}

export default Navbar;