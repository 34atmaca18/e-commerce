'use client'

import React from 'react'
import styles from './index.module.scss'

const AdminCrud = () => {
  return (
    <div className={styles.adminContainer}>
        <div className={styles.titleContainer}>
            <h2>Admin Panel</h2>
        </div>
        <div className={styles.managementContainer}>
            <h2>Product Management</h2>
        </div>
    </div>
  )
}

export default AdminCrud