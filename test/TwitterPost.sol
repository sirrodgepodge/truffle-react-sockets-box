pragma solidity ^0.4.2;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/TwitterPost.sol";

contract TestTwitterPost {

  function testAddPost() public payable returns (bool testPassed) {
    TwitterPost twitterPost = TwitterPost(DeployedAddresses.TwitterPost());

    bytes32 author = 'testuser';
    bytes32 content = 'content';
    twitterPost.addPost(author, content);
    var (t1, t2) = twitterPost.posts(0);

    uint256 length = 1;
    Assert.equal(t1.length, length, "It should add a blog post."); // not sure if this is working...
    Assert.equal(t2.length, length, "It should add a blog post."); // not sure if this is working...

    return true;
  }

}
