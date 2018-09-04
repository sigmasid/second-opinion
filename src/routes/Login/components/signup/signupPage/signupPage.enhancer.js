import { withFirebase } from 'react-redux-firebase'
import { withHandlers, pure, compose } from 'recompose'
import { withNotifications } from 'modules/notification'
const util = require('util') //print an object

export default compose(
  withNotifications, // add props.showError
  withFirebase, // add props.firebase (firebaseConnect() can also be used)
  // Handlers
  withHandlers({
    onSubmitFail: props => (formErrs, dispatch, err) => {
      props.showError(formErrs ? 'Form Invalid' : err.message || 'Error')
    },
    linkedinLogin: ({ firebase, showError }) => e =>
      firebase
        .login({ provider: 'linkedin', type: 'popup' })
        .catch(err => showError(err.message)),
    emailSignup: ({ firebase, showError }) => creds => {
      console.log('creds are '+util.inspect(creds));
      firebase
        .createUser(creds, {
          email: creds.email,
          username: creds.username
        })
        .then(() => console.log('account created'))
        .catch(err => console.log(err.message)) 
      }
  }),
  pure // shallow equals comparison on props (prevent unessesary re-renders)
)