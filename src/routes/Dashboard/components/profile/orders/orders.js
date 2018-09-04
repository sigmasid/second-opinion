import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListSubheader from '@material-ui/core/ListSubheader';
import ListItemText from '@material-ui/core/ListItemText';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';

const util = require('util') //print an object
const moment = require('moment');

const styles = theme => ({
root: {
    width: '100%',
    marginTop: 20,
    backgroundColor: theme.palette.background.paper,
    boxShadow: 'none'
  },
  subheaderRoot: {
    padding: 0
  },
  subheader: {
    display: 'flex',
    textAlign: 'center',
    fontWeight: 600,
  },
  subheaderItem: {
    flexGrow: 1,
    flexBasis: 0
  },
  listItem: {
    minHeight: 75,
    padding: 0
  },
  listItemText: {
    textAlign: 'center',
    fontWeight: 300,
    flexGrow: 1,
    flexBasis: 0,
    padding: 0
  },
  listItemPrimary: {
    fontSize: '0.8125rem'
  },
  listContainer: {
    display: 'flex'
  }
});

const OrderDetail = (props) => {
  var {classes, order, orderID} = props;

  return(
    <ListItem key={orderID} classes={{root: classes.listItem, container: classes.listContainer}}>
      <ListItemText classes={{root: classes.listItemText, primary: classes.listItemPrimary, secondary: classes.listItemSecondary}} 
                    primary={moment.unix(order.created.seconds).format('MMM DD, YYYY')} />    
      <ListItemText classes={{root: classes.listItemText, primary: classes.listItemPrimary, secondary: classes.listItemSecondary}} 
                    primary={orderID} />
      <ListItemText classes={{root: classes.listItemText, primary: classes.listItemPrimary, secondary: classes.listItemSecondary}} 
                    primary={order.description} />
      <ListItemText classes={{root: classes.listItemText, primary: classes.listItemPrimary, secondary: classes.listItemSecondary}} 
                    primary={order.status} />
      <ListItemText classes={{root: classes.listItemText, primary: classes.listItemPrimary, secondary: classes.listItemSecondary}} 
                    primary={order.amount} /> 
    </ListItem>
  )
}

const OrderSubheader = (props) => {
  var {classes} = props;

  return (
    <div className={classes.subheader}>
      <span className={classes.subheaderItem}>Order Date</span>    
      <span className={classes.subheaderItem}>Project Id</span>
      <span className={classes.subheaderItem}>Project Title</span>
      <span className={classes.subheaderItem}>Status</span>
      <span className={classes.subheaderItem}>Payment</span>
    </div>
  )
}

function OrderList(props) {
  const { classes, orders } = props;
  return (
    <Paper className={classes.root}>
        <List subheader={<ListSubheader component="div" className={classes.subheaderRoot}><OrderSubheader classes={classes} /></ListSubheader>}>
          <Divider />
        { orders && Object.keys(orders).map(orderID => {
          return (<OrderDetail order={orders[orderID]} key={orderID} orderID={orderID} classes={classes} />
          )}
        )}
        <Divider />
      </List>
    </Paper>
  );
}

OrderList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(OrderList);