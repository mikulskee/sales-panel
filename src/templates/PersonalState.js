import React, { useContext, useState, useEffect } from 'react';
import { Tooltip, Fab, Dialog } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import ClientManagmentModal from '../components/ClientManagmentModal/ClientManagmentModal';
import StateDashboard from '../components/StateDashboard/StateDashboard';
import { PersonalStateContext } from '../contexts/PersonalStateContext';
import { PersonalDataContext } from '../contexts/PersonalDataContext';
const PersonalState = () => {
  const [admin, setAdmin] = useState('');
  const [open, setOpen] = useState(false);
  const { personalState } = useContext(PersonalStateContext);
  const { personalData } = useContext(PersonalDataContext);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

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
    <>
      <StateDashboard
        title='Stan indywidualny'
        data={personalState}
        admin={admin}
      />
      <Tooltip title='Dodaj zlecenie' aria-label='add' onClick={handleOpen}>
        <Fab color='primary'>
          <AddIcon />
        </Fab>
      </Tooltip>
      <Dialog
        onClose={handleClose}
        aria-labelledby='simple-dialog-title'
        open={open}
      >
        <ClientManagmentModal admin={admin} />
      </Dialog>
    </>
  );
};

export default PersonalState;
