import React from "react";
import PropTypes from 'prop-types';
import classNames from 'classnames';

// @material-ui/icons
import withStyles from "@material-ui/core/styles/withStyles";
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import TextField from '@material-ui/core/TextField';

//icons
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

const util = require('util') //print an object

const styles = (theme) => ({
  card: {
    height: 300,
    width: 360,
    margin: '0 auto',
    boxShadow: 'none',
    border: '1px solid',
    borderColor: theme.palette.text.secondary
  },
  cardHeaderTitle: {
    fontSize: '1.0rem',
    fontWeight: theme.typography.fontWeightMedium,
  },
  footerButtons: {
    marginLeft: 'auto'
  },
  billingRow: {
    display: 'flex'
  }
});

const CardItem = (props) => {

  var { classes, card, toggle:hideEditMode, handleToggle } = props;

  return (
  <Card className={classes.card}>
    {<CardHeader title={card.brand} 
                classes={{root: classes.cardHeader, title: classes.cardHeaderTitle}}             
                action={hideEditMode &&
                <div>
                  <IconButton><EditIcon onClick={() => props.handleEdit(card)} /></IconButton>
                  <IconButton><DeleteIcon onClick={() => props.handleDelete(card)} /></IconButton>
                </div>
                }/>}
    <CardContent>
      <TextField
        id="last4"
        label="Last 4 Digits"
        className={classes.textField}
        value={card.last4}
        disabled
        fullWidth
        margin="normal"
      />
      <div className={classes.billingRow}>      
        <TextField
          id="expiration"
          label="Expiration"
          className={classes.textField}
          value={card.exp_month+"/"+card.exp_year}
          margin="normal"
          disabled={hideEditMode}
        />
        <TextField
          id="zip"
          label="Zip"
          className={classes.textField}
          value={card.address_zip}
          margin="normal"
          disabled={hideEditMode}
        />
      </div>
    </CardContent>
    {!hideEditMode && 
      <CardActions className={classes.cardFooter}>
        <div className={classes.footerButtons}>
          <Button color="primary" onClick={handleToggle}>Cancel</Button>    
          <Button variant="contained" color="primary" className={classes.button}>Save</Button>
        </div>
      </CardActions>
    }
  </Card>
  );
}

CardItem.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(CardItem);
