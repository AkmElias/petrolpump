import React from 'react';
import { useMutation, useQuery } from '@apollo/react-hooks';
import { useForm } from 'react-hook-form';

import { ADD_PRODUCT_MUTATION } from '../../../gql/Mutation';
import {
  ALL_PRODUCT_CATEGORY_QUERY,
  ALL_PRODUCT_SUPPLIER_QUERY,
} from '../../../gql/Query';

const AddProduct = () => {
  const { register, handleSubmit, reset, errors } = useForm();

  const [createProduct] = useMutation(ADD_PRODUCT_MUTATION);

  const {
    data: allProductCategories,
    error: productCategoriesError,
    loading: productCategoriesLoading,
  } = useQuery(ALL_PRODUCT_CATEGORY_QUERY);

  const {
    data: allSuppliers,
    error: supplierError,
    loading: supplierLoading,
  } = useQuery(ALL_PRODUCT_SUPPLIER_QUERY);

  if (productCategoriesLoading || supplierLoading) return <p>Loading...</p>;
  if (productCategoriesError || supplierError) return <p>Error...</p>;

  const onSubmit = async ({
    productCategory,
    productSupplier,
    productQuantity,
    purchasePrice,
    sellingPrice,
    unit,
  }) => {
    await createProduct({
      variables: {
        productCategory,
        productSupplier,
        productQuantity,
        purchasePrice,
        sellingPrice,
        unit,
      },
    });

    reset();
  };

  return (
    <div className='controlled-form common-border-pad common-bg'>
      <h1>নতুন প্রোডাক্ট অ্যাড করুন</h1>
      <form className='form-input' onSubmit={handleSubmit(onSubmit)}>
        <div className='universal_form-input'>
          <label htmlFor='productCategory'>প্রোডাক্ট ক্যাটাগরি</label>
          <select name='productCategory' ref={register({ required: true })}>
            <option>প্রোডাক্ট ক্যাটাগরি প্রবেশ করুন</option>
            {allProductCategories.productCategories.map((product) => (
              <option value={product.id} key={product.id}>
                {product.category}
              </option>
            ))}
          </select>
          {errors.productCategory && (
            <p className='error-message'>ক্যাটাগরি অবশ্যই লাগবে</p>
          )}
        </div>

        <div className='universal_form-input'>
          <label htmlFor='productSupplier'>প্রোডাক্ট সাপ্লাইয়ার</label>
          <select name='productSupplier' ref={register({ required: true })}>
            <option value>প্রোডাক্ট সাপ্লাইয়ার প্রবেশ করুন</option>
            {allSuppliers.suppliers.map((supplier) => (
              <option value={supplier.id} key={supplier.id}>
                {supplier.companyName}
              </option>
            ))}
          </select>
          {errors.productSupplier && (
            <p className='error-message'>প্রোডাক্ট সাপ্লাইয়ার অবশ্যই লাগবে</p>
          )}
        </div>

        <div className='universal_form-input'>
          <label htmlFor='productQuantity'>প্রোডাক্ট কোয়ান্টিটি</label>
          <input
            type='number'
            name='productQuantity'
            id='productQuantity'
            placeholder='প্রোডাক্ট কোয়ান্টিটি প্রবেশ করুন'
            ref={register({ required: true })}
          />
          {errors.productQuantity && (
            <p className='error-message'>প্রোডাক্ট কোয়ান্টিটি অবশ্যই লাগবে</p>
          )}
        </div>

        <div className='universal_form-input'>
          <label htmlFor='unit'>ইউনিট</label>
          <select name='unit' ref={register}>
            <optgroup>
              <option value>ইউনিট</option>
              <option value='Piece'>Piece</option>
              <option value='Litre'>Litre</option>
              <option value='Cubic Meter'>Cubic Meter</option>
              <option value='Kg'>Kg</option>
            </optgroup>
            <optgroup label='Bottle'>
              <option value='1 Litre'>1 Litre</option>
              <option value='2 Litre'>2 Litre</option>
              <option value='3 Litre'>3 Litre</option>
              <option value='5 Litre'>5 Litre</option>
            </optgroup>
          </select>
          {errors.unit && <p className='error-message'>ইউনিট অবশ্যই লাগবে</p>}
        </div>

        <div className='universal_form-input'>
          <label htmlFor='purchasePrice'>কেনা দাম</label>
          <input
            type='number'
            name='purchasePrice'
            id='purchasePrice'
            placeholder='কেনা দাম প্রবেশ করুন'
            ref={register({ required: true })}
          />
          {errors.purchasePrice && (
            <p className='error-message'>কেনা দাম অবশ্যই লাগবে</p>
          )}
        </div>

        <div className='universal_form-input'>
          <label htmlFor='sellingPrice'>বিক্রির দাম</label>
          <input
            type='number'
            name='sellingPrice'
            id='sellingPrice'
            placeholder='বিক্রির দাম প্রবেশ করুন'
            ref={register({ required: true })}
          />
          {errors.sellingPrice && (
            <p className='error-message'>বিক্রির দাম অবশ্যই লাগবে</p>
          )}
        </div>

        <button type='submit'>সাবমিট</button>
      </form>
    </div>
  );
};

export default AddProduct;
