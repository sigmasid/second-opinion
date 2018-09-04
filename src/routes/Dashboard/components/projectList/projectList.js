import React from 'react';

//components
import DividerSection from "components/divider.js";
import Loading from "components/loading.js";
import {Filetypes} from 'utils/sharedVars.js';
import { dashContainer } from "styles/mainStyle.js";

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import { Link } from 'react-router-dom'

import { connect } from 'react-redux'
import { compose } from 'redux'
import { firebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase'

//Material styles//
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import ListSubheader from '@material-ui/core/ListSubheader';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';

//iconds
import ImageIcon from '@material-ui/icons/Image';
import InProgressIcon from '@material-ui/icons/StarHalf';
import CompletedIcon from '@material-ui/icons/Star';
import NotStartedIcon from '@material-ui/icons/StarBorder';

const moment = require('moment');
const util = require('util') //print an object

const styles = theme => ({
  root: {
    ...dashContainer,
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: theme.palette.background.paper,
  },  
  rightSection: {
    display: 'flex',
    padding: '0 16px',
    flexDirection: 'row',
    borderLeft: '2px solid',
    flexGrow: 1
  },
  rightSectionText: {
    flexGrow: 1
  },
  avatarRoot: {
    marginRight: '30px'
  },
  hideAvatar: {
    visibility: 'hidden'
  },
  leftIcon: {
    marginRight: theme.spacing.unit,
  },  
  listItem: {
    paddingBottom: 20
  },
  projectSecondary: {
    fontSize: '0.8125rem',
    color: theme.palette.text.secondary,
    fontWeight: 400      
  },
  projectHeader: {
    display: "inline-flex",
    padding: '0 16px 8px 16px'
  },
  projectHeaderPrimary: {
    fontSize: '0.8125rem',
    color: 'black',
    fontWeight: 600,
    paddingRight: 16
  },
  projectBody: {
    paddingLeft: 0
  },
  button: {
    minWidth: 125
  },
  buttonGreen: {

  },
  buttonRed: {

  }
})

const StatusLabel = (props) => {
  var {classes, status} = props;

  switch(status) {
    case 'in progress': return(<Button variant="outlined" size="small" disabled color="secondary" className={classes.button}> <InProgressIcon className={classes.leftIcon} />In Progress</Button>)
    case 'completed': return(<Button variant="outlined" size="small" disabled color="secondary" className={classes.button}> <CompletedIcon className={classes.leftIcon} />Completed</Button>)
    case 'draft': return(<Button variant="outlined" size="small" disabled color="secondary" className={classes.button}> <NotStartedIcon className={classes.leftIcon} />Draft</Button>)
    default: return(<Button variant="contained" color="primary" disabled color="secondary"> <NotStartedIcon className={classes.leftIcon} /></Button>)
  }
}

const ProjectItem = (props) => {
  var { classes, project, projectID } = props;

  return (
    <ListItem button component={Link} to={project.status !== 'draft' ? `/projects/${projectID}` : `/new-project#${projectID}`} classes={{root: classes.listItem}}>
      <Avatar classes={{root: classNames(classes.avatarRoot)}}>
        <ImageIcon />
      </Avatar>
      <div className={classes.rightSection}>
        <div className={classes.rightSectionText}>
        <ListItemText primary={project.senderID} 
                      secondary={"Last Update: " + moment.unix(project.lastUpdate.seconds).format('h:mma, MMM DD, YYYY')} 
                      classes={{root: classes.projectHeader, 
                                primary: classNames(classes.projectHeaderPrimary, classes.projectSecondary), 
                                secondary: classes.projectSecondary}} />

        <ListItemText primary={project.title.toProperCase()} 
                      classes={{root: classes.projectBody, 
                                secondary: classes.projectSecondary}} />
        </div>
        <StatusLabel status={project.status} classes={classes} />

        {/** if document then show document preview **/}
      </div>
    </ListItem>
  )
}

const ProjectList = (props) => {
  const {classes, projects} = props;

  return (
    <Paper className={classes.root} elevation={0}>
      <div className={classes.header}>
        <Typography variant="title" gutterBottom>Projects</Typography>
      </div>
      <List subheader={
        <ListSubheader component="div">
          <DividerSection text=' Projects List' />
        </ListSubheader>}>
        {projects && Object.keys(projects).map((projectID) => {
          return <ProjectItem classes={classes} 
                              project={projects[projectID]}
                              projectID={projectID}
                              key={projectID}
                              />
          })
        }
      </List>
    </Paper>
)}

// Export enhanced component
export default withStyles(styles)(ProjectList);