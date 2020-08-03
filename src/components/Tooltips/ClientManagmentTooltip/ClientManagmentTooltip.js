import React, { useState, useEffect, useContext } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Tooltip, Typography, Fab, Dialog } from '@material-ui/core';
import ClientManagmentModal from '../../ClientManagmentModal/ClientManagmentModal';
import AddIcon from '@material-ui/icons/Add';
import { PersonalDataContext } from '../../../contexts/PersonalDataContext';

const ClientManagmentTooltip = () => {
  const [open, setOpen] = useState(false);
  const [admin, setAdmin] = useState('');
  const { personalData } = useContext(PersonalDataContext);

  const LightTooltip = withStyles((theme) => ({
    tooltip: {
      backgroundColor: 'white',
      color: 'rgba(0, 0, 0, 0.87)',
      boxShadow: '0px 0px 10px 2px rgba(63, 81, 181, 0.6)',
    },
  }))(Tooltip);

  useEffect(() => {
    if (personalData) {
      if (personalData.initials === 'AK') {
        setAdmin('admin');
      } else {
        setAdmin('');
      }
    }
  }, [personalData]);

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
          <Typography style={{ fontSize: '12px' }}>Dodaj zlecenie</Typography>
        }
        aria-label='add'
        onClick={handleOpen}
        placement='left'
      >
        <Fab color='primary'>
          <AddIcon />
        </Fab>
      </LightTooltip>
      <Dialog
        onClose={handleClose}
        aria-labelledby='simple-dialog-title'
        open={open}
      >
        <ClientManagmentModal admin={admin} handleClose={handleClose} />
      </Dialog>
    </>
  );
};

export default ClientManagmentTooltip;
