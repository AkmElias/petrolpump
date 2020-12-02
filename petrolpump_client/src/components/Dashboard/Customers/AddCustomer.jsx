import React from 'react';
import { useMutation } from '@apollo/react-hooks';
import { useForm } from 'react-hook-form';

import { ADD_DUE_CUSTOMER_MUTATION } from '../../../gql/Mutation';

const AddCustomer = () => {
  const { register, handleSubmit, reset, errors } = useForm();
  const [createDueCustomer] = useMutation(ADD_DUE_CUSTOMER_MUTATION);

  const onSubmit = async ({
    customerName,
    customerAddress,
    contactPersonName,
    contactPersonDesignation,
    contactNumber,
    allowableCredit,
    remarks,
  }) => {
    await createDueCustomer({
      variables: {
        customerName,
        customerAddress,
        contactPersonName,
        contactPersonDesignation,
        contactNumber,
        allowableCredit,
        remarks,
      },
    });
    reset();
  };

  return (
    <div className='controlled-form common-border-pad common-bg'>
      <h1>ক্রেডিট কাস্টমার অ্যাড করুন</h1>
      <form className='form-input' onSubmit={handleSubmit(onSubmit)}>
        <div className='universal_form-input'>
          <label htmlFor='customerName'>কাস্টমারের নাম</label>
          <input
            type='text'
            name='customerName'
            id='customerName'
            placeholder='কাস্টমারের নাম প্রবেশ করুন'
            ref={register({ required: true })}
          />
          {errors.customerName && (
            <p className='error-message'>কাস্টমারের নাম অবশ্যই লাগবে</p>
          )}
        </div>

        <div className='universal_form-input'>
          <label htmlFor='customerAddress'>কাস্টমারের ঠিকানা</label>
          <input
            type='text'
            name='customerAddress'
            id='customerAddress'
            placeholder='কাস্টমারের ঠিকানা প্রবেশ করুন'
            ref={register({ required: true })}
          />
          {errors.customerAddress && (
            <p className='error-message'>কাস্টমারের ঠিকানা অবশ্যই লাগবে</p>
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
          <label htmlFor='contactNumber'>যোগাযোগ নাম্বার</label>
          <input
            type='text'
            name='contactNumber'
            id='contactNumber'
            placeholder='যোগাযোগ নাম্বার প্রবেশ করুন'
            ref={register({ required: true })}
          />
          {errors.contactNumber && (
            <p className='error-message'>যোগাযোগ নাম্বার অবশ্যই লাগবে</p>
          )}
        </div>

        <div className='universal_form-input'>
          <label htmlFor='allowableCredit'>অনুমদিত ক্রেডিট</label>
          <input
            type='number'
            name='allowableCredit'
            id='allowableCredit'
            placeholder='অনুমিত ক্রেডিট প্রবেশ করুন'
            ref={register({ required: true })}
          />
          {errors.allowableCredit && (
            <p className='error-message'>অনুমদিত ক্রেডিট অবশ্যই লাগবে</p>
          )}
        </div>

        <div className='universal_form-input'>
          <label htmlFor='remarks'>কাস্টমার সম্পর্কে মন্তব্য</label>
          <input
            type='text'
            name='remarks'
            id='remarks'
            placeholder='কাস্টমার সম্পর্কে মন্তব্য প্রবেশ করুন'
            ref={register({ required: true })}
          />
          {errors.remarks && (
            <p className='error-message'>
              কাস্টমার সম্পর্কে মন্তব্য অবশ্যই লাগবে
            </p>
          )}
        </div>
        <button type='submit'>সাবমিট</button>
      </form>
    </div>
  );
};

export default AddCustomer;
