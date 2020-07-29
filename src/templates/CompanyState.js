import React from 'react';
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
} from '@material-ui/core';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';
import DeleteIcon from '@material-ui/icons/Delete';
import CreateIcon from '@material-ui/icons/Create';
const CompanyState = () => {
  return (
    <Grid container>
      <Typography
        variant='h4'
        style={{
          textAlign: 'center',
          margin: '0 auto',
          marginTop: '20px',
          color: '#3c3c3c',
          fontWeight: 'bold',
        }}
      >
        Stan firmowy ogólny
      </Typography>
      <Grid container justify='center' style={{ marginTop: '20px' }}>
        <Grid item xs={9} style={{ margin: '10px 0' }}>
          <Paper
            elevation={3}
            style={{ padding: '20px', backgroundColor: '#d5ffde' }}
          >
            <Typography variant='h6'>Zlecenia pozyskane</Typography>
            <Divider light />
            <List>
              <ListItem>
                <ListItemAvatar>
                  <Avatar>
                    <AddCircleIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary='Amelia von Jugendin'
                  secondary='07.09.2020 - 10.11.2020'
                />
                <ListItemSecondaryAction>
                  <IconButton edge='end' aria-label='create'>
                    <CreateIcon />
                  </IconButton>
                  <IconButton edge='end' aria-label='delete'>
                    <DeleteIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
              <ListItem>
                <ListItemAvatar>
                  <Avatar>
                    <AddCircleIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary='Kundinga Oberschleisen'
                  secondary='07.09.2020 - 10.11.2020'
                />
                <ListItemSecondaryAction>
                  <IconButton edge='end' aria-label='create'>
                    <CreateIcon />
                  </IconButton>
                  <IconButton edge='end' aria-label='delete'>
                    <DeleteIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
              <ListItem>
                <ListItemAvatar>
                  <Avatar>
                    <AddCircleIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary='Burgundia Vielschmeltzer'
                  secondary='07.09.2020 - 10.11.2020'
                />
                <ListItemSecondaryAction>
                  <IconButton edge='end' aria-label='create'>
                    <CreateIcon />
                  </IconButton>
                  <IconButton edge='end' aria-label='delete'>
                    <DeleteIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            </List>
          </Paper>
        </Grid>
        <Grid item xs={9} style={{ margin: '10px 0' }}>
          <Paper
            elevation={3}
            style={{ padding: '20px', backgroundColor: '#ffcbcb' }}
          >
            <Typography variant='h6'>Zlecenia utracone</Typography>
            <Divider light />
            <List>
              <ListItem>
                <ListItemAvatar>
                  <Avatar>
                    <RemoveCircleIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary='Bemblina Augsbergen'
                  secondary='10.10.2019'
                />
                <ListItemSecondaryAction>
                  <IconButton edge='end' aria-label='create'>
                    <CreateIcon />
                  </IconButton>
                  <IconButton edge='end' aria-label='delete'>
                    <DeleteIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
              <ListItem>
                <ListItemAvatar>
                  <Avatar>
                    <RemoveCircleIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary='Agathe Monchengladbach'
                  secondary='10.10.2019'
                />
                <ListItemSecondaryAction>
                  <IconButton edge='end' aria-label='create'>
                    <CreateIcon />
                  </IconButton>
                  <IconButton edge='end' aria-label='delete'>
                    <DeleteIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            </List>
          </Paper>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default CompanyState;
