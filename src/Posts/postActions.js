import TwitterPostContract from '../../build/contracts/TwitterPost.json';
import contract from 'truffle-contract';
import getWeb3 from '../util/web3/getWeb3';
import {
  POSTS_LOADED,
  SET_UPDATING
} from './postActionTypes';


function postsLoaded(posts) {
  return {
    type: POSTS_LOADED,
    payload: {
      posts
    }
  };
}

export function setUpdating(index) {
  return {
    type: SET_UPDATING,
    payload: {
      index,
    }
  };
}

// caching
let twitterPostInstance;

// using truffle-contract we create the twitterPostInstance object.
function getTwitterPostInstance() {
  if (twitterPostInstance) return Promise.resolve();

  return getWeb3.then(web3 => {
    const twitterPostContract = contract(TwitterPostContract);
    twitterPostContract.setProvider(web3.currentProvider);

    return twitterPostContract.deployed().then(instance => {
      twitterPostInstance = instance;
    });
  });
}


// caching
let coinbaseAddress;

function getCoinbase() {
  if (coinbaseAddress) return Promise.resolve();

  return getWeb3.then(web3 => {
    return new Promise((resolve, reject) => {
      return web3.eth.getCoinbase((error, coinbase) => {
        if (error) return reject(error);
        coinbaseAddress = coinbase;
        resolve(coinbase);
      });
    })
  });
}


export function getPosts() {
  return function asyncUpdatePost(dispatch) {
    Promise.all([getTwitterPostInstance(), getCoinbase()])
      .then(() =>
        // Attempt to login user.
        twitterPostInstance.getPosts().then((res) => {
          const [authors, contents] = res;
          const posts = authors.map((author, i) => ({
            author: window.web3.toAscii(author),
            content: window.web3.toAscii(contents[i])
          }));
          dispatch(postsLoaded(posts));
        })
        .catch(error => {
          console.error(error);
        })
      );
  }
}

export function addPost({ author, content }) {
  return function asyncUpdatePost(dispatch) {
    Promise.all([getTwitterPostInstance(), getCoinbase()])
      .then(() =>
        // Attempt to login user.
        twitterPostInstance.addPost(author, content, { from: coinbaseAddress })
          .catch(error => {
            console.error(error);
          })
      );
  }
}

export function updatePost({ author, content }, index) {
  return function asyncUpdatePost(dispatch) {
    Promise.all([getTwitterPostInstance(), getCoinbase()])
      .then(() =>
        // Attempt to login user.
        twitterPostInstance.updatePost(author, content, index, { from: coinbaseAddress })
          .catch(error => {
            console.error(error);
          })
      );
  }
}
