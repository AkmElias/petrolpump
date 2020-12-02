import React from 'react';
import { ApolloConsumer } from '@apollo/react-hooks';
import { withRouter } from 'react-router-dom';

import './Signout.scss';

const Signout = (props) => {
  const handleSignout = (client) => {
    localStorage.removeItem('authToken');
    client.writeData({
      data: {
        isLoggedIn: false,
      },
    });
    props.history.push('/');
    window.location.reload();
  };

  return (
    <ApolloConsumer>
      {(client) => (
        <button type='button' onClick={() => handleSignout(client)}>
          <i className='fas fa-sign-out-alt' title='লগআউট করুন'></i>
        </button>
      )}
    </ApolloConsumer>
  );
};

export default withRouter(Signout);
