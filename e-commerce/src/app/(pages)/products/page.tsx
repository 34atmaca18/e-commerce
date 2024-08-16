import React from 'react'
import {Navbar,Products} from '../../const/const'
import styles from './index.module.scss'

const ProductPage = () => {
  return (
    <div className={styles.productContainer}>
      <Navbar />
      <Products />
    </div>
  )
}

export default ProductPage