import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";

//imports
import Dropzone from "react-dropzone";

//Material
import IconButton from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/AddCircle";
import { green } from "@material-ui/core/colors";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";

//Material List
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListSubheader from '@material-ui/core/ListSubheader';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import DeleteIcon from '@material-ui/icons/Delete';

//components
import StepButtons from "../stepButtons.js";
import { FileTypes } from "utils/sharedVars.js";

const util = require('util'); //print an object

//styles
const styles = theme => ({
  root: {
    backgroundColor: theme.palette.background.default
  },
  fileDrop: {
    width: "100%",
    minHeight: 300,
    textAlign: "center",
    display: "flex",
    border: "1px dashed",
    borderColor: theme.palette.text.secondary,
  },
  filesList: {
    border: "1px dashed",
    borderColor: theme.palette.text.secondary,
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
    color: theme.palette.primary.main
  }
});

const FilesList = (props) => {
  const {classes, files} = props;

  return(
  <List className={classes.filesList} subheader={<ListSubheader>Uploaded Files</ListSubheader>}>
    {Object.values(files).map(obj => {
      if (!obj) { return null }

      return(
        <ListItem
          key={obj.generation}
          dense
          button
          className={classes.listItem}
        >
          <ListItemText primary={obj.name} />
          <ListItemSecondaryAction>
            <IconButton aria-label="Delete">
              <DeleteIcon onClick={() => props.onDelete(obj)} />
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
        )
      })
    }
  </List>
  )
}


const FileDrop = props => {
  var { classes, handleUpload, onDragEnter, onDropRejected } = props;

  return (
    <div>
      <Paper className={classes.root} elevation={0}>
        <Dropzone
          onDrop={handleUpload}
          accept={FileTypes}
          onDragEnter={onDragEnter}
          onDropRejected={onDropRejected}
          className={classes.fileDrop}
          activeClassName={classes.activeClassName}
          rejectClassName={classes.rejectClassName}
          acceptClassName={classes.acceptClassName}
        >
          <div className={classes.dropInfo}>
            <IconButton
              color="secondary"
              aria-label="add"
              classes={classes.button}
            >
              <AddIcon className={classes.buttonIcon} />
            </IconButton>
            <Typography
              variant="subheading"
              gutterBottom
              className={classes.subheader}
            >
              Drop files here or click to select files to upload.
            </Typography>
          </div>
        </Dropzone>
        {/** Show all files added so far **/}
      </Paper>
      {props.projectFiles && <FilesList classes={classes} files={props.projectFiles} onDelete={props.onDelete} />}
      <StepButtons handleNext={props.handleNext} handleBack={props.handleBack} />
    </div>
  );
};

FileDrop.propTypes = {
  classes: PropTypes.object,
  handleUpload: PropTypes.func.isRequired
};

export default withStyles(styles)(FileDrop);
