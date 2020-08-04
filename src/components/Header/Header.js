import React, { useContext } from 'react';
import { withRouter } from 'react-router-dom';
import firebase from '../../firebase';
import styled from 'styled-components';

import { Logo } from '../Logo/Logo';
import { Button, Grid, Avatar, Typography } from '@material-ui/core';
import { UsersContext } from '../../contexts/UsersContext';
import { PersonalDataContext } from '../../contexts/PersonalDataContext';

const Wrapper = styled.header`
  background-color: #9afff9;
`;

const Header = (props) => {
  const { personalData } = useContext(PersonalDataContext);
  const { users } = useContext(UsersContext);
  const handleLogout = (e) => {
    e.preventDefault();
    props.history.push('/');
    firebase.auth().signOut();
  };
  const findChipColor = (userInitials) => {
    if (personalData) {
      if (userInitials === 'AK') {
        return users.filter((user) => user.initials === 'QA')[0].color;
      } else {
        return users.filter((user) => user.initials === userInitials)[0].color;
      }
    } else {
      return;
    }
  };
  return (
    <Wrapper>
      <Grid container style={{ padding: '20px' }} justify='space-between'>
        <Grid item style={{ display: 'flex', alignItems: 'center' }}>
          <Logo>
            <span>Sales</span> Panel
          </Logo>
        </Grid>

        <Grid item>
          <Grid container spacing={2}>
            <Grid item>
              {personalData ? (
                <Avatar
                  style={{
                    color: 'black',
                    backgroundColor: `${findChipColor(personalData.initials)}`,
                  }}
                >
                  {personalData.initials}
                </Avatar>
              ) : (
                personalData
              )}
            </Grid>
            <Grid item style={{ display: 'flex', alignItems: 'center' }}>
              {personalData ? (
                <Typography variant='h6'>{personalData.name}</Typography>
              ) : (
                personalData
              )}
            </Grid>
            <Grid item style={{ display: 'flex', alignItems: 'center' }}>
              {personalData ? (
                <Button
                  variant='contained'
                  color='primary'
                  onClick={handleLogout}
                >
                  Wyloguj
                </Button>
              ) : (
                personalData
              )}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Wrapper>
  );
};

export default withRouter(Header);
