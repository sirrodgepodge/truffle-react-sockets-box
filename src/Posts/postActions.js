import TwitterPostContract from '../../build/contracts/TwitterPost.json';
import contract from 'truffle-contract';
import getWeb3 from '../web3/getWeb3';
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
let twitterPostContract;

// using truffle-contract we create the twitterPostContract object.
async function setTwitterPostContract() {
  if (twitterPostContract) return Promise.resolve();

  const web3 = await getWeb3;

  const twitterPostContractApi = contract(TwitterPostContract);
  twitterPostContractApi.setProvider(web3.currentProvider);

  twitterPostContract = await twitterPostContractApi.deployed();
}


// caching
let coinbaseAddress;

async function setCoinbase() {
  if (coinbaseAddress) return Promise.resolve();

  const web3 = await getWeb3;

  return new Promise((resolve, reject) =>
    web3.eth.getCoinbase((err, coinbase) => {
      if (err) return reject(err);
      coinbaseAddress = coinbase;
      resolve();
    })
  );
}


export function getPosts() {
  return async function asyncUpdatePost(dispatch) {
    await Promise.all([setTwitterPostContract(), setCoinbase()]);

    // Attempt to login user.
    const [authors, contents] = await twitterPostContract.getPosts()
    const posts = authors.map((author, i) => ({
      author: window.web3.toAscii(author),
      content: window.web3.toAscii(contents[i])
    }));

    dispatch(postsLoaded(posts));
  }
}

export function addPost({ author, content }) {
  return async function asyncUpdatePost(dispatch) {
    await Promise.all([setTwitterPostContract(), setCoinbase()]);

    twitterPostContract.addPost(author, content, { from: coinbaseAddress })
      .catch(console.error)
  }
}

export function updatePost({ author, content }, index) {
  return async function asyncUpdatePost(dispatch) {
    await Promise.all([setTwitterPostContract(), setCoinbase()]);

    twitterPostContract.updatePost(author, content, index, { from: coinbaseAddress })
      .catch(console.error);
  }
}
