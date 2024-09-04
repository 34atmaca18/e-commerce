import React from 'react'
import {RegisterForm} from '../../const/const'
import styles from './index.module.scss'
import {Navbar} from '../../const/const'

const RegisterPage = () => {
  return (
    <div className={styles.registerContainer}>
        <Navbar />
        <RegisterForm />
    </div>
  )
}

export default RegisterPage