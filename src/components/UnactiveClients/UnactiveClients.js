import React, { useEffect, useState } from 'react';

import {
  Grid,
  Paper,
  Typography,
  Chip,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Box,
  Badge,
  ListItemSecondaryAction,
  IconButton,
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import CreateIcon from '@material-ui/icons/Create';
import NotInterestedIcon from '@material-ui/icons/NotInterested';

const UnactiveCients = (props) => {
  const {
    checkSize,
    companyState,
    company,
    dataForUnactiveClients,
    users,
    findChipColor,
    admin,
    handleOpenEditDialog,
    handleOpenDeleteDialog,
  } = props;

  const [unactiveClientsList, setUnactiveClientsList] = useState();

  useEffect(() => {
    if (dataForUnactiveClients) {
      const data = dataForUnactiveClients
        .sort(function (a, b) {
          if (a.title < b.title) {
            return -1;
          }
          if (a.title > b.title) {
            return 1;
          }
          return 0;
        })
        .map((item, i) => {
          return (
            <ListItem key={i}>
              <ListItemAvatar>
                <Avatar>
                  <NotInterestedIcon />
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
                component='span'
                style={{ width: '13%', textAlign: 'center' }}
              >
                <Chip
                  label={item.minus}
                  style={{ backgroundColor: '#ff9292' }}
                />
              </Box>
              <Box
                component='span'
                style={{ width: '14%', textAlign: 'center' }}
              >
                {item.user ? (
                  <>
                    {users.filter((u) => u.initials === item.user)[0].img ? (
                      <Badge badgeContent={item.user} color='primary'>
                        <Avatar
                          style={{ margin: '0 auto' }}
                          src={
                            users.filter((u) => u.initials === item.user)[0].img
                          }
                        />
                      </Badge>
                    ) : (
                      <Chip
                        label={item.user}
                        style={{
                          backgroundColor: `${findChipColor(item.user)}`,
                        }}
                      />
                    )}
                  </>
                ) : null}
              </Box>
              <Box
                component='span'
                style={{ width: '14%', textAlign: 'center' }}
              >
                {item.timestamp ? null : (
                  <Chip
                    label={'OLD'}
                    style={{ backgroundColor: `#252c61`, color: 'white' }}
                  />
                )}
              </Box>

              {admin ? (
                <ListItemSecondaryAction>
                  <IconButton
                    edge='end'
                    aria-label='create'
                    onClick={handleOpenEditDialog(item)}
                  >
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

      setUnactiveClientsList(data);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataForUnactiveClients]);
  return (
    <>
      <Grid
        item
        xs={11}
        lg={checkSize()}
        xl={companyState ? 5 : 11}
        style={{ margin: '10px 5px' }}
      >
        <Paper
          elevation={3}
          style={{ padding: '20px 0', backgroundColor: '#a9a9a9' }}
        >
          <Typography variant='h6' style={{ padding: '10px 20px' }}>
            Niefakturowani klienci
            {unactiveClientsList ? (
              <Chip
                label={unactiveClientsList.length}
                style={{ marginLeft: '10px' }}
              />
            ) : null}
          </Typography>

          <Divider light />
          <List
            style={{
              maxHeight: `${company ? '575px' : '260px'}`,
              overflowY: 'auto',
            }}
          >
            {unactiveClientsList}
          </List>
        </Paper>
      </Grid>
    </>
  );
};

export default UnactiveCients;
