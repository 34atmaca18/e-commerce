'use client'
import React,{useState} from 'react'
import { useRouter } from 'next/navigation'
import styles from './index.module.scss'
import Image from 'next/image'

const ProductSearch = () => {
    const [inputValue, setInputValue] = useState('');
    const router = useRouter();

    const handleSearch = (e:any) => {
        e.preventDefault();
        if (inputValue.trim()) {
            router.push(`/search?query=${inputValue}`);
        }
    };

    return (
        <div className={styles.searchContainer}>
            <div className={styles.innerContainer}>
                <div className={styles.innerLeft}>
                    <h2 className={styles.innerTitle}><span>Creating Smiles</span> with<br />Every Adorable Baby<br />Step Forward</h2>
                    <form onSubmit={handleSearch}>
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
                            placeholder="Search products.."
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            />
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