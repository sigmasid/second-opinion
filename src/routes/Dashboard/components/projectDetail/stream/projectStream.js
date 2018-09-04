import React from 'react';

//components
import DividerSection from "components/divider.js";
import {Filetypes} from 'utils/sharedVars.js';

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';

import { connect } from 'react-redux'
import { compose } from 'redux'
import { firebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase'

//Material styles//
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import ListSubheader from '@material-ui/core/ListSubheader';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Avatar from '@material-ui/core/Avatar';

//Card
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

//iconds
import ImageIcon from '@material-ui/icons/Image';
import FileIcon from '@material-ui/icons/CloudDownload';
import MoreIcon from '@material-ui/icons/ExpandLess';

const moment = require('moment');
const util = require('util') //print an object

const styles = theme => ({
  streamContainer: {
    flexGrow: 1,
    marginBottom: 10,
    overflow: 'auto',
    marginBottom: 20        
  },
  subheader: {
    backgroundColor: 'white',
    position: 'sticky',
    textAlign: 'center'
  },
  rightSection: {
    display: 'flex',
    padding: '0 16px',
    flexDirection: 'column',
    borderLeft: '2px solid'
  },
  avatarRoot: {
    marginRight: '30px'
  },
  hideAvatar: {
    visibility: 'hidden'
  },
  listItem: {
    paddingBottom: 20
  },
  messageSecondary: {
    fontSize: '0.8125rem',
    color: theme.palette.text.secondary,
    fontWeight: 400      
  },
  messageHeader: {
    display: "inline-flex",
    padding: '0 16px 8px 16px'
  },
  messageHeaderPrimary: {
    fontSize: '0.8125rem',
    color: 'black',
    fontWeight: 600,
    paddingRight: 16
  },
  messageBody: {
    paddingLeft: 0
  },
  card: {
    boxShadow: 'none',
    margin: `${theme.spacing.unit * 2}px 0px`,
    border: '1px dashed'
  },
  cardContent: {
    display: 'flex'
  },
  icon: {
    fontSize: '2.5rem'
  },
  details: {
    paddingLeft: theme.spacing.unit * 2
  },
  loadMore: {
    flexDirection: 'column'
  },
  loadMoreIcon: {
    marginRight: 0
  }
})

const formatFileSize = (size) => {
  if (size < 1000) {
    return size + ' bytes';
  }
  else if (size < 1000000) {
    return Math.floor(size / 1000) + ' KB';
  } else if (size < 1000000000) {
    return Math.floor(size / 1000000) + ' MB';
  } else {
    return Math.floor(size / 1000000000) + ' GB';
  }
}

function FilePreviewCard(props) {
  const { classes, file } = props;

  return (
    <Card className={classes.card}>
      <CardContent className={classes.cardContent}>      
        <IconButton aria-label="Previous" onClick={() => props.onDownload(file)}>
          <FileIcon className={classes.icon}/>
        </IconButton>
        <div className={classes.details}>
          <Typography variant="subheading" gutterBottom>{file.name}</Typography>
          <Typography variant="caption" color="textSecondary">
            Added {moment(file.timeCreated).fromNow()} . Size: {formatFileSize(file.size)}
          </Typography>
        </div>
      </CardContent>
    </Card>
  );
}

const StreamItem = (props) => {
  var { classes, message, lastPostUserID } = props;
  return (
    <ListItem className={classes.listItem} classes={{root: classes.listItem}}>
      <Avatar classes={{root: classNames(classes.avatarRoot, lastPostUserID === message.senderID ? classes.hideAvatar : null)}}
              src={message.sender.photoURL || null}
      >
        {(!message.sender || !message.sender.photoURL) && <ImageIcon />}
      </Avatar>
      <div className={classes.rightSection}>
        <ListItemText primary={message.sender && message.sender.displayName || message.senderID} 
                      secondary={moment(message.timestamp).format('h:mma, MMM DD, YYYY')} 
                      classes={{root: classes.messageHeader, 
                                primary: classNames(classes.messageHeaderPrimary, classes.messageSecondary), 
                                secondary: classes.messageSecondary}} />

        <ListItemText primary={message.body} 
                      classes={{root: classes.messageBody, 
                                secondary: classes.messageSecondary}} />

        { message.files && <FilePreviewCard file={message.files} classes={classes} onDownload={props.onDownload} />}
      </div>
    </ListItem>
  )
}


class Stream extends React.Component {
  state = {};

  componentDidMount() {
    this.scrollTo('bottom');
  }

  componentDidUpdate(prevProps) {
    if (this.props.scrollTo === 'top') {
      this.scrollTo('top')
    } else if (this.props.scrollTo === 'bottom') {
      this.scrollTo('bottom')
    } else if (this.props.scrollTo === 'end') {
      this.setState({'reachedEnd': true})
    }
  }

  scrollTo = (location) => {
    if (location === 'top') {
      this.messagesStart && this.messagesStart.scrollIntoView({ behavior: "smooth" });  
    } else {
      this.messagesEnd && this.messagesEnd.scrollIntoView({ behavior: "smooth" });        
    }
  }

  messagesStart = {};  
  messagesEnd = {};  

  render() {
    const {classes, messages, screenTitle, onDownload, onGetMore} = this.props;
    var messageSenderIDs = [];

    return (
    <Paper className={classes.streamContainer} elevation={0}>
      <List subheader={
        <ListSubheader component="div" className={classes.subheader}>
          <DividerSection text={screenTitle || ' Project Stream'} />
          <div ref={(el) => { this.messagesStart = el; }} />
        </ListSubheader>}>

        {!this.state.reachedEnd &&
        <ListItem button onClick={onGetMore} className={classes.loadMore}>
          <ListItemIcon className={classes.loadMoreIcon}>
            <MoreIcon />
          </ListItemIcon>
          <ListItemText primary="Load More" />
        </ListItem>
        }

        { messages && messages.map((message, index) => {
          messageSenderIDs.push(message.senderID);

          return <StreamItem classes={classes} 
                              message={message} 
                              key={index}
                              onDownload={onDownload}
                              lastPostUserID={index > 0 && messageSenderIDs[index - 1]}
                              />
          })
        }
        <div style={{ float:"left", clear: "both" }}
          ref={(el) => { this.messagesEnd = el; }} />
      </List>
    </Paper>
    )}
}

// Export enhanced component
export default withStyles(styles)(Stream);