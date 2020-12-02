import React, { useState } from 'react';
import ExpenditureLists from './ExpenditureLists/ExpenditureLists';

const AddDailyExpenditure = () => {
  const [particulars, setParticulars] = useState([
    {
      particular: 'Wages',
      open: false,
      openSubmission: false,
    },
    {
      particular: 'Salary',
      open: false,
      openSubmission: false,
    },
    {
      particular: 'Rent',
      open: false,
      openSubmission: false,
    },
    {
      particular: 'Conveyance',
      open: false,
      openSubmission: false,
    },
    {
      particular: 'Transportation',
      open: false,
      openSubmission: false,
    },
    {
      particular: 'Repair & Maintenance',
      open: false,
      openSubmission: false,
    },
    {
      particular: 'Donation',
      open: false,
      openSubmission: false,
    },
    {
      particular: 'Entertainment',
      open: false,
      openSubmission: false,
    },
    {
      particular: 'Legal Expense',
      open: false,
      openSubmission: false,
    },
    {
      particular: 'Printing & Stationary',
      open: false,
      openSubmission: false,
    },
    {
      particular: 'Courier',
      open: false,
      openSubmission: false,
    },
    {
      particular: 'Insurance',
      open: false,
      openSubmission: false,
    },
    {
      particular: 'Newspaper',
      open: false,
      openSubmission: false,
    },
    {
      particular: 'Telephone/Internet',
      open: false,
      openSubmission: false,
    },
    {
      particular: 'Utility',
      open: false,
      openSubmission: false,
    },
    {
      particular: 'Advertisement',
      open: false,
      openSubmission: false,
    },
    {
      particular: 'Miscellaneous',
      open: false,
      openSubmission: false,
    },
  ]);

  const toggleExpenditure = (index) => {
    setParticulars(
      particulars.map((particular, i) => {
        if (i === index) {
          particular.open = !particular.open;
          particular.openSubmission = false;
        } else {
          particular.open = false;
          particular.openSubmission = false;
        }

        return particular;
      })
    );
  };

  const toggleExpenditureFormSubmission = (index) => {
    setParticulars(
      particulars.map((particular, i) => {
        if (i === index) {
          particular.openSubmission = !particular.openSubmission;
          particular.open = false;
        } else {
          particular.openSubmission = false;
          particular.open = false;
        }

        return particular;
      })
    );
  };

  return (
    <div className='controlled-form common-border-pad common-bg'>
      <h1>দৈনিক খরচ যোগ করুন</h1>

      {particulars.map((particular, i) => (
        <ExpenditureLists
          particular={particular}
          index={i}
          key={i}
          toggleExpenditure={toggleExpenditure}
          toggleExpenditureFormSubmission={toggleExpenditureFormSubmission}
        />
      ))}
    </div>
  );
};

export default AddDailyExpenditure;
