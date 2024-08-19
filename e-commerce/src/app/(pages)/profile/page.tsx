'use client'
import React, { useEffect, useState } from 'react';
import { ProfileInfo, Navbar } from '../../const/const';
import styles from './index.module.scss';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';

const Profile = () => {
  const { isLoggedIn, currentUser } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
      if (!isLoggedIn && !currentUser) {
        router.push('/login');
      }
    }, 100);
    return () => clearTimeout(timer);
  }, [isLoggedIn, currentUser, router]);

  if (loading) {
    return <div className={styles.redirecting}>Loading...</div>;
  }

  return (
    <div className={styles.profileContainer}>
      <Navbar />
      <ProfileInfo />
    </div>
  );
};

export default Profile;
