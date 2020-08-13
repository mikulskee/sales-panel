import React, { useState, useContext, useEffect } from 'react';
import MomentUtils from '@date-io/moment';
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
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import { PersonalDataContext } from '../../../contexts/PersonalDataContext';
import { AppContext } from '../../../contexts/AppContext';
import { UsersContext } from '../../../contexts/UsersContext';

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
  const [oldCommision, setOldCommision] = useState(false);
  const [minusReason, setMinusReason] = useState('');
  const [plusReason, setPlusReason] = useState('');
  const [radioValue, setRadioValue] = useState('');
  const [temporaryCommision, setTemporaryCommision] = useState(false);
  const [
    temporaryCommisionRadioValue,
    setTemporaryCommisionRadioValue,
  ] = useState('');
  const [commisionStartDate, setCommisionStartDate] = useState(
    moment(new Date())
  );

  const [errorTitle, setErrorTitle] = useState(false);
  const [errorReason, setErrorReason] = useState(false);
  const [addToCurrentMonth, setAddToCurrentMonth] = useState(false);
  const [radioUsersOptions, setRadioUsersOptions] = useState();
  const [
    radioTemporaryCommisionUsersOptions,
    setRadioTemporaryCommisionUsersOptions,
  ] = useState();

  const { admin, handleClose, dataToEdit, setEditDialogVisible } = props;
  const { personalData } = useContext(PersonalDataContext);
  const { setSuccessSnackbarOpen } = useContext(AppContext);
  const { users } = useContext(UsersContext);

  useEffect(() => {
    console.log(moment(commisionStartDate).add(14, 'days').format('L'));
  });

  useEffect(() => {
    if (dataToEdit) {
      setTitleValue(dataToEdit.title);
      setCommisionStartDate(dataToEdit.rawDate);
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

  useEffect(() => {
    if (users) {
      setRadioUsersOptions(
        users.map((user) => {
          return (
            <FormControlLabel
              key={user.img}
              value={user.initials}
              control={<Radio />}
              label={
                <StyledChip
                  label={user.initials}
                  style={{
                    backgroundColor: `${user.color}`,
                  }}
                />
              }
              labelPlacement='top'
            />
          );
        })
      );
    }
  }, [setRadioUsersOptions, users]);

  useEffect(() => {
    if (radioValue) {
      setRadioTemporaryCommisionUsersOptions(
        users
          .filter((item) => item.initials !== radioValue)
          .map((user) => {
            return (
              <FormControlLabel
                key={user.img}
                value={user.initials}
                control={<Radio />}
                label={
                  <StyledChip
                    label={user.initials}
                    style={{
                      backgroundColor: `${user.color}`,
                    }}
                  />
                }
                labelPlacement='top'
              />
            );
          })
      );
    }
  }, [setRadioTemporaryCommisionUsersOptions, users, radioValue]);

  const handleCheckboxCurrentMonth = (event) => {
    setAddToCurrentMonth(event.target.checked);
  };
  const handleCheckboxChange = (event) => {
    setOldCommision(event.target.checked);
  };
  const handleTemporaryCommisionCheckboxChange = (event) => {
    setTemporaryCommision(event.target.checked);
  };
  const handleStartCommisionDateChange = (date) => {
    setCommisionStartDate(date);
  };
  const handleTitleChange = (event) => {
    if (errorTitle) {
      setErrorTitle(false);
    }
    setTitleValue(event.target.value);
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
  const handleTemporaryCommisionRadioChange = (event) => {
    setTemporaryCommisionRadioValue(event.target.value);
  };

  const setTimestamp = (date) => {
    if (oldCommision) {
      if (addToCurrentMonth) {
        return moment(date).format('MMMM YYYY');
      } else {
        return '';
      }
    } else {
      return moment(date).format('MMMM YYYY');
    }
  };

  const setReason = (reason) => {
    if (reason === 'Brak') {
      return '';
    } else if (reason === '') {
      return null;
    } else {
      return reason;
    }
  };

  const isCommisionChangeDate = (temporaryCommision, commisionStartDate) => {
    if (temporaryCommision) {
      return new Date(
        new Date(commisionStartDate).getTime() + 1209600000
      ).getTime();
    } else {
      return null;
    }
  };
  const handleSubmit = () => {
    console.log(moment(commisionStartDate).isBefore(new Date(), 'month'));
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
      const id = `${dataToEdit ? dataToEdit.id : uuidv4()}`;
      firebase
        .firestore()
        .collection(`company-state-general`)
        .doc(id)
        .set({
          title: titleValue,
          date: moment(commisionStartDate).format('L'),
          minus: setReason(minusReason),
          plus: setReason(plusReason),
          user: `${admin ? radioValue : personalData.initials}`,
          temporaryCommision,
          firstUser: `${admin ? radioValue : personalData.initials}`,
          nextUser: temporaryCommisionRadioValue,
          commisionStartDate: new Date(commisionStartDate).getTime(),
          commisionChangeDate: isCommisionChangeDate(
            temporaryCommision,
            commisionStartDate
          ),
          rawDate: `${commisionStartDate}`,
          timestamp: setTimestamp(commisionStartDate),
          id,
        })
        .then(() => setSuccessSnackbarOpen(true))
        .catch((err) => console.log(err));

      // console.log({
      //   title: titleValue,
      //   date: moment(commisionStartDate).format('L'),
      //   minus: setReason(minusReason),
      //   plus: setReason(plusReason),
      //   user: `${admin ? radioValue : personalData.initials}`,
      //   temporaryCommision,
      //   firstUser: `${admin ? radioValue : personalData.initials}`,
      //   nextUser: temporaryCommisionRadioValue,
      //   commisionStartDate: new Date(commisionStartDate).getTime(),
      //   commisionChangeDate: isCommisionChangeDate(
      //     temporaryCommision,
      //     commisionStartDate
      //   ),
      //   rawDate: `${commisionStartDate}`,
      //   timestamp: setTimestamp(commisionStartDate),
      //   id,
      // });
      if (dataToEdit) {
        setEditDialogVisible(false);
      } else {
        handleClose();
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
            <MuiPickersUtilsProvider utils={MomentUtils}>
              <KeyboardDatePicker
                disableToolbar
                variant='inline'
                format='L'
                margin='normal'
                id='date-picker-inline'
                label='Start zlecenia'
                value={commisionStartDate}
                onChange={handleStartCommisionDateChange}
                style={{ margin: '10px 0 20px' }}
                KeyboardButtonProps={{
                  'aria-label': 'change date',
                }}
              />
            </MuiPickersUtilsProvider>
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
                  <MenuItem value={'K'}>K</MenuItem>
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
              <FormControl component='fieldset' style={{ margin: '20px 0' }}>
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
                  {radioUsersOptions}
                </RadioGroup>
              </FormControl>

              {radioValue ? (
                <FormControlLabel
                  style={{ margin: '-10px 0 20px' }}
                  control={
                    <Checkbox
                      checked={temporaryCommision}
                      onChange={handleTemporaryCommisionCheckboxChange}
                      name='temporaryCommision'
                      color='primary'
                    />
                  }
                  label='Po 14 dniach:'
                />
              ) : null}
              {temporaryCommision ? (
                <RadioGroup
                  aria-label='nextUser'
                  name='user2'
                  value={temporaryCommisionRadioValue}
                  onChange={handleTemporaryCommisionRadioChange}
                  style={{ flexDirection: 'row', margin: '0px 0 20px' }}
                >
                  {radioTemporaryCommisionUsersOptions}
                </RadioGroup>
              ) : null}

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
