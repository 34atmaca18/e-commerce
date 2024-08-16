import React from 'react'
import {ProfileInfo,Navbar} from '../../const/const'
import styles from './index.module.scss'

const Profile = () => {
  return (
    <div className={styles.profileContainer}>
        <Navbar />
        <ProfileInfo />
    </div>
  )
}

export default Profile