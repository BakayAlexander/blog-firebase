import Head from 'next/head';
import { useRouter } from 'next/router';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { loginUser } from '../store/actions/userActions';
import { validation } from '../utils/validation';
import styles from '../styles/auth.module.css';

const Login = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const loginError = useSelector(state => state.user.loginUserError);
  const isLoading = useSelector(state => state.user.loginUserLoading);

  const initialValues = { email: '', password: '' };

  const handleSubmitLogin = values => {
    dispatch(loginUser(values)).then(res => {
      if (res) {
        router.push('/');
      }
    });
  };

  return (
    <section className={styles.auth}>
      <Head>
        <title>Login</title>
        <meta
          name='Login to blog app'
          content='Login page'
        />
        <link
          rel='icon'
          href='/favicon.ico'
        />
      </Head>
      <Formik
        initialValues={initialValues}
        validate={values => validation(values)}
        onSubmit={values => handleSubmitLogin(values)}
      >
        <Form className={styles.form}>
          <h1 className={styles.form__header}>Log in</h1>
          <label className={styles.form__label}>
            <Field
              className={styles.form__input}
              type='email'
              name='email'
              placeholder='Email'
            />
          </label>
          <ErrorMessage
            className={styles.form__error}
            name='email'
            component='div'
          />
          <label className={styles.form__label}>
            <Field
              className={styles.form__input}
              type='password'
              name='password'
              placeholder='Password'
            />
          </label>
          <ErrorMessage
            className={styles.form__error}
            name='password'
            component='div'
          />
          <button
            className={styles.form__submitButton}
            type='submit'
            disabled={isLoading}
          >
            Log in
          </button>
          {loginError && <p className={styles.form__error}>{loginError}</p>}

          <div>
            Have not registered yet?
            <button
              className={styles.form__linkButton}
              type='button'
              disabled={isLoading}
              onClick={() => {
                router.push('/register');
              }}
            >
              Register
            </button>
          </div>
        </Form>
      </Formik>
    </section>
  );
};
export default Login;
