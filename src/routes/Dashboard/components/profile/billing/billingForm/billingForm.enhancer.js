import { compose } from 'redux'
import { withHandlers, withState } from 'recompose'
import { withNotifications } from 'modules/notification'

const util = require('util') //print an object

export default compose(
  withState('isReady', 'setReady', false),
  withNotifications,
  withHandlers({
    handleReady: props => (value) => {
      props.setReady(true);
    },
    handleChange: props => (error) => {
		  if (error && error.error) {
      	props.showError(error.error.message);
		  }
    }
  })  
);