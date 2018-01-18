import Web3 from 'web3';


let web3Instance;
export default new Promise((resolve, reject) => {
  // Wait for loading completion to avoid race conditions with web3 injection timing.
  if (web3Instance) return resolve(web3Instance);

  window.addEventListener('load', function onLoad(dispatch) {
    window.removeEventListener('load', onLoad);

    var web3 = window.web3;

    if (typeof web3 === 'undefined') {
      throw new Error('Install MetaMask Chrome Extension!');
    }

    // Use Mist/MetaMask's provider injected by chrome extension.
    web3 = new Web3(web3.currentProvider);

    console.log('Injected web3 detected.');

    web3Instance = web3;
    resolve(web3);
  })
});
