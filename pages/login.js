import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import Head from 'next/head';

import { Formik, Form, Field, ErrorMessage } from 'formik';

import { loginUser } from '../store/actions/userActions';

import { FormikValues, validation } from '../utils/validation';

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
    <section className='auth'>
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
        <Form className='form'>
          <h1 className='form__header'>Log in</h1>
          <label className='auth_label'>
            <Field
              className='form__input'
              type='email'
              name='email'
              placeholder='Email'
            />
          </label>
          <ErrorMessage
            className='form__error'
            name='email'
            component='div'
          />
          <label className='auth_label'>
            <Field
              className='form__input'
              type='password'
              name='password'
              placeholder='Password'
            />
          </label>
          <ErrorMessage
            className='form__error'
            name='password'
            component='div'
          />
          <button
            className='form__submit-button'
            type='submit'
            disabled={isLoading}
          >
            Log in
          </button>
          {loginError && <p className='form__error text-center text-[17px]'>{loginError}</p>}

          <div className='text-[gray]'>
            Have not registered yet?
            <button
              className='form__link-button'
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
