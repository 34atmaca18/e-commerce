'use client'
import { useSearchParams } from 'next/navigation';
import { useProduct } from '@/context/ProductContext';
import { useAuth } from '@/context/AuthContext';
import { Productstype } from '@/lib/types';
import styles from './index.module.scss'; 
import Link from 'next/link';
import Image from 'next/image';
import { Loader } from '@mantine/core';
import Navbar from '@/components/navbar/Navbar';

const filterProducts = (query: string, products: Productstype[]) => {
    return products.filter(product =>
        product.name.toLowerCase().includes(query.toLowerCase())
    );
}

const formatCategory = (category: string) => {
    return category.replace(/products$/i, '');
}

export default function SearchResults() {
    const searchParams = useSearchParams();
    const query = searchParams.get('query') || '';
    const { electronicproducts, foodproducts,likedList,
        productStates,handleAddLike,handleRemoveLike,handleAddToCartWithState } = useProduct();
    const {currentUser,isLoggedIn} = useAuth()
    const filteredElectronics = filterProducts(query, electronicproducts);
    const filteredFood = filterProducts(query, foodproducts);
    const allProducts = [...filteredElectronics, ...filteredFood];
    const hasResults = allProducts.length > 0;

    return (
        <div className={styles.searchContainer}>
            <Navbar />
            <div className={styles.productsContainer}>
                <h2 className={styles.searchTitle}>Products for your search '{query}':</h2>
                <div>
                    {hasResults ? (
                        <ul className={styles.productsInnerContainer}>
                            {allProducts.map(product => {
                                const isLiked = likedList.some(item => item.name === product.name);
                                const productState = productStates[product.id] || { loading: false, added: false };
                                return (
                                    <li key={product.id} className={styles.allProducts}>
                                        {isLoggedIn && (
                                            <button
                                                onClick={() => {
                                                    if (currentUser) {
                                                        if (isLiked) {
                                                            handleRemoveLike(currentUser, product);
                                                        } else {
                                                            handleAddLike(currentUser, product);
                                                        }
                                                    }
                                                }}
                                                className={styles.likeButton}
                                            >
                                                {isLiked ? 'Remove Like' : 'Add Like'}
                                            </button>
                                        )}
                                        <div className={styles.imageContainer}>
                                            <Link className={styles.imageLink} href={`/products/${formatCategory(product.category)}/${product.id}`}>
                                                <Image
                                                    className={styles.productsImages}
                                                    src={product.image}
                                                    alt={product.name}
                                                    width={200}
                                                    height={200}
                                                    priority
                                                />
                                            </Link>
                                        </div>
                                        <Link className={styles.titleLink} href={`/products/${formatCategory(product.category)}/${product.id}`}>
                                            <h2 className={styles.productTitle}>{product.name}</h2>
                                        </Link>
                                        <p className={styles.productInfo}>{product.info}</p>
                                        <div className={styles.bottomContainer}>
                                            <p>{product.price.toFixed(2)}$</p>
                                            <button
                                                className={`${productState.loading || productState.added ? styles.disabledButton : styles.pointerButton}`}
                                                disabled={productState.loading || productState.added}
                                                onClick={() => {
                                                    if (currentUser) {
                                                        handleAddToCartWithState(product.id, product, currentUser);
                                                    } else {
                                                        alert('Please log in first!')
                                                    }
                                                }}
                                            >
                                                {productState.loading ? <Loader size='sm' color='white' /> : productState.added ? 'Added to Cart' : 'Add to Cart'}
                                            </button>
                                        </div>
                                    </li>
                                )
                            })}
                        </ul>
                    ) : (
                        <p>No products found.</p>
                    )}
                </div>
            </div>
        </div>
    );
}
