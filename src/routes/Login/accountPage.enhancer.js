import { compose } from 'redux'
import { connect } from 'react-redux'
import { lifecycle } from 'recompose'
import { withFirebase } from 'react-redux-firebase'
import { withRouter } from 'react-router-dom';
import { userIsAuthenticatedRedir } from 'utils/router'
import { withToggle } from 'modules/toggle'
const util = require('util') //print an object

export default compose(
  withRouter,
  withToggle,
  userIsAuthenticatedRedir, // redirect to /account if user is not authenticated
  lifecycle({
    //listener for changing transparent
    componentDidMount() {
    	//default state to show login - toggle to signup if toggle value is set to false
      (this.props.location && this.props.location.state && this.props.location.state.shouldToggle) && this.props.handleToggle()
    }
  })
);