'use client'

import React,{useEffect,useState} from 'react'
import styles from './index.module.scss'
import { Productstype } from '@/lib/types'
import {AddProduct,DeleteProduct} from '../../../const/const'
import Image from 'next/image'
import { useProduct } from '@/context/ProductContext'

const AdminCrud = () => {
  const {fetchProducts,electronicproducts,foodproducts} = useProduct()
  const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  const [selectedProduct, setSelectedProduct] = useState<Productstype | null>(null);
  
  useEffect(() => {
    fetchProducts();
  }, [isAddModalOpen,isDeleteModalOpen]);

  const handleAddProductClick = () => {
    setIsAddModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsAddModalOpen(false);
    setIsDeleteModalOpen(false);
  };

  const handleDeleteProductModal = (product: Productstype) => {
    setSelectedProduct(product)
    setIsDeleteModalOpen(true);
  }

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
            <div 
            onClick={() => handleDeleteProductModal(product)}
            className={styles.deleteButtonContainer}>
              <Image 
              src={'/icons/close.svg'}
              alt='close'
              className={styles.deleteIcon}
              width={25}
              height={25}
              />
            </div>
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
              <p>{product.price.toFixed(2)}$</p>
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
            <div 
            onClick={() => handleDeleteProductModal(product)}
            className={styles.deleteButtonContainer}>
              <Image 
              src={'/icons/close.svg'}
              alt='close'
              className={styles.deleteIcon}
              width={25}
              height={25}
              />
            </div>
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
            </div>
          </li>
        ))}
        </ul>
      </div>
    </div>
    {isAddModalOpen && <AddProduct onClose={handleCloseModal} />}
    {isDeleteModalOpen && selectedProduct && <DeleteProduct product={selectedProduct} onClose={handleCloseModal} />}
    </>
  )
}

export default AdminCrud