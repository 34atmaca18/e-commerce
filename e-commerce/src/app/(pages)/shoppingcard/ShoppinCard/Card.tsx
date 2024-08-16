import React from 'react'
import styles from './index.module.scss'
import Image from 'next/image'

const Card = () => {
  return (
    <div className={styles.cardContainer}>
        <div className={styles.innerContainer}>
            <div className={styles.innerLeft}>
                <div className={styles.emptyCardContainer}>
                    <span>Empty the Card</span>
                    <Image 
                    src={'/icons/trash.svg'}
                    alt='trash'
                    width={18}
                    height={18}/>
                </div>
                <ul className={styles.productsList}>
                    <li className={styles.products}>
                        <div className={styles.deleteContainer}>
                            <Image 
                            className={styles.deleteIcon}
                            src={'/icons/close.svg'}
                            alt='close'
                            width={17}
                            height={17}/>
                        </div>
                        <div className={styles.productImage}></div>
                        <div className={styles.productInfo}>
                            <div className={styles.productTitles}>
                                <h2>Sony Playstation 4</h2>
                                <p>PS4 Slim 1TB Game Console with 2 Dualshocks</p>
                            </div>
                            <p className={styles.productPrice}>250$</p>
                        </div>
                        <div className={styles.counterContainer}>
                            <div className={styles.counter}>
                                <Image 
                                className={styles.counterImages}
                                src={'/icons/trash.svg'} 
                                alt='xx'
                                width={13}
                                height={13}/>
                                <span className={styles.count}>1</span>
                                <Image 
                                className={styles.counterImages}
                                src={'/icons/plus.svg'} 
                                alt='xx' 
                                width={13}
                                height={13}/>
                            </div>
                        </div>
                    </li>
                    <li className={styles.products}>
                        <div className={styles.deleteContainer}>
                            <Image 
                            className={styles.deleteIcon}
                            src={'/icons/close.svg'}
                            alt='close'
                            width={17}
                            height={17}/>
                        </div>
                        <div className={styles.productImage}></div>
                        <div className={styles.productInfo}>
                            <div className={styles.productTitles}>
                                <h2>Sony Playstation 4</h2>
                                <p>PS4 Slim 1TB Game Console with 2 Dualshocks</p>
                            </div>
                            <p className={styles.productPrice}>250$</p>
                        </div>
                        <div className={styles.counterContainer}>
                            <div className={styles.counter}>
                                <Image 
                                className={styles.counterImages}
                                src={'/icons/trash.svg'} 
                                alt='xx'
                                width={13}
                                height={13}/>
                                <span className={styles.count}>1</span>
                                <Image 
                                className={styles.counterImages}
                                src={'/icons/plus.svg'} 
                                alt='xx' 
                                width={13}
                                height={13}/>
                            </div>
                        </div>
                    </li>
                    <li className={styles.products}>
                        <div className={styles.deleteContainer}>
                            <Image 
                            className={styles.deleteIcon}
                            src={'/icons/close.svg'}
                            alt='close'
                            width={17}
                            height={17}/>
                        </div>
                        <div className={styles.productImage}></div>
                        <div className={styles.productInfo}>
                            <div className={styles.productTitles}>
                                <h2>Sony Playstation 4</h2>
                                <p>PS4 Slim 1TB Game Console with 2 Dualshocks</p>
                            </div>
                            <p className={styles.productPrice}>250$</p>
                        </div>
                        <div className={styles.counterContainer}>
                            <div className={styles.counter}>
                                <Image 
                                className={styles.counterImages}
                                src={'/icons/trash.svg'} 
                                alt='xx'
                                width={13}
                                height={13}/>
                                <span className={styles.count}>1</span>
                                <Image 
                                className={styles.counterImages}
                                src={'/icons/plus.svg'} 
                                alt='xx' 
                                width={13}
                                height={13}/>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
            <div className={styles.innerRight}>
                <div className={styles.rightTop}>
                    <h2 className={styles.shoppingTitle}>Shopping Card</h2>
                    <h2 className={styles.shoppingTotalTitle}>Total</h2>
                    <p>1000.00$</p>
                </div>
                <div className={styles.formContainer}>
                    <form className={styles.formShopping}>
                        <div className={styles.couponContainer}>
                            <h2 className={styles.couponTitle}>Coupon</h2>
                            <div className={styles.inputContainer}>
                                <input type="text" placeholder='Your coupon..'/>                                
                                <button>APPLY</button>
                            </div>
                        </div>
                        <div className={styles.completeContainer}>
                            <p>1000$</p>
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