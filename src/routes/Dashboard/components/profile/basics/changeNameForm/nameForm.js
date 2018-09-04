import React from 'react';
import CustomInput from 'components/MaterialInput'

//Material Components
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

function getName(full) {
  var nameObj = {};

  var splitName = full && full.split(' ');
  nameObj['firstName'] = splitName && splitName[0].toProperCase();    
  nameObj['lastName'] = splitName && splitName.length > 1 && splitName[1].toProperCase() ;    

  return nameObj;
}

const NameForm = (props) => {

  var {classes, displayName, open, handleClose, handleSubmit, showLoading } = props;
  
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      classes={{paper: classes.container}}
      aria-labelledby="form-dialog-title"
    >
    <form onSubmit={handleSubmit} >        
      <DialogTitle id="form-dialog-title">Change Your Name</DialogTitle>
      <DialogContent>
        <DialogContentText className={classes.screenDescription}>
          Enter your first and last name to update.
        </DialogContentText>
        <Field
          name="firstName"
          type="text"
          fullWidth
          autoFocus
          component={CustomInput}
          id="firstName"
          error={null}
          defaultValue={getName(displayName).firstName}
          placeholder="First Name"
          className={classes.textField}
        />
        <Field
          name="lastName"
          type="text"
          fullWidth
          component={CustomInput}
          id="firstName"
          error={null}
          defaultValue={getName(displayName).lastName}              
          placeholder="Last Name"
          className={classes.textField}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button variant="contained" type={"submit"} color="primary">
          {showLoading && <CircularProgress size={24} style={{ color: 'white' }} className={classes.leftIcon} />}            
          Update
        </Button>
      </DialogActions>
     </form>          
    </Dialog>
  );
}

export default withStyles(styles)(NameForm);