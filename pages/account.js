import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import Layout from '../components/Layout/Layout';
import Head from 'next/head';
import { logoutUser } from '../store/actions/userActions';
import { defaultUser } from '../utils/constants';

const Account = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const user = useSelector(state => state.user.user);

  const [currentUser, setCurrentUser] = useState(defaultUser);

  useEffect(() => {
    if (user) {
      setCurrentUser(user);
    }
  }, [user]);

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
          <h2 className='userTitle'>{`Hello, ${currentUser.first_name}!`}</h2>
          <div className='userInfoContainer'>
            <p className='userInfoLabel'>Name</p>
            <p>{`${currentUser.first_name} ${currentUser.last_name}`}</p>
          </div>
          <div className='userInfoContainer'>
            <p className='userInfoLabel'>Email</p>
            <p>{currentUser.email}</p>
          </div>
          <div className='userButtonContainer'>
            <button
              className='link'
              onClick={() => {
                router.push('/');
              }}
            >
              Back to main
            </button>
            <button
              className='link mt-5'
              onClick={handleLogoutUser}
            >
              Log out
            </button>
          </div>
        </section>
      </Layout>
    </>
  );
};
export default Account;
