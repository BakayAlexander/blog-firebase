import React, { useEffect, useState } from 'react';
import { BiExit, BiLogOut } from 'react-icons/bi';
import { useDispatch, useSelector } from 'react-redux';
import Link from 'next/link';

import { logoutUser } from '../../store/actions/userActions';

import { defaultImageUrl } from '../../utils/constants';
import styles from './header.module.css';

const Header = () => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user.user);
  const [currentUser, setCurrentUser] = useState({});

  useEffect(() => {
    if (user) {
      setCurrentUser(user);
    } else {
      setCurrentUser({});
    }
  }, [user]);

  const handleLogoutUser = () => {
    dispatch(logoutUser());
  };

  return (
    <header>
      <Link
        href='/'
        className='link'
      >
        Blog App
      </Link>
      <div className={styles.headerContainer}>
        {currentUser.email && (
          <div className={styles.headerUserInfo}>
            <p>{`${currentUser.first_name} ${currentUser.last_name}`}</p>
            <p>{currentUser.email}</p>
          </div>
        )}
        <Link
          className='link'
          href={currentUser.email ? '/account' : '/login'}
        >
          <img
            className={styles.headerUserImage}
            src={currentUser.avatar || defaultImageUrl}
            alt='Profile icon'
          />
        </Link>
        {currentUser.email ? (
          <button
            onClick={handleLogoutUser}
            className='link'
          >
            <BiExit className='h-7 w-7' />
          </button>
        ) : (
          <Link
            className='link'
            href='/login'
          >
            <BiLogOut className='h-7 w-7' />
          </Link>
        )}
      </div>
    </header>
  );
};
export default Header;
