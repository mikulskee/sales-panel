import React, { useContext, useState, useEffect } from 'react';

import { Grid, Paper } from '@material-ui/core';
import StateDashboard from '../components/StateDashboard/StateDashboard';
import { PersonalDataContext } from '../contexts/PersonalDataContext';

const CompanyStateMonthly = (props) => {
  const { personalData } = useContext(PersonalDataContext);
  const { currentTimestamp, data } = props;
  const [admin, setAdmin] = useState();

  useEffect(() => {
    if (personalData) {
      setAdmin(personalData.admin);
    }
  }, [personalData]);
  return (
    <Grid container style={{ margin: '0 auto' }}>
      <Paper
        elevation={3}
        style={{
          height: 'fit-content',
          backgroundColor: '#b17b5b',
          width: '100%',
          margin: '20px ',
        }}
      >
        <StateDashboard
          title='Stan firmowy miesięczny'
          subtitle={`Dane na ${currentTimestamp}`}
          data={data}
          admin={admin}
        />
      </Paper>
    </Grid>
  );
};

export default CompanyStateMonthly;
