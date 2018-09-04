import { compose } from 'redux'
import { connect } from 'react-redux'
import { userIsNotAuthenticatedRedir } from 'utils/router'
import { withFirestore } from 'react-redux-firebase'

export default compose(
  withFirestore,	
  userIsNotAuthenticatedRedir, // redirect to /account if user is not authenticated
	connect(({ firebase: { auth } }) => ({ auth })) 
);