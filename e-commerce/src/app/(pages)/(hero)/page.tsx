import React from 'react'
import {Navbar,ProductSearch,Footer,footerLinks,FavoriteProducts,HeroSlogan} from '../../const/const'
import styles from './index.module.scss'
import { Suspense } from 'react'

const Home = () => {
  return (
    <div className={styles.heroContainer}>
      <Navbar/>
      <ProductSearch />
      <HeroSlogan />
      <FavoriteProducts />
      <Footer footerLinks={footerLinks}/>
    </div>
  )
}

export default Home