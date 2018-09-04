import { withFirebase } from 'react-redux-firebase'
import { withHandlers, pure, compose } from 'recompose'
import { withNotifications } from 'modules/notification'
import { withToggle } from 'modules/toggle'
const util = require('util') //print an object

export default compose(
  withNotifications, // add props.showError
  withFirebase, // add props.firebase (firebaseConnect() can also be used)
  withToggle,
  withHandlers({
    onSubmitFail: props => (formErrs, dispatch, err) => {
      props.showError(formErrs ? 'Form Invalid' : err.message || 'Error')
    },
    handleSubmit: ({ firebase, showError, showSuccess, showLoading }) => creds => {
      showLoading('Logging in...');
      firebase
        .login(creds)
        .then(user => showSuccess('Sucessfully logged in!'))
        .catch(err => showError(err.message))
    },
    handleReset: ({ firebase, showError, showSuccess, showLoading }) => creds => {
      showLoading('Processing request...');      
      firebase
        .resetPassword(creds.email)
        .then(user =>  showSuccess('Password reset email sent!'))
        .catch(err => showError(err.message))
    }
  }),
  pure // shallow equals comparison on props (prevent unessesary re-renders)
)