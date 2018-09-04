import React from "react";
import PropTypes from "prop-types";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import TextField from '@material-ui/core/TextField';

const styles = (theme) => ({
  textField: {
    margin: theme.spacing.unit,
    paddingBottom: 20
  },
});

function InputText({ ...props }) {
	const {classes, input, placeholder, type, id, ...rest } = props;

  return (
  	<TextField
      label={placeholder}
      id={id}
      type={type}    
      onChange={input.onChange}
      //value={input.value}
      fullWidth
      placeholder={placeholder}
      InputProps={{
        root: classes.textField
      }}
      { ...rest }
    />
  );
}

InputText.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(InputText);