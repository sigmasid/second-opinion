import React from 'react'
import PropTypes from 'prop-types'
import classNames from "classnames";

//components
import AccountMenu from './accountMenu'
import LoginMenu from './loginMenu'

import { Link } from 'react-router-dom'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import MenuList from '@material-ui/core/MenuList';

import { LIST_PATH } from 'constants'
import { withStyles } from '@material-ui/core/styles';

import {
  containerFluid,
  transition,
  drawerWidth
} from "styles/mainStyle.js";

const util = require('util') //print an object

export const Navbar = ({
  classes,
  avatarUrl,
  displayName,
  authExists,
  goToAccount,
  goToDashboard,  
  handleLogout,
  closeAccountMenu,
  anchorEl,
  handleMenu
}) => (
  <AppBar className={classNames(classes.appBar, classes.transparent, classes.white)} >
    <Toolbar className={classes.toolbar}>
      <Typography
        type="title"
        color="inherit"
        className={classes.flex}
        component={Link}
        to={authExists ? LIST_PATH : '/'}>
        material
      </Typography>
      <div className={classes.rightSection}>
      { authExists ? (
        <AccountMenu
          //avatarUrl={avatarUrl}
          //displayName={displayName}
          //onLogoutClick={handleLogout}
          //goToAccount={goToAccount}
          goToDashboard={goToDashboard}          
          //closeAccountMenu={closeAccountMenu}
          //handleMenu={handleMenu}
          //anchorEl={anchorEl}
        />
      ) : (
        <LoginMenu />
      )}
      </div>
    </Toolbar>
  </AppBar>
)

Navbar.propTypes = {
  displayName: PropTypes.string, // from enhancer (flattenProps - profile)
  avatarUrl: PropTypes.string, // from enhancer (flattenProps - profile)
  authExists: PropTypes.bool, // from enhancer (withProps - auth)
  goToAccount: PropTypes.func.isRequired, // from enhancer (withHandlers - router)
  handleLogout: PropTypes.func.isRequired, // from enhancer (withHandlers - firebase)
  closeAccountMenu: PropTypes.func.isRequired, // from enhancer (withHandlers - firebase)
  handleMenu: PropTypes.func.isRequired, // from enhancer (withHandlers - firebase)
  anchorEl: PropTypes.object // from enhancer (withStateHandlers - handleMenu)
}

export default Navbar