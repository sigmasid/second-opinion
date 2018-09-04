import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

//Material Components
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import InputAdornment from '@material-ui/core/InputAdornment';
import Grid from '@material-ui/core/Grid';
import Tooltip from '@material-ui/core/Tooltip';
import Avatar from '@material-ui/core/Avatar';

//Redux form
import { Field } from 'redux-form'
import CustomInput from 'components/MaterialInput'

//Icons
import CompanyIcon from '@material-ui/icons/Business';
import PositionIcon from '@material-ui/icons/Label';
import DetailsIcon from '@material-ui/icons/Info';

//components
import StepButtons from '../stepButtons.js';

const util = require('util') //print an object

//styles
const styles = theme => ({
  root: {
    backgroundColor: theme.palette.background.default
  },
  gridContainer: {
    width: '100%',
    padding: 20,
    margin: 0
  },
  gridItem: {
    margin: '0 auto',
    padding: 20,
    display: 'flex'
  },
  textField: {
    paddingBottom: 30
  },
  pinkAvatar: {
    margin: 10,
    color: '#fff',
    backgroundColor: theme.palette.secondary.main,
    marginRight: 20,
    alignSelf: 'center'
  }, 
});

const AddDetails = (props) => {
  var { classes, handleSubmit } = props;
  return (
    <form onSubmit={handleSubmit} >        
      <Paper className={classes.root} elevation={0}>
        <Grid container className={classes.gridContainer}>
          <Grid item xs={12} md={6} className={classes.gridItem}>
            <Tooltip 
              id="tooltip-left-start" 
              title="More precise info helps us better match you to an HR expert" 
              placement="top-start"
              enterDelay={300}
              leaveDelay={300}
            >
            <Field
              name="company"
              type="text"
              fullWidth
              autoFocus
              component={CustomInput}
              id="company"
              error={null}
              placeholder="Google"
              defaultValue={props.project && props.project.details && props.project.details['company']}
              className={classes.textField}
              label="Company / Industry Details" 
              InputLabelProps={{ shrink: true }}
              helperText="Examples: Google, Square, Technology, Venture Capital, Retail."
              margin="normal"                        
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <CompanyIcon />
                  </InputAdornment>
                ),
              }} 
            />
            </Tooltip>
          </Grid>
          <Grid item xs={12} md={6} className={classes.gridItem}>                                        
            <Tooltip 
              id="tooltip-left-start" 
              title="Details on the type of role, job title or seniority level" 
              placement="top-start"
              enterDelay={300}
              leaveDelay={300}
            >
            <Field
              name="position"
              type="text"
              fullWidth
              component={CustomInput}
              id="position"
              error={null}
              placeholder="Growth Manager"
              defaultValue={props.project && props.project.details && props.project.details['position']}              
              className={classes.textField}
              label="Position Details" 
              InputLabelProps={{ shrink: true }}
              helperText="Examples: Growth Manager, VP of Product, Entry Level Data Scientist."
              margin="normal"                        
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PositionIcon />
                  </InputAdornment>
                ),
              }} 
            />
            </Tooltip>
          </Grid>
          <Grid item xs={12} md={12} className={classes.gridItem}>                          
            <Tooltip 
              id="tooltip-left-start" 
              title="Specific areas you need help in, questions you have, additional information you want to share" 
              placement="top-start"
              enterDelay={300}
              leaveDelay={300}
              >
              <Field
                name="additional"
                type="text"
                fullWidth
                component={CustomInput}
                id="additional"
                error={null}
                defaultValue={props.project && props.project.details && props.project.details['additional']}
                className={classes.textField}
                label="Additional Details"
                InputLabelProps={{ shrink: true }}
                helperText="Examples: I want to better communicate my leadership experience"                           
                margin="normal"                        
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <DetailsIcon />
                    </InputAdornment>
                  ),
                }} 
              />
            </Tooltip>
          </Grid>
        </Grid>
      </Paper>
      <StepButtons type={"submit"} 
                  disableBack 
                  handleNext={props.handleNext} />
    </form>
  );
}

AddDetails.propTypes = {
  classes: PropTypes.object,
};

export default withStyles(styles)(AddDetails);