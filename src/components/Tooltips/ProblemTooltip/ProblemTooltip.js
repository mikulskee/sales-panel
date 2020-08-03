import React from 'react';
import { withStyles } from '@material-ui/core/styles';

import AssignmentLateIcon from '@material-ui/icons/AssignmentLate';
import { Tooltip, Fab, Typography } from '@material-ui/core';

const ProblemTooltip = () => {
  const LightTooltip = withStyles((theme) => ({
    tooltip: {
      backgroundColor: 'white',
      color: 'rgba(0, 0, 0, 0.87)',
      boxShadow: '0px 0px 10px 2px rgba(63, 81, 181, 0.6)',
    },
  }))(Tooltip);
  return (
    <LightTooltip
      title={
        <Typography style={{ fontSize: '12px' }}>Zgłoś problem</Typography>
      }
      aria-label='add'
      //   onClick={handleOpen}
      placement='left'
    >
      <Fab color='primary'>
        <AssignmentLateIcon />
      </Fab>
    </LightTooltip>
  );
};

export default ProblemTooltip;
