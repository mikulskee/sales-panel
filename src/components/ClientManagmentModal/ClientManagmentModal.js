import React, { useState } from 'react';
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
} from '@material-ui/core';
const ClientManagment = () => {
  const [titleValue, setTitleValue] = useState('');
  const [dateValue, setDateValue] = useState('');
  const [minusReason, setMinusReason] = useState('');
  const [plusReason, setPlusReason] = useState('');
  const [radioValue, setRadioValue] = useState('');

  const handleTitleChange = (event) => {
    setTitleValue(event.target.value);
  };
  const handleDateChange = (event) => {
    setDateValue(event.target.value);
  };
  const handleReasonChange = (reason) => (event) => {
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
  return (
    <Paper
      style={{ width: '500px', margin: '60px auto', padding: '20px' }}
      elevation={3}
    >
      <Typography variant={'h6'} gutterBottom style={{ textAlign: 'center' }}>
        Zarządzanie klientami
      </Typography>

      <form style={{ marginTop: '20px' }}>
        <Grid
          container
          direction='column'
          justify='center'
          alignItems='center'
          spacing={3}
        >
          <Grid item>
            <FormControl variant='outlined'>
              <InputLabel htmlFor='name'>Nazwa zlecenia</InputLabel>
              <OutlinedInput
                id='name'
                label='Nazwa zlecenia'
                variant='outlined'
                style={{ width: '240px' }}
                required={true}
                value={titleValue}
                onChange={handleTitleChange}
              />
            </FormControl>
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

          <Grid container justify='center' spacing={4}>
            <Grid item style={{ textAlign: 'center' }}>
              <Typography
                variant={'subtitle2'}
                gutterBottom
                style={{ textAlign: 'center' }}
              >
                Zlecenie pozyskane
              </Typography>
              <FormControl variant='outlined' style={{ width: '100px' }}>
                <InputLabel id='plus-reason'>Powód</InputLabel>
                <Select
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
            <Grid item style={{ textAlign: 'center' }}>
              <Typography
                variant={'subtitle2'}
                gutterBottom
                style={{ textAlign: 'center' }}
              >
                Zlecenie utracone
              </Typography>
              <FormControl variant='outlined' style={{ width: '100px' }}>
                <InputLabel id='minus-reason'>Powód</InputLabel>
                <Select
                  labelId='minus-reason'
                  id='minus'
                  value={minusReason}
                  onChange={handleReasonChange('')}
                  label='Age'
                >
                  <MenuItem value='Brak'>Brak</MenuItem>
                  <MenuItem value={'KUNDI'}>KUNDI</MenuItem>
                  <MenuItem value={'TOD'}>TOD</MenuItem>
                  <MenuItem value={'DLU'}>DLU</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
          <FormControl component='fieldset'>
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
                  <Chip label='QA' style={{ backgroundColor: '#3df4fd' }} />
                }
                labelPlacement='top'
              />
              <FormControlLabel
                value='KK'
                control={<Radio />}
                label={
                  <Chip label='KK' style={{ backgroundColor: '#b4f56c' }} />
                }
                labelPlacement='top'
              />
              <FormControlLabel
                value='VF'
                control={<Radio />}
                label={
                  <Chip label='VF' style={{ backgroundColor: '#a8b5f5' }} />
                }
                labelPlacement='top'
              />
            </RadioGroup>
          </FormControl>
          <Button variant='contained' color='primary'>
            Zatwierdź
          </Button>
        </Grid>
      </form>
    </Paper>
  );
};

export default ClientManagment;
