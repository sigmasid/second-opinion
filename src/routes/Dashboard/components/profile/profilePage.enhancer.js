import { compose } from 'redux'
import { connect } from 'react-redux'
import { withHandlers, withState } from 'recompose'
import { withFirebase } from 'react-redux-firebase'
import { withRouter } from 'react-router-dom';
import { userIsNotAuthenticatedRedir } from 'utils/router'

const util = require('util') //print an object

export default compose(
  withRouter,
  userIsNotAuthenticatedRedir, // redirect to /login if user is not authenticated
  withState('activeTab', 'setActiveTab', 0),
  withFirebase,
  connect(({ firebase: { auth, profile } }) => ({ auth, profile })),
  //connect(({ firebase: { auth } }) => ({ auth })),
  withHandlers({
    onClick: props => (event, value) => {
      event.preventDefault();
      props.setActiveTab(value);
    }
  })
);