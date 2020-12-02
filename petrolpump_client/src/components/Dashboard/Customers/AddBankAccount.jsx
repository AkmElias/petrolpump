import React from 'react';
import { useMutation, useQuery } from '@apollo/react-hooks';
import { useForm } from 'react-hook-form';

import { ALL_DUE_CUSTOMER_QUERY } from '../../../gql/Query';
import { ADD_BANK_ACCOUNT_MUTATION } from '../../../gql/Mutation';

const AddBankAccount = () => {
  const { register, handleSubmit, reset, errors } = useForm();
  const [createBankAccount] = useMutation(ADD_BANK_ACCOUNT_MUTATION);

  const onSubmit = async ({
    dueCustomer,
    accountName,
    bankName,
    accountNumber,
    accountType,
    branchName,
    currentBalance,
  }) => {
    await createBankAccount({
      variables: {
        dueCustomer,
        accountName,
        bankName,
        accountNumber,
        accountType,
        branchName,
        currentBalance,
      },
    });
    reset();
  };

  const {
    data: allDueCustomers,
    loading: dueCustomersLoading,
    error: dueCustomerError,
  } = useQuery(ALL_DUE_CUSTOMER_QUERY);

  if (dueCustomersLoading) return <p>Loading...</p>;
  if (dueCustomerError) return <p>Error..</p>;
  return (
    <div className='controlled-form common-border-pad common-bg'>
      <h1>ব্যাংক একাউন্ট অ্যাড করুন</h1>
      <form className='form-input' onSubmit={handleSubmit(onSubmit)}>
        <div className='universal_form-input'>
          <label htmlFor='dueCustomer'>ক্রেডিট কাস্টমার</label>
          <select name='dueCustomer' ref={register({ required: true })}>
            <option>ক্রেডিট কাস্টমার প্রবেশ করুন</option>
            {allDueCustomers.dueCustomers.map((customer) => (
              <option value={customer.id} key={customer.id}>
                {customer.customerName}
              </option>
            ))}
          </select>
          {errors.dueCustomer && (
            <p className='error-message'>ক্রেডিট কাস্টমার অবশ্যই লাগবে</p>
          )}
        </div>

        <div className='universal_form-input'>
          <label htmlFor='bankName'>ব্যাংক এর নাম</label>
          <input
            type='text'
            name='bankName'
            id='bankName'
            placeholder='ব্যাংক এর নাম প্রবেশ করুন'
            ref={register({ required: true })}
          />
          {errors.bankName && (
            <p className='error-message'>ব্যাংক এর নাম অবশ্যই লাগবে</p>
          )}
        </div>

        <div className='universal_form-input'>
          <label htmlFor='branchName'>ব্রাঞ্চ এর নাম</label>
          <input
            type='text'
            name='branchName'
            id='branchName'
            placeholder='ব্রাঞ্চ এর নাম প্রবেশ করুন'
            ref={register({ required: true })}
          />
          {errors.branchName && (
            <p className='error-message'>ব্রাঞ্চ এর নাম অবশ্যই লাগবে</p>
          )}
        </div>

        <div className='universal_form-input'>
          <label htmlFor='accountName'>একাউন্ট এর নাম</label>
          <input
            type='text'
            name='accountName'
            id='accountName'
            placeholder='একাউন্ট এর নাম প্রবেশ করুন'
            ref={register({ required: true })}
          />
          {errors.accountName && (
            <p className='error-message'>একাউন্ট এর নাম অবশ্যই লাগবে</p>
          )}
        </div>

        <div className='universal_form-input'>
          <label htmlFor='accountNumber'>একাউন্ট নং</label>
          <input
            type='number'
            name='accountNumber'
            id='accountNumber'
            placeholder='একাউন্ট নং প্রবেশ করুন'
            ref={register({ required: true })}
          />
          {errors.accountNumber && (
            <p className='error-message'>একাউন্ট নং অবশ্যই লাগবে</p>
          )}
        </div>

        <div className='universal_form-input'>
          <label htmlFor='currentBalance'>বর্তমান ব্যালেন্স</label>
          <input
            type='number'
            name='currentBalance'
            id='currentBalance'
            placeholder='বর্তমান ব্যালেন্স প্রবেশ করুন'
            ref={register({ required: true })}
          />
          {errors.currentBalance && (
            <p className='error-message'>বর্তমান ব্যালেন্স অবশ্যই লাগবে</p>
          )}
        </div>

        <div className='universal_form-input'>
          <label htmlFor='accountType'></label>
          <select name='accountType' ref={register({ required: true })}>
            <option>একাউন্ট এর ধরন</option>
            <option value='Cash'>Cash</option>
            <option value='Loan'>Loan</option>
          </select>
          {errors.accountType && (
            <p className='error-message'>একাউন্ট ধরন অবশ্যই লাগবে</p>
          )}
        </div>
        <button type='submit'>সাবমিট</button>
      </form>
    </div>
  );
};

export default AddBankAccount;
