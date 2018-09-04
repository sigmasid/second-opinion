import React from 'react';
import CustomInput from 'components/MaterialInput'

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import withStyles from "@material-ui/core/styles/withStyles";
import CircularProgress from '@material-ui/core/CircularProgress';
import { Field } from 'redux-form'

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

const PasswordForm = (props) => {
  var {classes, open, handleClose, handleSubmit, showLoading } = props;

  return (
      <Dialog
        open={open}
        onClose={handleClose}
        classes={{paper: classes.container}}
        aria-labelledby="form-dialog-title"
      >
      <form onSubmit={handleSubmit} >      
        <DialogTitle id="form-dialog-title">Update Password</DialogTitle>
        <DialogContent>
          <DialogContentText className={classes.screenDescription}>
            Please re-enter your current password and choose a strong new password to continue.
          </DialogContentText>
            <Field
              name="oldPassword"
              type="password"
              fullWidth
              autoFocus
              component={CustomInput}
              id="oldPassword"
              error={null}
              placeholder="Old Password"
              className={classes.textField}
            />
            <Field
              name="newPassword"
              type="password"
              fullWidth
              component={CustomInput}
              id="newPassword"
              error={null}
              placeholder="New Password"
              className={classes.textField}
            />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button variant="contained" type="submit" color="primary">
            {showLoading && <CircularProgress size={24} style={{ color: 'white' }} className={classes.leftIcon} />}            
            Update
          </Button>
        </DialogActions>
        </form>        
      </Dialog>
  );
}  

export default withStyles(styles)(PasswordForm);
  /**
  state = {};

  handleChange = prop => event => {
    this.setState({
      [prop]: event.target.value,
      [prop+'Error']: undefined
    });
  };

  handleSubmit = () => {
    var isVerified = true;


    if (!this.state.oldPassword) {
      this.setState({ oldPasswordError: true });
      isVerified = false;
    } else if (!this.state.newPassword) {
      this.setState({ newPasswordError: true });
      isVerified = false;
    }

    var data = {};
    data['oldPassword'] = this.state.oldPassword;
    data['newPassword'] = this.state.newPassword;

    return isVerified && this.props.handleSubmit('password', data);
  }

  render() {
  **/