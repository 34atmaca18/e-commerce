'use client'
import React,{useState} from 'react';
import { Button } from '@mantine/core';
import Link from 'next/link';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import styles from './index.module.scss';
import { LoginFormInputs } from '@/lib/types';
import { useAuth } from '@/context/AuthContext';
import { Loader } from '@mantine/core';
import { loginServer } from '@/auth/auth';
import { useRouter } from 'next/navigation';

const LoginForm: React.FC = () => {
  const [isButtonLoading, setisButtonLoading] = useState<boolean>(false)
  const {loginClient} = useAuth()
  const router = useRouter();
  const initialValues: LoginFormInputs = {
    email: '',
    password: '',
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email('Invalid email address')
      .required('Email is required'),
    password: Yup.string()
      .min(8, 'Password must be at least 8 characters')
      .required('Password is required'),
  });

  const onSubmit = async (values: LoginFormInputs) => {
    setisButtonLoading(true);
    const formState = await loginServer(values.email, values.password);
    
    if (formState?.message) {
        setisButtonLoading(false);
        alert(formState.message); 
    } else if (formState?.user) {
        setisButtonLoading(false);
        loginClient();
        router.push('/')
    }
};

  return (
    <div className={styles.loginContainer}>
      <div className={styles.innerContainer}>
        <div className={styles.innerLeft}>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
          >
            <Form className={styles.loginForm}>
              <h2 className={styles.loginTitle}>Login to Your Account!</h2>

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

              <div className={styles.buttonContainer}>
                <Button className={styles.signInButton} type="submit" variant="filled" color="gray">
                  {isButtonLoading ? <Loader color="white" size="sm"/>: <span>Sign In</span>}
                </Button>
              </div>
            </Form>
          </Formik>

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
            <Button className={styles.signUpButton} variant="filled" color="gray">
              Sign Up
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
