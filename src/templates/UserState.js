import React, { useContext, useEffect, useState } from 'react';

import { Grid, Paper } from '@material-ui/core';
import StateDashboard from '../components/StateDashboard/StateDashboard';
import { CompanyStateContext } from '../contexts/CompanyStateContext';
const UserState = (props) => {
  const { initials, currentTimestamp, name } = props;
  const { companyState } = useContext(CompanyStateContext);
  const [data, setData] = useState();

  useEffect(() => {
    if (companyState) {
      const newData = companyState
        .filter((item) => item.timestamp === currentTimestamp)
        .filter((item) => item.user === initials);
      setData(newData);
    }
  }, [companyState, initials, currentTimestamp]);

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
          title={`Stan indywidualny dla ${name} `}
          subtitle={`Dane na ${currentTimestamp}`}
          data={data}
          admin={'false'}
          currentTimestamp={currentTimestamp}
        />
      </Paper>
    </Grid>
  );
};

export default UserState;
