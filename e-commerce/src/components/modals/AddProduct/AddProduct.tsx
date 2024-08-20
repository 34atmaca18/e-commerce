'use client'

import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import styles from './index.module.scss';
import { addProductToDb } from '@/lib/db';

interface AddProductProps {
    onClose: () => void;
}

export type productValues = {
    category: string;
    name: string;
    info: string;
    price: number;
    image: string;
}

const AddProduct: React.FC<AddProductProps> = ({ onClose }) => {
    const handleBackgroundClick = (event: React.MouseEvent) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      };

      const handleSubmit = async (values: productValues) => {
        try {
          const product = { ...values, price: Number(values.price) };
          await addProductToDb(product);
          onClose(); 
        } catch (error) {
          console.error('Failed to add product:', error);
        }
      };
    
    return (
    <div className={styles.addProductContainer} onClick={handleBackgroundClick}>
      <div className={styles.addProductInner}>
        <h2>Add Product</h2>
        <Formik
          initialValues={{
            category: 'electronic',
            name: '',
            info: '',
            price: 0,
            image: '',
          }}
          validationSchema={Yup.object({
            category: Yup.string().required('Please select a category!'),
            name: Yup.string().required('Product name is required!'),
            info: Yup.string().required('Product info is required!'),
            price: Yup.number().required('Price is required!').positive('Price must be positive!'),
            image: Yup.string().url('Invalid URL!').required('Image URL is required!'),
          })}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className={styles.formContainer}>
              <div className={styles.formGroups}>
                <label htmlFor="category">Category</label>
                <Field className={styles.formFields} as="select" name="category">
                  <option className={styles.options} value="electronic">Electronic</option>
                  <option className={styles.options} value="food">Food</option>
                </Field>
                <ErrorMessage name="category" component="div" className={styles.error} />
              </div>
              <div className={styles.formGroups}>
                <label htmlFor="name">Product Name</label>
                <Field placeholder = 'product name..' className={styles.formFields} type="text" name="name" id='name' />
                <ErrorMessage name="name" component="div" className={styles.error} />
              </div>
              <div className={styles.formGroups}>
                <label htmlFor="info">Product Info</label>
                <Field placeholder = 'product info..' className={styles.formFields} type="text" name="info" id='info' />
                <ErrorMessage name="info" component="div" className={styles.error} />
              </div>
              <div className={`${styles.formGroups} ${styles.removeSpinner}`}>
                <label htmlFor="price">Price</label>
                <Field placeholder = 'product price..' className={styles.formFields} type="number" name="price" id='price' />
                <ErrorMessage name="price" component="div" className={styles.error} />
              </div>
              <div className={styles.formGroups}>
                <label htmlFor="image">Image URL</label>
                <Field placeholder = 'product url..' className={styles.formFields} type="text" name="image" id='image'/>
                <ErrorMessage name="image" component="div" className={styles.error} />
              </div>
              <div className={styles.buttonsContainer}>
                <button className={styles.submitButton} type="submit" disabled={isSubmitting}>
                  Submit
                </button>
                <button className={styles.cancelButton} type="button" onClick={onClose}>
                  Cancel
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default AddProduct;
