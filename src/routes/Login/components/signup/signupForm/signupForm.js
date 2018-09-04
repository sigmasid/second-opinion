import React from "react";
import PropTypes from 'prop-types';

//components
import CustomInput from 'components/MaterialInput'
import DividerSection from "components/divider.js";
import { containerFluid, container } from "styles/mainStyle.js";

//Redux
import { Field } from 'redux-form'

// @material-ui/icons
import withStyles from "@material-ui/core/styles/withStyles";
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

//icons
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import SaveIcon from '@material-ui/icons/Save';

const styles = (theme) => ({
  root: {
    ...containerFluid,
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    minHeight: 'calc(100vh - 120px)'
  },
  content: {
    ...container
  },
  card: {
    marginTop: 50,
    padding: 50
  },
  textField: {
    margin: theme.spacing.unit,
    paddingBottom: 20
  },
  leftIcon: {
    marginRight: theme.spacing.unit,
  },
  cardHeader: {
    fontSize: '1rem'
  },
  cardFooter: {
    marginTop: 20,
    flexDirection: 'column'
  },
  socialLine: {
    marginTop: "1rem",
    textAlign: "center",
  },
  inputIconsColor: {
    color: "#495057"
  },
  divider: {
    width: '100%',
    display: 'flex',
    paddingTop: 40,
    paddingBottom: 10,
    justifyContent: 'space-around',
    overflow: 'hidden',
    alignItems: 'center'
  }
});

const SignupForm = (props) => {
    const { classes, showLoading, showPassword, handleSubmit } = props;

    return (
      <div>
      <form onSubmit={handleSubmit} className={classes.formControlRoot} >            
      <CardContent>
        <Field
          name="firstName"
          type="text"
          fullWidth
          component={CustomInput}
          id="firstNameInput"
          placeholder="First Name"
          className={classes.textField}
        />
        <Field
          name="lastName"
          type="text"
          fullWidth
          component={CustomInput}
          id="lastNameInput"
          placeholder="Last Name"
          className={classes.textField}
        />
        <Field
          name="email"
          type="email"
          fullWidth
          component={CustomInput}
          id="email"
          placeholder="Email"
          className={classes.textField}
        />
        <Field
          name="password"
          type="password"
          fullWidth
          component={CustomInput}
          id="password"
          placeholder="Password"
          className={classes.textField}
        />
      </CardContent> 
       <CardActions className={classes.cardFooter}>
        <Button variant="contained" color="primary" size="large" type="submit" >
          {showLoading && <CircularProgress size={24} style={{ color: 'white' }} className={classes.leftIcon} />}        
          Create Account
        </Button>
        <DividerSection paddingBottom={true} paddingTop={true}/>
        <Button variant="contained" color="primary" fullWidth className={classes.button } >
          <SaveIcon className={classes.leftIcon} />
            Signup with Linkedin
        </Button>        
      </CardActions>
      </form>
      </div>
  )
}

SignupForm.propTypes = {
  classes: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired
};

export default withStyles(styles)(SignupForm);