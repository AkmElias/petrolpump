import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { Route } from 'react-router-dom';

import './Dashboard.scss';
import Signout from './components/Dashboard/Signout/Signout';
import { MYSELF } from './gql/Query';
import Navbar from './components/Dashboard/Navbar/Navbar';
import AddMachine from './components/Dashboard/Machines/AddMachine';
import AllMachines from './components/Dashboard/Machines/AllMachines';
import AddMeterAndRMSReading from './components/Dashboard/DailyLogs/AddMeterAndRMSReading';
// import MeterReadingSummary from './components/Dashboard/DailyLogs/MeterReadingSummary';
// import RMSReadingSummary from './components/Dashboard/DailyLogs/RMSReadingSummary';
import AddProductCategory from './components/Dashboard/Products/AddProductCategory';
import AllProductCategories from './components/Dashboard/Products/AllProductCategories';
import AddProductSupplier from './components/Dashboard/Products/AddProductSupplier';
import AddProduct from './components/Dashboard/Products/AddProduct';
import AllProducts from './components/Dashboard/Products/AllProducts';
import AllProductSuppliers from './components/Dashboard/Products/AllProductSuppliers';
import AddSoldProduct from './components/Dashboard/Products/AddSoldProduct';
import AddCustomer from './components/Dashboard/Customers/AddCustomer';
import AddVehicle from './components/Dashboard/Customers/AddVehicle';
import AddBankAccount from './components/Dashboard/Customers/AddBankAccount';
import AddDigitalWallet from './components/Dashboard/Customers/AddDigitalWallet';
import AllCustomers from './components/Dashboard/Customers/AllCustomers';
import AllVehicles from './components/Dashboard/Customers/AllVehicles';
import AllBankAccounts from './components/Dashboard/Customers/AllBankAccounts';
import AllDigitalWallets from './components/Dashboard/Customers/AllDigitalWallets';
import AddCardAccount from './components/Dashboard/Customers/AddCardAccount';
import AllCardAccounts from './components/Dashboard/Customers/AllCardAccounts';
import ALLMonthlyExpenditures from './components/Dashboard/Expenditures/AllMonthlyExpenditures';
import AllDailyExpenditures from './components/Dashboard/Expenditures/AllDailyExpenditures';
import AddDailyExpenditure from './components/Dashboard/Expenditures/AddDailyExpenditure';

const Dashboard = () => {
  const { data, loading, error } = useQuery(MYSELF);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>ERROR</p>;

  return (
    <div className='dashboard'>
      <div className='dashboard-header'>
        <div className='container dashboard-header-content'>
          <div className='dashboard-header-content-left'>
            <h2>{data.me.pump.pumpName}</h2>
            <p>Proprietor: {data.me.pump.ownerName}</p>
          </div>
          <div className='dashboard-header-content-right'>
            <h3>Welcome, {data.me.username}</h3>
            <Signout />
          </div>
        </div>
      </div>

      <div className='dashboard-bottom-part'>
        <div className='container dashboard-bottom-content'>
          <Navbar />
          <main className='main-content'>
            <Route path='/add-machine' component={AddMachine} />
            <Route path='/machines' component={AllMachines} />
            <Route
              path='/add-meter-and-rms-reading'
              component={AddMeterAndRMSReading}
            />
            <Route path='/add-sold-product' component={AddSoldProduct} />
            <Route
              path='/add-product-category'
              component={AddProductCategory}
            />
            <Route path='/categories' component={AllProductCategories} />

            <Route
              path='/add-product-supplier'
              component={AddProductSupplier}
            />
            <Route path='/suppliers' component={AllProductSuppliers} />

            <Route path='/add-product' component={AddProduct} />
            <Route path='/products' component={AllProducts} />

            <Route path='/add-customer' component={AddCustomer} />
            <Route path='/customers' component={AllCustomers} />

            <Route path='/add-vehicle' component={AddVehicle} />
            <Route path='/vehicles' component={AllVehicles} />

            <Route path='/add-bank-account' component={AddBankAccount} />
            <Route path='/bank-accounts' component={AllBankAccounts} />

            <Route path='/add-digital-wallet' component={AddDigitalWallet} />
            <Route path='/digital-wallets' component={AllDigitalWallets} />

            <Route path='/add-card-account' component={AddCardAccount} />
            <Route path='/card-accounts' component={AllCardAccounts} />

            <Route
              path='/add-daily-expenditure'
              component={AddDailyExpenditure}
            />
            <Route
              path='/daily-expenditures'
              render={() => <AllDailyExpenditures me={data.me} />}
            />
            <Route
              path='/monthly-expenditures'
              component={ALLMonthlyExpenditures}
            />
          </main>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
