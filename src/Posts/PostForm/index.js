import React, { Component } from 'react';
import { connect } from 'react-redux';
import { clone } from 'lodash';
import { addPost, updatePost, getPosts, setUpdating } from '../postActions';


@connect(({ posts: postsState }) => ({
  posts: postsState.posts,
  updatingIndex: postsState.updatingIndex
}), { getPosts, addPost, updatePost, setUpdating })
export default class PostForm extends Component {
  state = {
    author: '',
    content: '',
  }

  componentWillReceiveProps(nextProps) {
    if (typeof this.props.updatingIndex !== 'number' && typeof nextProps.updatingIndex === 'number') {
      const updatePost = nextProps.posts[nextProps.updatingIndex];
      this.setState({
        author: updatePost.author,
        content: updatePost.content
      });
    }
    if (typeof this.props.updatingIndex === 'number' && typeof nextProps.updatingIndex !== 'number') {
      this.clearState();
    }
  }

  clearState = () => this.setState({
    author: '',
    content: ''
  });

  componentDidMount() {
    this.props.getPosts();
  }

  onAuthorChange = event => this.setState({ author: event.target.value });
  onContentChange = event => this.setState({ content: event.target.value });

  handleSubmit = event => {
    event.preventDefault()

    if (this.state.author.length < 2) return alert('Please fill in your name.');
    if (this.state.content.length < 2) return alert('Please fill out some content.');

    if (typeof this.props.updatingIndex === 'number') {
      this.props.updatePost(clone(this.state), this.props.updatingIndex);
    } else {
      this.props.addPost(clone(this.state));
    }
    this.clearState();
  }

  render() {
    const isUpdating = typeof this.props.updatingIndex === 'number';

    return(
      <form
        className="pure-form pure-form-stacked"
        onSubmit={this.handleSubmit}
      >
        <fieldset>
          <h3>
            Make a Post!
          </h3>
          <fieldset
            className="pure-group"
          >
            <input
              id="name"
              type="text"
              className="pure-input-1-2"
              placeholder="Author"
              value={this.state.author}
              onChange={this.onAuthorChange}
            />
            <textarea
              id="name"
              type="text"
              className="pure-input-1-2"
              placeholder="Textareas work too"
              value={this.state.content}
              onChange={this.onContentChange}
              style={{ resize: 'none' }}
            />
          </fieldset>
          <button
            type="submit"
            className="pure-button pure-button-primary"
          >
            { isUpdating ? 'Update' : 'Add'}
          </button>
          {
            isUpdating
            &&
            <button
              className="pure-button pure-button-secondary"
              onClick={this.props.setUpdating}
              style={{ marginLeft: '20px' }}
            >
              Cancel
            </button>
          }
        </fieldset>
      </form>
    )
  }
}
