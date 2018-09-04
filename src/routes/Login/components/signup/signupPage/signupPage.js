import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router'

//Components
import SignupForm from '../signupForm'
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

export const SignupPage = (props) => {
  var { emailSignup, onSubmitFail, classes } = props;

  return(
  <Grid container justify="center" className={classes.content}>
    <Grid item xs={12} sm={8} md={6}>
      <Card className={classes.card}>
        <CardHeader classes={{title: classes.cardHeader}} 
                    title={"Create account"} 
                    action={<Button disableRipple className={classes.button} color="primary" onClick={props.handleLoginToggle} >{'or login'}</Button>}/>              
          <SignupForm onSubmit={emailSignup} onSubmitFail={onSubmitFail} />          
      </Card>
    </Grid>
  </Grid>
  )
}

SignupPage.propTypes = {
  emailSignup: PropTypes.func, // from enhancer (withHandlers - firebase)
  onSubmitFail: PropTypes.func // from enhancer (reduxForm)
}

export default withStyles(styles)(SignupPage)