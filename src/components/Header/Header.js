import React, { useState } from 'react';
import styled from 'styled-components';
import { Logo } from '../Logo/Logo';
import MenuIcon from '@material-ui/icons/Menu';
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
    width: 260px;
    padding: 40px 20px;
    background-color: #212121;
    color: white;
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
        <TreeView>
          <TreeItem nodeId='1'></TreeItem>
          <TreeItem nodeId='1' label='Stan firmowy'>
            <TreeItem nodeId='2' label='Stan indywidualny' />
            <TreeItem nodeId='3' label='Stan firmowy ogólny' />
            <TreeItem nodeId='4' label='Stan firmowy miesięczny' />
          </TreeItem>
        </TreeView>
      </StyledDrawer>
    </Wrapper>
  );
};

export default Header;
