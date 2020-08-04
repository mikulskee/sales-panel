import React, { useContext, useState, useEffect } from 'react';
import StateDashboard from '../components/StateDashboard/StateDashboard';
import { CompanyStateContext } from '../contexts/CompanyStateContext';
import { PersonalDataContext } from '../contexts/PersonalDataContext';
import { AppContext } from '../contexts/AppContext';
import { Paper, Grid } from '@material-ui/core';

const CompanyState = () => {
  const [admin, setAdmin] = useState('');
  const { companyState } = useContext(CompanyStateContext);
  const { personalData } = useContext(PersonalDataContext);
  const { personalStateVisible } = useContext(AppContext);

  useEffect(() => {
    if (personalData) {
      if (personalData.initials === 'AK') {
        setAdmin('admin');
      } else {
        setAdmin('');
      }
    }
  }, [personalData]);

  return (
    <Grid
      container
      item
      lg={personalStateVisible ? 7 : 11}
      style={{ margin: '0 auto' }}
    >
      <Paper
        elevation={3}
        style={{
          height: 'fit-content',
          backgroundColor: '#4f6984',
          width: '100%',
          margin: '20px auto',
        }}
      >
        <StateDashboard
          title='Stan firmowy ogólny'
          data={companyState}
          admin={admin}
          company={'true'}
        />
      </Paper>
    </Grid>
  );
};

export default CompanyState;
