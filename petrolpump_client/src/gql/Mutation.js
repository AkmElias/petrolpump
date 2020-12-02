import gql from 'graphql-tag';

export const LOGIN_MUTATION = gql`
  mutation LOGIN_MUTATION($username: String!, $password: String!) {
    tokenAuth(username: $username, password: $password) {
      token
    }
  }
`;

export const ADD_MACHINE_MUTATION = gql`
  mutation ADD_MACHINE_MUTATION($machineName: String!, $noOfDispensers: Int!) {
    createMachine(machineName: $machineName, noOfDispensers: $noOfDispensers) {
      machine {
        id
      }
    }
  }
`;

export const ADD_DAILY_METER_READING_MUTATION = gql`
  mutation ADD_DAILY_METER_READING_MUTATION(
    $machine: Int!
    $dispenserNo: Int!
    $startingReading: Float!
    $dayEndReading: Float!
  ) {
    createMeterReading(
      machine: $machine
      dispenserNo: $dispenserNo
      startingReading: $startingReading
      dayEndReading: $dayEndReading
    ) {
      meterReading {
        id
      }
    }
  }
`;

export const ADD_DAILY_RMS_READING_MUTATION = gql`
  mutation ADD_DAILY_RMS_READING_MUTATION(
    $machine: Int!
    $startingReading: Float!
    $dayEndReading: Float!
  ) {
    createRmsReading(
      machine: $machine
      startingReading: $startingReading
      dayEndReading: $dayEndReading
    ) {
      rmsReading {
        id
      }
    }
  }
`;

export const ADD_PRODUCT_CATEGORY_MUTATION = gql`
  mutation ADD_PRODUCT_CATEGORY_MUTATION($category: String!) {
    createProductCategory(category: $category) {
      productCategory {
        id
      }
    }
  }
`;

export const ADD_PRODUCT_SUPPLIER_MUTATION = gql`
  mutation ADD_PRODUCT_SUPPLIER_MUTATION(
    $companyAddress: String!
    $companyBankAccountName: String
    $companyBankAccountNumber: String
    $companyBankBranchName: String
    $companyBankName: String
    $companyBankRoutingNumber: String
    $companyName: String!
    $contactPersonContactInfo: String!
    $contactPersonDesignation: String!
    $contactPersonName: String!
    $methodOfPayment: String
  ) {
    createSupplier(
      companyAddress: $companyAddress
      companyBankAccountName: $companyBankAccountName
      companyBankAccountNumber: $companyBankAccountNumber
      companyBankBranchName: $companyBankBranchName
      companyBankName: $companyBankName
      companyBankRoutingNumber: $companyBankRoutingNumber
      companyName: $companyName
      contactPersonContactInfo: $contactPersonContactInfo
      contactPersonDesignation: $contactPersonDesignation
      contactPersonName: $contactPersonName
      methodOfPayment: $methodOfPayment
    ) {
      supplier {
        id
      }
    }
  }
`;

export const ADD_PRODUCT_MUTATION = gql`
  mutation ADD_PRODUCT_MUTATION(
    $productCategory: Int!
    $productSupplier: Int!
    $productQuantity: Int!
    $purchasePrice: Float!
    $sellingPrice: Float!
    $unit: String!
  ) {
    createProduct(
      productCategory: $productCategory
      productSupplier: $productSupplier
      productQuantity: $productQuantity
      purchasePrice: $purchasePrice
      sellingPrice: $sellingPrice
      unit: $unit
    ) {
      product {
        id
      }
    }
  }
`;

export const ADD_DUE_CUSTOMER_MUTATION = gql`
  mutation ADD_DUE_CUSTOMER_MUTATION(
    $customerName: String!
    $customerAddress: String!
    $contactPersonName: String!
    $contactPersonDesignation: String!
    $contactNumber: String!
    $allowableCredit: Int!
    $remarks: String!
  ) {
    createDueCustomer(
      customerName: $customerName
      customerAddress: $customerAddress
      contactPersonName: $contactPersonName
      contactPersonDesignation: $contactPersonDesignation
      contactNumber: $contactNumber
      allowableCredit: $allowableCredit
      remarks: $remarks
    ) {
      dueCustomer {
        id
      }
    }
  }
`;

export const ADD_DUE_CUSTOMER_VEHICLE_MUTATION = gql`
  mutation ADD_DUE_CUSTOMER_VEHICLE_MUTATION(
    $dueCustomer: Int!
    $vehicleRegistrationNumber: String!
    $driverName: String!
    $vehicleType: String!
  ) {
    createDueCustomerVehicle(
      dueCustomer: $dueCustomer
      vehicleRegistrationNumber: $vehicleRegistrationNumber
      driverName: $driverName
      vehicleType: $vehicleType
    ) {
      dueCustomerVehicle {
        id
      }
    }
  }
`;

export const ADD_BANK_ACCOUNT_MUTATION = gql`
  mutation ADD_BANK_ACCOUNT_MUTATION(
    $accountName: String!
    $accountNumber: String!
    $accountType: String!
    $bankName: String!
    $branchName: String!
    $currentBalance: Int!
    $dueCustomer: Int!
  ) {
    createBankAccount(
      accountName: $accountName
      accountNumber: $accountNumber
      accountType: $accountType
      bankName: $bankName
      branchName: $branchName
      currentBalance: $currentBalance
      dueCustomer: $dueCustomer
    ) {
      bankAccount {
        id
      }
    }
  }
`;

export const ADD_CARD_ACCOUNT_MUTATION = gql`
  mutation ADD_CARD_ACCOUNT_MUTATION(
    $accountName: String!
    $accountNumber: String!
    $bankName: String!
    $branchName: String!
    $currentBalance: Int!
    $dueCustomer: Int!
  ) {
    createCardAccount(
      accountName: $accountName
      accountNumber: $accountNumber
      bankName: $bankName
      branchName: $branchName
      currentBalance: $currentBalance
      dueCustomer: $dueCustomer
    ) {
      cardAccount {
        id
      }
    }
  }
`;

export const ADD_DIGITAL_WALLET_MUTATION = gql`
  mutation ADD_DIGITAL_WALLET_MUTATION(
    $accountName: String!
    $accountNumber: String!
    $digitalWalletName: String!
    $currentBalance: Int!
    $dueCustomer: Int!
  ) {
    createDigitalWallet(
      accountName: $accountName
      accountNumber: $accountNumber
      currentBalance: $currentBalance
      digitalWalletName: $digitalWalletName
      dueCustomer: $dueCustomer
    ) {
      digitalWallet {
        id
      }
    }
  }
`;

export const ADD_EXPENDITURE_LIST_MUTATION = gql`
  mutation ADD_EXPENDITURE_LIST_MUTATION(
    $voucherNo: String!
    $expenditureCategory: String!
    $amount: Float!
    $methodOfPayment: String!
    $description: String!
    $issuedDate: String!
    $unixIssuedDate: String!
    $spentBy: String!
    $approvedBy: String!
    $receivedBy: String!
  ) {
    createExpenditureList(
      voucherNo: $voucherNo
      expenditureCategory: $expenditureCategory
      amount: $amount
      methodOfPayment: $methodOfPayment
      description: $description
      issuedDate: $issuedDate
      unixIssuedDate: $unixIssuedDate
      spentBy: $spentBy
      approvedBy: $approvedBy
      receivedBy: $receivedBy
    ) {
      expenditureList {
        id
      }
    }
  }
`;
