'use client'
import React,{useEffect} from 'react'
import styles from './index.module.scss'

const ElectronicProductLoader = () => {
  return (
    <ul className={styles.loaderContainer}>
      {[1,2,3,4,5].map((product,index) => (
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

export default ElectronicProductLoader