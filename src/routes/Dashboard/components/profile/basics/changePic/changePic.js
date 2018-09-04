import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import classNames from "classnames";

//imports
import Dropzone from "react-dropzone";

//Material
import IconButton from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";

//Material List
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListSubheader from "@material-ui/core/ListSubheader";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";

//icons
import AddIcon from "@material-ui/icons/AddCircle";
import AcceptIcon from "@material-ui/icons/Done";
import RejectIcon from "@material-ui/icons/Clear";

import { green } from "@material-ui/core/colors";
import { red } from "@material-ui/core/colors";

//components
import { ImageFileTypes } from "utils/sharedVars.js";

const util = require("util"); //print an object

//styles
const styles = theme => ({
  root: {
    display: "flex",
    flexDirection: "column"
  },
  stepButtons: {
    marginLeft: "auto"
  },
  fileDrop: {
    height: 200,
    width: 200,
    margin: "0 auto",
    textAlign: "center",
    display: "flex",
    flexGrow: 1,
    border: "1px dashed",
    backgroundColor: theme.palette.background.default,
    borderColor: theme.palette.text.secondary
  },
  filesList: {
    border: "1px dashed",
    borderColor: theme.palette.text.secondary
  },
  activeClassName: {
    borderColor: theme.palette.primary.main,
    borderWidth: "2px"
  },
  acceptClassName: {
    borderColor: green[500],
    borderWidth: "2px"
  },
  rejectClassName: {
    borderColor: theme.palette.error.main,
    borderWidth: "2px"
  },
  dropInfo: {
    alignSelf: "center",
    margin: "0 auto"
  },
  subheader: {
    textAlign: "center",
    fontSize: "0.8125rem"
  },
  buttonIcon: {
    width: 40,
    height: "auto",
  },
  avatarButton: {
    width: 60,
    height: 60,
    margin: "0 auto",
    background: "none"
  },
  acceptButton: {
    color: green[500]
  },
  rejectButton: {
    color: red[500]
  }
});

const ChangePic = props => {
  var {
    classes,
    profilePicFile,    
    profilePic,
    handleUpload,
    onDrop,
    onDragEnter,
    onDropRejected
  } = props;

  return (
    <Paper className={classes.root} elevation={0}>
      <Dropzone
        onDrop={onDrop}
        accept={ImageFileTypes}
        onDragEnter={onDragEnter}
        onDropRejected={onDropRejected}
        className={classes.fileDrop}
        maxSize={2000000}
        multiple={false}
        activeClassName={classes.activeClassName}
        rejectClassName={classes.rejectClassName}
        acceptClassName={classes.acceptClassName}
      >
        <div className={classes.dropInfo}>
          <Avatar
            color="secondary"
            aria-label="add"
            classes={{ root: classes.avatarButton }}
            src={profilePic}
          >
            {!profilePic && <AddIcon className={classes.buttonIcon} color={"primary"}/>}
          </Avatar>
          <Typography
            variant="subheading"
            gutterBottom
            className={classes.subheader}
          >
            {profilePic
              ? "Tap image to edit"
              : "Drop image here or click to select files to upload."}
          </Typography>
        </div>
      </Dropzone>
      <div className={classes.stepButtons}>
        <IconButton
          className={classNames(classes.iconButton, classes.rejectButton)}
          color="error"
          aria-label="reject"
          onClick={props.handleClose}
        >
          <RejectIcon />
        </IconButton>
        <IconButton
          className={classNames(classes.iconButton, classes.acceptButton)}
          color="primary"
          aria-label="accept"
          onClick={() => props.handleUpload(profilePicFile)}
          disabled={!profilePic}
        >
          <AcceptIcon />
        </IconButton>
      </div>
      </Paper>
  );
};

ChangePic.propTypes = {
  classes: PropTypes.object,
  handleUpload: PropTypes.func.isRequired,
  handleClose: PropTypes.func.isRequired
};

export default withStyles(styles)(ChangePic);
