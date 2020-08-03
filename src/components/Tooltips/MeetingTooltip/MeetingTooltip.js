import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import PeopleIcon from '@material-ui/icons/People';
import { Tooltip, Fab, Typography } from '@material-ui/core';

const LightTooltip = withStyles((theme) => ({
  tooltip: {
    backgroundColor: 'white',
    color: 'rgba(0, 0, 0, 0.87)',
    boxShadow: '0px 0px 10px 2px rgba(63, 81, 181, 0.6)',
  },
}))(Tooltip);
const MeetingTooltip = () => {
  return (
    <LightTooltip
      title={
        <Typography style={{ fontSize: '12px' }}>Umów spotkanie</Typography>
      }
      aria-label='add'
      style={{ margin: '20px 0' }}
      placement='left'

      //   onClick={handleOpen}
    >
      <Fab color='primary'>
        <PeopleIcon />
      </Fab>
    </LightTooltip>
  );
};

export default MeetingTooltip;
