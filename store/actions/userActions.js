import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut, User } from 'firebase/auth';
import { collection, deleteDoc, doc, DocumentData, getDoc, onSnapshot, setDoc } from 'firebase/firestore';

import { auth, firestore } from '../../firebase/clientApp';

export const CREATE_USER_REQUEST = 'CREATE_USER_REQUEST';
export const CREATE_USER_SUCCESS = 'CREATE_USER_SUCCESS';
export const CREATE_USER_FAILURE = 'CREATE_USER_FAILURE';

export const LOGIN_USER_REQUEST = 'LOGIN_USER_REQUEST';
export const LOGIN_USER_SUCCESS = 'LOGIN_USER_SUCCESS';
export const LOGIN_USER_FAILURE = 'LOGIN_USER_FAILURE';

export const LOGOUT_USER = 'LOGOUT_USER';

export const createUserRequest = () => ({ type: CREATE_USER_REQUEST });
export const createUserSuccess = res => ({
  type: CREATE_USER_SUCCESS,
  res,
});
export const createUserFailure = error => ({
  type: CREATE_USER_FAILURE,
  error,
});

export const loginUserRequest = () => ({ type: LOGIN_USER_REQUEST });
export const loginUserSuccess = res => ({
  type: LOGIN_USER_SUCCESS,
  res,
});
export const loginUserFailure = error => ({
  type: LOGIN_USER_FAILURE,
  error,
});

export const logoutUserRequest = () => ({ type: LOGOUT_USER });

export const registerUser = data => {
  return async dispatch => {
    try {
      dispatch(createUserRequest());
      const response = await createUserWithEmailAndPassword(auth, data.email, data.password);
      await setDoc(doc(firestore, 'users', response.user.uid), {
        first_name: data.first_name,
        last_name: data.last_name,
        email: data.email,
        avatar: data.avatar,
        id: response.user.uid,
      });
      dispatch(createUserSuccess(response.user));
      return true;
    } catch (error) {
      console.log('Register failed: ', error);
      if (error.message) {
        dispatch(createUserFailure(error.message));
      } else {
        dispatch(createUserFailure('Network error or no internet'));
      }
    }
  };
};

export const loginUser = data => {
  return async dispatch => {
    try {
      dispatch(loginUserRequest());
      const response = await signInWithEmailAndPassword(auth, data.email, data.password);
      const userData = await getDoc(doc(firestore, 'users', response.user.uid));
      dispatch(loginUserSuccess(userData.data()));
      return response;
    } catch (error) {
      console.log('Login failed: ', error);
      if (error.message) {
        dispatch(loginUserFailure(error.message));
      } else {
        dispatch(loginUserFailure('Network error or no internet'));
      }
    }
  };
};

export const getUserData = id => {
  return async dispatch => {
    try {
      dispatch(loginUserRequest());
      const userData = await getDoc(doc(firestore, 'users', id));
      dispatch(loginUserSuccess(userData.data()));
      return userData;
    } catch (error) {
      console.log('Get users data failed: ', error);
      if (error.message) {
        dispatch(loginUserFailure(error.message));
      } else {
        dispatch(loginUserFailure('Network error or no internet'));
      }
    }
  };
};

export const logoutUser = () => {
  return dispatch => {
    signOut(auth);
    dispatch(logoutUserRequest());
  };
};
