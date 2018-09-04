import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'

import { Link } from 'react-router-dom'

//Material
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import MenuList from '@material-ui/core/MenuList'

import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import AccountCircle from '@material-ui/icons/AccountCircle'
import Popper from '@material-ui/core/Popper';
import Fade from '@material-ui/core/Fade';
import Paper from '@material-ui/core/Paper';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';

const styles = (theme) => ({
  buttonRoot: {
    fontSize: '0.8125rem',
    color: theme.palette.textSecondary,
    fontWeigth: 400
  },
  accountMenu: {
    marginTop: 10,
    minWidth: 200
  },
  menuItem: {
    fontSize: '0.8125rem',
    color: theme.palette.textSecondary,   
  }  
});

export const AccountMenu = ({
  classes,
  //avatarUrl,
  //displayName,
  goToDashboard,  
  //goToAccount,
  //onLogoutClick,
  //closeAccountMenu,
  //anchorEl,
  //handleMenu,
}) => (
  <div>
    <Button
      variant="outlined"
      component={Link} 
      to="/projects" 
      //aria-owns={anchorEl ? 'menu-appbar' : null}
      //aria-haspopup="true"
      //onClick={handleMenu}
      onClick={goToDashboard}
      classes={{ root: classes.buttonRoot }}>
      Dashboard
      {/** <AccountCircle /> **/}
    </Button>
    {/** 
    <Popper id={"menu-appbar"} open={Boolean(anchorEl)} anchorEl={anchorEl} placement={'bottom-end'} transition>
      {({ TransitionProps }) => (
        <Fade {...TransitionProps} timeout={350}>
          <ClickAwayListener onClickAway={closeAccountMenu}>        
            <Paper className={classes.accountMenu}>
              <MenuList role="menu">
                <MenuItem onClick={goToDashboard} className={classes.menuItem}>Dashboard</MenuItem>              
                <MenuItem onClick={goToAccount} className={classes.menuItem}>Profile</MenuItem>
                <MenuItem onClick={onLogoutClick} className={classes.menuItem}>Logout</MenuItem>
              </MenuList>
            </Paper>
          </ClickAwayListener>
        </Fade>
      )}
    </Popper> **/}
  </div>
)

AccountMenu.propTypes = {
  //displayName: PropTypes.string,
  //avatarUrl: PropTypes.string,
  //goToAccount: PropTypes.func.isRequired,
  goToDashboard: PropTypes.func.isRequired,  
  //onLogoutClick: PropTypes.func.isRequired,
  //anchorEl: PropTypes.object,
  //closeAccountMenu: PropTypes.func.isRequired,
  //handleMenu: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired // from withStyles
}

export default withStyles(styles)(AccountMenu)