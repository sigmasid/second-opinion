import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames';
import { pure, compose, renderNothing, branch } from 'recompose'

import * as actions from '../actions'
import { size } from 'lodash'
import { connect } from 'react-redux'

//Material
import Snackbar from '@material-ui/core/Snackbar'
import IconButton from '@material-ui/core/IconButton'
import { withStyles } from '@material-ui/core/styles'

//Icons
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';
import InfoIcon from '@material-ui/icons/Info';
import CloseIcon from '@material-ui/icons/Close';
import WarningIcon from '@material-ui/icons/Warning';
import CircularProgress from '@material-ui/core/CircularProgress';

//Colors
import green from '@material-ui/core/colors/green';
import amber from '@material-ui/core/colors/amber';
const util = require('util') //print an object

const styles = theme => ({
  buttonRoot: {
    color: 'white'
  },  
  success: {
    backgroundColor: green[600],
  },
  error: {
    backgroundColor: theme.palette.error.dark,
  },
  info: {
    backgroundColor: theme.palette.primary.dark,
  },
  warning: {
    backgroundColor: amber[700],
  },
  icon: {
    fontSize: 20,
  },
  iconVariant: {
    opacity: 0.9,
    marginRight: theme.spacing.unit,
  },
  message: {
    display: 'flex',
    alignItems: 'center',
  },
});

const variantIcon = {
  'success': CheckCircleIcon,
  'loading': CircularProgress,
  'error': ErrorIcon, 
  'info': InfoIcon
}

export const Notifications = ({
  allIds,
  byId,
  dismissNotification,
  classes
}) => (
  <div>
    {allIds.map(id => {
      const Icon = variantIcon[byId[id].type];
      return(
      <Snackbar
        key={id}
        open
        action={
          <IconButton
            onClick={() => dismissNotification(id)}
            classes={{ root: classes.buttonRoot }}>
            <CloseIcon />
          </IconButton>
        }
        message={<span id="client-snackbar" className={classes.message}>
                  <Icon className={classNames(classes.icon, classes.iconVariant)} />
                  {byId[id].message}
                </span>}
      />
      )}
    )}
    </div>
)

Notifications.propTypes = {
  allIds: PropTypes.array.isRequired,
  byId: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  dismissNotification: PropTypes.func.isRequired
}

export default compose(
  pure,
  withStyles(styles),
  connect(({ notifications: { allIds, byId } }) => ({ allIds, byId }), actions),
  branch(props => !size(props.allIds), renderNothing) // only render if notifications exist
)(Notifications)