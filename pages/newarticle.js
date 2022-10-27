import { ErrorMessage, Field, Form, Formik } from 'formik';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { uid } from 'uid';
import Layout from '../components/Layout/Layout';
import { createArticle } from '../store/actions/articlesActions';
import { validationAddArticle } from '../utils/validation';
import styles from '../styles/newArticle.module.css';

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
          <Form className={styles.newArticle}>
            <h1 className={styles.newArticle__title}>Add new article</h1>
            <div className={styles.newArticle__inputs}>
              <Field
                className={styles.newArticle__input}
                type='title'
                name='title'
                placeholder='Title'
              />
              <ErrorMessage
                className={styles.newArticle__error}
                name='title'
                component='div'
              />
              <Field
                className={styles.newArticle__input}
                type='text'
                name='topic'
                placeholder='Topic'
              />
              <ErrorMessage
                className={styles.newArticle__error}
                name='topic'
                component='div'
              />
              <Field
                className={styles.newArticle__textarea}
                type='text'
                name='text'
                placeholder='Text'
                as='textarea'
              />
              <ErrorMessage
                className={styles.newArticle__error}
                name='text'
                component='div'
              />
            </div>
            <button
              className={styles.newArticle__submitButton}
              type='submit'
              disabled={isLoading}
            >
              Add article
            </button>
            {articleError && <p className={styles.newArticle__error}>{articleError}</p>}
          </Form>
        </Formik>
      </Layout>
    </>
  );
};

export default NewArticle;
