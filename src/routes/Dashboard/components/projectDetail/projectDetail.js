import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import { Route } from 'react-router-dom';

//modules
import { dashContainer } from "styles/mainStyle.js";
import ProjectStream from './stream';
import {FileTypes} from 'utils/sharedVars.js';

//filedrop
import Dropzone from 'react-dropzone'

//Router Links
import { Link } from 'react-router-dom'

//Materail UI
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';

//Icons
import InProgressIcon from '@material-ui/icons/StarHalf';
import CompletedIcon from '@material-ui/icons/Star';
import NotStartedIcon from '@material-ui/icons/StarBorder';
import {green} from '@material-ui/core/colors';

//router
import { Redirect } from "react-router-dom";

import MessageBox from "./messageBox";

const util = require('util') //print an object

//Initiatize firebase - TO CHECK: better to pass or reinitialize 

const styles = theme => ({
  root: {
    ...dashContainer,
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: theme.palette.background.paper,
  },
  header: {
    paddingBottom: theme.spacing.unit * 4,
    paddingLeft: theme.spacing.unit * 3,
    paddingRight: theme.spacing.unit * 3,
    display: 'flex',
    justifyContent: 'space-between'
  },
  button: {
    height: 40
  },
  leftIcon: {
    marginRight: theme.spacing.unit
  },
  projectBody: {
    display: 'flex',
    flexGrow: 1,
    flexDirection: 'column'
  },
  fileDrop: {
    display: 'flex',
    flexDirection: 'column',    
    width: '99.8%', //otherwise border doesn't show on right
    flexGrow: 1,
    marginRight: 10,
    marginBottom: '20px !important'
  },
  showBorder: {
    border: '2px solid',
    borderStyle: 'dashed'    
  },
  activeClassName: {
    borderColor: theme.palette.primary.main,
  },
  acceptClassName: {
    borderColor: green[500]
  },
  rejectClassName: {
    borderColor: theme.palette.error.main
  },
  dropZone: {
    flexDirection: 'column'
  }
});

const StatusLabel = (props) => {
  var {classes, status} = props;

  switch(status) {
    case 'in progress': return(<Button variant="outlined" size="small" disabled color="secondary" className={classes.button}> <InProgressIcon className={classes.leftIcon} />In Progress</Button>)
    case 'completed': return(<Button variant="outlined" size="small" disabled color="secondary" className={classes.button}> <CompletedIcon className={classes.leftIcon} />Completed</Button>)
    default: return(<Button variant="contained" color="primary" component={Link} to="/new-resume-review" className={classes.button}> <NotStartedIcon className={classes.leftIcon} />Get Started</Button>)
  }
}

const ProjectDetail = (props) => {
  var { classes, project, users, messages, onMessageSubmit, success, scrollTo, ...rest } = props;
  
  return (
    <Paper className={classes.root} elevation={0}>
      <div className={classes.header}>
        <Typography variant="title" gutterBottom>{project.title}</Typography>
        <StatusLabel status={project.status} classes={classes} />
      </div>
      <Dropzone ref={(node) => {() => props.setDropzoneRef(node) }}
                onDrop={props.onDrop} 
                onDragEnter={props.onDragEnter}
                onDragLeave={props.onDragLeave}
                onDropRejected={props.onDropRejected}
                onDropAccepted={props.onDropAccepted}
                disableClick={true}
                accept={FileTypes} 
                className={classes.fileDrop} 
                activeClassName={classNames(classes.showBorder, classes.activeClassName)} 
                rejectClassName={classNames(classes.showBorder, classes.rejectClassName)} 
                acceptClassName={classNames(classes.showBorder, classes.acceptClassName)} >
          <ProjectStream onDownload={props.onDownload} onGetMore={props.onGetMore} scrollTo={scrollTo} messages={messages} />
          <MessageBox onSubmit={onMessageSubmit} success={success} />
      </Dropzone>
    </Paper>
  )
}

export default withStyles(styles)(ProjectDetail);