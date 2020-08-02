import React, { useContext, useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import {
  Typography,
  Paper,
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Divider,
  Chip,
  Box,
} from '@material-ui/core';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';
import DeleteIcon from '@material-ui/icons/Delete';
import CreateIcon from '@material-ui/icons/Create';
import { UsersContext } from '../../contexts/UsersContext';
import { PersonalDataContext } from '../../contexts/PersonalDataContext';

const StateDashboard = (props) => {
  const { personalData } = useContext(PersonalDataContext);
  const { users } = useContext(UsersContext);
  const [overall, setOverall] = useState(null);
  const [minusCommisions, setMinusCommisions] = useState();
  const [plusCommisions, setPlusCommisions] = useState();
  const [plusList, setPlusList] = useState();
  const [minusList, setMinusList] = useState();
  const { data, admin } = props;

  const findChipColor = (userInitials) => {
    if (personalData) {
      return users.filter((user) => user.initials === userInitials)[0].color;
    } else {
      return;
    }
  };

  useEffect(() => {
    if (data) {
      setPlusCommisions(
        data.filter((item) => (item.plus === '' || item.plus ? item : null))
      );
      setMinusCommisions(
        data.filter((item) => (item.minus === '' || item.minus ? item : null))
      );
    }
  }, [data]);

  useEffect(() => {
    if (plusCommisions && minusCommisions) {
      const result = plusCommisions.length - minusCommisions.length;

      if (result > 0) {
        setOverall(`+${result}`);
      } else {
        setOverall(`${result}`);
      }
    }
  }, [plusCommisions, minusCommisions]);

  useEffect(() => {
    if (plusCommisions) {
      const data = plusCommisions.map((item, i) => {
        return (
          <ListItem key={i}>
            <ListItemAvatar>
              <Avatar>
                <AddCircleIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={item.title}
              secondary={item.date}
              style={{ flex: 'none', width: '25%' }}
            />
            <Box component='span' style={{ width: '10%' }}>
              {item.plus ? (
                <Chip
                  label={item.plus}
                  style={{ backgroundColor: '#a2ef9d' }}
                />
              ) : null}
            </Box>
            <Box component='span' style={{ width: '10%' }}>
              {item.user ? (
                <Chip
                  label={item.user}
                  style={{ backgroundColor: `${findChipColor(item.user)}` }}
                />
              ) : null}
            </Box>

            {admin ? (
              <ListItemSecondaryAction>
                <IconButton edge='end' aria-label='create'>
                  <CreateIcon />
                </IconButton>
                <IconButton edge='end' aria-label='delete'>
                  <DeleteIcon />
                </IconButton>
              </ListItemSecondaryAction>
            ) : null}
          </ListItem>
        );
      });

      setPlusList(data);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setPlusList, plusCommisions]);

  useEffect(() => {
    if (minusCommisions) {
      const data = minusCommisions.map((item, i) => {
        return (
          <ListItem key={i}>
            <ListItemAvatar>
              <Avatar>
                <RemoveCircleIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={item.title}
              secondary={item.date}
              style={{ flex: 'none', width: '25%' }}
            />
            <Box component={'span'} style={{ width: '10%' }}>
              {item.minus ? (
                <Chip
                  label={item.minus}
                  style={{ backgroundColor: '#ff9292', margin: '0 10px' }}
                />
              ) : null}
            </Box>
            <Box component='span' style={{ width: '10%' }}>
              {item.user ? (
                <Chip
                  label={item.user}
                  style={{ backgroundColor: `${findChipColor(item.user)}` }}
                />
              ) : null}
            </Box>
            {admin ? (
              <ListItemSecondaryAction>
                <IconButton edge='end' aria-label='create'>
                  <CreateIcon />
                </IconButton>
                <IconButton edge='end' aria-label='delete'>
                  <DeleteIcon />
                </IconButton>
              </ListItemSecondaryAction>
            ) : null}
          </ListItem>
        );
      });

      setMinusList(data);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setMinusList, minusCommisions]);

  return (
    <>
      {users ? (
        <Grid container>
          <Typography
            variant='h4'
            style={{
              position: 'relative',
              textAlign: 'center',
              margin: '0 auto',
              marginTop: '20px',
              color: '#3c3c3c',
              fontWeight: 'bold',
            }}
          >
            {props.title}
            {overall ? (
              <Chip
                style={{
                  position: 'absolute',
                  left: '105%',
                  padding: '0 5px',
                  backgroundColor: `${overall >= 0 ? '#d5ffde' : '#ffcbcb'}`,
                }}
                label={overall}
              />
            ) : null}
          </Typography>
          <Grid container justify='center' style={{ marginTop: '20px' }}>
            <Grid item xs={9} style={{ margin: '10px 0', maxWidth: '1200px' }}>
              <Paper
                elevation={3}
                style={{ padding: '20px', backgroundColor: '#d5ffde' }}
              >
                <Typography variant='h6' style={{ paddingBottom: '10px' }}>
                  Zlecenia pozyskane
                  {plusCommisions ? (
                    <Chip
                      label={plusCommisions.length}
                      style={{ marginLeft: '10px' }}
                    />
                  ) : null}
                </Typography>
                <Divider light />
                <List>{plusList}</List>
              </Paper>
            </Grid>
            <Grid item xs={9} style={{ margin: '10px 0', maxWidth: '1200px' }}>
              <Paper
                elevation={3}
                style={{ padding: '20px', backgroundColor: '#ffcbcb' }}
              >
                <Typography variant='h6' style={{ paddingBottom: '10px' }}>
                  Zlecenia utracone
                  {minusCommisions ? (
                    <Chip
                      label={minusCommisions.length}
                      style={{ marginLeft: '10px' }}
                    />
                  ) : null}
                </Typography>

                <Divider light />
                <List>{minusList}</List>
              </Paper>
            </Grid>
          </Grid>
        </Grid>
      ) : (
        <Redirect to='/' />
      )}
    </>
  );
};

export default StateDashboard;
