import React from "react";
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Route } from 'react-router-dom';

import {Elements} from 'react-stripe-elements';

//components
import Sidebar from "./components/sidebar";
import ProjectSpace from "./components/projectDetail";
import Projects from './components/projectList';
import NewProject from './components/newProject';
import Profile from './components/profile';

// @material-ui/icons
import withStyles from "@material-ui/core/styles/withStyles";

//icons
const util = require('util') //print an object

const styles = (theme) => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
    display: 'flex',
  }
});

const Dashboard = (props) => {
  const { classes, auth } = props;
  const hashParts = window.location.hash.split('#');

  return (
  <div className={classes.root}>
    <Sidebar />
    <Route exact path="/projects" render={ props => <Projects auth={auth} /> } />
    <Route exact path="/account" render={ props => <Profile auth={auth} /> } />
    <Route exact path="/new-project" render={ props => <Elements><NewProject auth={auth} draftID={hashParts.length > 1 && hashParts[1]}/></Elements> } />     
    <Route exact path="/projects/:projectID" render={ props => <ProjectSpace auth={auth} />  } />
  </div>
  );
}

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Dashboard);
