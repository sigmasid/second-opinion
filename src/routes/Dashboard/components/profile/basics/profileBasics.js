import React from "react";
import PropTypes from 'prop-types';
import classNames from 'classnames';

//components
import ChangePassword from "./changePasswordForm";
import ChangeName from "./changeNameForm";
import ChangePic from "./changePic";

// @material-ui/icons
import withStyles from "@material-ui/core/styles/withStyles";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import Avatar from '@material-ui/core/Avatar';

import ProfileIcon from '@material-ui/icons/Face';

//icons
const util = require('util') //print an object

const styles = (theme) => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
    position: 'relative',
    overflow: 'auto'
  },
  listItem: {
    minHeight: 75
  },
  listItemText: {
    display: 'flex',
    justifyContent: 'space-between',
    alignContent: 'center',
    alignItems: 'center',
    fontWeight: 300    
  },
  listItemPrimary: {
    fontSize: '0.8125rem',
    fontWeight: 300
  },
  listItemSecondary: {
    alignSelf: 'center',
    fontSize: '0.8125rem'
  },
  listItemSecondaryRoot: {
    position: 'relative',
    transform: 'none',
    right: 0
  },
  listContainer: {
    display: 'flex',
    alignItems: 'center'
  }
});

function getName(full) {
  var nameObj = {};

  var splitName = full && full.split(' ');
  nameObj['firstName'] = splitName && splitName[0].toProperCase();    
  nameObj['lastName'] = splitName && splitName.length > 1 && splitName[1].toProperCase() ;    

  return nameObj;
}

const ProfileBasics = (props) => {

  var { classes, profile, auth, editMode, handleEdit, handleClose } = props;
  var displayName = profile.displayName;

  return (
  <div className={classes.root}>
    { editMode === 'password' && <ChangePassword open={editMode === 'password' && true} 
                                                  onSubmit={props.updatePassword} 
                                                  handleClose={handleClose} /> }    
    { editMode === 'displayName' && <ChangeName initialValues={{firstName: getName(displayName).firstName, lastName: getName(displayName).lastName}} 
                                                  open={editMode === 'displayName' && true} 
                                                  onSubmit={props.updateName} 
                                                  handleClose={handleClose} /> }    

    <List>
      <ListItem key={'pic'} classes={{root: classes.listItem, container: classes.listContainer}}>
        <ListItemText classes={{root: classes.listItemText, primary: classes.listItemPrimary, secondary: classes.listItemSecondary}} 
                      disableTypography={true}
                      primary={'Profile Photo'} 
                      secondary={editMode !== 'profilePic' && 
                                  <Avatar alt="Profile Pic" src={profile.photoURL} className={classes.avatar} color="primary">
                                    {!profile.photoURL && <ProfileIcon color="primary" />}
                                  </Avatar>
                                }/>
        
        <ListItemSecondaryAction classes={{root: classes.listItemSecondaryRoot}}>
          { editMode !== 'profilePic' && <Button onClick={() => handleEdit('profilePic')} color="primary">edit</Button> }
        </ListItemSecondaryAction>
        { editMode === 'profilePic' && <ChangePic 
                        handleUpload={props.handleUpload} 
                        handleClose={handleClose} /> }
      </ListItem>
      <Divider />    
      <ListItem key={'name'} classes={{root: classes.listItem, container: classes.listContainer}}>
        <ListItemText classes={{root: classes.listItemText, primary: classes.listItemPrimary, secondary: classes.listItemSecondary}} 
                      primary={'Name'} 
                      secondary={displayName && displayName.toProperCase()} />
        <ListItemSecondaryAction classes={{root: classes.listItemSecondaryRoot}}>
          <Button onClick={() => handleEdit('displayName')} color="primary">edit</Button>
        </ListItemSecondaryAction>
      </ListItem>
      <Divider />      
      <ListItem key={'email'} classes={{root: classes.listItem, container: classes.listContainer}}>
        <ListItemText classes={{root: classes.listItemText, primary: classes.listItemPrimary, secondary: classes.listItemSecondary}} 
                      primary={'Email'} 
                      secondary={auth.email} />
        <ListItemSecondaryAction classes={{root: classes.listItemSecondaryRoot}}>
          <Button onClick={() => handleEdit('email')} color="primary">edit</Button>
        </ListItemSecondaryAction>
      </ListItem>      
      <Divider />
      <ListItem key={'phone'} className={classes.listItem}>
        <ListItemText classes={{root: classes.listItemText, primary: classes.listItemPrimary, secondary: classes.listItemSecondary}} 
                      primary={'Phone'} 
                      secondary={profile && profile.phone}/>
        <ListItemSecondaryAction>
          <Button onClick={() => handleEdit('phoneNumber')} color="primary">edit</Button>
        </ListItemSecondaryAction>
      </ListItem>
      <Divider />
      <ListItem key={'password'} className={classes.listItem}>
        <ListItemText classes={{root: classes.listItemText, primary: classes.listItemPrimary, secondary: classes.listItemSecondary}} 
                      primary={'Password'} />
        <ListItemSecondaryAction>
          <Button onClick={() => handleEdit('password')} 
                  color="primary">edit</Button>
        </ListItemSecondaryAction>
      </ListItem>
      <Divider /> 
    </List>
  </div>
  );
}

ProfileBasics.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ProfileBasics);
