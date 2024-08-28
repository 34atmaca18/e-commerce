'use client'
import React,{useState,useEffect} from 'react'
import {RegisterForm} from '../../const/const'
import styles from './index.module.scss'
import {Navbar} from '../../const/const'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/context/AuthContext'
import { Loading,Redirecting } from '@/components/skeletons/Skeletons'

const RegisterPage = () => {
  const [loading, setLoading] = useState<boolean>(true)
  const [redirecting, setRedirecting] = useState<boolean>(false)
  const {isLoggedIn,pageLoading} = useAuth()
  const router = useRouter()

  useEffect(() => {
    if(!pageLoading){
      if(isLoggedIn){
        setRedirecting(true);
        router.push('/');
      }
      else {
        setLoading(false);
      }
    }
  }, [isLoggedIn,pageLoading])
  
  return (
    <div className={styles.registerContainer}>
        <Navbar />
        <RegisterForm />
        {loading && <Loading />}
        {redirecting && <Redirecting />}
    </div>
  )
}

export default RegisterPage