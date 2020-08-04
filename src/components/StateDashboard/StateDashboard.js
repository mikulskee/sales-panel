import React, { useContext, useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import firebase from '../../firebase';
// import moment from 'moment';
// import 'moment/locale/pl';
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
  CircularProgress,
} from '@material-ui/core';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';
import DeleteIcon from '@material-ui/icons/Delete';
import CreateIcon from '@material-ui/icons/Create';
import { UsersContext } from '../../contexts/UsersContext';
import { AppContext } from '../../contexts/AppContext';
import { PersonalDataContext } from '../../contexts/PersonalDataContext';
import DeleteConfirmationDialog from '../DeleteConfirmationDialog/DeleteConfirmationDialog';

const StateDashboard = (props) => {
  const { personalData } = useContext(PersonalDataContext);
  const { users } = useContext(UsersContext);
  const {
    personalStateVisible,
    companyGeneralStateVisible,
    setSuccessDeleteSnackbarOpen,
  } = useContext(AppContext);
  const [
    deleteConfirmationDialogVisible,
    setDeleteConfirmationDialogVisible,
  ] = useState(false);
  const [overall, setOverall] = useState(null);
  const [percentage, setPercentage] = useState(null);
  const [minusCommisions, setMinusCommisions] = useState();
  const [plusCommisions, setPlusCommisions] = useState();
  const [plusList, setPlusList] = useState();
  const [minusList, setMinusList] = useState();
  const [companyState, setCompanyState] = useState(false);
  const [itemToDelete, setItemToDelete] = useState();
  const { data, admin, title, company } = props;

  const handleOpenDeleteDialog = (item) => (event) => {
    setDeleteConfirmationDialogVisible(true);
    setItemToDelete(item);
    console.log('lolo');
  };

  const handleDeleteData = (item) => (event) => {
    if (item.timestamp) {
      firebase
        .firestore()
        .collection(
          `personal-state-${
            users.filter((i) => i.initials === item.user)[0].uid
          }`
        )
        .doc(item.id)
        .delete()
        .then(() => {
          setDeleteConfirmationDialogVisible(false);
          setSuccessDeleteSnackbarOpen(true);
        });
    }

    firebase
      .firestore()
      .collection('company-state-general')
      .doc(item.id)
      .delete()
      .then(() => {
        setDeleteConfirmationDialogVisible(false);
        setSuccessDeleteSnackbarOpen(true);
      });
  };

  const findChipColor = (userInitials) => {
    if (personalData) {
      return users.filter((user) => user.initials === userInitials)[0].color;
    } else {
      return;
    }
  };

  const checkSize = () => {
    if (companyState) {
      if (personalStateVisible) {
        return 11;
      } else {
        return 5;
      }
    } else {
      if (companyGeneralStateVisible) {
        return 11;
      } else {
        return 5;
      }
    }
  };
  useEffect(() => {
    if (company) {
      setCompanyState(true);
    }
  }, [company]);

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
              style={{
                flex: 'none',
                width: '28%',
                marginRight: '10px',
                overflow: 'hidden',
              }}
            />
            <Box component='span' style={{ width: '13%', textAlign: 'center' }}>
              {item.plus ? (
                <Chip
                  label={item.plus}
                  style={{ backgroundColor: '#a2ef9d' }}
                />
              ) : null}
            </Box>
            <Box component='span' style={{ width: '14%', textAlign: 'center' }}>
              {item.user ? (
                <Chip
                  label={item.user}
                  style={{ backgroundColor: `${findChipColor(item.user)}` }}
                />
              ) : null}
            </Box>
            <Box component='span' style={{ width: '14%', textAlign: 'center' }}>
              {item.timestamp ? null : (
                <Chip
                  label={'OLD'}
                  style={{ backgroundColor: `#252c61`, color: 'white' }}
                />
              )}
            </Box>

            {admin ? (
              <ListItemSecondaryAction>
                <IconButton edge='end' aria-label='create'>
                  <CreateIcon />
                </IconButton>
                <IconButton
                  edge='end'
                  aria-label='delete'
                  onClick={handleOpenDeleteDialog(item)}
                >
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
              style={{
                flex: 'none',
                width: '28%',
                marginRight: '10px',
                overflow: 'hidden',
              }}
            />
            <Box
              component={'span'}
              style={{ width: '18%', textAlign: 'center' }}
            >
              {item.minus ? (
                <Chip
                  label={item.minus}
                  style={{ backgroundColor: '#ff9292' }}
                />
              ) : null}
            </Box>
            <Box component='span' style={{ width: '12%', textAlign: 'center' }}>
              {item.user ? (
                <Chip
                  label={item.user}
                  style={{ backgroundColor: `${findChipColor(item.user)}` }}
                />
              ) : null}
            </Box>
            <Box component='span' style={{ width: '18%', textAlign: 'center' }}>
              {item.timestamp ? null : (
                <Chip
                  label={'OLD'}
                  style={{ backgroundColor: `#252c61`, color: 'white' }}
                />
              )}
            </Box>
            {admin ? (
              <ListItemSecondaryAction>
                <IconButton edge='end' aria-label='create'>
                  <CreateIcon />
                </IconButton>
                <IconButton
                  edge='end'
                  aria-label='delete'
                  onClick={handleOpenDeleteDialog(item)}
                >
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

  useEffect(() => {
    if (plusCommisions) {
      setPercentage((plusCommisions.length / 90) * 100);
    }
  }, [plusCommisions]);

  const CircularProgressWithLabel = (props) => {
    return (
      <Box
        position='relative'
        display='inline-flex'
        style={{
          margin: '16px auto',
          left: '50%',
          transform: 'translatex(-50%)',
        }}
      >
        <CircularProgress
          style={{ position: 'relative', color: '#cccccc' }}
          variant='static'
          value={100}
          size={80}
        />
        <CircularProgress
          style={{ position: 'absolute' }}
          variant='static'
          {...props}
        />

        <Box
          top={0}
          left={0}
          bottom={0}
          right={0}
          position='absolute'
          display='flex'
          alignItems='center'
          justifyContent='center'
        >
          <Typography
            variant='caption'
            component='div'
            color='textSecondary'
          >{`${Math.round(props.value)}%`}</Typography>
        </Box>
      </Box>
    );
  };

  return (
    <>
      {users ? (
        <>
          <Grid
            container
            item
            xl={5}
            style={{ maxWidth: '1400px', margin: '0 auto' }}
          >
            <Typography
              variant='h4'
              style={{
                position: 'relative',
                textAlign: 'center',
                margin: '0 auto',
                marginTop: '20px',
                color: 'white',
                fontWeight: 'bold',
              }}
            >
              {title}
              {companyState ? null : (
                <>
                  {overall ? (
                    <Chip
                      style={{
                        position: 'absolute',
                        left: '105%',
                        padding: '0 5px',
                        backgroundColor: `${
                          overall >= 0 ? '#d5ffde' : '#ffcbcb'
                        }`,
                      }}
                      label={overall}
                    />
                  ) : null}
                </>
              )}
            </Typography>
            <Grid container justify='center' style={{ margin: '20px auto' }}>
              {companyState ? (
                <Grid container justify='center'>
                  <Grid
                    item
                    xs={3}
                    lg={5}
                    xl={3}
                    style={{ margin: '10px 5px' }}
                  >
                    <Paper
                      elevation={3}
                      style={{ padding: '20px', backgroundColor: '#d5f5ff' }}
                    >
                      <Typography
                        variant='h6'
                        style={{ position: 'relative', paddingBottom: '10px' }}
                      >
                        Stan całkowity{' '}
                        {plusCommisions ? (
                          <Chip
                            style={{ position: 'absolute', right: 0 }}
                            label={`${plusCommisions.length} / 90`}
                          />
                        ) : null}
                      </Typography>
                      <Divider light />
                      <CircularProgressWithLabel size={80} value={percentage} />
                    </Paper>
                  </Grid>
                </Grid>
              ) : null}
              <Grid
                item
                xs={11}
                lg={checkSize()}
                xl={companyState ? 6 : 11}
                style={{ margin: '10px 5px' }}
              >
                <Paper
                  elevation={3}
                  style={{ padding: '20px 0', backgroundColor: '#d5ffde' }}
                >
                  <Typography variant='h6' style={{ padding: '10px 20px' }}>
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
              <Grid
                item
                xs={11}
                lg={checkSize()}
                xl={companyState ? 5 : 11}
                style={{ margin: '10px 5px' }}
              >
                <Paper
                  elevation={3}
                  style={{ padding: '20px 0', backgroundColor: '#ffcbcb' }}
                >
                  <Typography variant='h6' style={{ padding: '10px 20px' }}>
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
          <DeleteConfirmationDialog
            deleteConfirmationDialogVisible={deleteConfirmationDialogVisible}
            setDeleteConfirmationDialogVisible={
              setDeleteConfirmationDialogVisible
            }
            handleDeleteData={handleDeleteData}
            itemToDelete={itemToDelete}
          />
        </>
      ) : (
        <Redirect to='/' />
      )}
    </>
  );
};

export default StateDashboard;
