import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Layout from '../components/Layout/Layout';
import RouterButton from '../components/RouterButton/RouterButton';
import { logoutUser } from '../store/actions/userActions';

const Account = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const user = useSelector(state => state.user.user);

  const handleLogoutUser = () => {
    dispatch(logoutUser());
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
        <section className='account'>
          {user ? (
            <>
              <h2 className='account__title'>{`Hello, ${user?.first_name}!`}</h2>
              <div className='account__info-container'>
                <p className='account__info-label'>Name</p>
                <p>{`${user?.first_name} ${user?.last_name}`}</p>
              </div>
              <div className='account__info-container'>
                <p className='account__info-label'>Email</p>
                <p>{user?.email}</p>
              </div>
            </>
          ) : (
            <h2 className='account__title'>Not logged in</h2>
          )}

          <div className='account__button-container'>
            <RouterButton
              link='/newarticle'
              title='Add new article'
            />
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
        </section>
      </Layout>
    </>
  );
};
export default Account;
