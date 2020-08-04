import React from 'react';
import styled from 'styled-components';
import { Dialog, Grid, Typography, Button } from '@material-ui/core';

const StyledDialog = styled(Dialog)`
  & .MuiPaper-root {
    background-color: #383838;
  }
`;

const StyledOutlinedButton = styled(Button)`
  &.MuiButton-outlined {
    border-color: #616161 !important;
    color: white;
  }
`;
const StyledButton = styled(Button)`
  &.MuiButton-contained {
    background-color: #ff0000 !important;
    color: white;
  }
`;
const DeleteConfirmationDialog = (props) => {
  const {
    deleteConfirmationDialogVisible,
    setDeleteConfirmationDialogVisible,
    handleDeleteData,
    itemToDelete,
  } = props;

  const handleClose = () => {
    setDeleteConfirmationDialogVisible(false);
  };
  return (
    <StyledDialog
      onClose={handleClose}
      aria-labelledby='simple-dialog-title'
      open={deleteConfirmationDialogVisible}
    >
      <Grid
        item
        style={{ backgroundColor: '#383838', color: 'white', padding: '30px' }}
      >
        <Typography variant='h5' gutterBottom>
          Czy na pewno chcesz usunąć wybrane zlecenie?
        </Typography>
        <Typography>Tej czynność nie będzie można cofnąć.</Typography>
        <Grid container justify='space-between' style={{ marginTop: '40px' }}>
          <StyledOutlinedButton variant='outlined' onClick={handleClose}>
            Anuluj
          </StyledOutlinedButton>
          <StyledButton
            variant='contained'
            onClick={handleDeleteData(itemToDelete)}
          >
            Usuń
          </StyledButton>
        </Grid>
      </Grid>
    </StyledDialog>
  );
};

export default DeleteConfirmationDialog;
