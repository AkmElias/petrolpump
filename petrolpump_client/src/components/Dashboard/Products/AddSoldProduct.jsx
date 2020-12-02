import React from 'react';
import { useMutation, useQuery } from '@apollo/react-hooks';
import { useForm } from 'react-hook-form';

import { ALL_PRODUCT_QUERY } from '../../../gql/Query';

const AddSoldProduct = () => {
  const { register, handleSubmit, errors } = useForm();

  const {
    data: allProducts,
    error: productError,
    loading: productLoading,
  } = useQuery(ALL_PRODUCT_QUERY);

  if (productLoading) return <p>Loading...</p>;
  if (productError) return <p>Error...</p>;

  const onSubmit = async ({}) => {
    console.log('Hi');
  };

  return (
    <div className='controlled-form common-border-pad common-bg'>
      <h1>বিক্রিত পণ্য অ্যাড করুন</h1>
      <form className='form-input' onSubmit={handleSubmit(onSubmit)}>
        <div className='universal_form-input'>
          <label htmlFor='product'>কোন পণ্য বিক্রি করেছেন</label>
          <select name='product' ref={register({ required: true })}>
            <option>বিক্রিত পণ্য প্রবেশ করুন</option>
            {allProducts.products.map((product) => (
              <option value={product.id} key={product.id}>
                {product.productCategory.category}
              </option>
            ))}
          </select>
          {errors.productCategory && (
            <p className='error-message'>ক্যাটাগরি অবশ্যই লাগবে</p>
          )}
        </div>

        <div className='universal_form-input'>
          <label htmlFor='soldProductQuantity'>কতটুকু বিক্রি করেছেন</label>
          <input
            type='number'
            placeholder='বিক্রিত পণ্যের পরিমাণ প্রবেশ করুন'
            name='soldProductQuantity'
            id='soldProductQuantity'
            ref={register({ required: true })}
          />
          {errors.soldProductQuantity && (
            <p className='error-message'>বিক্রিত পণ্যের পরিমাণ অবশ্যই লাগবে</p>
          )}
        </div>

        <button type='submit'>সাবমিট</button>
      </form>
    </div>
  );
};

export default AddSoldProduct;
