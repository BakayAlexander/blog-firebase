import { ErrorMessage, Field, Form, Formik } from 'formik';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { uid } from 'uid';
import Layout from '../components/Layout/Layout';
import { createArticle } from '../store/actions/articlesActions';
import { validationAddArticle } from '../utils/validation';

const NewArticle = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const user = useSelector(state => state.user.user);
  const isLoading = useSelector(state => state.articles.createArticleLoading);
  const articleError = useSelector(state => state.articles.createArticleError);

  const initialValues = {
    title: '',
    topic: '',
    text: '',
  };

  const handleCreateArticle = values => {
    dispatch(
      createArticle({
        id: uid(),
        title: values.title,
        text: values.text,
        topic: values.topic,
        author: `${user?.first_name}  ${user?.last_name}`,
        avatar: user?.avatar || '',
      })
    ).then(res => {
      if (res) {
        router.push('/');
      }
    });
  };

  return (
    <>
      <Head>
        <title>Add new article</title>
        <meta name='Add new article' />
        <link
          rel='icon'
          href='/favicon.ico'
        />
      </Head>
      <Layout>
        <Formik
          initialValues={initialValues}
          validate={values => validationAddArticle(values)}
          onSubmit={values => handleCreateArticle(values)}
        >
          <Form className='flex flex-col items-center justify-center'>
            <h1 className='text-4xl font-semibold mb-5 '>Add new article</h1>
            <div className='w-11/12 space-y-10 md:w-3/5'>
              <label className='authLabel'>
                <Field
                  className='authInput'
                  type='title'
                  name='title'
                  placeholder='Title'
                />
              </label>
              <ErrorMessage
                className='authError'
                name='title'
                component='div'
              />
              <label className='authLabel'>
                <Field
                  className='authInput'
                  type='text'
                  name='topic'
                  placeholder='Topic'
                />
              </label>
              <ErrorMessage
                className='authError'
                name='topic'
                component='div'
              />
              <label className='authLabel'>
                <Field
                  className='w-full h-[400px] rounded bg-[#333] px-5 py-3.5 placeholder-[gray] outline-none focus:bg-[#454545]'
                  type='text'
                  name='text'
                  placeholder='Text'
                  as='textarea'
                />
              </label>
              <ErrorMessage
                className='authError'
                name='text'
                component='div'
              />
            </div>
            <button
              className='w-1/5 rounded py-3 font-semibold transition duration-[0.4s] bg-[#9f546e] hover:bg-[#6a1633] my-10'
              type='submit'
              disabled={isLoading}
            >
              Add article
            </button>
            {articleError && <p className='authError text-center text-[17px]'>{articleError}</p>}
          </Form>
        </Formik>
      </Layout>
    </>
  );
};

export default NewArticle;
