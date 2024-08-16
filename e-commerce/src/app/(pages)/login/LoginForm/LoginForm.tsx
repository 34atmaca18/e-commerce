import React from 'react'
import styles from './index.module.scss'
import { Button } from '@mantine/core'
import Link from 'next/link'

const LoginForm = () => {
  return (
    <div className={styles.loginContainer}>
      <div className={styles.innerContainer}>
        <div className={styles.innerLeft}>
          <form className={styles.loginForm}>
            <h2 className={styles.loginTitle}>Login to Your Account!</h2>
            <div className={styles.emailContainer}>
              <label htmlFor="email">Email</label>
              <input 
              type="email" 
              name='email' 
              id='email'
              placeholder='Your email..' />
            </div>
            <div className={styles.passwordContainer}>
              <label htmlFor="password">Password</label>
              <input 
              type="password" 
              name='password' 
              id='password'
              placeholder='Your password..' />
            </div>
            <div className={styles.buttonContainer}>
              <Button className={styles.signInButton} variant="filled" color="gray">Sign In</Button>
            </div>
          </form>
          <div className={styles.bottomContainer}>
          <Link className={styles.forgotPassword} href={'/forgot'}>
            Forgot Password?
          </Link>
        </div>
        </div>
        <div className={styles.innerRight}>
          <h2>Create an Account!</h2>
          <p>Create an account to access exclusive deals and personalized offers.</p>
          <Link href={'/register'}>
            <Button className={styles.signUpButton} variant="filled" color="gray">Sign Up</Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default LoginForm