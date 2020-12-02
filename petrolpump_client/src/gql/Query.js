import gql from 'graphql-tag';

export const IS_LOGGED_IN_QUERY = gql`
  query {
    isLoggedIn @client
  }
`;

export const MYSELF = gql`
  query MYSELF {
    me {
      id
      username
      pump {
        pumpName
        ownerName
      }
    }
  }
`;

export const ALL_MACHINES_QUERY = gql`
  query ALL_MACHINES_QUERY {
    machines {
      id
      machineName
      noOfDispensers
    }
  }
`;

export const MACHINE_BY_ID_QUERY = gql`
  query MACHINE_BY_ID_QUERY($machineId: Int!) {
    machineById(machineId: $machineId) {
      id
      machineName
      noOfDispensers
    }
  }
`;

export const MOST_RECENT_RMS_READINGS_QUERY = gql`
  query MOST_RECENT_RMS_READINGS_QUERY($machineId: Int!) {
    mostRecentRmsReadings(machineId: $machineId) {
      id
      startingReading
      dayEndReading
      machine {
        id
        machineName
      }
    }
  }
`;

export const MOST_RECENT_METER_READING_QUERY = gql`
  query MOST_RECENT_METER_READING_QUERY($machineId: Int!, $dispenserNo: Int!) {
    mostRecentMeterReading(machineId: $machineId, dispenserNo: $dispenserNo) {
      id
      machine {
        machineName
      }
      dayEndReading
      startingReading
      dispenserNo
    }
  }
`;

export const ALL_PRODUCT_CATEGORY_QUERY = gql`
  query ALL_PRODUCT_CATEGORY_QUERY {
    productCategories {
      id
      category
    }
  }
`;

export const ALL_PRODUCT_SUPPLIER_QUERY = gql`
  query ALL_PRODUCT_SUPPLIER_QUERY {
    suppliers {
      id
      companyName
    }
  }
`;

export const ALL_PRODUCT_QUERY = gql`
  query ALL_PRODUCT_QUERY {
    products {
      id
      productCategory {
        id
        category
      }
      productQuantity
      unit
    }
  }
`;

export const ALL_DUE_CUSTOMER_QUERY = gql`
  query ALL_DUE_CUSTOMER_QUERY {
    dueCustomers {
      id
      customerName
    }
  }
`;

export const EXPENDITURE_LIST_BY_CATEGORY_QUERY = gql`
  query EXPENDITURE_LIST_BY_CATEGORY_QUERY($expenditureCategory: String!) {
    expenditureListByCategory(expenditureCategory: $expenditureCategory) {
      id
      amount
      expenditureCategory
      receivedBy
    }
  }
`;

export const EXPENDITURE_BY_SELECTED_MONTH_QUERY = gql`
  query EXPENDITURE_BY_SELECTED_MONTH_QUERY($month: Int!, $year: Int!) {
    expenditureListBySelectedMonth(month: $month, year: $year) {
      id
      unixIssuedDate
      amount
      expenditureCategory
      createdAt
    }
  }
`;

export const CURRENT_MONTH_EXPENDITURE_LIST = gql`
  query CURRENT_MONTH_EXPENDITURE_LIST {
    currentMonthsExpenditureList {
      id
      amount
      unixIssuedDate
      expenditureCategory
    }
  }
`;
