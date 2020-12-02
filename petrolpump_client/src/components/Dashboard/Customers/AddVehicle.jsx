import React from 'react';
import { useMutation, useQuery } from '@apollo/react-hooks';
import { useForm } from 'react-hook-form';

import { ALL_DUE_CUSTOMER_QUERY } from '../../../gql/Query';
import { ADD_DUE_CUSTOMER_VEHICLE_MUTATION } from '../../../gql/Mutation';

const AddVehicle = () => {
  const { register, handleSubmit, errors } = useForm();
  const [createDueCustomerVehicle] = useMutation(
    ADD_DUE_CUSTOMER_VEHICLE_MUTATION
  );

  const onSubmit = async ({
    dueCustomer,
    vehicleRegistrationNumber,
    driverName,
    vehicleType,
  }) => {
    await createDueCustomerVehicle({
      variables: {
        dueCustomer,
        vehicleRegistrationNumber,
        driverName,
        vehicleType,
      },
    });
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
      <h1>গাড়ী অ্যাড করুন</h1>
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
          <label htmlFor='vehicleRegistrationNumber'>রেজিস্ট্রেশন নং</label>
          <input
            type='text'
            name='vehicleRegistrationNumber'
            id='vehicleRegistrationNumber'
            placeholder='রেজিস্ট্রেশন নং প্রবেশ করুন'
            ref={register({ required: true })}
          />
          {errors.vehicleRegistrationNumber && (
            <p className='error-message'>রেজিস্ট্রেশন নং অবশ্যই লাগবে</p>
          )}
        </div>

        <div className='universal_form-input'>
          <label htmlFor='driverName'>ড্রাইভার এর নাম</label>
          <input
            type='text'
            name='driverName'
            id='driverName'
            placeholder='ড্রাইভার এর নাম প্রবেশ করুন'
            ref={register({ required: true })}
          />
          {errors.driverName && (
            <p className='error-message'>ড্রাইভার এর নাম অবশ্যই লাগবে</p>
          )}
        </div>

        <div className='universal_form-input'>
          <label htmlFor='vehicleType'>গাড়ীর ধরন</label>
          <select name='vehicleType' ref={register({ required: true })}>
            <option>গাড়ীর ধরন</option>
            <option value='Car'>Car</option>
            <option value='SUV/Jeep'>SUV/Jeep</option>
            <option value='Truck'>Truck</option>
            <option value='Two wheeler'>Two wheeler</option>
            <option value='Three wheeler'>Three wheeler</option>
          </select>
          {errors.vehicleType && (
            <p className='error-message'>গাড়ীর ধরন অবশ্যই লাগবে</p>
          )}
        </div>
        <button type='submit'>সাবমিট</button>
      </form>
    </div>
  );
};

export default AddVehicle;
