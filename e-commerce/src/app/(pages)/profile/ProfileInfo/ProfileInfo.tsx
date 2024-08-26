'use client'

import React,{useState,useEffect} from 'react'
import styles from './index.module.scss'
import { useAuth } from '@/context/AuthContext'
import {UserInfoLoader} from '@/app/const/const'

const ProfileInfo = () => {
  const [fetchLoading, setfetchLoading] = useState<boolean>(true)
  const {currentUser,logout} = useAuth()

  useEffect(() => {
    if(!currentUser) {
        setfetchLoading(true);
    }
    else {
      setfetchLoading(false)
    }
  }, [currentUser])

  const handleLogout = () => {
    logout();
  }

  return (
    <div className={styles.profileContainer}>
      {fetchLoading ? (<UserInfoLoader />) : (
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
      )}
    </div>
  )
}

export default ProfileInfo