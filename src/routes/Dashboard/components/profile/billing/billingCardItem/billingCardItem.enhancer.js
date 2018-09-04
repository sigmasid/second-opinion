import { compose } from 'redux'
import { connect } from 'react-redux'
import { withHandlers } from 'recompose'
import { injectStripe } from 'react-stripe-elements';
import { withNotifications } from 'modules/notification'
import { withToggle } from 'modules/toggle'
import { withFirestore, firestoreConnect, isEmpty } from 'react-redux-firebase'

const util = require('util') //print an object

export default compose(
  withToggle,
  withFirestore,
	withNotifications,
	withHandlers({
    handleEdit: props => (card) => {
      props.handleToggle();
    },
		handleDelete: props => (card) => {
   
    	props.showLoading(`Processing request...`);
			const docRefConfig = { collection:"users", doc: `${props.auth.uid}`, subcollections: [{ collection:"cards", doc: `${card.id}` }] }
 			
 			return props.firestore.delete(docRefConfig)
      .then(response => {
      	props.showSuccess(`Deleting card!`);
	 			//set listener for the doc and wait to see response - if response close and refresh else error       
      })
      .catch(err => {
      	props.showError(err.message || err);
      }); 
		}
  })
);