import React, { useState } from 'react';
import styled from 'styled-components';
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
  background-color: #212121;
  transition: background-color 0.1s linear;
  border-top-right-radius: 20px;
  border-bottom-right-radius: 20px;

  &:hover {
    background-color: #565656;
  }
`;

const StyledTreeItem = styled(TreeItem)`
  background-color: #212121;

  .MuiTreeItem-root.Mui-selected .tree-item-label {
    background-color: #aaa;
  }

  &.Mui-selected .tree-item-label-Main {
    background-color: #aaa;
  }
`;

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    <Wrapper>
      <Grid container style={{ padding: '20px' }} justify='space-between'>
        <Grid item style={{ display: 'flex', alignItems: 'center' }}>
          <IconButton
            onClick={() => setIsMenuOpen(true)}
            style={{ marginRight: '10px' }}
          >
            <MenuIcon fontSize='inherit' />
          </IconButton>
          <Logo>
            <span>Sales</span> Panel
          </Logo>
        </Grid>

        <Grid item>
          <Grid container spacing={2}>
            <Grid item>
              <Avatar>AK</Avatar>
            </Grid>
            <Grid item style={{ display: 'flex', alignItems: 'center' }}>
              <Typography variant='h6'>Anna Kliś</Typography>{' '}
            </Grid>
            <Grid item style={{ display: 'flex', alignItems: 'center' }}>
              <Button variant='contained' color='primary'>
                Wyloguj
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
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
          <StyledTreeItem
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
            <StyledTreeItem
              nodeId='2'
              label={
                <TreeItemLabel className='tree-item-label'>
                  <AssignmentIndIcon
                    style={{ display: 'block', marginRight: '5px' }}
                  />
                  {'Stan indywidualny'}
                </TreeItemLabel>
              }
            />
            <StyledTreeItem
              nodeId='3'
              label={
                <TreeItemLabel className='tree-item-label'>
                  <BarChartIcon
                    style={{ display: 'block', marginRight: '5px' }}
                  />
                  {'Stan firmowy ogólny'}
                </TreeItemLabel>
              }
            />
            <StyledTreeItem
              nodeId='4'
              label={
                <TreeItemLabel className='tree-item-label'>
                  <EventNoteIcon
                    style={{ display: 'block', marginRight: '5px' }}
                  />
                  {'Stan firmowy miesięczny'}
                </TreeItemLabel>
              }
            />
          </StyledTreeItem>
          <StyledTreeItem
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
          <StyledTreeItem
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
          <StyledTreeItem
            nodeId='7'
            label={
              <TreeItemLabel className='tree-item-label'>
                <BuildIcon style={{ display: 'block', marginRight: '5px' }} />
                {'Zarządzanie klientami'}
              </TreeItemLabel>
            }
          />
        </TreeView>
      </StyledDrawer>
    </Wrapper>
  );
};

export default Header;
