import { setDoc, doc, getDocs, collection, getDoc } from 'firebase/firestore';
import { firestore } from '../../firebase/clientApp';

export const CREATE_ARTICLE_REQUEST = 'CREATE_ARTICLE_REQUEST';
export const CREATE_ARTICLE_SUCCESS = 'CREATE_ARTICLE_SUCCESS';
export const CREATE_ARTICLE_FAILURE = 'CREATE_ARTICLE_FAILURE';

export const GET_ALL_ARTICLES_REQUEST = 'GET_ALL_ARTICLES_REQUEST';
export const GET_ALL_ARTICLES_SUCCESS = 'GET_ALL_ARTICLES_SUCCESS';
export const GET_ALL_ARTICLES_FAILURE = 'GET_ALL_ARTICLES_FAILURE';

export const GET_ARTICLE_REQUEST = 'GET_ARTICLE_REQUEST';
export const GET_ARTICLE_SUCCESS = 'GET_ARTICLE_SUCCESS';
export const GET_ARTICLE_FAILURE = 'GET_ARTICLE_FAILURE';

export const createArticleRequest = () => ({ type: CREATE_ARTICLE_REQUEST });
export const createArticleSuccess = res => ({
  type: CREATE_ARTICLE_SUCCESS,
  res,
});
export const createArticleFailure = error => ({
  type: CREATE_ARTICLE_FAILURE,
  error,
});

export const getAllArticlesRequest = () => ({ type: GET_ALL_ARTICLES_REQUEST });
export const getAllArticlesSuccess = res => ({
  type: GET_ALL_ARTICLES_SUCCESS,
  res,
});
export const getAllArticlesFailure = error => ({
  type: GET_ALL_ARTICLES_FAILURE,
  error,
});

export const getArticleRequest = () => ({ type: GET_ARTICLE_REQUEST });
export const getArticleSuccess = res => ({
  type: GET_ARTICLE_SUCCESS,
  res,
});
export const getArticleFailure = error => ({
  type: GET_ARTICLE_FAILURE,
  error,
});

export const createArticle = data => {
  return async dispatch => {
    try {
      dispatch(createArticleRequest());
      const response = await setDoc(doc(firestore, 'articles', data.id), {
        id: data.id,
        title: data.title,
        author: data.author,
        avatar: data.avatar,
        topic: data.topic,
        text: data.text,
      });
      dispatch(createArticleSuccess(true));
      return true;
    } catch (error) {
      console.log('Create article failed: ', error);
      if (error.message) {
        dispatch(createArticleFailure(error.message));
      } else {
        dispatch(createArticleFailure('Network error or no internet'));
      }
    }
  };
};

export const getAllArticles = () => {
  return async dispatch => {
    try {
      dispatch(getAllArticlesRequest());
      const response = await getDocs(collection(firestore, 'articles'));
      const articlesArray = [];
      response.forEach(article => {
        articlesArray.push(article.data());
      });
      dispatch(getAllArticlesSuccess(articlesArray));
    } catch (error) {
      console.log('Create article failed: ', error);
      if (error.message) {
        dispatch(getAllArticlesFailure(error.message));
      } else {
        dispatch(getAllArticlesFailure('Network error or no internet'));
      }
    }
  };
};

export const getArticleById = id => {
  return async dispatch => {
    try {
      dispatch(getArticleRequest());
      const response = await getDoc(doc(firestore, 'articles', id));
      dispatch(getArticleSuccess(response.data()));
    } catch (error) {
      console.log('Create article failed: ', error);
      if (error.message) {
        dispatch(getArticleFailure(error.message));
      } else {
        dispatch(getArticleFailure('Network error or no internet'));
      }
    }
  };
};
