import React from 'react'
import styles from './index.module.scss'

const HeroSlogan = () => {
  return (
    <div className={styles.sloganContainer}>
      <h2 className={styles.sloganTitle}>
        Elevate Your Shopping Experience
      </h2>
      <p className={styles.sloganParagraph}>
        Shop with ease and find quality products at your fingertips. Experience a better way to shop, all in one place.
      </p>
    </div>
  )
}

export default HeroSlogan