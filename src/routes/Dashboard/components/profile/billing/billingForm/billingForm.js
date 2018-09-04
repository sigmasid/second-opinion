import React from "react";
import PropTypes from 'prop-types';
import classNames from 'classnames';

//components
import Loading from "components/loading.js";

//Redux
import { compose, withHandlers } from 'recompose'

// @material-ui/icons
import withStyles from "@material-ui/core/styles/withStyles";
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Typography from "@material-ui/core/Typography";
import CircularProgress from '@material-ui/core/CircularProgress';
import FormControl from '@material-ui/core/FormControl';

//Stripe
import {
  CardNumberElement,
  CardCVCElement,
  CardExpiryElement,
  PostalCodeElement,
  createOptions,
} from 'react-stripe-elements';

const util = require('util') //print an object

const styles = (theme) => ({
  form: {
    width: '100%',
    display: 'flex'
  },
  formControlRoot: {
    width: '100%',
    display: 'flex',
    boxShadow: 'none',
  },
  cardHeaderTitle: {
    fontSize: '1.0rem',
    fontWeight: theme.typography.fontWeightMedium,
  },  
  billingRow: {
    display: 'flex'
  },
  stripe: {
    borderRadius: 0,
    border: 'none',
    borderBottom: '1px solid rgba(0, 0, 0, 0.42)',
    boxShadow: 'none',
    paddingBottom: 5,
    height: 25
  },
  stripeLabel: {
    paddingTop: 10,
    paddingBottom: 10,
    flexGrow: 1
  },
  stripeLabelLast: {
    flexGrow: 2,
    paddingRight: 0
  },
  stripeFocus: {
    color: '#0277bd',
    borderBottom: '2px solid #0277bd'
  },
  stripeLabelFocus: {
    color: '#0277bd'
  },
  cardFooter: {
    marginLeft: 'auto'
  },
  hidden: {
    width: 0,
    opacity: 0.01
  },
  visible: {
    width: '100%',
    opacity: 1
  }
});

var stripeInputStyle = {
  base: {
    fontSize: '1rem',
    color: "#32325d",
  }
};

const BillingAddressForm = (props) => {
  const { classes, isReady, handleReady, handleToggle, handleSubmit, handleBlur, handleChange, handleFocus, showLoading } = props;

  return(
    <form onSubmit={handleSubmit} className={classes.form} >
      {!isReady && <Loading />}
      <FormControl classes={{root: classNames(classes.formControlRoot, isReady ? classes.visible : classes.hidden)}}>
        <CardHeader title="Add Card" classes={{root: classes.cardHeader, title: classes.cardHeaderTitle}} />      
        <CardContent>
          <div>
            <label className={classes.stripeLabel}>
              <Typography variant="caption" className={props.focused==='cardNumber' ? classes.stripeLabelFocus : classes.stripeLabel}>Card Number</Typography>        
              <CardNumberElement
                onBlur={handleBlur}
                onChange={handleChange}
                onFocus={handleFocus}
                onReady={handleReady}
                style={stripeInputStyle}
                classes={{base: classes.stripe, focus: classes.stripeFocus}}
                //{...createOptions(props.fontSize)}
              />
            </label>
          </div>
          <div className={classes.billingRow}>
            <label className={classes.stripeLabel}>
              <Typography variant="caption" className={props.focused==='expiry' ? classes.stripeLabelFocus : classes.stripeLabel}>Expiration date</Typography>        
              <CardExpiryElement
                onBlur={handleBlur}
                onChange={handleChange}
                onFocus={handleFocus}
                onReady={handleReady}
                style={stripeInputStyle}
                classes={{base: classes.stripe, focus: classes.stripeFocus}}
                //{...createOptions(props.fontSize)}
              />
            </label>             
            <label className={classes.stripeLabel}>
              <Typography variant="caption" className={props.focused==='cvc' ? classes.stripeLabelFocus : classes.stripeLabel}>CVC</Typography>        
              <CardCVCElement
                onBlur={handleBlur}
                onChange={handleChange}
                onFocus={handleFocus}
                onReady={handleReady}
                style={stripeInputStyle}
                classes={{base: classes.stripe, focus: classes.stripeFocus}}
                //{...createOptions(props.fontSize)}
              />
            </label>
            <label className={classNames(classes.stripeLabel, classes.stripeLabelLast)}>
              <Typography variant="caption" className={props.focused==='postalCode' ? classes.stripeLabelFocus : classes.stripeLabel}>Postal Code</Typography>        
              <PostalCodeElement
                onBlur={handleBlur}
                onChange={handleChange}
                onFocus={handleFocus}
                onReady={handleReady}
                style={stripeInputStyle}
                classes={{base: classes.stripe, focus: classes.stripeFocus}}
                //{...createOptions(props.fontSize)}
              />
            </label>
          </div>        
        </CardContent>
        <CardActions className={classes.cardFooter}>
          <Button color="primary" onClick={handleToggle}>
            Cancel
          </Button>      
          <Button variant="contained" color="primary" type={"submit"} >
            {showLoading && <CircularProgress size={24} style={{ color: 'white' }} className={classes.leftIcon} />}
            Add Card
          </Button>
        </CardActions>
        </FormControl>
      </form>
  )
}

BillingAddressForm.propTypes = {
  classes: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired
};

export default withStyles(styles)(BillingAddressForm);