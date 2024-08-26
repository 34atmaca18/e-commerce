'use client'
import React, { useEffect, useState } from 'react';
import { ProfileInfo, Navbar,LikedProducts } from '../../const/const';
import styles from './index.module.scss';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { UserInfoLoader } from '../../const/const';

const Profile = () => {
  const { isLoggedIn } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  if (loading) {
    return <div className={styles.redirecting}>Loading...</div>;
  }

  return (
    <div className={styles.profileContainer}>
      <Navbar />
      <ProfileInfo />
      <LikedProducts />
    </div>
  );
};

export default Profile;
