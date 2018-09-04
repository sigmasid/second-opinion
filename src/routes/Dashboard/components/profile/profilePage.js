import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';

//Redux
import { compose, withHandlers, withState } from 'recompose'
import { firebaseConnect, withFirebase } from 'react-redux-firebase'
import { connect } from 'react-redux';

//styles
import { dashContainer } from "styles/mainStyle.js";

//modules
import Basics from './basics';
import Billing from './billing';
import Orders from './orders';

//router
import { Redirect } from "react-router-dom";

//Stripe
import {Elements} from 'react-stripe-elements';

const util = require('util') //print an object

const styles = theme => ({
  root: {
    ...dashContainer,
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
  title: {
    paddingBottom: theme.spacing.unit * 4
  },
  tabsRoot: {
    borderBottom: '1px solid #e8e8e8',
  },
  tabsIndicator: {
    backgroundColor: '#1890ff',
  },
  tabRoot: {
    textTransform: 'initial',
    minWidth: 72,
    fontWeight: theme.typography.fontWeightRegular,
    marginRight: theme.spacing.unit * 4,
    '&:hover': {
      color: theme.palette.primary.main,
      opacity: 1,
    },
    '&$tabSelected': {
      color: '#1890ff',
      fontWeight: theme.typography.fontWeightMedium,
    },
    '&:focus': {
      color: theme.palette.primary.main,
    },
  },
  tabSelected: {},
  typography: {
    padding: theme.spacing.unit * 3,
  },
});

function TabContainer(props) {
  return (
    <Typography component="div">
      {props.children}
    </Typography>
  );
}

const AccountTabs = (props) => {

  var { classes, activeTab, auth, profile, ...props } = props;

  return (
    <Paper className={classes.root} elevation={0}>
      <Typography variant="title" gutterBottom className={classes.title}>Account</Typography>
      <Tabs
        value={activeTab}
        onChange={props.onClick}
        classes={{ root: classes.tabsRoot, indicator: classes.tabsIndicator }}
      >
        <Tab
          disableRipple
          classes={{ root: classes.tabRoot, selected: classes.tabSelected }}
          label="Profile"
        />
        <Tab
          disableRipple
          classes={{ root: classes.tabRoot, selected: classes.tabSelected }}
          label="Billing"
        />          
        <Tab
          disableRipple
          classes={{ root: classes.tabRoot, selected: classes.tabSelected }}
          label="Orders"
        />
        <Tab
          disableRipple
          classes={{ root: classes.tabRoot, selected: classes.tabSelected }}
          label="Notifications"
        />
      </Tabs>
      {activeTab === 0 && 
        <TabContainer>
          <Basics profile={profile} auth={auth} />
        </TabContainer>}
      {activeTab === 1 && 
        <TabContainer>
          <Elements><Billing profile={profile} auth={auth} /></Elements>
        </TabContainer>}
      {activeTab === 2 && 
        <TabContainer>
          <Orders auth={auth}/>
        </TabContainer>
      }
      {activeTab === 3 && <TabContainer>Item Four</TabContainer>}
    </Paper>
  );
}


AccountTabs.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AccountTabs);


/**
export default withStyles(styles)(AccountTabs); **/