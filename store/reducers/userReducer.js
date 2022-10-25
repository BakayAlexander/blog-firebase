import {
  CREATE_USER_REQUEST,
  CREATE_USER_SUCCESS,
  CREATE_USER_FAILURE,
  LOGIN_USER_REQUEST,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAILURE,
  LOGOUT_USER,
} from '../actions/userActions';

const initialState = {
  createUserLoading: false,
  createUserError: null,
  loginUserLoading: false,
  loginUserError: null,
  user: null,
};

const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_USER_REQUEST:
      return {
        ...state,
        createUserLoading: true,
        createUserError: null,
      };
    case CREATE_USER_SUCCESS:
      return {
        ...state,
        createUserLoading: false,
        createUserError: null,
      };
    case CREATE_USER_FAILURE:
      return {
        ...state,
        createUserError: action.error,
        createUserLoading: false,
      };

    case LOGIN_USER_REQUEST:
      return {
        ...state,
        loginUserLoading: true,
        loginUserError: null,
      };
    case LOGIN_USER_SUCCESS:
      return {
        ...state,
        loginUserLoading: false,
        loginUserError: null,
        user: action.res,
      };
    case LOGIN_USER_FAILURE:
      return {
        ...state,
        loginUserLoading: false,
        loginUserError: action.error,
      };
    case LOGOUT_USER:
      return {
        ...state,
        loginUserError: null,
        loginUserLoading: false,
        user: null,
      };

    default:
      return state;
  }
};

export default usersReducer;
