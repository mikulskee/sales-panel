import React from 'react';
import PersonalState from './PersonalState';
import CompanyState from './CompanyState';
import { Grid } from '@material-ui/core';
import Tooltips from '../components/Tooltips/Tooltips';
const MainDashboard = () => {
  return (
    <>
      <Grid container item justify='space-around' xs={11}>
        <PersonalState />
        <CompanyState />
      </Grid>

      <Tooltips />
    </>
  );
};

export default MainDashboard;
