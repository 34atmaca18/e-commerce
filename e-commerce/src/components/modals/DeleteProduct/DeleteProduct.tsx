'use client'

import React from 'react'
import styles from './index.module.scss'
import { deleteProductFromDb } from '@/lib/db'
import { Productstype } from '@/lib/types';

interface DeleteProductProps {
    product: Productstype;
    onClose: () => void;
}

const DeleteProduct: React.FC<DeleteProductProps> = ({ product,onClose }) => {
    const handleAcceptButton = async () => {
        try {
          await deleteProductFromDb(product.name, product.category);
          onClose();
        } catch (error) {
          console.error('Failed to delete product:', error);
        }
      };

    const handleBackgroundClick = (event: React.MouseEvent) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      };

    return (
        <div className={styles.deleteContainer} onClick={handleBackgroundClick}>
            <div className={styles.deleteInner}>
                <h2>Are you sure you want to delete this product?</h2>
                <div className={styles.buttonsContainer}>
                    <button 
                    onClick={handleAcceptButton}
                    className={styles.acceptButton}>Accept</button>
                    <button 
                    onClick={onClose}
                    className={styles.cancelButton}>Cancel</button>
                </div>
            </div>
        </div>
    )
    }

export default DeleteProduct