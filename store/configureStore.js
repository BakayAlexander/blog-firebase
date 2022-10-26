import { combineReducers } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { configureStore } from '@reduxjs/toolkit';
import usersReducer from './reducers/userReducer';
import articlesReducer from './reducers/articlesReducer';

const rootReducer = combineReducers({
  user: usersReducer,
  articles: articlesReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: [thunkMiddleware],
});
