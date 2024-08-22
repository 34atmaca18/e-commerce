'use client'
import React,{useEffect} from 'react'
import styles from './index.module.scss'
import {Navbar,AdminCrud} from '../../const/const'
import { useAuth } from '@/context/AuthContext'
import { useRouter } from 'next/navigation'

const AdminPanel = () => {
  const router = useRouter()
  const {isAdmin} = useAuth()
  useEffect(() => {
    if (!isAdmin) {
      router.push('/');
    }
  }, [isAdmin, router]);

  if (!isAdmin) {
    return <div>Redirecting...</div>;
  }

  return (
    <div className={styles.panelContainer}>
        <Navbar />
        <AdminCrud />
    </div>
  )
}

export default AdminPanel