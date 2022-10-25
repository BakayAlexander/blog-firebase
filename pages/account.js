import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import Layout from '../components/Layout/Layout';
import Head from 'next/head';
import { logoutUser } from '../store/actions/userActions';
import Link from 'next/link';

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
          name='Task Tracker Account Page'
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
        </section>
      </Layout>
    </>
  );
};
export default Account;