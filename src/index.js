import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import { syncHistoryWithStore } from 'react-router-redux';
import getWeb3 from './web3/getWeb3';

// Layouts
import App from './App';
import Home from './Home';
import Posts from './Posts';

// Redux Store
import store from './store';

// Sockets for listening to contract events
import socketsInit from './socket';
socketsInit(store.dispatch);

// Initialize react-router-redux.
const history = syncHistoryWithStore(browserHistory, store);

getWeb3
  .then(() => console.log('Web3 initialized!'))
  .catch(() => console.log('Error in web3 initialization.'));

ReactDOM.render((
    <Provider store={store}>
      <Router history={history}>
        <Route path="/" component={App}>
          <IndexRoute component={Home} />
          <Route path="postslist" component={Posts} />
        </Route>
      </Router>
    </Provider>
  ),
  document.getElementById('root')
);
