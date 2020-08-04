import React from 'react';

import { Grid, Paper } from '@material-ui/core';
import StateDashboard from '../components/StateDashboard/StateDashboard';

const CompanyStateMonthly = (props) => {
  const { currentTimestamp } = props;
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
          // data={companyState}
          admin={'admin'}
        />
      </Paper>
    </Grid>
  );
};

export default CompanyStateMonthly;
