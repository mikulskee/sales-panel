import React, { useState } from 'react';
import MomentUtils from '@date-io/moment';
import styled from 'styled-components';
import moment from 'moment';
import 'moment/locale/pl';
import { Paper, Typography, Grid, Button, Divider } from '@material-ui/core';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';

const StyledForm = styled.form`
  & * {
    color: white !important;
  }
`;

const StyledDivider = styled(Divider)`
  background-color: #5f5f5f !important;
  width: 100%;
`;

const ClientManagment = (props) => {
  const { setCurrentTimestamp, handleClose } = props;
  const [date, setDate] = useState(moment(new Date()));

  const handleChangeDate = (date) => {
    setDate(date);
  };

  const handleSubmit = () => {
    setCurrentTimestamp(date.format('MMMM YYYY'));
    handleClose();
  };

  return (
    <Paper
      style={{
        width: '500px',
        padding: '50px',
        backgroundColor: '#383838',
        color: '#fff',
      }}
      elevation={3}
    >
      <Typography variant={'h6'} gutterBottom style={{ textAlign: 'center' }}>
        Sprawdź stan w innych miesiącach
      </Typography>
      <StyledDivider />

      <StyledForm style={{ marginTop: '20px' }}>
        <Grid
          container
          direction='column'
          justify='center'
          alignItems='center'
          spacing={3}
        >
          <Grid item>
            <MuiPickersUtilsProvider utils={MomentUtils}>
              <KeyboardDatePicker
                disableToolbar
                variant='inline'
                format='MMMM YYYY'
                margin='normal'
                id='date-picker-inline'
                label='Stan na'
                value={date}
                onChange={handleChangeDate}
                style={{ margin: '10px 0 20px' }}
                KeyboardButtonProps={{
                  'aria-label': 'change date',
                }}
              />
            </MuiPickersUtilsProvider>
          </Grid>
          <Button
            style={{ margin: '20px 0' }}
            variant='contained'
            color='primary'
            onClick={handleSubmit}
          >
            Zatwierdź
          </Button>
        </Grid>
      </StyledForm>
    </Paper>
  );
};

export default ClientManagment;
