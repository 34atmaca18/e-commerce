'use client'
import React, { useEffect, useState } from 'react';
import { ProfileInfo, Navbar,LikedProducts } from '../../const/const';
import styles from './index.module.scss';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { Redirecting } from '@/components/skeletons/Skeletons';

const Profile = () => {
  const { isLoggedIn,pageLoading } = useAuth();
  const router = useRouter();
  const [redirecting, setRedirecting] = useState<boolean>(false)


  useEffect(() => {
    if(!pageLoading){
      if(!isLoggedIn){
        setRedirecting(true)
        router.push('/login')
      }
    }
  }, [isLoggedIn,pageLoading])
  

  return (
    <div className={styles.profileContainer}>
      <Navbar />
      <ProfileInfo />
      <LikedProducts />
      {redirecting && <Redirecting />}
    </div>
  );
};

export default Profile;
