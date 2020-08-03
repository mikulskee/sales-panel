import React from 'react';
import { Box } from '@material-ui/core';
import ClientManagmentTooltip from './ClientManagmentTooltip/ClientManagmentTooltip';
import MeetingTooltip from './MeetingTooltip/MeetingTooltip';
import ProblemTooltip from './ProblemTooltip/ProblemTooltip';

const Tooltips = () => {
  return (
    <Box
      component='div'
      style={{
        position: 'fixed',
        bottom: '60px',
        right: '60px',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <ClientManagmentTooltip />
      <MeetingTooltip />
      <ProblemTooltip />
    </Box>
  );
};

export default Tooltips;
