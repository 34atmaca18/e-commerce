import React from 'react'
import Link from 'next/link';
import styles from './index.module.scss'
import Image from 'next/image';

const Navbar = () => {
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
                <Link className={styles.navUser} href={'/login'}>
                    <Image 
                    src={'/icons/user.svg'} 
                    alt='arrowdown'
                    width={23}
                    height={23} />
                </Link>
                <Link className={styles.navCart} href={'/shoppingcard'}>
                    <Image 
                    src={'/icons/shopping-cart.svg'} 
                    alt='arrowdown'
                    width={23}
                    height={23} />
                </Link>
            </div>
        </nav>
    )
}

export default Navbar;