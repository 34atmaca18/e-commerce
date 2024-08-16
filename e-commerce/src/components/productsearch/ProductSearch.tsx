import React from 'react'
import styles from './index.module.scss'
import Image from 'next/image'

const ProductSearch = () => {
  return (
    <div className={styles.searchContainer}>
        <div className={styles.innerContainer}>
            <div className={styles.innerLeft}>
                <h2 className={styles.innerTitle}><span>Creating Smiles</span> with<br />Every Adorable Baby<br />Step Forward</h2>
                <form>
                    <div className={styles.inputContainer}>
                        <Image 
                        className={styles.searchImg}
                        src={'/icons/search.svg'}
                        alt='searchproducts'
                        width={20}
                        height={20}/>
                        <input 
                        className={styles.searchInput}
                        type="text"
                        placeholder='Search products..'/>
                        <button
                        className={styles.searchButton}
                        type='submit'>
                            Search
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
  )
}

export default ProductSearch