'use client'
import React from 'react'
import {RegisterForm} from '../../const/const'
import styles from './index.module.scss'
import {Navbar} from '../../const/const'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/context/AuthContext'

const RegisterPage = () => {
  const {isLoggedIn} = useAuth();
  const router = useRouter()
  if (isLoggedIn){
    router.push('/')
    return (<div className={styles.redirecting}>Redirecting...</div>)
  }
  
  else (
    <div className={styles.registerContainer}>
        <Navbar />
        <RegisterForm />
    </div>
  )
}

export default RegisterPage