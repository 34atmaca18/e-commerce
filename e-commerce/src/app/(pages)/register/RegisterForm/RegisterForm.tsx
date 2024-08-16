import React from 'react'
import styles from './index.module.scss'
import { Button } from '@mantine/core'
import Link from 'next/link'

const RegisterForm = () => {
  return (
    <div className={styles.registerContainer}>
      <div className={styles.innerContainer}>
        <div className={styles.innerLeft}>
          <h2>Login to Your Account!</h2>
          <p>
          Unlock a better experience—log in to your account now!</p>
          <Link href={'/login'}>
            <Button className={styles.signUpButton} variant="filled" color="gray">Sign In</Button>
          </Link>
        </div>
        <div className={styles.innerRight}>
          <form className={styles.registerForm}>
            <h2 className={styles.registerTitle}>Create Your Account!</h2>
            <div className={styles.nameContainer}>
              <label htmlFor="name">Name</label>
              <input 
              type="name" 
              name='name' 
              id='name'
              placeholder='Your name..' />
            </div>
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
            <div className={styles.countryContainer}>
              <label htmlFor="country">Country</label>
              <input 
              type="country" 
              name='country' 
              id='country'
              placeholder='Your country..' />
            </div>
            <div className={styles.buttonContainer}>
              <Button className={styles.signInButton} variant="filled" color="gray">Sign Up</Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default RegisterForm