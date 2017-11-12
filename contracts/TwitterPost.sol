pragma solidity ^0.4.2;

import './zeppelin/lifecycle/Killable.sol';

contract TwitterPost is Killable {
  Post[] public posts;

  event ADD_POST(bytes32 author, bytes32 content);
  event UPDATE_POST(bytes32 author, bytes32 content, uint index);

  struct Post {
    bytes32 author;
    bytes32 content;
  }

  function addPost(bytes32 _author, bytes32 _content) public payable returns (bool success) {
    Post memory newPost;
    newPost.author = _author;
    newPost.content = _content;
    posts.push(newPost);

    ADD_POST(_author, _content);
    return true;
  }

  function updatePost(bytes32 _author, bytes32 _content, uint8 _index) public payable returns (bool success) {
    if(_index > posts.length - 1) {
      revert(); // handle non-existent index
    }

    posts[_index].author = _author;
    posts[_index].content = _content;

    UPDATE_POST(_author, _content, _index);
    return true;
  }

  function getPosts() constant public returns (bytes32[], bytes32[]) {
    uint postsLength = posts.length;

    bytes32[] memory authors = new bytes32[](postsLength);
    bytes32[] memory contents = new bytes32[](postsLength);

    for (uint i = 0; i < postsLength; i++) {
      Post memory currentPost = posts[i];
      authors[i] = currentPost.author;
      contents[i] = currentPost.content;
    }

    return (authors, contents);
  }
}
