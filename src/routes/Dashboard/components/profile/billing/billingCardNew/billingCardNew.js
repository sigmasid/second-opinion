import React from "react";
import PropTypes from 'prop-types';
import classNames from 'classnames';

//Modules
import BillingForm from "../billingForm";

// @material-ui/icons
import withStyles from "@material-ui/core/styles/withStyles";
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

//icons
import AddIcon from '@material-ui/icons/AddCircle';


const styles = (theme) => ({
  card: {
    display: 'flex',
    height: 300,
    width: 360,
    margin: '0 auto',
    backgroundColor: theme.palette.background.default,
    boxShadow: 'none',
  },
  alignCenter: {
    alignItems: 'center' 
  },
  cardContent: {
    margin: '0 auto'
  },
  dashBorder: {
    border: '1px solid',
    borderColor: theme.palette.text.secondary,
    borderStyle: 'dashed'
  },
  buttonLabel: {
    display: 'flex',
    flexDirection: 'column',
    color: '#1890ff',
    fontWeight: theme.typography.fontWeightMedium,
  },
  leftIcon: {
    fontSize: '1.75rem',
    paddingBottom: 5
  }
});

const NewCard = (props) => {
  var {classes, toggle:hideNewCardForm, handleToggle, handleSubmit} = props;
  
  return(
    <Card className={classNames(classes.card, classes.dashBorder, hideNewCardForm && classes.alignCenter)}>
      { !hideNewCardForm && <BillingForm handleToggle={handleToggle} handleSubmit={handleSubmit} />}
      { hideNewCardForm &&
        <CardContent className={classes.cardContent}>
          <Button size="large" classes={{root: classes.buttonRoot, label: classes.buttonLabel}} onClick={handleToggle} >
            <AddIcon className={classes.leftIcon} />
              Add Card
          </Button>
        </CardContent>
      }
    </Card>
  )
}

export default withStyles(styles)(NewCard);