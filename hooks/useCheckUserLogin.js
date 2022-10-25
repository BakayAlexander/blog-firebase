/* eslint-disable react-hooks/rules-of-hooks */
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase/clientApp';
import { getUserData, loginUserFailure, loginUserRequest, logoutUserRequest } from '../store/actions/userActions';

const useCheckIsUserLoggedIn = () => dispatch => {
  const router = useRouter();
  useEffect(() => {
    dispatch(loginUserRequest());
    try {
      onAuthStateChanged(auth, user => {
        if (user) {
          // Logged in...
          dispatch(getUserData(user.uid));
        } else {
          // Not logged in...
          dispatch(logoutUserRequest());
          router.push('/');
        }
      });
    } catch (e) {
      console.log(e);
      dispatch(loginUserFailure(e));
    }
  }, [auth]);
};

export default useCheckIsUserLoggedIn;
