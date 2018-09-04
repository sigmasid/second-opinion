import { compose } from 'redux'
import { connect } from 'react-redux'
import { withHandlers } from 'recompose'
import { injectStripe } from 'react-stripe-elements';
import { withNotifications } from 'modules/notification'
//import { withToggle } from '../../modules/toggle'
import { withFirestore, firestoreConnect, isEmpty } from 'react-redux-firebase'

const util = require('util') //print an object

export default compose(
	//withToggle,
  withFirestore,
	withNotifications,
	firestoreConnect((props) => {
    return ([{
      collection: 'users',
      doc: props.auth.uid,
		  subcollections: [{ collection: 'cards' }]
  	}])
  }),
  connect((state, props) => {
    return({cards: !isEmpty(state.firestore.data.users) && state.firestore.data.users[props.auth.uid].cards});
  })
);