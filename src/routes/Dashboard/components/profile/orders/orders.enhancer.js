import { compose } from 'redux'
import { withFirestore, firestoreConnect } from 'react-redux-firebase'
import { connect } from 'react-redux'
import { spinnerWhileLoading } from 'utils/components'

const util = require('util') //print an object

export default compose(
  withFirestore,
  firestoreConnect((props) => {
    return ([{
      collection: 'users',
      doc: props.auth.uid,
      subcollections: [{ collection: 'orders' }], 
      storeAs: 'orders'
    }])
  }),
  connect(({ firestore: { data }}, props ) => {
    return({orders: data.orders})
  }),
  spinnerWhileLoading(["orders"])
);