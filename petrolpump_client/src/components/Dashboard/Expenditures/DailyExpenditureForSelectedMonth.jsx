import React from 'react';
import TableCSVExporter from '../../../helpers/TableCSVExporter';

const DailyExpenditureForSelectedMonth = ({
  customMonth,
  customYear,
  particulars,
  expenditureListDataBySelectedMonth,
}) => {
  const getDaysInMonth = () => {
    const date = new Date(customYear, customMonth, 1);
    const days = [];
    while (date.getMonth() === customMonth) {
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

  const expenseTotalPerDayPerCategory = (day, expenseDetails) => {
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

  const expenseByCategory = (particular, day) => {
    if (
      expenditureListDataBySelectedMonth.expenditureListBySelectedMonth.length >
      0
    ) {
      const expenseDetails = expenditureListDataBySelectedMonth.expenditureListBySelectedMonth.filter(
        (expenditure) =>
          expenditure.expenditureCategory === particular.toLowerCase()
      );

      return expenseTotalPerDayPerCategory(day, expenseDetails);
    }
  };

  const expenseTotalPerMonthPerCategory = (particular) => {
    let sum = 0;

    if (
      expenditureListDataBySelectedMonth.expenditureListBySelectedMonth.length >
      0
    ) {
      expenditureListDataBySelectedMonth.expenditureListBySelectedMonth.map(
        (expenditure) =>
          expenditure.expenditureCategory === particular.toLowerCase() &&
          (sum += parseInt(expenditure.amount))
      );
    }

    return sum;
  };

  const expenseTotalPerMonth = () => {
    let sum = 0;

    if (
      expenditureListDataBySelectedMonth.expenditureListBySelectedMonth.length >
      0
    ) {
      expenditureListDataBySelectedMonth.expenditureListBySelectedMonth.map(
        (expenditure) => (sum += parseInt(expenditure.amount))
      );
    }

    return sum;
  };

  const currentMonthName = () => {
    const today = new Date(customYear, customMonth, 1);
    return today.toLocaleString('default', { month: 'long' });
  };

  const handleDownloadSelectedMonth = () => {
    const dataTableCustomMonth = document.getElementById(
      'dataTableCustomMonth'
    );
    const exporter = new TableCSVExporter(dataTableCustomMonth);
    const csvOutput = exporter.convertToCSV();

    const csvBlob = new Blob([csvOutput], { type: 'text/csv' });
    const blobURL = URL.createObjectURL(csvBlob);
    const anchorElement = document.createElement('a');

    anchorElement.href = blobURL;
    anchorElement.download = `Expenditure-Report-${currentMonthName()}-${customYear}.csv`;
    anchorElement.click();

    setTimeout(() => {
      URL.revokeObjectURL(blobURL);
    }, 500);
  };

  return (
    <>
      <div style={{ overflowX: 'auto', overflowY: 'auto', height: '50rem' }}>
        <table className='table-data' id='dataTableCustomMonth'>
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
                    {expenseByCategory(particular, day) === 0
                      ? ''
                      : expenseByCategory(particular, day)}
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
      <button className='download-button' onClick={handleDownloadSelectedMonth}>
        Download Report
      </button>
    </>
  );
};

export default DailyExpenditureForSelectedMonth;
