import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";

//Material
import IconButton from "@material-ui/core/Button";
import { green, red } from "@material-ui/core/colors";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";

//Material 
import SuccessIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Cancel';

//components
import Loading from "components/loading.js";
import StepButtons from '../stepButtons.js';

const util = require('util'); //print an object

//styles
const styles = theme => ({
  root: {
    backgroundColor: theme.palette.background.default,
    width: "100%",
    minHeight: 300,
    textAlign: "center",
    display: "flex",
    border: "1px dashed",
    borderColor: theme.palette.text.secondary,
  },
  confirmationInfo: {
    alignSelf: "center",
    margin: "0 auto"
  },
  subheader: {
    textAlign: "center",
    fontSize: "0.8125rem"
  },
  successIcon: {
    width: 50,
    height: "auto",
    color: green[500]
  },
  errorIcon: {
    width: 50,
    height: "auto",
    color: red[500]    
  }
});

const GetIcon = (props) => {
  var {classes, status} = props;

  switch (status) {
    case 'success': return <SuccessIcon className={classes.successIcon} />
    case 'error': return <ErrorIcon className={classes.errorIcon} />
    default: return <Loading />
  }
}

const Confirmation = props => {
  var { classes, status } = props;
  console.log("status is "+util.inspect(status));
  return (
  <div>
    <Paper className={classes.root} elevation={0}>
      <div className={classes.confirmationInfo}>
        <IconButton
          color="secondary"
          aria-label="add"
          classes={classes.button}
        >
          {!status ? <Loading /> : <GetIcon classes={classes} status={status.current} />}
        </IconButton>
        <Typography
          variant="subheading"
          gutterBottom
          className={classes.subheader}
        >
          {status.message}
        </Typography>
      </div>
    </Paper>
    <StepButtons hideBack={!status.current === 'error'}
                 nextLink={`projects/${props.projectID}`}  
                 nextText="Project Dashboard"
                 handleBack={props.handleBack}
                 disableNext={status.current === 'processing' || status.current === 'error'} />
  </div>
  );
};

Confirmation.propTypes = {
  classes: PropTypes.object,
  status: PropTypes.object.isRequired
};

export default withStyles(styles)(Confirmation);
