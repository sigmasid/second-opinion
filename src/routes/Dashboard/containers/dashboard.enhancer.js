import { compose } from 'redux'
import { connect } from 'react-redux'
import { withHandlers, withState } from 'recompose'
import { withFirebase } from 'react-redux-firebase'
import { withRouter } from 'react-router-dom';
import { userIsNotAuthenticatedRedir } from 'utils/router'

export default compose(
  withRouter,
  userIsNotAuthenticatedRedir, // redirect to /account if user is not authenticated
  withFirebase
);