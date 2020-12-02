import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloProvider } from '@apollo/react-hooks';
import ApolloClient from 'apollo-boost';
import { BrowserRouter } from 'react-router-dom';

import './index.scss';
import App from './App';

const client = new ApolloClient({
  uri: 'http://127.0.0.1:8000/graphql/',
  clientState: {
    defaults: {
      isLoggedIn: !!localStorage.getItem('authToken'),
    },
  },
  fetchOptions: {
    credentials: 'include',
  },
  request: (operation) => {
    const token = localStorage.getItem('authToken') || '';
    operation.setContext({
      headers: {
        Authorization: `JWT ${token}`,
      },
    });
  },
});

ReactDOM.render(
  <BrowserRouter>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </BrowserRouter>,
  document.getElementById('root')
);
