import React, { Component } from 'react';
import PostForm from '../../ui/postsForm/PostForm';
import { connect } from 'react-redux';
import { setUpdating } from '../postsForm/PostActions';


@connect(({ posts: postsState }) => ({
  posts: postsState.posts || [],
  updatingIndex: postsState.updatingIndex
}), { setUpdating })
export default class PostsList extends Component {
  render() {
    return(
      <main className="container">
        <div className="pure-g">
          <div className="pure-u-1-1">
            <h1>Truffle Twitter</h1>
            <p>Check out them posts!</p>
            <PostForm />
            {this.props.posts.map((post, i) =>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between'
                }}
                key={i}
              >
                <div>
                  <div>Author: {post.author}</div>
                  <div>Content: {post.content}</div>
                </div>
                {
                  typeof this.props.updatingIndex !== 'number'
                  &&
                  <button onClick={this.props.setUpdating.bind(null, i)}>Update</button>
                }
              </div>
            )}
          </div>
        </div>
      </main>
    )
  }
}
