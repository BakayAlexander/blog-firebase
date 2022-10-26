import {
  CREATE_ARTICLE_FAILURE,
  CREATE_ARTICLE_REQUEST,
  CREATE_ARTICLE_SUCCESS,
  //! Deprecated
  // GET_ALL_ARTICLES_FAILURE,
  // GET_ALL_ARTICLES_REQUEST,
  // GET_ALL_ARTICLES_SUCCESS,
  // GET_ARTICLE_FAILURE,
  // GET_ARTICLE_REQUEST,
  // GET_ARTICLE_SUCCESS,
} from '../actions/articlesActions';

const initialState = {
  createArticleLoading: false,
  createArticleError: null,
  //! Deprecated
  // allArticlesLoading: false,
  // allArticlesError: null,
  // allArticles: null,
  // articleLoading: false,
  // articleError: null,
  // article: null,
};

const articlesReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_ARTICLE_REQUEST:
      return {
        ...state,
        createArticleLoading: true,
        createArticleError: null,
      };
    case CREATE_ARTICLE_SUCCESS:
      return {
        ...state,
        createArticleLoading: false,
        createArticleError: null,
      };
    case CREATE_ARTICLE_FAILURE:
      return {
        ...state,
        createArticleError: action.error,
        createArticleLoading: false,
      };

    //! Deprecated
    // case GET_ALL_ARTICLES_REQUEST:
    //   return {
    //     ...state,
    //     allArticlesLoading: true,
    //     allArticlesError: null,
    //   };
    // case GET_ALL_ARTICLES_SUCCESS:
    //   return {
    //     ...state,
    //     allArticlesLoading: false,
    //     allArticlesError: null,
    //     allArticles: action.res,
    //   };
    // case GET_ALL_ARTICLES_FAILURE:
    //   return {
    //     ...state,
    //     allArticlesLoading: false,
    //     allArticlesError: action.error,
    //   };

    // case GET_ARTICLE_REQUEST:
    //   return {
    //     ...state,
    //     articleLoading: true,
    //     articleError: null,
    //   };
    // case GET_ARTICLE_SUCCESS:
    //   return {
    //     ...state,
    //     articleLoading: false,
    //     articleError: null,
    //     article: action.res,
    //   };
    // case GET_ARTICLE_FAILURE:
    //   return {
    //     ...state,
    //     articleLoading: false,
    //     articleError: action.error,
    //   };

    default:
      return state;
  }
};

export default articlesReducer;
