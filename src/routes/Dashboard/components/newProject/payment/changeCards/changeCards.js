import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

//icons
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

//
import NewCard from "routes/Dashboard/components/profile/billing/billingCardNew";
import CardDetail from "../cardItem";

const styles = theme => ({
  root: {
    width: '100%',
    boxShadow: 'none',    
    background: 'none'    
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
    margin: '0 auto',
    paddingRight: '0 !important'
  },
  billingPane: {
    display: 'flex',
    flexGrow: 1,
    alignItems: 'center',
    marginTop: 20,
    boxShadow: 'none',    
  },
  expansionPanelSummary: {
    display: 'flex',
    flexDirection: 'column',   
  },
  expansionPanelSummaryExpanded: {
    margin: '10px 0px'
  },
  expandIcon: {
    position: 'relative'
  }
});

const ChangeCards = (props) => {
  const { classes, cards, expanded, ...rest } = props;
  return (
    <ExpansionPanel className={classes.root} expanded={!expanded} onChange={props.handleToggle}>
      <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />} 
                             classes={{ root: classes.expansionPanelSummary, 
                                        expandIcon: classes.expandIcon,
                                        content: classes.expansionPanelSummaryContent
                                      }}>
        <Typography className={classes.heading}>change or add cards</Typography>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails>
        <Grid container spacing={16}>
        { cards && Object.values(cards).map(card => {
            return(
              <Grid item xs={12} md={4} key={card.id} >
                <CardDetail card={card} cardID={card.id} {...rest} />
              </Grid>
            )
          }
        )}
          <Grid item xs={12} md={4}>
            <NewCard key={"new"} />
          </Grid>
        </Grid>
      </ExpansionPanelDetails>
    </ExpansionPanel>
  );
}

ChangeCards.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ChangeCards);