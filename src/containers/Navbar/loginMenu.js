import React from 'react'
import { Link } from 'react-router-dom'
import Button from '@material-ui/core/Button'
import { LOGIN_PATH } from 'constants'
import { withStyles } from '@material-ui/core/styles';

const styles = () => ({
  link: {
    textDecoration: 'none'
  }
})

export const LoginMenu = (props) => {
  var {classes} = props;
  console.log('signup path is '+LOGIN_PATH);

  return(
    <div className={classes.menu}>
      <Link 
        to={{
          pathname: LOGIN_PATH,
          search: '?q=signup',
          state: { shouldToggle: true } //default toggle is login
        }} 
        className={classes.link}>
        <Button className={classes.buttonRoot}>
          Sign Up
        </Button>
      </Link>
      <Link 
        to={{
          pathname: LOGIN_PATH,
          search: '?q=login',
        }} 
        className={classes.link}>
        <Button className={classes.buttonRoot}>
          Login
        </Button>
      </Link>
    </div>
  );
}

export default withStyles(styles)(LoginMenu)