import React from 'react';
import { useMutation } from '@apollo/react-hooks';
import { useForm } from 'react-hook-form';

import { ADD_PRODUCT_CATEGORY_MUTATION } from '../../../gql/Mutation';

const AddProductCategory = () => {
  const { register, handleSubmit, reset, errors } = useForm();

  const [createProductCategory] = useMutation(ADD_PRODUCT_CATEGORY_MUTATION);

  const onSubmit = async ({ category }) => {
    await createProductCategory({ variables: { category } });

    reset();
  };

  return (
    <div className='controlled-form common-border-pad common-bg'>
      <h1>নতুন প্রোডাক্ট ক্যাটাগরি অ্যাড করুন</h1>
      <form className='form-input' onSubmit={handleSubmit(onSubmit)}>
        <div className='universal_form-input'>
          <label htmlFor='category'>ক্যাটাগরি</label>
          <input
            type='text'
            name='category'
            id='category'
            placeholder='ক্যাটাগরি প্রবেশ করুন'
            ref={register({ required: true })}
          />
          {errors.category && (
            <p className='error-message'>ক্যাটাগরি অবশ্যই লাগবে</p>
          )}
        </div>
        <button type='submit'>সাবমিট</button>
      </form>
    </div>
  );
};

export default AddProductCategory;
