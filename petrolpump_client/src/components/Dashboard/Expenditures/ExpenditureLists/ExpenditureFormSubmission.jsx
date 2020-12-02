import React from 'react';
import { useForm } from 'react-hook-form';
import { useMutation } from '@apollo/react-hooks';

import './ExpenditureFormSubmission.scss';
import { ADD_EXPENDITURE_LIST_MUTATION } from '../../../../gql/Mutation';
import { EXPENDITURE_LIST_BY_CATEGORY_QUERY } from '../../../../gql/Query';

const ExpenditureFormSubmission = ({ particular, index }) => {
  const { register, handleSubmit, reset, errors } = useForm();
  const [createExpenditureList] = useMutation(ADD_EXPENDITURE_LIST_MUTATION, {
    refetchQueries: [{ query: EXPENDITURE_LIST_BY_CATEGORY_QUERY }],
    awaitRefetchQueries: true,
  });

  const generateVoucherNo = () => {
    let dateValue = Date.now();
    return dateValue.toString();
  };

  const onSubmit = async ({
    voucherNo,
    expenditureCategory,
    amount,
    spentBy,
    description,
    methodOfPayment,
    issuedDate,
    approvedBy,
    receivedBy,
  }) => {
    await createExpenditureList({
      variables: {
        voucherNo,
        expenditureCategory,
        amount,
        spentBy,
        description,
        methodOfPayment,
        issuedDate,
        unixIssuedDate:
          new Date(issuedDate.replace(/-/g, '.')).getTime() / 1000,
        approvedBy,
        receivedBy,
      },
    });
    reset();
  };

  return (
    <div className='controlled-form common-border-pad common-bg expenditure-form'>
      <h3>{particular} form submission</h3>
      <form
        className='form-input expenditure-form'
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className='expenditure-form__left'>
          <div className='universal_form-input'>
            <label htmlFor={`voucherNo${index}`}>Voucher No.</label>
            <input
              type='number'
              name='voucherNo'
              defaultValue={generateVoucherNo()}
              id={`voucherNo${index}`}
              disabled
              ref={register({ required: true })}
            />
            {errors.voucherNo && (
              <p className='error-message'>Voucher No. is required</p>
            )}
          </div>

          <div className='universal_form-input'>
            <label htmlFor={`expenditureCategory${index}`}>
              Expenditure Category
            </label>
            <input
              type='text'
              name='expenditureCategory'
              defaultValue={particular.toLowerCase()}
              id={`expenditureCategory${index}`}
              disabled
              ref={register({ required: true })}
            />
            {errors.expenditureCategory && (
              <p className='error-message'>Expenditure Category is required</p>
            )}
          </div>

          <div className='universal_form-input'>
            <label htmlFor={`amount${index}`}>Amount</label>
            <input
              type='number'
              name='amount'
              placeholder='Enter the Amount'
              id={`amount${index}`}
              ref={register({ required: true })}
            />
            {errors.amount && (
              <p className='error-message'>Amount is required</p>
            )}
          </div>

          <div className='universal_form-input'>
            <label htmlFor={`spentBy${index}`}>Spent By</label>
            <input
              type='text'
              name='spentBy'
              placeholder='Enter the name of spent person.'
              id={`spentBy${index}`}
              ref={register({ required: true })}
            />
            {errors.spentBy && (
              <p className='error-message'>Spent by is required</p>
            )}
          </div>

          <div className='universal_form-input'>
            <label htmlFor={`description${index}`}>Description</label>
            <input
              type='text'
              name='description'
              placeholder='Enter a short description about this transaction'
              id={`description${index}`}
              ref={register({ required: true })}
            />
            {errors.description && (
              <p className='error-message'>Description is required</p>
            )}
          </div>
        </div>

        <div className='expenditure-form__right'>
          <div className='universal_form-input'>
            <label htmlFor={`methodOfPayment${index}`}>Method of Payment</label>
            <select name='methodOfPayment' ref={register({ required: true })}>
              <option>Enter Method of Payment</option>
              <option value='Cash'>Cash</option>
              <option value='Bank'>Bank</option>
              <option value='E-Cash'>E-Cash</option>
            </select>{' '}
            {errors.methodOfPayment && (
              <p className='error-message'>Method of payment is required</p>
            )}
          </div>

          <div className='universal_form-input'>
            <label htmlFor={`issuedDate${index}`}>Issued Date</label>
            <input
              type='date'
              name='issuedDate'
              id={`issuedDate${index}`}
              ref={register({ required: true })}
            />
            {errors.issuedDate && (
              <p className='error-message'>Issued date is required</p>
            )}
          </div>

          <div className='universal_form-input'>
            <label htmlFor={`approvedBy${index}`}>Approved By</label>
            <input
              type='text'
              name='approvedBy'
              placeholder='Enter the name of Authority'
              id={`approvedBy${index}`}
              ref={register({ required: true })}
            />
            {errors.approvedBy && (
              <p className='error-message'>Approved By is required</p>
            )}
          </div>

          <div className='universal_form-input'>
            <label htmlFor={`receivedBy${index}`}>Received By</label>
            <input
              type='text'
              name='receivedBy'
              placeholder='Enter the name of receiver'
              id={`receivedBy${index}`}
              ref={register({ required: true })}
            />
            {errors.receivedBy && (
              <p className='error-message'>Received By is required</p>
            )}
          </div>
        </div>
        <div className='expenditure-form__line-break'></div>
        <button type='submit'>সাবমিট</button>
      </form>
    </div>
  );
};

export default ExpenditureFormSubmission;
