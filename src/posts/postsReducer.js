import {
  ADD_POST,
  UPDATE_POST,
  POSTS_LOADED,
  SET_UPDATING,
} from './ui/postsForm/PostActionTypes';


const initialState = {
  posts: [],
}

export default function postsReducer(state = initialState, { type, payload }) {
  switch(type) {
    case POSTS_LOADED: {
      return { posts: payload.posts };
    }

    case ADD_POST: {
      return { posts: state.posts.concat(payload.post) };
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
