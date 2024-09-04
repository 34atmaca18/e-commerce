import React from 'react';
import { ProfileInfo, Navbar,LikedProducts } from '../../const/const';
import styles from './index.module.scss';

const Profile = () => {
  return (
    <div className={styles.profileContainer}>
      <Navbar />
      <ProfileInfo />
      <LikedProducts />
    </div>
  );
};

export default Profile;
