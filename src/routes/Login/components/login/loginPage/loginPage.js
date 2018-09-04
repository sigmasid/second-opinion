import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router'

//Components
import LoginForm from '../loginForm'
import ResetPassword from '../resetPassword'
import { container } from "styles/mainStyle.js";

//Material
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper'
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import withStyles from "@material-ui/core/styles/withStyles";
import Button from '@material-ui/core/Button';

const styles = (theme) => ({
  content: {
    ...container
  },
  card: {
    marginTop: 50,
    padding: 50
  },
  cardHeader: {
    fontSize: '1rem'
  },
});

export const LoginPage = (props) => {
  const {toggle: hideResetPassword, classes, handleSubmit, handleToggle  } = props;

  return(
  <Grid container justify="center" className={classes.content}>
    { !hideResetPassword && <ResetPassword open={!hideResetPassword && true}
                                onSubmit={props.handleReset} 
                                handleClose={() => props.handleToggle()} /> }      
    <Grid item xs={12} sm={8} md={6}>
      <Card className={classes.card}>
        <CardHeader classes={{title: classes.cardHeader}} 
                    title={"Sign in"} 
                    action={<Button disableRipple className={classes.button} color="primary" onClick={props.handleLoginToggle} >{'or create account'}</Button>}
                    />              
          <LoginForm onSubmit={handleSubmit} 
                     handleToggle={handleToggle} />          
      </Card>
    </Grid>
  </Grid>
  )
}

LoginPage.propTypes = {
  handleSubmit: PropTypes.func, // from enhancer (withHandlers - firebase)
  onSubmitFail: PropTypes.func // from enhancer (reduxForm)
}

export default withStyles(styles)(LoginPage)