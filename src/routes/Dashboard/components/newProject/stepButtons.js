import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

//router
import { Link } from 'react-router-dom'

//material
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

//styles
const styles = theme => ({
  stepButtons: {
    textAlign: 'right',
    paddingTop: '50px'
  },
  backButton: {
    marginRight: theme.spacing.unit,
  },
  hidden: {
    visibility: 'hidden'
  }
});

const StepButtons = (props) => {
	const {classes} = props;

	return(
  <div className={classes.stepButtons}>
    <Button className={classes.backButton} 
            onClick={props.handleBack} 
            disabled={props.disableBack} 
            className={props.hideBack && classes.hidden}>
      {props.backText}
    </Button>
    <Button variant="contained" 
            color="primary" 
            component={props.nextLink ? Link : 'button'}
            to={props.nextLink}
            disabled={props.disableNext}
            onClick={!props.nextLink && props.type !== 'submit' ? props.handleNext : null}  
            className={classNames(classes.button, props.hideNext && classes.hidden)}            
            type={props.type}>
      {props.nextText}
    </Button>
  </div>
  );
}

StepButtons.propTypes = {
  classes: PropTypes.object,
  handleNext: PropTypes.func,
  handleBack: PropTypes.func,
  nextText: PropTypes.string,
  backText: PropTypes.string,
  nextType: PropTypes.string,
  nextLink: PropTypes.string,
  hideBack: PropTypes.bool,
  hideNext: PropTypes.bool,  
  disableBack: PropTypes.bool,
  disableNext: PropTypes.bool
};

StepButtons.defaultProps = {
  nextText: 'Next',
  backText: 'Back',
  type: 'button'
};

export default withStyles(styles)(StepButtons);