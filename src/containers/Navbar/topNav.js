import React from "react";

import classNames from "classnames";
import PropTypes from "prop-types";

import { Link } from 'react-router-dom'

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import Hidden from "@material-ui/core/Hidden";
import Drawer from "@material-ui/core/Drawer";

//Menu
import { Manager, Reference, Popper } from 'react-popper';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import MenuList from '@material-ui/core/MenuList';
import MenuItem from "@material-ui/core/MenuItem";

// @material-ui/icons
import ProfileIcon from '@material-ui/icons/AccountCircle';

import {
  containerFluid,
  transition,
  drawerWidth
} from "../styles/mainStyle.js";

// core components
//import headerStyle from "../styles/headerStyle.js";

const headerStyle = (theme) => ({
  appBar: {
    display: "flex",
    border: "0",
    borderRadius: "3px",
    padding: "0.625rem 0",
    marginBottom: "20px",
    color: "#555",
    width: "100%",
    background: "none",
    transition: "all 150ms ease 0s",
    alignItems: "center",
    flexFlow: "row nowrap",
    justifyContent: "flex-start",
    position: "relative",
    zIndex: "unset"
  },
  fixed: {
    position: "fixed",
    zIndex: "1100"
  },
  popperClose: {
    pointerEvents: 'none',
  },
  containerFluid: {
    ...containerFluid,
    minHeight: "50px",
    flex: "1",
    alignItems: "center",
    justifyContent: "space-between",
    display: "flex",
    flexWrap: "nowrap"
  },  
  flex: {
    flex: 1
  },
  appResponsive: {
    margin: "20px 10px"
  },
  transparent: {
    backgroundColor: "transparent !important",
    boxShadow: "none",
    color: "#FFFFFF"
  },
  white: {
    border: "0",
    padding: "0.625rem 0",
    marginBottom: "20px",
    color: "#555",
    backgroundColor: "#fff !important",
    boxShadow:
      "0 4px 18px 0px rgba(0, 0, 0, 0.12), 0 7px 10px -5px rgba(0, 0, 0, 0.15)"
  },
  drawerPaper: {
    border: "none",
    bottom: "0",
    transitionProperty: "top, bottom, width",
    transitionDuration: ".2s, .2s, .35s",
    transitionTimingFunction: "linear, linear, ease",
    width: drawerWidth,
    position: "fixed",
    display: "block",
    top: "0",
    height: "100vh",
    maxHeight: "1200px",
    right: "0",
    left: "auto",
    visibility: "visible",
    overflowY: "visible",
    borderTop: "none",
    textAlign: "left",
    paddingRight: "0px",
    paddingLeft: "0",
    ...transition
  },
  menuItem: {
    fontSize: '0.8125rem',
    color: theme.palette.textSecondary,   
  }
});

