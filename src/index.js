// noinspection NpmUsedModulesInstalled
import React from 'react';
// noinspection NpmUsedModulesInstalled
import ReactDOM from 'react-dom';
import { ApolloProvider } from 'react-apollo';
import client from './apollo';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import './index.css';

ReactDOM.render(
  <ApolloProvider client={client}>
    <App/>
  </ApolloProvider>,
  document.getElementById('root')
);
registerServiceWorker();
