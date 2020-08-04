import React, { useContext, useState, useEffect } from 'react';
import StateDashboard from '../components/StateDashboard/StateDashboard';
import { PersonalStateContext } from '../contexts/PersonalStateContext';
import { PersonalDataContext } from '../contexts/PersonalDataContext';
import { Paper, Grid } from '@material-ui/core';

const PersonalState = (props) => {
  const [admin, setAdmin] = useState('');
  const { personalState } = useContext(PersonalStateContext);
  const { personalData } = useContext(PersonalDataContext);
  const { currentTimestamp, data } = props;

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
    <Grid container style={{ margin: '0 auto' }}>
      <Paper
        elevation={3}
        style={{
          height: 'fit-content',
          backgroundColor: '#797979',
          width: '100%',
          margin: '20px',
        }}
      >
        <StateDashboard
          title='Stan indywidualny'
          subtitle={`Dane na ${currentTimestamp}`}
          data={data}
          admin={admin}
        />
      </Paper>
    </Grid>
  );
};

export default PersonalState;
