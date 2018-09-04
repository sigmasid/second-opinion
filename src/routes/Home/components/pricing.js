import React from "react";
import classNames from "classnames";
import withStyles from "@material-ui/core/styles/withStyles";

// core components
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from "@material-ui/core/Button";
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import InboxIcon from '@material-ui/icons/Inbox';
import DraftsIcon from '@material-ui/icons/Drafts';

const styles = theme => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.default,
    minHeight: 900,
    display: 'flex'    
  },
  content: {
    alignSelf: 'center',
    margin: '0 auto',
    minWidth: '70%'
  },
  header: {
    textAlign: 'center'
  },
  grid: {
    textAlign: 'center',
    color: 'black',
    display: 'flex'
  },
  pricingSection: {
    marginTop: 75,
    display: 'flex',
    justifyContent: 'space-evenly'
  },
  divider: {
    marginTop: 30,
    marginBottom: 30
  },
  card: {
    minWidth: 350,
  },
  cardTitle: {
    padding: 20,
    color: 'white',
    background: theme.palette.primary.light
  },
  priceTitle: {
    paddingTop: 20
  }
});

const UndergradPricing = (props) => {
  var classes = props.classes;

  return (
    <Card className={classes.card}>
      <CardHeader subheader={"Undergraduate"} classes={{ root: classes.cardTitle }} />
      <CardContent>
        <Typography className={classes.priceTitle} variant="display2" color="textSecondary">$99</Typography>
        <Divider className={classes.divider} />
        <List component="nav">
          <ListItem>
            <ListItemIcon>
              <InboxIcon />
            </ListItemIcon>
            <ListItemText primary="48 hour turnaround" />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <InboxIcon />
            </ListItemIcon>
            <ListItemText primary="Proofread for typos & grammatical errors" />
          </ListItem> 
          <ListItem>
            <ListItemIcon>
              <InboxIcon />
            </ListItemIcon>
            <ListItemText primary="Actionable advice & suggestions" />
          </ListItem>        
          <ListItem>
            <ListItemIcon>
              <InboxIcon />
            </ListItemIcon>
            <ListItemText primary="Expert critique on content, structure & tone" />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <DraftsIcon />
            </ListItemIcon>
            <ListItemText primary="Chat follow-up with editors" />
          </ListItem>
        </List>        
      </CardContent>
    </Card>
  );
}


const GradPricing = {};

class Pricing extends React.Component {
  render() {
    const { classes } = this.props;

    return (
    <div className={classes.root}>
      <div className={classes.content}>
        <div className={classes.header}>
          <Typography variant="display1" gutterBottom>Simple, Affordable Pricing</Typography>
          <Typography variant="body1" gutterBottom color="textSecondary">Not satisfied? Each project is backed by our money-back guarantee!</Typography>
        </div>
        <div className={classes.pricingSection}>
          <UndergradPricing classes={classes} />
          <UndergradPricing classes={classes} />            
        </div>
      </div>
    </div>
    );
  }
}

export default withStyles(styles)(Pricing);
