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
} from '@material-ui/core';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';
import DeleteIcon from '@material-ui/icons/Delete';
import CreateIcon from '@material-ui/icons/Create';
import { CompanyStateContext } from '../contexts/CompanyStateContext';
import { UserContext } from '../contexts/UserContext';

const CompanyState = () => {
  const { companyState } = useContext(CompanyStateContext);
  const { user } = useContext(UserContext);

  const [overall, setOverall] = useState(null);

  console.log(companyState.plus.length);
  console.log(companyState.minus.length);

  useEffect(() => {
    const result = companyState.plus.length - companyState.minus.length;

    if (result > 0) {
      setOverall(`+${result}`);
    } else {
      setOverall(`-${result}`);
    }
  }, [companyState.plus.length, companyState.minus.length]);

  const plusList = companyState.plus.map((item, i) => {
    return (
      <ListItem key={i}>
        <ListItemAvatar>
          <Avatar>
            <AddCircleIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary={item.name} secondary={item.date} />
        <ListItemSecondaryAction>
          <IconButton edge='end' aria-label='create'>
            <CreateIcon />
          </IconButton>
          <IconButton edge='end' aria-label='delete'>
            <DeleteIcon />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
    );
  });
  const minusList = companyState.minus.map((item, i) => {
    return (
      <ListItem key={i}>
        <ListItemAvatar>
          <Avatar>
            <RemoveCircleIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary={item.name} secondary={item.date} />
        <ListItemSecondaryAction>
          <IconButton edge='end' aria-label='create'>
            <CreateIcon />
          </IconButton>
          <IconButton edge='end' aria-label='delete'>
            <DeleteIcon />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
    );
  });

  return (
    <>
      {user ? (
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
            Stan firmowy ogólny
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
            <Grid item xs={9} style={{ margin: '10px 0' }}>
              <Paper
                elevation={3}
                style={{ padding: '20px', backgroundColor: '#d5ffde' }}
              >
                <Typography variant='h6'>Zlecenia pozyskane</Typography>
                <Divider light />
                <List>{plusList}</List>
              </Paper>
            </Grid>
            <Grid item xs={9} style={{ margin: '10px 0' }}>
              <Paper
                elevation={3}
                style={{ padding: '20px', backgroundColor: '#ffcbcb' }}
              >
                <Typography variant='h6'>Zlecenia utracone</Typography>
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

export default CompanyState;
