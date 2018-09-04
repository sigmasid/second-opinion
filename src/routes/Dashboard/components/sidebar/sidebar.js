import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';

import MenuList from '@material-ui/core/MenuList';
import MenuItem from '@material-ui/core/MenuItem';

import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';

//Icons
import ProjectsIcon from '@material-ui/icons/Style';
import AddProjectIcon from '@material-ui/icons/AddBox';
import ProfileIcon from '@material-ui/icons/Face';
import LogoutIcon from '@material-ui/icons/ExitToApp';

import { Route, Link } from 'react-router-dom'
const util = require('util') //print an object

const styles = theme => ({
  root: {
    width: 280,
  },
  paper: {
    width: 280,    
    backgroundColor: theme.palette.background.default,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  mainMenu: {
    marginTop: 16
  },
  menuItem: {
    '&:focus': {
      backgroundColor: theme.palette.primary.main,
      '& $primary, & $icon': {
        color: theme.palette.common.white,
      },
    },
    '&:active': {
      backgroundColor: theme.palette.primary.main      
    }
  },
  selectedMenuItem: {
    backgroundColor: theme.palette.primary.main,
  },
  primary: {},
  icon: {},
  positionBottom: {
    alignSelf: 'flex-end'
  }
});


const SideBar = (props) => {
    const {classes, handleLogout} = props;

    var active = props.match.path;

    return(
      <Hidden mdDown implementation="css" className={classes.root}>
        <Drawer variant="permanent" open classes={{ paper: classes.paper }}>
          <MenuList className={classes.mainMenu} >
            <MenuItem button component={Link} to={'/projects'} key={'projects'} classes={{root: classes.menuItem, selected: classes.selectedMenuItem}} selected={active === '/projects'}>
              <ListItemIcon className={classes.icon}>
                <ProjectsIcon />
              </ListItemIcon>
              <ListItemText primary="Projects" classes={{ primary: classes.primary }} />
            </MenuItem>
            <MenuItem button component={Link} to={'/new-project'} key={'newProject'} classes={{root: classes.menuItem, selected: classes.selectedMenuItem}} selected={active === '/new'}>
              <ListItemIcon className={classes.icon}>
                <AddProjectIcon />
              </ListItemIcon>
              <ListItemText primary="New Project" classes={{ primary: classes.primary }} />
            </MenuItem>
            <MenuItem button component={Link} to={'/account'} key={'account'} classes={{root: classes.menuItem, selected: classes.selectedMenuItem}} selected={active === '/account'} >
              <ListItemIcon className={classes.icon}>
                <ProfileIcon />
              </ListItemIcon>      
              <ListItemText primary="Account" classes={{ primary: classes.primary }}  />
            </MenuItem> 
          </MenuList>
          <MenuList className={classes.bottomMenu}>
            <MenuItem button  onClick={handleLogout} key={'logout'} classes={{root: classNames(classes.menuItem, classes.positionBottom), selected: classes.selectedMenuItem}} >
              <ListItemIcon className={classes.icon}>
                <LogoutIcon />
              </ListItemIcon>      
              <ListItemText primary="Logout" classes={{ primary: classes.primary }}  />
            </MenuItem>             
          </MenuList>
        </Drawer>
      </Hidden>
    );
};

SideBar.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(SideBar);