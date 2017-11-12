import {
  ADD_POST,
  UPDATE_POST,
  POSTS_LOADED,
  SET_UPDATING,
} from './postActionTypes';


const initialState = {
  posts: [],
}

export default function postsReducer(state = initialState, { type, payload }) {
  switch(type) {
    case POSTS_LOADED: {
      return { posts: payload.posts };
    }

    case ADD_POST: {
      return { posts: [payload.post].concat(state.posts) };
    }

    case UPDATE_POST: {
      const { post, index } = payload;
      const posts = state.posts.slice();
      posts[index] = post;

      return { posts };
    }

    case SET_UPDATING: {
      const { index } = payload;
      return Object.assign({}, state, { updatingIndex: index });
    }

    default: {
      return state;
    }
  }
}
