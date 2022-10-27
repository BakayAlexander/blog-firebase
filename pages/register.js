import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import Head from 'next/head';

import { Formik, Form, Field, ErrorMessage } from 'formik';

import { FormikValuesRegister, validationRegister } from '../utils/validation';
import { registerUser } from '../store/actions/userActions';

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
    <section className='auth'>
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
        <Form className='form'>
          <h1 className='form__header'>Register</h1>
          <label className='form_label'>
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
          <label className='form_label'>
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
          <label className='form_label'>
            <Field
              className='form__input'
              type='text'
              name='first_name'
              placeholder='First Name'
            />
          </label>
          <ErrorMessage
            className='form__error'
            name='first_name'
            component='div'
          />
          <label className='form_label'>
            <Field
              className='form__input'
              type='text'
              name='last_name'
              placeholder='Last Name'
            />
          </label>
          <ErrorMessage
            className='form__error'
            name='last_name'
            component='div'
          />
          <label className='form_label'>
            <Field
              className='form__input'
              type='text'
              name='avatar'
              placeholder='Avatar URL (optional)'
            />
          </label>
          <ErrorMessage
            className='form__error'
            name='avatar'
            component='div'
          />
          <button
            className='form__submit-button bg-[#9f546e] hover:bg-[#6a1633]'
            type='submit'
            disabled={isLoading}
          >
            Register
          </button>
          {registerError && <p className='form__error text-center text-[17px]'>{registerError}</p>}

          <div className='text-[gray]'>
            Already a member?
            <button
              className='form__link-button'
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
