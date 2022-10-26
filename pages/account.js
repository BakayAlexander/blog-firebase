import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Layout from '../components/Layout/Layout';
import { createArticle, getArticleById } from '../store/actions/articlesActions';
import { logoutUser } from '../store/actions/userActions';

const Account = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const user = useSelector(state => state.user.user);

  const handleLogoutUser = () => {
    dispatch(logoutUser());
  };

  const handleCreateArticle = () => {
    dispatch(
      createArticle({
        id: '12365',
        title: 'New Article',
        author: 'Alexander Bakay',
        avatar:
          'https://i.siteapi.org/1I9NrmMDmAWPMTXiIal43Z1JvRM=/0x0:900x900/d53b0ddd355c437.s2.siteapi.org/img/bp3oaqbt7vkgso8o804084kc40c004',
        topic: 'science',
        text: 'Long Long Text',
      })
    ).then(res => {
      if (res) {
        router.push('/');
      }
    });
  };

  const handleGetArticleById = id => {
    dispatch(getArticleById(id));
  };

  return (
    <>
      <Head>
        <title>Account</title>
        <meta
          name='Account Page'
          content='Account page'
        />
        <link
          rel='icon'
          href='/favicon.ico'
        />
      </Head>
      <Layout>
        <section className='user'>
          {user ? (
            <>
              <h2 className='userTitle'>{`Hello, ${user?.first_name}!`}</h2>
              <div className='userInfoContainer'>
                <p className='userInfoLabel'>Name</p>
                <p>{`${user?.first_name} ${user?.last_name}`}</p>
              </div>
              <div className='userInfoContainer'>
                <p className='userInfoLabel'>Email</p>
                <p>{user?.email}</p>
              </div>
            </>
          ) : (
            <h2 className='userTitle'>Not logged in</h2>
          )}

          <div className='userButtonContainer'>
            <button
              className='link'
              onClick={() => {
                router.push('/');
              }}
            >
              Back to main
            </button>
            {user ? (
              <button
                className='link mt-5'
                onClick={handleLogoutUser}
              >
                Log out
              </button>
            ) : (
              <Link href='/login'>
                <p className='link mt-5'>Login</p>
              </Link>
            )}
          </div>
          <button
            onClick={() => {
              handleGetAllArticles('12321');
            }}
          >
            Get Article
          </button>
        </section>
      </Layout>
    </>
  );
};
export default Account;
