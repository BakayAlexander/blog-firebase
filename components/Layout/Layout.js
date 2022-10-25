import React, { useEffect, useState } from 'react';
import Header from '../Header/Header';
import { useDispatch, useSelector } from 'react-redux';
import useCheckIsUserLoggedIn from '../../hooks/useCheckUserLogin';
import Loader from '../Loader/Loader';

const Layout = ({ children }) => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const user = useSelector(state => state.user.user);

  dispatch(useCheckIsUserLoggedIn());

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, [user]);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <Header />
          <main>{children}</main>
        </>
      )}
    </>
  );
};
export default Layout;
