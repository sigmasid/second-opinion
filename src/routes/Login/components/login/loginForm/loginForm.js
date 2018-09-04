import React from "react";
import PropTypes from 'prop-types';
import classNames from 'classnames';

//components
import DividerSection from "components/divider.js";
import CustomInput from 'components/MaterialInput'
import { containerFluid, container } from "styles/mainStyle.js";

//Redux
import { Field } from 'redux-form'
import { compose, withHandlers } from 'recompose'

// @material-ui/icons
import withStyles from "@material-ui/core/styles/withStyles";
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import FormControl from '@material-ui/core/FormControl';

//icons
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import SaveIcon from '@material-ui/icons/Save';

//styles

const util = require('util') //print an object

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
  formControlRoot: {
    width: '100%'
  },
  textField: {
    margin: theme.spacing.unit,
  },
  leftIcon: {
    marginRight: theme.spacing.unit,
  },
  cardFooter: {
    marginTop: 20,
    flexDirection: 'column'
  },
  forgotPassword: {
    fontSize: '0.75rem'
  }
});

const LoginForm = (props) => {
  const { classes, showLoading, showResetPassword, showPassword, handleSubmit } = props;

  return(
    <div>
      <form onSubmit={handleSubmit} >
        <FormControl classes={{root: classes.formControlRoot}}>        
        <CardContent>
          <Button variant="contained" color="primary" fullWidth className={classes.button } >
            <SaveIcon className={classes.leftIcon} />
              Login with Linkedin
          </Button>
          <DividerSection paddingTop={true} />
            <Field
              name="email"
              type="email"
              fullWidth
              component={CustomInput}
              id="email"
              error={null}
              placeholder="Email"
              className={classes.textField}
            />
            <Field
              name="password"
              type="password"
              fullWidth
              component={CustomInput}
              id="password"
              error={null}
              placeholder="Password"
              className={classes.textField}
            />            
        </CardContent>
        <CardActions className={classes.cardFooter}>
          <Button variant="contained" color="primary" size="large" type={"submit"} >
            {showLoading && <CircularProgress size={24} style={{ color: 'white' }} className={classes.leftIcon} />}
            Sign In
          </Button>
          <Button className={classNames(classes.button, classes.forgotPassword)} disableRipple onClick={() => props.handleToggle()}>
            forgot password?
          </Button>
        </CardActions>
        </FormControl>        
      </form>
    </div>
  )
}

LoginForm.propTypes = {
  classes: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired
};

export default withStyles(styles)(LoginForm);
  /**
  state = {
    showPassword: false
  }

  handleChange = prop => event => {
    this.setState({ [prop]: event.target.value, [prop+'Error']: undefined });
  };


  handleClickShowPassword = () => {
    this.setState(state => ({ showPassword: !state.showPassword }));
  }

  handleMouseDownPassword = event => {
    event.preventDefault();
  };

  handleSubmit = (ev) => {
    ev.preventDefault();
    var isVerified = true;
    var data = {};

    if (!this.state.email || this.state.email === '') {
      this.setState({emailError: true});
      isVerified = false;
    }

    if (!this.state.password || this.state.password === '') {
      this.setState({passwordError: true});
      isVerified = false;      
    }

    data['email'] = this.state.email;
    data['password'] = this.state.password;

    this.props.firebase.login({
      email: this.state.email,
      password: this.state.password
    })
    .then(user => {
      console.log("user is "+util.inspect(user));
    })

    //isVerified && this.props.handleSubmit('login', data);
  }

  toggleForgotPassword = (value) => {
    this.setState({ showResetPassword: value});
  }

  handleClose = (prop) => {
    this.setState({[prop]: undefined});
  }

  render() {
    const { classes, showLoading } = this.props;
    const { showPassword, showResetPassword } = this.state;

    return (
      <div>
      { showResetPassword && <ResetPassword open={showResetPassword && true} handleReset={this.props.handleReset} handleClose={() => this.handleClose('showResetPassword')} /> }    
        <form onSubmit={this.handleSubmit} >
        <FormControl classes={{root: classes.formControlRoot}}>        
        <CardContent>
          <Button variant="contained" color="primary" fullWidth className={classes.button } >
            <SaveIcon className={classes.leftIcon} />
              Login with Linkedin
          </Button>
          <DividerSection paddingTop={true} />
            <TextField
              label="Email"
              id="email"
              fullWidth
              type="email"
              error={this.state.emailError}
              onChange={this.handleChange('email')}            
              className={classes.textField}
            />
            <TextField
              label="Password"
              id="pass"
              fullWidth
              type={showPassword ? 'text' : 'password'}
              className={classes.textField}
              error={this.state.passwordError}
              onChange={this.handleChange('password')}
              InputProps={{
                endAdornment: <InputAdornment position="end">                
                      <IconButton
                        aria-label="Toggle password visibility"
                        onClick={this.handleClickShowPassword}
                        onMouseDown={this.handleMouseDownPassword}
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton></InputAdornment> ,
              }}
            />
        </CardContent>
        <CardActions className={classes.cardFooter}>
          <Button variant="contained" color="primary" size="large" type={"submit"} >
            {showLoading && <CircularProgress size={24} style={{ color: 'white' }} className={classes.leftIcon} />}
            Sign In
          </Button>
          <Button className={classNames(classes.button, classes.forgotPassword)} disableRipple onClick={() => this.toggleForgotPassword(true)}>
            forgot password?
          </Button>
        </CardActions>
        </FormControl>        
        </form>
      </div>
  )}
};



export default withStyles(styles)(withFirebase(LoginSection))

/**
export default compose(
  firebaseConnect(), // withFirebase can also be used
  connect(({ firebase: { auth } }) => ({ auth })),
  withStyles(styles)(LoginSection)
)(LoginSection) **/