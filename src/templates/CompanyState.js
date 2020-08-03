import React, { useContext, useState, useEffect } from 'react';
import StateDashboard from '../components/StateDashboard/StateDashboard';
import { CompanyStateContext } from '../contexts/CompanyStateContext';
import { PersonalDataContext } from '../contexts/PersonalDataContext';
import { Paper } from '@material-ui/core';

const CompanyState = () => {
  const [admin, setAdmin] = useState('');
  const { companyState } = useContext(CompanyStateContext);
  const { personalData } = useContext(PersonalDataContext);

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
    <Paper
      elevation={3}
      style={{ backgroundColor: '#4f6984', width: '80%', margin: '20px auto' }}
    >
      <StateDashboard
        title='Stan firmowy ogólny'
        data={companyState}
        admin={admin}
        company={'true'}
      />
    </Paper>
  );
};

export default CompanyState;
