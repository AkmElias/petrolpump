import React from 'react';
import { useMutation } from '@apollo/react-hooks';
import { useForm } from 'react-hook-form';

import { ADD_PRODUCT_SUPPLIER_MUTATION } from '../../../gql/Mutation';

const AddProductSupplier = () => {
  const { register, handleSubmit, reset, errors } = useForm();

  const [createSupplier] = useMutation(ADD_PRODUCT_SUPPLIER_MUTATION);

  const onSubmit = async ({
    companyName,
    companyAddress,
    contactPersonName,
    contactPersonContactInfo,
    contactPersonDesignation,
    companyBankName,
    companyBankBranchName,
    companyBankAccountName,
    companyBankAccountNumber,
    companyBankRoutingNumber,
    methodOfPayment,
  }) => {
    await createSupplier({
      variables: {
        companyName,
        companyAddress,
        contactPersonName,
        contactPersonContactInfo,
        contactPersonDesignation,
        companyBankName,
        companyBankBranchName,
        companyBankAccountName,
        companyBankAccountNumber,
        companyBankRoutingNumber,
        methodOfPayment,
      },
    });

    reset();
  };

  return (
    <div className='controlled-form common-border-pad common-bg'>
      <h1>প্রোডাক্ট সাপ্লাএয়ার অ্যাড করুন</h1>

      <form className='form-input' onSubmit={handleSubmit(onSubmit)}>
        <div className='universal_form-input'>
          <label htmlFor='companyName'>কোম্পানির নাম</label>
          <input
            type='text'
            name='companyName'
            id='companyName'
            placeholder='কোম্পানির নাম প্রবেশ করুন'
            ref={register({ required: true })}
          />
          {errors.companyName && (
            <p className='error-message'>কোম্পানির নাম অবশ্যই লাগবে</p>
          )}
        </div>

        <div className='universal_form-input'>
          <label htmlFor='companyAddress'>কোম্পানির ঠিকানা</label>
          <input
            type='text'
            name='companyAddress'
            id='companyAddress'
            placeholder='কোম্পানির ঠিকানা প্রবেশ করুন'
            ref={register({ required: true })}
          />
          {errors.companyAddress && (
            <p className='error-message'>কোম্পানির ঠিকানা অবশ্যই লাগবে</p>
          )}
        </div>

        <div className='universal_form-input'>
          <label htmlFor='contactPersonName'>যোগাযোগকারী ব্যক্তির নাম</label>
          <input
            type='text'
            name='contactPersonName'
            id='contactPersonName'
            placeholder='যোগাযোগকারী ব্যক্তির নাম প্রবেশ করুন'
            ref={register({ required: true })}
          />
          {errors.contactPersonName && (
            <p className='error-message'>
              যোগাযোগকারী ব্যক্তির নাম অবশ্যই লাগবে
            </p>
          )}
        </div>

        <div className='universal_form-input'>
          <label htmlFor='contactPersonContactInfo'>
            যোগাযোগকারী ব্যক্তির তথ্য/ফোন
          </label>
          <input
            type='text'
            name='contactPersonContactInfo'
            id='contactPersonContactInfo'
            placeholder='যোগাযোগকারী ব্যক্তির তথ্য/ফোন প্রবেশ করুন'
            ref={register({ required: true })}
          />
          {errors.contactPersonContactInfo && (
            <p className='error-message'>
              যোগাযোগকারী ব্যক্তির তথ্য/ফোন অবশ্যই লাগবে
            </p>
          )}
        </div>

        <div className='universal_form-input'>
          <label htmlFor='contactPersonDesignation'>
            যোগাযোগকারী ব্যক্তির পদ
          </label>
          <input
            type='text'
            name='contactPersonDesignation'
            id='contactPersonDesignation'
            placeholder='যোগাযোগকারী ব্যক্তির পদ প্রবেশ করুন'
            ref={register({ required: true })}
          />
          {errors.contactPersonDesignation && (
            <p className='error-message'>
              যোগাযোগকারী ব্যক্তির পদ অবশ্যই লাগবে
            </p>
          )}
        </div>

        <div className='universal_form-input'>
          <label htmlFor='companyBankName'>কোম্পানির ব্যাংকের নাম</label>
          <input
            type='text'
            name='companyBankName'
            id='companyBankName'
            placeholder='কোম্পানির ব্যাংকের নাম প্রবেশ করুন'
            ref={register}
          />
        </div>

        <div className='universal_form-input'>
          <label htmlFor='companyBankBranchName'>
            কোম্পানির ব্যাংকের ব্রাঞ্চের নাম
          </label>
          <input
            type='text'
            name='companyBankBranchName'
            id='companyBankBranchName'
            placeholder='কোম্পানির ব্যাংকের ব্রাঞ্চের নাম প্রবেশ করুন'
            ref={register}
          />
        </div>

        <div className='universal_form-input'>
          <label htmlFor='companyBankAccountName'>
            কোম্পানির ব্যাংক অ্যাকাউন্ট নাম
          </label>
          <input
            type='text'
            name='companyBankAccountName'
            id='companyBankAccountName'
            placeholder='কোম্পানির ব্যাংক অ্যাকাউন্ট নাম প্রবেশ করুন'
            ref={register}
          />
        </div>

        <div className='universal_form-input'>
          <label htmlFor='companyBankAccountNumber'>
            কোম্পানির ব্যাংক অ্যাকাউন্ট নাম্বার
          </label>
          <input
            type='number'
            name='companyBankAccountNumber'
            id='companyBankAccountNumber'
            placeholder='কোম্পানির ব্যাংক অ্যাকাউন্ট নাম্বার প্রবেশ করুন'
            ref={register}
          />
        </div>

        <div className='universal_form-input'>
          <label htmlFor='companyBankRoutingNumber'>
            কোম্পানির ব্যাংকের রাওউটিং নাম্বার
          </label>
          <input
            type='number'
            name='companyBankRoutingNumber'
            id='companyBankRoutingNumber'
            placeholder='কোম্পানির ব্যাংকের রাওউটিং নাম্বার প্রবেশ করুন'
            ref={register}
          />
        </div>

        <div className='universal_form-input'>
          <label htmlFor='methodOfPayment'>পেমেন্ট সিস্টেম</label>
          <select name='methodOfPayment' ref={register}>
            <option value>পেমেন্ট সিস্টেম প্রবেশ করুন</option>
            <option value='Bank'>Bank</option>
            <option value='Cash'>Cash</option>
            <option value='E-Cash'>E-Cash</option>
          </select>
        </div>

        <button type='submit'>সাবমিট</button>
      </form>
    </div>
  );
};

export default AddProductSupplier;
