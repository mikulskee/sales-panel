import React, { useContext, useState, useEffect } from 'react';
import StateDashboard from '../components/StateDashboard/StateDashboard';
import { PersonalStateContext } from '../contexts/PersonalStateContext';
import { PersonalDataContext } from '../contexts/PersonalDataContext';
import { Paper } from '@material-ui/core';
const PersonalState = () => {
  const [admin, setAdmin] = useState('');
  const { personalState } = useContext(PersonalStateContext);
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
      style={{ backgroundColor: '#797979', width: '80%', margin: '20px auto' }}
    >
      <StateDashboard
        title='Stan indywidualny'
        data={personalState}
        admin={admin}
      />
    </Paper>
  );
};

export default PersonalState;
