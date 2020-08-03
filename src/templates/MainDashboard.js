import React from 'react';
import PersonalState from './PersonalState';
import CompanyState from './CompanyState';
import Tooltips from '../components/Tooltips/Tooltips';
const MainDashboard = () => {
  return (
    <>
      <PersonalState />
      <CompanyState />
      <Tooltips />
    </>
  );
};

export default MainDashboard;
