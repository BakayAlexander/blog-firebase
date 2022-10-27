import React, { useEffect, useState } from 'react';
import { BiExit } from 'react-icons/bi';
import { useDispatch, useSelector } from 'react-redux';
import Link from 'next/link';

import { logoutUser } from '../../store/actions/userActions';

import { defaultImageUrl } from '../../utils/constants';
import styles from './header.module.css';
import RouterButton from '../RouterButton/RouterButton';

const Header = () => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user.user);

  const handleLogoutUser = () => {
    dispatch(logoutUser());
  };

  return (
    <header className={styles.header}>
      <Link href='/'>
        <p className='link'>Blog App</p>
      </Link>
      <div className={styles.headerContainer}>
        {user && (
          <div className={styles.headerUserInfo}>
            <p>{`${user.first_name} ${user.last_name}`}</p>
            <p>{user.email}</p>
          </div>
        )}
        <Link
          className='link'
          href={user ? '/account' : '/login'}
        >
          <img
            className={styles.headerUserImage}
            src={user?.avatar || defaultImageUrl}
            alt='Profile icon'
          />
        </Link>
        {user ? (
          <>
            <RouterButton
              link='/newarticle'
              title='New Article'
            />
            <button onClick={handleLogoutUser}>
              <BiExit className='link h-7 w-7' />
            </button>
          </>
        ) : (
          <Link href='/login'>Login</Link>
        )}
      </div>
    </header>
  );
};
export default Header;
