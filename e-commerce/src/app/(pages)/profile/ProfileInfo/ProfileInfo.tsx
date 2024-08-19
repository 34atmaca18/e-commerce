'use client'

import React from 'react'
import styles from './index.module.scss'
import { useAuth } from '@/context/AuthContext'

const ProfileInfo = () => {
  const {currentUser,logout} = useAuth()
  const handleLogout = () => {
    logout();
  }
  return (
    <div className={styles.profileContainer}>
      <div className={styles.userContainer}>
        <div className={styles.profileTitleContainer}>
          <h2 className={styles.profileTitle}>User Info</h2>
        </div>
        {currentUser && (
        <div className={styles.userinfoContainer}>
          <div className={styles.nameContainer}>
            <span>name</span>
            <p>{currentUser.name}</p>
          </div>
          <div className={styles.emailContainer}>
            <span>email</span>
            <p>{currentUser.email}</p>
          </div>
          <div className={styles.countryContainer}>
            <span>country</span>
            <p>{currentUser.country}</p>
          </div>
        </div>
        )}
        <div className={styles.buttonContainer}>
          <button 
          onClick={() => handleLogout()}
          className={styles.logoutButton}>
            Log Out
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProfileInfo