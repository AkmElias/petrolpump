import React from 'react';
import { useMutation } from '@apollo/react-hooks';
import { useForm } from 'react-hook-form';
import { withRouter } from 'react-router-dom';

import './Login.scss';
import { LOGIN_MUTATION } from '../../gql/Mutation';

const Login = () => {
  const { register, handleSubmit, errors } = useForm();

  const [tokenAuth, { client }] = useMutation(LOGIN_MUTATION);

  const onSubmit = async ({ username, password }) => {
    const res = await tokenAuth({ variables: { username, password } });
    localStorage.setItem('authToken', res.data.tokenAuth.token);
    client.writeData({ data: { isLoggedIn: true } });
  };

  return (
    <div className='container login_form'>
      <h2>পেট্রোল পাম্প ম্যানেজমেন্টে আপনাকে স্বাগতম</h2>
      <div className='login_form-header'>
        <i className='fas fa-sign-in-alt'></i>
        <h3>দয়া করে লগইন করুন</h3>
      </div>
      <form className='form-input' onSubmit={handleSubmit(onSubmit)}>
        <div className='universal_form-input'>
          <label htmlFor='dayEndReading'>ইউজারনেম</label>
          <input
            type='text'
            name='username'
            placeholder='আপনার ইউজারনেম দিন'
            ref={register({ required: true })}
          />
          {errors.username && (
            <p className='error-message'>ইউজারনেম অবশ্যই লাগবে</p>
          )}
        </div>

        <div className='universal_form-input'>
          <label htmlFor='dayEndReading'>পাসওয়ার্ড</label>
          <input
            type='password'
            name='password'
            placeholder='আপনার পাসওয়ার্ড দিন'
            ref={register({ required: true })}
          />
          {errors.password && (
            <p className='error-message'>পাসওয়ার্ড অবশ্যই লাগবে</p>
          )}
        </div>

        <button type='submit'>লগইন</button>
      </form>
    </div>
  );
};

export default withRouter(Login);
