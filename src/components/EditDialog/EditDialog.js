import React from 'react';
import styled from 'styled-components';
import ClientManagmentModal from '../Modals/ClientManagmentModal/ClientManagmentModal';
import { Dialog } from '@material-ui/core';

const StyledDialog = styled(Dialog)`
  & .MuiPaper-root {
    background-color: #383838;
  }
`;
const EditDialog = (props) => {
  const { editDialogVisible, dataToEdit, setEditDialogVisible } = props;
  return (
    <StyledDialog
      open={editDialogVisible}
      onClose={() => setEditDialogVisible(false)}
    >
      <ClientManagmentModal
        admin={'admin'}
        dataToEdit={dataToEdit}
        setEditDialogVisible={setEditDialogVisible}
      />
    </StyledDialog>
  );
};

export default EditDialog;
