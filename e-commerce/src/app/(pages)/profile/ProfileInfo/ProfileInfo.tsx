import React from 'react'
import styles from './index.module.scss'

const ProfileInfo = () => {
  return (
    <div className={styles.profileContainer}>
      <div className={styles.userContainer}>
        <div className={styles.profileTitleContainer}>
          <h2 className={styles.profileTitle}>User Info</h2>
        </div>
        <div className={styles.nameContainer}>
          <span>name</span>
          <p>Aydogan</p>
        </div>
        <div className={styles.emailContainer}>
          <span>email</span>
          <p>aydogan.u3418@gmail.com</p>
        </div>
        <div className={styles.countryContainer}>
          <span>country</span>
          <p>Turkiye</p>
        </div>
      </div>
    </div>
  )
}

export default ProfileInfo