'use client'

import React from 'react';
import { Button } from '@mantine/core';
import Link from 'next/link';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import styles from './index.module.scss';
import { RegisterFormValues } from '@/lib/types';
import { registerUser } from '@/lib/db';
import { useRouter } from 'next/navigation';

const RegisterForm: React.FC = () => {
  const router = useRouter()
  const initialValues: RegisterFormValues = {
    name: '',
    email: '',
    password: '',
    country: '',
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    email: Yup.string()
      .email('Invalid email address')
      .required('Email is required'),
    password: Yup.string()
      .min(8, 'Password must be at least 8 characters')
      .required('Password is required'),
    country: Yup.string().required('Country is required'),
  });

  const onSubmit = async (values: RegisterFormValues) => {
    const {user,error} = await registerUser(values);
    if (error) {
      alert(error);
    } else if (user) {
      alert('User created successfully!');
      router.push('/login')
    }
  };
  return (
    <div className={styles.registerContainer}>
      <div className={styles.innerContainer}>
        <div className={styles.innerLeft}>
          <h2>Login to Your Account!</h2>
          <p>Unlock a better experience—log in to your account now!</p>
          <Link href={'/login'}>
            <Button className={styles.signUpButton} variant="filled" color="gray">
              Sign In
            </Button>
          </Link>
        </div>

        <div className={styles.innerRight}>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
          >
            <Form className={styles.registerForm}>
              <h2 className={styles.registerTitle}>Create Your Account!</h2>

              <div className={styles.nameContainer}>
                <label htmlFor="name">Name</label>
                <Field
                  type="text"
                  name="name"
                  id="name"
                  placeholder="Your name.."
                  className={styles.inputField}
                />
                <ErrorMessage
                  name="name"
                  component="div"
                  className={styles.errorMessage}
                />
              </div>

              <div className={styles.emailContainer}>
                <label htmlFor="email">Email</label>
                <Field
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Your email.."
                  className={styles.inputField}
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className={styles.errorMessage}
                />
              </div>

              <div className={styles.passwordContainer}>
                <label htmlFor="password">Password</label>
                <Field
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Your password.."
                  className={styles.inputField}
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className={styles.errorMessage}
                />
              </div>

              <div className={styles.countryContainer}>
                <label htmlFor="country">Country</label>
                <Field
                  type="text"
                  name="country"
                  id="country"
                  placeholder="Your country.."
                  className={styles.inputField}
                />
                <ErrorMessage
                  name="country"
                  component="div"
                  className={styles.errorMessage}
                />
              </div>

              <div className={styles.buttonContainer}>
                <Button className={styles.signInButton} type="submit" variant="filled" color="gray">
                  Sign Up
                </Button>
              </div>
            </Form>
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
