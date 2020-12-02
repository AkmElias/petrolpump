import React from 'react';
import { NavLink } from 'react-router-dom';

import './Navbar.scss';

const Navbar = () => {
  return (
    <nav className='navbar'>
      <ul className='navbar-nav'>
        <input type='radio' name='navbar' id='machines' />
        <li className='navbar-nav-item'>
          <label htmlFor='machines'>
            <span>মেশিন</span>
            <i className='fas fa-angle-down'></i>
          </label>
          <NavLink to='/add-machine'>মেশিন অ্যাড করুন</NavLink>
          <NavLink to='/machines'>সবগুলো মেশিন</NavLink>
        </li>

        <input type='radio' name='navbar' id='daily_logs' />
        <li className='navbar-nav-item'>
          <label htmlFor='daily_logs'>
            <span>ডেইলি লগ</span>
            <i className='fas fa-angle-down'></i>
          </label>
          <NavLink to='/add-meter-and-rms-reading'>
            মিটার রিডিং ও RMS রিডিং অ্যাড করুন
          </NavLink>
          <NavLink to='/add-sold-product'>বিক্রিত পণ্য অ্যাড করুন</NavLink>

          {/* <NavLink to='/add-meter-reading'>মিটার রিডিং অ্যাড করুন</NavLink>
          <NavLink to='/meter-reading-summary'>মিটার রিডিং সামারি</NavLink>
          <NavLink to='/add-rms-reading'>RMS রিডিং অ্যাড করুন</NavLink>
          <NavLink to='/rms-reading-summary'>RMS রিডিং সামারি</NavLink> */}
        </li>

        <input type='radio' name='navbar' id='products' />
        <li className='navbar-nav-item'>
          <label htmlFor='products'>
            <span>প্রোডাক্ট</span>
            <i className='fas fa-angle-down'></i>
          </label>
          <NavLink to='/add-product-category'>
            প্রোডাক্ট ক্যাটাগরি অ্যাড করুন
          </NavLink>
          <NavLink to='/categories'>সবগুলো ক্যাটাগরি</NavLink>
          <NavLink to='/add-product-supplier'>
            প্রোডাক্ট সাপ্লাএয়ার অ্যাড করুন
          </NavLink>
          <NavLink to='/suppliers'>সবগুলো সাপ্লাএয়ার</NavLink>
          <NavLink to='/add-product'>প্রোডাক্ট অ্যাড করুন</NavLink>
          <NavLink to='/products'>সবগুলো প্রোডাক্ট</NavLink>
        </li>

        <input type='radio' name='navbar' id='customers' />
        <li className='navbar-nav-item'>
          <label htmlFor='customers'>
            <span>কাস্টমার</span>
            <i className='fas fa-angle-down'></i>
          </label>
          <NavLink to='/add-customer'>ক্রেডিট কাস্টমার অ্যাড করুন</NavLink>
          <NavLink to='/customers'>সবগুলো ক্রেডিট কাস্টমার</NavLink>
          <NavLink to='/add-vehicle'>গাড়ী অ্যাড করুন</NavLink>
          <NavLink to='/vehicles'>সবগুলো গাড়ী</NavLink>
          <NavLink to='/add-bank-account'>ব্যাংক একাউন্ট অ্যাড করুন</NavLink>
          <NavLink to='/bank-accounts'>সবগুলো ব্যাংক একাউন্ট</NavLink>
          <NavLink to='/add-digital-wallet'>ডিজিটাল একাউন্ট অ্যাড করুন</NavLink>
          <NavLink to='/digital-wallets'>সবগুলো ডিজিটাল একাউন্ট</NavLink>
          <NavLink to='/add-card-account'>কার্ড একাউন্ট অ্যাড করুন</NavLink>
          <NavLink to='/card-accounts'>সবগুলো কার্ড একাউন্ট</NavLink>
        </li>

        <input type='radio' name='navbar' id='expenditures' />
        <li className='navbar-nav-item'>
          <label htmlFor='expenditures'>
            <span>খরচ</span>
            <i className='fas fa-angle-down'></i>
          </label>
          <NavLink to='/add-daily-expenditure'>দৈনিক খরচ অ্যাড করুন</NavLink>
          <NavLink to='/daily-expenditures'>সবগুলো দৈনিক খরচ</NavLink>
          <NavLink to='/monthly-expenditures'>সবগুলো মাসিক খরচ</NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
