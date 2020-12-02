import React from 'react';
import { useQuery } from '@apollo/react-hooks';

import Dashboard from './Dashboard';
import Login from './components/Login/Login';
import { IS_LOGGED_IN_QUERY } from './gql/Query';

const App = () => {
  const { data, loading, error } = useQuery(IS_LOGGED_IN_QUERY);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>ERROR</p>;

  return <div>{data.isLoggedIn ? <Dashboard /> : <Login />}</div>;
};

export default App;
