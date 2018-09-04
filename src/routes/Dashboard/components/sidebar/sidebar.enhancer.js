import { compose } from 'redux'
import { withHandlers } from 'recompose'
import { withFirebase } from 'react-redux-firebase'
import { withRouter } from 'react-router-dom';
import { withNotifications } from 'modules/notification'

export default compose(
  withRouter,
  withFirebase,
  withNotifications,
  withHandlers({
    handleLogout: props => () => {
      props.firebase.logout()
      props.history.push('/')
      props.showSuccess('Log out success!')
    }
   })
);