const AccountMenu = (props) => {
  const {anchorEl, classes} = props;

  return ( 
      <Popper placement="bottom-end" eventsEnabled={anchorEl && true} className={classNames({ [classes.popperClose]: !anchorEl })}>
        {({ref, style, placement, outOfBoundaries, scheduleUpdate, arrowProps }) =>(
          <div
            ref={ref}
            className={classNames({ [classes.popperClose]: !(anchorEl && true) }, { [classes.popperResponsive]: true })}
            style={{ position: "absolute", right: "0px", minWidth: "150px", willChange: "transform" }}
            data-placement={"bottom-end"}
            >          
          <ClickAwayListener onClickAway={props.handleClose}>
            <Grow in={anchorEl && true} id="menu-list-grow" style={{ transformOrigin: '0 0 0' }}>
              <Paper>
                <MenuList role="menu">
                  <MenuItem component={Link} to="/account" className={classes.menuItem}>Profile</MenuItem>
                  <MenuItem onClick={props.handleLogout}  className={classes.menuItem}>Logout</MenuItem>
                </MenuList>
              </Paper>
            </Grow>
          </ClickAwayListener>        
          </div>
        )}
      </Popper>
  );
}

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mobileOpen: false,
      anchorEl: null      
    };
    this.handleDrawerToggle = this.handleDrawerToggle.bind(this);
    this.headerColorChange = this.headerColorChange.bind(this);
  }

  handleDrawerToggle() {
    this.setState({ mobileOpen: !this.state.mobileOpen });
  }

  componentDidMount() {
    if (this.props.changeColorOnScroll) {
      window.addEventListener("scroll", this.headerColorChange);
    }
  }

  headerColorChange() {
    const { classes, color, changeColorOnScroll } = this.props;
    const windowsScrollTop = window.pageYOffset;
    if (windowsScrollTop > changeColorOnScroll.height) {
      document.body
        .getElementsByTagName("header")[0]
        .classList.remove(classes[color]);
      document.body
        .getElementsByTagName("header")[0]
        .classList.add(classes[changeColorOnScroll.color]);
    } else {
      document.body
        .getElementsByTagName("header")[0]
        .classList.add(classes[color]);
      document.body
        .getElementsByTagName("header")[0]
        .classList.remove(classes[changeColorOnScroll.color]);
    }
  }

  componentWillUnmount() {
    if (this.props.changeColorOnScroll) {
      window.removeEventListener("scroll", this.headerColorChange);
    }
  }

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: undefined });
  };

  handleLogout = () => {
    this.props.logoutUser();
  }

  button = null;

  render() {
    const { classes, color, fixed, user } = this.props;
    const appBarClasses = classNames({
      [classes.appBar]: true,
      [classes[color]]: color,
      [classes.fixed]: fixed
    });

    const brandComponent = <Button className={classes.title}>Second Opinion</Button>;
    const accountButton = <Manager>
                            <Reference>
                              {({ref}) => (
                                <IconButton ref={ref}
                                            onClick={ this.handleClick } 
                                            className={ classes.button } 
                                            aria-haspopup="true"
                                            aria-owns={this.state.anchorEl ? 'accountMenu' : null}>
                                  <ProfileIcon />
                                </IconButton>        
                              )}
                            </Reference>
                              <AccountMenu  classes={classes} 
                                            anchorEl={ this.state.anchorEl } 
                                            handleClose={this.handleClose} 
                                            handleClick={this.handleClick} 
                                            handleLogout={this.handleLogout} 
                              />                              
                          </Manager>
    
    const loginButton = <Button component={Link} to="/login" className={classes.button} size="small" color="primary">Sign in</Button>;

    const rightLinks = (
      <div>
        <Button className={classes.button} size="small" color="primary">Professionals</Button>
        {user ? accountButton : loginButton }
      </div>
    );
    const leftLinks = (<Button variant="outlined" size="small" className={classes.button}>get started</Button>);

    return (
      <AppBar className={appBarClasses} >
        <Toolbar className={classes.containerFluid}>
          { leftLinks }
          <div className={classes.flex}>
            { brandComponent }
          </div>
          <Hidden smDown implementation="css">{ rightLinks }</Hidden>
          <Hidden mdUp>
            <IconButton color="inherit" aria-label="open drawer" onClick={this.handleDrawerToggle}>
              {/** implement mobile menu **/}
            </IconButton>
          </Hidden>
        </Toolbar>
        <Hidden mdUp implementation="css">
          <Drawer
            variant="temporary"
            anchor={"right"}
            open={this.state.mobileOpen}
            classes={{
              paper: classes.drawerPaper
            }}
            onClose={this.handleDrawerToggle}
          >
            <div className={classes.appResponsive}>
              {leftLinks}
              {rightLinks}
            </div>
          </Drawer>
        </Hidden>
      </AppBar>
    );
  }
}

Header.propTypes = {
  classes: PropTypes.object.isRequired,
  color: PropTypes.oneOf([
    "primary",
    "info",
    "success",
    "warning",
    "danger",
    "transparent",
    "white",
    "rose",
    "dark"
  ]),
  fixed: PropTypes.bool
};

export default withStyles(headerStyle)(Header);
