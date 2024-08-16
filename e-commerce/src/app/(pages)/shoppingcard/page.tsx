import React from 'react'
import styles from './index.module.scss'
import {Card,Navbar} from '../../const/const'

const ShoppingCard = () => {
  return (
    <div className={styles.shoppingContainer}>
      <Navbar />
      <Card />
    </div>
  )
}

export default ShoppingCard