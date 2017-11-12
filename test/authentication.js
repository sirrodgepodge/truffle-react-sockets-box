var TwitterPost = artifacts.require("./TwitterPost.sol");

contract('TwitterPost', function(accounts) {
  it("should add post", function() {
    return TwitterPost.deployed().then(twitterPostInstance =>
      twitterPostInstance.addPost('testAuthor', 'testContent')
        .then(() => twitterPostInstance.getPosts())
        .then(([authors, contents]) => {
          assert.equal(web3.toAscii(authors[0]).replace(/\0/g, ''), 'testAuthor', "The author is added to the post");
          assert.equal(web3.toAscii(contents[0]).replace(/\0/g, ''), 'testContent', "The content is added to the post");
        })
    )
  });

  it("should update post", function() {
    return TwitterPost.deployed().then(twitterPostInstance =>
      twitterPostInstance.addPost('testAuthor', 'testContent')
        .then(() => twitterPostInstance.updatePost('testAuthor2', 'testContent2', 0))
        .then(() => twitterPostInstance.getPosts())
        .then(([authors, contents]) => {
          assert.equal(web3.toAscii(authors[0]).replace(/\0/g, ''), 'testAuthor2', "The author is updated in post");
          assert.equal(web3.toAscii(contents[0]).replace(/\0/g, ''), 'testContent2', "The content is updated in post");
        })
    )
  });
});
