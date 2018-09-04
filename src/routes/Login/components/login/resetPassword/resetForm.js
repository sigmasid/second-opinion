import React from 'react';

//Material
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import withStyles from "@material-ui/core/styles/withStyles";
import CircularProgress from '@material-ui/core/CircularProgress';

import CustomInput from 'components/MaterialInput'
import { Field, reduxForm, formValueSelector } from 'redux-form'

const styles = () => ({
  container: {
    minWidth: 500,    
    padding: 20
  },
  screenDescription: {
    paddingBottom: 20
  },
  textField: {
    paddingBottom: 20
  }
})

const ResetForm = (props) => {

  var {classes, open, handleClose, handleSubmit, showLoading } = props;

  return (
      <Dialog
        open={open}
        onClose={handleClose}
        classes={{paper: classes.container}}
        aria-labelledby="form-dialog-title"
      >
        <form onSubmit={handleSubmit} >
          <DialogTitle id="form-dialog-title">Reset Password</DialogTitle>
          <DialogContent>
            <DialogContentText className={classes.screenDescription}>
              Please enter your email and we will send an email with instructions to reset your password.
            </DialogContentText>
            <Field
              name="email"
              type="email"
              fullWidth
              autoFocus
              component={CustomInput}
              id="email"
              error={null}
              placeholder="enter account email"
              className={classes.textField}
            />                    
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button variant="contained" type="submit" color="primary">
              {showLoading && <CircularProgress size={24} style={{ color: 'white' }} className={classes.leftIcon} />}            
              Send
            </Button>
          </DialogActions>
        </form>
      </Dialog>
  );
}

export default withStyles(styles)(ResetForm);