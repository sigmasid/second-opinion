import React from 'react';

//Components
import CustomInput from 'components/BootstrapInput'

//import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router-dom'
import { Field } from 'redux-form'

import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';

//icons
import AddIcon from '@material-ui/icons/Add';
import CheckIcon from '@material-ui/icons/Check';
import {green} from '@material-ui/core/colors';

const util = require('util') //print an object

const styles = theme => ({
  formControlRoot: {
    display: 'flex',
    minHeight: 40,
  },
  formControl: {
    flexGrow: 1
  },
  inputBox: {
    marginLeft: 20,
    borderRadius: 4,
    backgroundColor: 'white',
    border: '1px solid #ced4da',
    padding: '10px 12px',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    '&:focus': {
      borderColor: theme.palette.primary.main,
      boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
    }
  },
  fabProgress: {
    position: 'absolute',
    top: -5,
    left: -5,
    zIndex: 1,
    color: theme.palette.secondary.main,
  },
  successColor: {
    backgroundColor: green[500]
  },
});

const MessageBox = (props) => {
  const {classes, handleSubmit, success} = props;

  return(
    //<div className={classes.container}>
      <form onSubmit={handleSubmit} className={classes.formControlRoot} >
        <span>
          <Button variant="fab" mini color="primary" aria-label="add" className={success && classes.successColor} onClick={props.handleOpenUpload} >
            {success ? <CheckIcon /> : <AddIcon />}
          </Button>
          {/** showLoading && <CircularProgress size={50} className={classes.fabProgress} />**/}
        </span>
        <FormControl className={classes.formControl}>
          <Field
            name="message"
            type="text"
            component={CustomInput}
            className={classes.formControl}
            classes={{ inputRoot: classes.inputRoot }}
            id="input-with-icon-adornment"
            placeholder="Message"
          />
        </FormControl>
      </form>
    //</div>
)};

export default withStyles(styles)(MessageBox);