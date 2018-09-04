import React from "react";
import PropTypes from "prop-types";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import TextField from '@material-ui/core/TextField';
const util = require('util') //print an object

const styles = theme => ({
  inputRoot: {
    flexGrow: 1,
    marginLeft: 20,
    'label + &': {
      marginTop: theme.spacing.unit * 3,
    },
  },
  inputBox: {
    borderRadius: 4,
    backgroundColor: 'white',
    border: '1px solid #ced4da',
    padding: '10px 12px',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    '&:focus': {
      borderColor: theme.palette.primary.main,
      boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
    }
  }
});

function InputText({ ...props }) {
	const {classes, input} = props;

  return (
			<TextField
        onChange={input.onChange}
        value={input.value}
        id="bootstrap-input"
        InputProps={{
          disableUnderline: true,
          autoComplete: 'off',
          classes: {
            root: classes.inputRoot,
            input: classes.inputBox,
          },
        }}
        InputLabelProps={{
          shrink: true,
          className: classes.bootstrapFormLabel,
        }}
      />
  );
}

InputText.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(InputText);