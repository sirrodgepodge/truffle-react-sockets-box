import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import postsReducer from './posts/postsReducer'
import web3Reducer from './util/web3/web3Reducer'

const reducer = combineReducers({
  routing: routerReducer,
  posts: postsReducer,
  web3: web3Reducer
})

export default reducer
