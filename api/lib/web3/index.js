import Web3 from 'web3';
import contract from 'truffle-contract';
import TwitterPost from '../../../build/contracts/TwitterPost.json';

const localProvider = new Web3.providers.HttpProvider('http://localhost:8545');
export const web3 = new Web3(localProvider);

const twitterPostContract = contract(TwitterPost);
twitterPostContract.setProvider(localProvider);
export const twitterPostInstancePromise = twitterPostContract.deployed();
