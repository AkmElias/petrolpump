import React, { useState } from 'react';
import { useQuery, useLazyQuery } from '@apollo/react-hooks';

import './AllDailyExpenditures.scss';
import {
  CURRENT_MONTH_EXPENDITURE_LIST,
  EXPENDITURE_BY_SELECTED_MONTH_QUERY,
} from '../../../gql/Query';
import DailyExpenditureForSelectedMonth from './DailyExpenditureForSelectedMonth';
import TableCSVExporter from '../../../helpers/TableCSVExporter';

const particulars = [
  'Wages',
  'Salary',
  'Rent',
  'Conveyance',
  'Transportation',
  'Repair & Maintenance',
  'Donation',
  'Entertainment',
  'Legal Expense',
  'Printing & Stationary',
  'Courier',
  'Insurance',
  'Newspaper',
  'Telephone/Internet',
  'Utility',
  'Advertisement',
  'Miscellaneous',
];

const AllDailyExpenditures = ({ me }) => {
  const { data, loading, error } = useQuery(CURRENT_MONTH_EXPENDITURE_LIST);
  const [
    expenditureListBySelectedMonth,
    { data: expenditureListDataBySelectedMonth },
  ] = useLazyQuery(EXPENDITURE_BY_SELECTED_MONTH_QUERY);

  const [month, setMonth] = useState('');
  const [customMonth, setCustomMonth] = useState('');
  const [customYear, setCustomYear] = useState('');

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error...</p>;

  const getDaysInMonth = () => {
    const year = new Date().getFullYear();
    const month = new Date().getMonth();

    const date = new Date(year, month, 1);
    const days = [];
    while (date.getMonth() === month) {
      days.push(new Date(date));
      date.setDate(date.getDate() + 1);
    }
    return days;
  };

  const getDaysInMonthInUnix = () => {
    const unixDays = [];

    getDaysInMonth().map((day) => {
      const newDate =
        day.getMonth() + 1 + '.' + day.getDate() + '.' + day.getFullYear();

      return unixDays.push(new Date(newDate).getTime() / 1000);
    });

    return unixDays;
  };

  const expenseTotalPerMonth = () => {
    let sum = 0;

    if (data.currentMonthsExpenditureList.length > 0) {
      data.currentMonthsExpenditureList.map(
        (expenditure) => (sum += parseInt(expenditure.amount))
      );
    }

    return sum;
  };

  const expenseTotalPerDayPerCategoryCurrentMonth = (day, expenseDetails) => {
    let sum = 0;

    if (expenseDetails.length > 0) {
      expenseDetails.map(
        (expenditure) =>
          parseInt(expenditure.unixIssuedDate) === day &&
          (sum += parseInt(expenditure.amount))
      );
    }

    return sum;
  };

  const expenseByCategoryCurrentMonth = (particular, day) => {
    if (data.currentMonthsExpenditureList.length > 0) {
      const expenseDetails = data.currentMonthsExpenditureList.filter(
        (expenditure) =>
          expenditure.expenditureCategory === particular.toLowerCase()
      );

      return expenseTotalPerDayPerCategoryCurrentMonth(day, expenseDetails);
    }
  };

  const expenseTotalPerMonthPerCategory = (particular) => {
    let sum = 0;

    if (data.currentMonthsExpenditureList.length > 0) {
      data.currentMonthsExpenditureList.map(
        (expenditure) =>
          expenditure.expenditureCategory === particular.toLowerCase() &&
          (sum += parseInt(expenditure.amount))
      );
    }

    return sum;
  };

  const currentMonthName = () => {
    const today = new Date();
    return today.toLocaleString('default', { month: 'long' });
  };

  const handleDownloadClick = () => {
    const dataTable = document.getElementById('dataTable');
    const exporter = new TableCSVExporter(dataTable);
    const csvOutput = exporter.convertToCSV();

    const csvBlob = new Blob([csvOutput], { type: 'text/csv' });
    const blobURL = URL.createObjectURL(csvBlob);
    const anchorElement = document.createElement('a');

    const year = new Date().getFullYear();

    anchorElement.href = blobURL;
    anchorElement.download = `Expenditure-Report-${currentMonthName()}-${year}.csv`;
    anchorElement.click();

    setTimeout(() => {
      URL.revokeObjectURL(blobURL);
    }, 500);
  };

  const handleMonthAndYearChange = (e) => {
    const monthAndYear = e.target.value;
    const replacedMonthAndYear = monthAndYear.replace('-', '').split('');

    const year = parseInt(replacedMonthAndYear.slice(0, 4).join(''));
    let month = null;
    if (replacedMonthAndYear[4] === '0') {
      month = parseInt(replacedMonthAndYear[5]);
    } else {
      month = parseInt(replacedMonthAndYear.slice(4).join(''));
    }

    const today = new Date(year, month - 1, 1);
    const currentMonthName = today.toLocaleString('default', { month: 'long' });

    setMonth(currentMonthName);
    setCustomMonth(month - 1);
    setCustomYear(year);

    expenditureListBySelectedMonth({ variables: { month, year } });
  };

  return (
    <div className='all-daily-expenditures'>
      <h3>{me.pump.pumpName}</h3>
      <p>
        Expenditure Report:{' '}
        <span>
          {month ? month : currentMonthName()}
          {customYear ? `, ${customYear} ` : `, ${new Date().getFullYear()}`}
        </span>
      </p>
      <p>
        Filter by month and year:{' '}
        <input
          onChange={handleMonthAndYearChange}
          type='month'
          name='monthAndYear'
        />
      </p>

      {expenditureListDataBySelectedMonth ? (
        <DailyExpenditureForSelectedMonth
          customMonth={customMonth}
          customYear={customYear}
          particulars={particulars}
          expenditureListDataBySelectedMonth={
            expenditureListDataBySelectedMonth
          }
        />
      ) : (
        <>
          <div
            style={{ overflowX: 'auto', overflowY: 'auto', height: '50rem' }}
          >
            <table className='table-data' id='dataTable'>
              <thead>
                <tr>
                  <th>Particulars</th>
                  {getDaysInMonth().map((day, index) => (
                    <th key={index}>{index + 1}</th>
                  ))}
                  <th>Total</th>
                </tr>
              </thead>

              <tbody>
                {particulars.map((particular, index) => (
                  <tr key={index}>
                    <td>{particular}</td>
                    {getDaysInMonthInUnix().map((day, index) => (
                      <td key={index}>
                        {expenseByCategoryCurrentMonth(particular, day) === 0
                          ? ''
                          : expenseByCategoryCurrentMonth(particular, day)}
                      </td>
                    ))}
                    <td>{expenseTotalPerMonthPerCategory(particular)}</td>
                  </tr>
                ))}
                <tr style={{ fontWeight: 'bold', fontSize: '2rem' }}>
                  <td>Total</td>
                  <td>{expenseTotalPerMonth()}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <button className='download-button' onClick={handleDownloadClick}>
            Download Report
          </button>
        </>
      )}
    </div>
  );
};

export default AllDailyExpenditures;
