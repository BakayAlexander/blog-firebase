import Head from 'next/head';
import { useRouter } from 'next/router';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { registerUser } from '../store/actions/userActions';
import { validationRegister } from '../utils/validation';
import styles from '../styles/auth.module.css';

const Register = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const initialValues = {
    email: '',
    password: '',
    first_name: '',
    last_name: '',
    avatar: '',
  };

  const registerError = useSelector(state => state.user.createUserError);
  const isLoading = useSelector(state => state.user.createUserLoading);

  const handleSubmitRegister = values => {
    dispatch(registerUser(values)).then(res => {
      if (res) {
        router.push('/login');
      }
    });
  };

  return (
    <section className={styles.auth}>
      <Head>
        <title>Register</title>
        <meta
          name='Register to blog app'
          content='Register page'
        />
        <link
          rel='icon'
          href='/favicon.ico'
        />
      </Head>
      <Formik
        initialValues={initialValues}
        validate={values => validationRegister(values)}
        onSubmit={values => handleSubmitRegister(values)}
      >
        <Form className={styles.form}>
          <h1 className={styles.form__header}>Register</h1>
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
          <label className={styles.form__label}>
            <Field
              className={styles.form__input}
              type='text'
              name='first_name'
              placeholder='First Name'
            />
          </label>
          <ErrorMessage
            className={styles.form__error}
            name='first_name'
            component='div'
          />
          <label className={styles.form__label}>
            <Field
              className={styles.form__input}
              type='text'
              name='last_name'
              placeholder='Last Name'
            />
          </label>
          <ErrorMessage
            className={styles.form__error}
            name='last_name'
            component='div'
          />
          <label className={styles.form__label}>
            <Field
              className={styles.form__input}
              type='text'
              name='avatar'
              placeholder='Avatar URL (optional)'
            />
          </label>
          <ErrorMessage
            className={styles.form__error}
            name='avatar'
            component='div'
          />
          <button
            className={styles.form__submitButton}
            type='submit'
            disabled={isLoading}
          >
            Register
          </button>
          {registerError && <p className={styles.form__error}>{registerError}</p>}

          <div>
            Already a member?
            <button
              className={styles.form__linkButton}
              type='button'
              disabled={isLoading}
              onClick={() => {
                router.push('/login');
              }}
            >
              Login
            </button>
          </div>
        </Form>
      </Formik>
    </section>
  );
};
export default Register;
