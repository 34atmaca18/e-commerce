'use client'

import React,{useEffect,useState} from 'react'
import styles from './index.module.scss'
import { fetchElectronicProducts,fetchFoodProducts } from '@/lib/db'
import { Productstype } from '@/lib/types'
import AddProduct from '@/components/modals/AddProduct'
import Image from 'next/image'


const AdminCrud = () => {
  const [electronicproducts, setElectronicProducts] = useState<Productstype[]>([]);
  const [foodproducts, setFoodProducts] = useState<Productstype[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productelectronicData = await fetchElectronicProducts();
        const productfoodData = await fetchFoodProducts();
        setElectronicProducts(productelectronicData);
        setFoodProducts(productfoodData)
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleAddProductClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
    <div className={styles.adminContainer}>
        <div className={styles.titleContainer}>
            <h2>Admin Panel</h2>
        </div>
        <div className={styles.managementContainer}>
            <h2>Product Management</h2>
        </div>
        <button 
        onClick={() => handleAddProductClick()}
        className={styles.addProductButton}>
          Add New Product <span>+</span>
        </button>
        <div className={styles.electronicContainer}>
        <h2 className={styles.electronicTitle}>Electronic Devices</h2>
        <ul className={styles.electronicProductsContainer}>
        {electronicproducts.map((product) => (
          <li key={product.id} className={styles.electronicProducts}>
            <div className={styles.imageContainer}>
              <Image 
              className={styles.productsImages} 
              src={product.image}
              alt={product.name}
              width={200}
              height={200}
              />
            </div>
            <h2 className={styles.productTitle}>{product.name}</h2>
            <p className={styles.productInfo}>{product.info}</p>
            <div className={styles.bottomContainer}>
              <p>{product.price}$</p>
              <button>Update</button>
            </div>
          </li>
        ))}
        </ul>
      </div>
      <div className={styles.foodContainer}>
        <h2 className={styles.foodTitle}>Foods</h2>
        <ul className={styles.foodProductsContainer}>
        {foodproducts.map((product) => (
          <li key={product.id} className={styles.foodProducts}>
            <div className={styles.imageContainer}>
              <Image 
              className={styles.productsImages} 
              src={product.image}
              alt={product.name}
              width={200}
              height={200}
              />
            </div>
            <h2 className={styles.productTitle}>{product.name}</h2>
            <p className={styles.productInfo}>{product.info}</p>
            <div className={styles.bottomContainer}>
              <p>{product.price}$</p>
              <button>Update</button>
            </div>
          </li>
        ))}
        </ul>
      </div>
    </div>
    {isModalOpen && <AddProduct onClose={handleCloseModal} />}
    </>
  )
}

export default AdminCrud