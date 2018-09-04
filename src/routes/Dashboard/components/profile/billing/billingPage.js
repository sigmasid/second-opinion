import React from "react";
import PropTypes from 'prop-types';
import classNames from 'classnames';

//components
import NewCard from "./billingCardNew";
import CardDetail from "./billingCardItem";

// @material-ui/icons
import withStyles from "@material-ui/core/styles/withStyles";
import Grid from '@material-ui/core/Grid';

//icons
const util = require('util') //print an object

const styles = (theme) => ({
  billingPane: {
    display: 'flex',
    flexGrow: 1,
    alignItems: 'center',
    marginTop: 20,
    boxShadow: 'none',    
  }
});

const CardItem = (props) => {
  var {...rest} = props;

  if (!props.card) {
    return(null);
  }

  return (
    <Grid item xs={12} md={4} key={props.card.id} >
      <CardDetail {...rest} />
    </Grid>
  )
}

const BillingPage = (props) => {
  var { classes, cards, ...rest  } = props;
  console.log('cards is '+util.inspect(cards));

  return (
    <Grid container className={classes.billingPane} spacing={16}>
    { cards && Object.values(cards).map(card => {
        return(card && <CardItem card={card} auth={props.auth} key={card.id} />)
      }
    )}
      <Grid item xs={12} md={4}><NewCard key={"new"} auth={props.auth} /></Grid>
    </Grid>
  );
}

BillingPage.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(BillingPage);
