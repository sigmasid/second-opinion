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
  //withFirestore,
  withHandlers({
    handleSelectCard: (props) => () => {
      props.handleSelectCard(props.cardID);
    }  
  })
);