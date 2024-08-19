'use client'

import React from 'react'
import {LoginForm,Navbar} from '../../const/const'
import styles from './index.module.scss'
import { useAuth } from '@/context/AuthContext'
import { useRouter } from 'next/navigation'

const Login = () => {
  const {isLoggedIn} = useAuth();
  const router = useRouter()
  if (isLoggedIn){
    router.push('/')
    return (<div className={styles.redirecting}>Redirecting...</div>)
  }
  return (
    <div className={styles.loginContainer}>
      <Navbar />
      <LoginForm />
    </div>
  )
}

export default Login