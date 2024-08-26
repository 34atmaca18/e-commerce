'use client'

import { useProduct } from '@/context/ProductContext';
import Image from 'next/image';
import styles from './index.module.scss';
import Navbar from '@/components/navbar/Navbar';
import { useAuth } from '@/context/AuthContext';
import { Loader } from '@mantine/core';

const ProductDetail = ({ params }: { params: { category: string, id: number } }) => {
  const { category, id } = params;
  const { electronicproducts, foodproducts,productStates,handleAddToCartWithState } = useProduct();
  const { currentUser } = useAuth()

  let product;

  if (category === 'electronic') {
    product = electronicproducts.find(p => p.id === Number(id));
  } else if (category === 'food') {
    product = foodproducts.find(p => p.id === Number(id));
  }

  if (!product) {
    return <p>Product not found</p>;
  }

  const productState = productStates[product.id] || { loading: false, added: false };


  return (
    <div className={styles.productDetailsContainer}>
        <Navbar />
        <div className={styles.productDetailsInner}>
            <div className={styles.productImageContainer}>
              <Image 
              className={styles.productImage}
              src={product.image} 
              alt={product.name} 
              width={400} height={400} />
            </div>
            <div className={styles.productInfoContainer}>
              <div className={styles.productTop}>
                <h2 className={styles.productTitle}>{product.name}</h2>
                <p className={styles.productInfo}>{product.info}</p>
              </div>
              <div className={styles.productBottom}>
                <p>{product.price.toFixed(2)}$</p>
                <button
                      className={`${productState.loading || productState.added ? styles.disabledButton : styles.pointerButton}`}
                      disabled={productState.loading || productState.added}
                      onClick={() => {
                        if (currentUser) {
                          handleAddToCartWithState(product.id, product,currentUser);
                        } else {
                          alert('Please log in first!')
                        }
                      }}
                    >
                      {productState.loading ? <Loader size='sm' color='white' /> : productState.added ? 'Added to Cart' : 'Add to Cart'}
                </button>
              </div>
            </div>
        </div>
    </div>
  );
};

export default ProductDetail;
