import { compose } from 'redux'
import { connect } from 'react-redux'
import { withFirestore, firestoreConnect, isEmpty } from 'react-redux-firebase'

const util = require('util') //print an object

export default compose(
  withFirestore,
	firestoreConnect((props) => {
    return ([{
      collection: 'users',
      doc: props.auth.uid,
		  subcollections: [{ collection: 'projects' }]
  	}])
  }),
  connect((state, props) => {
    return({projects: !isEmpty(state.firestore.data.users) && state.firestore.data.users[props.auth.uid].projects});
  })
);