import React from 'react'
import {LoginForm,Navbar} from '../../const/const'
import styles from './index.module.scss'

const Login = () => {
  return (
    <div className={styles.loginContainer}>
      <Navbar />
      <LoginForm />
    </div>
  )
}

export default Login