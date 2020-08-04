import React, { useState, useContext, useEffect } from 'react';
import styled from 'styled-components';
import firebase from '../../../firebase';
import moment from 'moment';
import 'moment/locale/pl';
import { v4 as uuidv4 } from 'uuid';
import {
  Paper,
  Typography,
  InputLabel,
  OutlinedInput,
  FormControl,
  Grid,
  Select,
  MenuItem,
  Chip,
  RadioGroup,
  Radio,
  FormControlLabel,
  Button,
  Checkbox,
  Divider,
} from '@material-ui/core';
import { PersonalDataContext } from '../../../contexts/PersonalDataContext';
import { AppContext } from '../../../contexts/AppContext';

const StyledForm = styled.form`
  & * {
    color: white !important;
  }
`;

const StyledChip = styled(Chip)`
  span {
    color: black !important;
  }
`;

const StyledTypography = styled(Typography)`
  width: 100%;
  color: red !important;
  text-align: center;
`;

const StyledDivider = styled(Divider)`
  background-color: #5f5f5f !important;
  width: 100%;
`;
const ClientManagment = (props) => {
  const [titleValue, setTitleValue] = useState('');
  const [dateValue, setDateValue] = useState('');
  const [minusReason, setMinusReason] = useState('');
  const [plusReason, setPlusReason] = useState('');
  const [radioValue, setRadioValue] = useState('');
  const [errorTitle, setErrorTitle] = useState(false);
  const [errorReason, setErrorReason] = useState(false);
  const [oldCommision, setOldCommision] = useState(false);
  const [addToCurrentMonth, setAddToCurrentMonth] = useState(false);
  const { admin, handleClose, dataToEdit, setEditDialogVisible } = props;
  const { personalData } = useContext(PersonalDataContext);
  const { setSuccessSnackbarOpen } = useContext(AppContext);

  useEffect(() => {
    if (dataToEdit) {
      setTitleValue(dataToEdit.title);
      setDateValue(dataToEdit.date);
      setRadioValue(dataToEdit.user);
      if (dataToEdit.timestamp) {
        setOldCommision(false);
      } else {
        setOldCommision(true);
      }
      if (typeof dataToEdit.plus === 'string') {
        console.log('plus');
        if (dataToEdit.plus === '') {
          setPlusReason('Brak');
        } else {
          setPlusReason(dataToEdit.plus);
        }
      } else {
        if (dataToEdit.minus === '') {
          setMinusReason('Brak');
        } else {
          setMinusReason(dataToEdit.minus);
        }
      }
    }
  }, [dataToEdit]);

  const handleCheckboxCurrentMonth = (event) => {
    setAddToCurrentMonth(event.target.checked);
  };
  const handleCheckboxChange = (event) => {
    setOldCommision(event.target.checked);
  };

  const handleTitleChange = (event) => {
    if (errorTitle) {
      setErrorTitle(false);
    }
    setTitleValue(event.target.value);
  };
  const handleDateChange = (event) => {
    setDateValue(event.target.value);
  };
  const handleReasonChange = (reason) => (event) => {
    if (errorReason) {
      setErrorReason(false);
    }
    if (reason) {
      setPlusReason(event.target.value);
      setMinusReason('');
    } else {
      setMinusReason(event.target.value);
      setPlusReason('');
    }
  };
  const handleRadioChange = (event) => {
    setRadioValue(event.target.value);
  };

  const setTimestamp = () => {
    if (oldCommision) {
      if (addToCurrentMonth) {
        return moment(new Date()).format('MMMM YYYY');
      } else {
        return '';
      }
    } else {
      return moment(new Date()).format('MMMM YYYY');
    }
  };
  const handleSubmit = () => {
    if (!titleValue && !minusReason && !plusReason) {
      setErrorTitle(true);
      setErrorReason(true);
      return;
    }
    if (!titleValue) {
      setErrorTitle(true);
      return;
    }
    if (!minusReason && !plusReason) {
      setErrorReason(true);
      return;
    }

    if (!errorTitle && !errorReason) {
      if (minusReason) {
        const id = `${dataToEdit ? dataToEdit.id : uuidv4()}`;
        firebase
          .firestore()
          .collection(`company-state-general`)
          .doc(id)
          .set({
            title: titleValue,
            date: dateValue,
            minus: minusReason,
            user: `${admin ? radioValue : personalData.initials}`,
            timestamp: setTimestamp(),
            id,
          })
          .then(() => setSuccessSnackbarOpen(true))
          .catch((err) => console.log(err));

        if (dataToEdit) {
          setEditDialogVisible(false);
        } else {
          handleClose();
        }
      } else {
        const id = `${dataToEdit ? dataToEdit.id : uuidv4()}`;
        firebase
          .firestore()
          .collection(`company-state-general`)
          .doc(id)
          .set({
            title: titleValue,
            date: dateValue,
            plus: `${plusReason === 'Brak' ? '' : plusReason}`,
            user: `${admin ? radioValue : personalData.initials}`,
            timestamp: setTimestamp(),
            id,
          })
          .then(() => setSuccessSnackbarOpen(true))
          .catch((err) => console.log(err));
        if (dataToEdit) {
          setEditDialogVisible(false);
        } else {
          handleClose();
        }
      }
    }
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
        Zarządzanie klientami
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
            <FormControl variant='outlined'>
              <InputLabel htmlFor='name' style={{ color: '#fff' }}>
                Nazwa zlecenia
              </InputLabel>
              <OutlinedInput
                error={errorTitle}
                id='name'
                label='Nazwa zlecenia'
                variant='outlined'
                style={{ width: '240px' }}
                required={true}
                value={titleValue}
                onChange={handleTitleChange}
              />
            </FormControl>
            {errorTitle ? (
              <StyledTypography variant='caption' display='block' gutterBottom>
                To pole nie może być puste
              </StyledTypography>
            ) : null}
          </Grid>
          <Grid item>
            <FormControl variant='outlined'>
              <InputLabel htmlFor='date'>Data</InputLabel>
              <OutlinedInput
                id='date'
                label='Data'
                variant='outlined'
                style={{ width: '240px' }}
                value={dateValue}
                onChange={handleDateChange}
              />
            </FormControl>
          </Grid>
          {admin ? (
            <>
              <StyledDivider />
              <FormControlLabel
                style={{ margin: '20px 0' }}
                control={
                  <Checkbox
                    checked={oldCommision}
                    onChange={handleCheckboxChange}
                    name='oldCommision'
                    color='primary'
                  />
                }
                label='Zlecenie istniejące'
              />
            </>
          ) : null}
          <StyledDivider />
          <Grid container justify='center'>
            <Grid
              item
              style={{ textAlign: 'center', margin: '20px 20px 20px 0' }}
            >
              <Typography
                variant={'subtitle2'}
                gutterBottom
                style={{
                  textAlign: 'center',
                }}
              >
                Zlecenie pozyskane
              </Typography>
              <FormControl variant='outlined' style={{ width: '100px' }}>
                <InputLabel id='plus-reason'>
                  <em>Powód</em>
                </InputLabel>
                <Select
                  error={errorReason}
                  labelId='plus-reason'
                  id='plus'
                  value={plusReason}
                  onChange={handleReasonChange('plus')}
                  label='Powód'
                >
                  <MenuItem value='Brak'>Brak</MenuItem>
                  <MenuItem value={'NZ'}>NZ</MenuItem>
                  <MenuItem value={'DLU'}>DLU</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid
              item
              style={{ textAlign: 'center', margin: '20px 0 20px 20px' }}
            >
              <Typography
                variant={'subtitle2'}
                gutterBottom
                style={{ textAlign: 'center' }}
              >
                Zlecenie utracone
              </Typography>
              <FormControl variant='outlined' style={{ width: '100px' }}>
                <InputLabel id='minus-reason'>
                  <em>Powód</em>
                </InputLabel>
                <Select
                  error={errorReason}
                  labelId='minus-reason'
                  id='minus'
                  value={minusReason}
                  onChange={handleReasonChange('')}
                  label='MinusReason'
                >
                  <MenuItem value='Brak'>Brak</MenuItem>
                  <MenuItem value={'KUNDI'}>KUNDI</MenuItem>
                  <MenuItem value={'TOD'}>TOD</MenuItem>
                  <MenuItem value={'DLU'}>DLU</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            {errorReason ? (
              <Grid container>
                <StyledTypography
                  variant='caption'
                  style={{ margin: '-15px 0 20px' }}
                >
                  Wybierz rodzaj zlecenia
                </StyledTypography>
              </Grid>
            ) : null}
          </Grid>
          <StyledDivider />

          {admin ? (
            <>
              <FormControl
                component='fieldset'
                style={{ margin: '20px 0 20px' }}
              >
                <Typography
                  variant={'subtitle2'}
                  gutterBottom
                  style={{ textAlign: 'center' }}
                >
                  Pozyskane przez
                </Typography>
                <RadioGroup
                  aria-label='user'
                  name='user1'
                  value={radioValue}
                  onChange={handleRadioChange}
                  style={{ flexDirection: 'row' }}
                >
                  <FormControlLabel
                    value='QA'
                    control={<Radio />}
                    label={
                      <StyledChip
                        label='QA'
                        style={{
                          backgroundColor: '#3df4fd',
                        }}
                      />
                    }
                    labelPlacement='top'
                  />
                  <FormControlLabel
                    value='KK'
                    control={<Radio />}
                    label={
                      <StyledChip
                        label='KK'
                        style={{ backgroundColor: '#b4f56c' }}
                      />
                    }
                    labelPlacement='top'
                  />
                  <FormControlLabel
                    value='VF'
                    control={<Radio />}
                    label={
                      <StyledChip
                        label='VF'
                        style={{ backgroundColor: '#a8b5f5' }}
                      />
                    }
                    labelPlacement='top'
                  />
                </RadioGroup>
              </FormControl>
              <StyledDivider />
            </>
          ) : null}

          {dataToEdit ? (
            <>
              {dataToEdit.timestamp !==
              moment(new Date()).format('MMMM YYYY') ? (
                <FormControlLabel
                  style={{ margin: '20px 0' }}
                  control={
                    <Checkbox
                      checked={addToCurrentMonth}
                      onChange={handleCheckboxCurrentMonth}
                      name='currentMonth'
                      color='primary'
                    />
                  }
                  label='Dodać do bieżącego miesiąca?'
                />
              ) : null}
            </>
          ) : null}

          {dataToEdit ? (
            <Grid container justify='space-between'>
              <Button
                style={{ margin: '20px 0' }}
                variant='outlined'
                color='primary'
                onClick={() => setEditDialogVisible(false)}
              >
                Anuluj
              </Button>
              <Button
                style={{ margin: '20px 0' }}
                variant='contained'
                color='primary'
                onClick={handleSubmit}
              >
                Zapisz
              </Button>
            </Grid>
          ) : (
            <Button
              style={{ margin: '20px 0' }}
              variant='contained'
              color='primary'
              onClick={handleSubmit}
            >
              Zatwierdź
            </Button>
          )}
        </Grid>
      </StyledForm>
    </Paper>
  );
};

export default ClientManagment;
