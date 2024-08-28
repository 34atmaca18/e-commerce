'use client'

import React,{useEffect,useState} from 'react'
import {LoginForm,Navbar} from '../../const/const'
import styles from './index.module.scss'
import { useAuth } from '@/context/AuthContext'
import { useRouter } from 'next/navigation'
import { Redirecting,Loading } from '@/components/skeletons/Skeletons'

const Login = () => {
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
    <div className={styles.loginContainer}>
      <Navbar />
      <LoginForm />
      {loading && <Loading />}
      {redirecting && <Redirecting />}
    </div>
  )
}

export default Login