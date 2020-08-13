import React from 'react';
import { Box } from '@material-ui/core';
import ClientManagmentTooltip from './ClientManagmentTooltip/ClientManagmentTooltip';
import MeetingTooltip from './MeetingTooltip/MeetingTooltip';
import ProblemTooltip from './ProblemTooltip/ProblemTooltip';
import FutureStateTooltip from './FutureStateTooltip/FutureStateTooltip';

const Tooltips = (props) => {
  const { setCurrentTimestamp, currentTimestamp } = props;
  return (
    <Box
      component='div'
      style={{
        position: 'fixed',
        bottom: '60px',
        right: '40px',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <ClientManagmentTooltip />
      <MeetingTooltip />
      <ProblemTooltip />
      <FutureStateTooltip
        setCurrentTimestamp={setCurrentTimestamp}
        currentTimestamp={currentTimestamp}
      />
    </Box>
  );
};

export default Tooltips;
