import React, { useState } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Tooltip, Typography, Fab, Dialog } from '@material-ui/core';
import FutureStateModal from '../../Modals/FutureStateModal/FutureStateModal';
import EventNoteIcon from '@material-ui/icons/EventNote';

const FutureStateTooltip = (props) => {
  const [open, setOpen] = useState(false);
  const { setCurrentTimestamp, currentTimestamp } = props;

  const LightTooltip = withStyles((theme) => ({
    tooltip: {
      backgroundColor: 'white',
      color: 'rgba(0, 0, 0, 0.87)',
      boxShadow: '0px 0px 10px 2px rgba(63, 81, 181, 0.6)',
    },
  }))(Tooltip);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      <LightTooltip
        title={
          <Typography style={{ fontSize: '12px' }}>Sprawdź stan</Typography>
        }
        aria-label='add'
        onClick={handleOpen}
        placement='left'
        style={{ margin: '20px 0' }}
      >
        <Fab color='primary'>
          <EventNoteIcon />
        </Fab>
      </LightTooltip>
      <Dialog
        onClose={handleClose}
        aria-labelledby='simple-dialog-title'
        open={open}
      >
        <FutureStateModal
          handleClose={handleClose}
          setCurrentTimestamp={setCurrentTimestamp}
          currentTimestamp={currentTimestamp}
        />
      </Dialog>
    </>
  );
};

export default FutureStateTooltip;
