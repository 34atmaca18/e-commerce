'use client'
import React from 'react'
import styles from './index.module.scss'

export const ProductLoader = () => {
  return (
    <ul className={styles.loaderContainer}>
      {[1,2,3,4,5].map((p,index) => (
        <li key={index} className={styles.loaderInner}>
          <div className={styles.imageContainer}>
            <div className={styles.imageLoader}></div>
          </div>
          <div className={styles.titleLoader}></div>
          <div className={styles.infoLoaders}>
              <div className={styles.infoLoader1}></div>
              <div className={styles.infoLoader2}></div>
          </div>
          <div className={styles.bottomLoaders}>
              <div className={styles.priceLoader}></div>
              <div className={styles.buttonLoader}></div>
          </div>
        </li>
      ))}
    </ul>
  )
}

export const CardLoader = () => {
    return (
        <ul className={styles.productsListLoader}>
        {[1,2,3].map((p,index) => (
            <li 
            key={index}
            className={styles.productsLoader}>
                <div className={styles.imageLoader}></div>
                <div className={styles.productInfoLoader}>
                    <div className={styles.productTitlesLoader}>
                        <div className={styles.productTitleLoader}></div>
                        <div className={styles.productInfoLoader1}></div>
                        <div className={styles.productInfoLoader2}></div>
                    </div>
                    <div className={styles.productPriceLoader}></div>
                </div>
                <div className={styles.counterLoader}>
                </div>
            </li>
        ))}
    </ul>
    )
}

export const UserInfoLoader = () => {
    return (
        <div className={styles.userLoadingContainer}>
            <div className={styles.profileLoadingTitleContainer}>
                <h2 className={styles.profileLoadingTitle}></h2>
            </div>
            <div className={styles.userLoadinginfoContainer}>
                <div className={styles.nameLoadingContainer}>
                    <span></span>
                    <p></p>
                </div>
                <div className={styles.emailLoadingContainer}>
                    <span></span>
                    <p></p>
                </div>
                <div className={styles.countryLoadingContainer}>
                    <span></span>
                    <p></p>
                </div>
            </div>
                <div className={styles.buttonLoadingContainer}>
                <div className={styles.logoutLoadingButton}> </div>
            </div>
        </div>
    )
}