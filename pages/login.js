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
        <Form className='authForm'>
          <h1 className='authHeader'>Log in</h1>
          <div className='space-y-4'>
            <label className='authLabel'>
              <Field
                className='authInput'
                type='email'
                name='email'
                placeholder='Email'
              />
            </label>
            <ErrorMessage
              className='authError'
              name='email'
              component='div'
            />
            <label className='authLabel'>
              <Field
                className='authInput'
                type='password'
                name='password'
                placeholder='Password'
              />
            </label>
            <ErrorMessage
              className='authError'
              name='password'
              component='div'
            />
          </div>
          <button
            className='authButton'
            type='submit'
            disabled={isLoading}
          >
            Log in
          </button>
          {loginError && <p className='authError text-center text-[17px]'>{loginError}</p>}

          <div className='text-[gray]'>
            Have not registered yet?
            <button
              className='authLinkButton'
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
