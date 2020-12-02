import React from 'react';
import { useQuery } from '@apollo/react-hooks';

import './ExpenditureLists.scss';
import { EXPENDITURE_LIST_BY_CATEGORY_QUERY } from '../../../../gql/Query';
import ExpenditureFormSubmission from './ExpenditureFormSubmission';

const ExpenditureLists = ({
  particular: { particular, open, openSubmission },
  index,
  toggleExpenditure,
  toggleExpenditureFormSubmission,
}) => {
  const { data: expenditureList, loading, error } = useQuery(
    EXPENDITURE_LIST_BY_CATEGORY_QUERY,
    {
      variables: { expenditureCategory: particular },
    }
  );

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{`Error! ${error}`}</p>;

  const totalExpense = () => {
    let total = 0;

    expenditureList.expenditureListByCategory.map(
      (list) => (total += list.amount)
    );

    return total;
  };

  return (
    <div
      className={`expenditure ${
        open ? 'open' : '' || openSubmission ? 'open-submission' : ''
      }`}
    >
      <div className='expenditure-list'>
        <div
          className='expenditure-list__add-symbol'
          onClick={() => toggleExpenditureFormSubmission(index)}
        >
          {openSubmission ? <span>&minus;</span> : <span>&#43;</span>}
        </div>
        <div
          className='expenditure-list__particular'
          onClick={() => toggleExpenditure(index)}
        >
          <p>{particular}</p>
        </div>
        <div className='expenditure-list__total-expense'>{totalExpense()}</div>
      </div>

      <div className='expenditure-list__details'>
        {expenditureList.expenditureListByCategory.map((list, i) => (
          <div className='expenditure-list__details-items' key={i}>
            <span>
              {i + 1}. {list.receivedBy}
            </span>
            <span>{list.amount}</span>
          </div>
        ))}
        <p>Total: {totalExpense()}</p>
      </div>

      <div className='expenditure-list__form-submission'>
        <ExpenditureFormSubmission particular={particular} index={index} />
      </div>
    </div>
  );
};

export default ExpenditureLists;
