import React, { Component } from 'react';
import PostForm from './PostForm';
import { connect } from 'react-redux';
import { setUpdating } from './postActions';


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
            <div
              className='pure-form' // just iusing form for styling
              style={{
                position: 'relative',
                width: '100%',
                height: '100%',
              }}
            >
              {this.props.posts.map((post, i) => {
                const isUpdating = typeof this.props.updatingIndex === 'number';
                const isUpdatingThis = isUpdating && this.props.updatingIndex === i;
                const showButton = (!isUpdating || isUpdatingThis);

                return (
                  <fieldset
                    className="pure-u-1-4 pure-group"
                    style={{
                      display: 'inline-flex',
                      width: 'calc(25% - 20px)',
                      justifyContent: 'space-between',
                      flexDirection: 'column',
                      boxSizing: 'border-box',
                      marginTop: '20px',
                      marginLeft: i % 4 === 0 ? 0 : '20px',
                      padding: 0,
                      border: '1px solid #ccc',
                      borderRadius: '4px'
                    }}
                    key={i}
                  >
                    <input
                      readOnly
                      className='pure-input-1'
                      value={'By: ' + post.author}
                      style={{
                        top: '0',
                        border: 'none',
                        backgroundColor: '#e5f2fb'
                      }}
                    />
                    <textarea
                      className='pure-input-1'
                      style={{
                        border: 'none',
                        resize: 'none',
                        boxShadow: 'inset 0 6px 18px -5px #ddd',
                      }}
                      value={post.content}
                    />
                    <div style={{
                      position: 'relative',
                      height: '38px',
                      width: '100%'
                    }}>
                      <button
                        className={`pure-button${isUpdatingThis ? ' pure-button-active' : ''}`}
                        style={{
                          marginTop: 0,
                          marginBottom: 0,
                          height: '100%',
                          width: '100%',
                          borderTopLeftRadius: '0px',
                          borderTopRightRadius: '0px',
                          borderBottomLeftRadius: '4px',
                          borderBottomRightRadius: '4px',
                          userSelect: isUpdatingThis ? 'none' : 'initial',
                          opacity: showButton ? 1 : 0,
                          visibility: showButton ? 'visible' : 'hidden',
                          transition: `
                            box-shadow .1s ease-in-out,
                            opacity .1s ease-in-out
                            ${showButton ? '' : ', visibility 0s .1s'}
                          `
                        }}
                        onClick={this.props.setUpdating.bind(null, i)}
                      >
                        {isUpdatingThis ? 'Updating...' : 'Update'}
                       </button>
                    </div>
                  </fieldset>
                )
              })}
            </div>
          </div>
        </div>
      </main>
    )
  }
}
