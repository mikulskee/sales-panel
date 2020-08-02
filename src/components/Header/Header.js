import React, { useState, useContext } from 'react';
import { withRouter } from 'react-router-dom';
import firebase from '../../firebase';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import { Logo } from '../Logo/Logo';
import MenuIcon from '@material-ui/icons/Menu';
import AssessmentIcon from '@material-ui/icons/Assessment';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';
import BarChartIcon from '@material-ui/icons/BarChart';
import EventNoteIcon from '@material-ui/icons/EventNote';
import AssistantIcon from '@material-ui/icons/Assistant';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import BuildIcon from '@material-ui/icons/Build';
import {
  IconButton,
  Button,
  Grid,
  Avatar,
  Typography,
  Drawer,
} from '@material-ui/core';
import TreeView from '@material-ui/lab/TreeView';
import TreeItem from '@material-ui/lab/TreeItem';
import { UsersContext } from '../../contexts/UsersContext';
import { PersonalDataContext } from '../../contexts/PersonalDataContext';

const Wrapper = styled.header`
  background-color: #fff;
`;

const StyledDrawer = styled(Drawer)`
  .MuiDrawer-paperAnchorLeft {
    width: 320px;
    padding: 40px 20px;
    background-color: #212121;
    color: white;
  }

  .MuiTreeItem-root.Mui-selected > .MuiTreeItem-content .MuiTreeItem-label {
    background-color: #212121 !important;
  }
`;

const TreeItemLabel = styled.div`
  display: flex;
  align-items: center;
  margin-top: 10px;
  padding: 5px 10px;
  transition: background-color 0.1s linear;
  border-top-right-radius: 20px;
  border-bottom-right-radius: 20px;

  &:hover {
    background-color: #565656;
  }
`;

const StyledLink = styled(NavLink)`
  display: block;
  color: white;
  text-decoration: none;

  &.active {
    .tree-item-label {
      background-color: #aaa;
    }
  }
`;

const Header = (props) => {
  const { personalData } = useContext(PersonalDataContext);
  const { users } = useContext(UsersContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
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
          {personalData ? (
            <IconButton
              onClick={() => setIsMenuOpen(true)}
              style={{ marginRight: '10px' }}
            >
              <MenuIcon fontSize='inherit' />
            </IconButton>
          ) : null}

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
      {personalData ? (
        <StyledDrawer
          anchor='left'
          open={isMenuOpen}
          onClose={() => setIsMenuOpen(false)}
        >
          <TreeView
            defaultCollapseIcon={<ArrowDropDownIcon />}
            defaultExpandIcon={<ArrowRightIcon />}
            defaultExpanded={['1']}
          >
            <TreeItem
              nodeId='1'
              label={
                <TreeItemLabel
                  style={{ marginTop: '0px' }}
                  className='tree-item-label-Main'
                >
                  <AssessmentIcon
                    style={{ display: 'block', marginRight: '5px' }}
                  />
                  {'Stan firmowy'}
                </TreeItemLabel>
              }
            >
              <TreeItem
                nodeId='2'
                label={
                  <StyledLink
                    to='personal-state'
                    activeClassName='active'
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <TreeItemLabel className='tree-item-label'>
                      <AssignmentIndIcon
                        style={{ display: 'block', marginRight: '5px' }}
                      />
                      {'Stan indywidualny'}
                    </TreeItemLabel>
                  </StyledLink>
                }
              />
              <TreeItem
                nodeId='3'
                label={
                  <StyledLink
                    to='company-state'
                    activeClassName='active'
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <TreeItemLabel className='tree-item-label'>
                      <BarChartIcon
                        style={{ display: 'block', marginRight: '5px' }}
                      />
                      {'Stan firmowy ogólny'}
                    </TreeItemLabel>
                  </StyledLink>
                }
              />
              <TreeItem
                nodeId='4'
                label={
                  <StyledLink
                    to='company-state-monthly'
                    activeClassName='active'
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <TreeItemLabel className='tree-item-label'>
                      <EventNoteIcon
                        style={{ display: 'block', marginRight: '5px' }}
                      />
                      {'Stan firmowy miesięczny'}
                    </TreeItemLabel>
                  </StyledLink>
                }
              />
            </TreeItem>
            <TreeItem
              nodeId='5'
              label={
                <TreeItemLabel className='tree-item-label-Main'>
                  <AssistantIcon
                    style={{ display: 'block', marginRight: '5px' }}
                  />
                  {'Mentoring'}
                </TreeItemLabel>
              }
            />
            <TreeItem
              nodeId='6'
              label={
                <TreeItemLabel className='tree-item-label-Main'>
                  <MenuBookIcon
                    style={{ display: 'block', marginRight: '5px' }}
                  />
                  {'Manual sprzedażowy'}
                </TreeItemLabel>
              }
            />
            <TreeItem
              nodeId='7'
              label={
                <StyledLink
                  to='client-managment'
                  activeClassName='active'
                  onClick={() => setIsMenuOpen(false)}
                >
                  <TreeItemLabel className='tree-item-label'>
                    <BuildIcon
                      style={{ display: 'block', marginRight: '5px' }}
                    />
                    {'Zarządzanie klientami'}
                  </TreeItemLabel>
                </StyledLink>
              }
            />
          </TreeView>
        </StyledDrawer>
      ) : null}
    </Wrapper>
  );
};

export default withRouter(Header);
