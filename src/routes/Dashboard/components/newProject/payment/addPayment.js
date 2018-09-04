import React from "react";
import PropTypes from "prop-types";
//import classNames from 'classnames';

//stripe components
import { CardElement, injectStripe } from "react-stripe-elements";
import { Field } from "redux-form";

//Material Components
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Input from "@material-ui/core/Input";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

//components
import StepButtons from "../stepButtons.js";
import ChangeCards from "./changeCards";
import CardItem from "./cardItem";
import NewCard from "routes/Dashboard/components/profile/billing/billingCardNew";

const util = require("util"); //print an object

const styles = theme => ({
  root: {
    backgroundColor: theme.palette.background.default
  },
  stripe: {
    padding: "20px",
    borderRadius: 0,
    border: "none",
    borderBottom: "1px solid black",
    boxShadow: "none"
  },
  stripeFocus: {
    color: "#0277bd",
    borderBottom: "2px solid #0277bd"
  },
  stripeLabelFocus: {
    color: "#0277bd"
  },
  panel: {
    width: "100%",
    boxShadow: "none",
    background: "none"
  },
  heading: {
    margin: "0 auto"
  },
  newCardContainer: {
    width: 600,
    padding: 30,
    margin: "0 auto"
  }
});

var stripeInputStyle = {
  base: {
    fontSize: "16px",
    color: "#32325d"
  }
};

const NoSavedCardsForm = props => {
  const { classes, toggle: focused, ...rest } = props;

  return (
    <Paper className={classes.root} elevation={0}>
      <div className={classes.newCardContainer}>
        <label className={classes.newCardForm}>
          <Typography
            variant="caption"
            className={focused ? classes.stripeLabelFocus : classes.stripeLabel}
          >
            {" "}
            Card details
          </Typography>
          <CardElement
            classes={{ base: classes.stripe, focus: classes.stripeFocus }}
            style={stripeInputStyle}
            onFocus={props.handleFocus}
            onBlur={props.handleBlur}
          />
        </label>
      </div>
    </Paper>
  );
};

const SavedCardsForm = props => {
  const {
    classes,
    cards,
    selectedCard,
    defaultCard,
    toggle: expanded,
    ...rest
  } = props;

  var _selectedCard = selectedCard || defaultCard;

  return (
    <Paper className={classes.root} elevation={0}>
      <ExpansionPanel className={classes.panel} defaultExpanded={true}>
        <ExpansionPanelSummary onClick={props.handleToggle}>
          <Typography className={classes.heading}>
            {!cards ? "Add New Card" : "Selected Card"}
          </Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <CardItem card={_selectedCard} defaultCard={true} />
        </ExpansionPanelDetails>
      </ExpansionPanel>
      <ChangeCards
        cards={cards}
        handleSelectCard={props.handleSelectCard}
        handleToggle={props.handleToggle}
        expanded={expanded}
      />
    </Paper>
  );
};

const AddPayment = props => {
  const { classes, cards, handleSubmit, ...rest } = props;

  return (
    <form onSubmit={handleSubmit} className={classes.form}>
      {!cards
       ? <NoSavedCardsForm classes={classes} {...rest} />
       : <SavedCardsForm classes={classes} cards={cards} {...rest} />}
      <StepButtons nextText="Pay" type="submit" handleBack={props.handleBack} />
    </form>
  );
};

AddPayment.propTypes = {
  classes: PropTypes.object
};

export default withStyles(styles)(AddPayment);
