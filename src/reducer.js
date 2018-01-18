import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import postsReducer from './Posts/postsReducer';

const reducer = combineReducers({
  routing: routerReducer,
  posts: postsReducer,
})

export default reducer
