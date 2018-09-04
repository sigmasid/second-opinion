import { compose, withHandlers } from 'recompose'
import { withStore } from 'utils/components'
import * as actions from './actions'
import { withFirestore, firestoreConnect } from 'react-redux-firebase'
import { withNotifications } from 'modules/notification'

const util = require('util') //print an object

const withProjectActions = compose(
  //withStore,
  withFirestore,
  withNotifications,
  withHandlers({
    uploadFiles: (props) => obj => actions.uploadFiles(props, obj),
    deleteFile: (props) => obj => actions.deleteFile(props, obj),
    downloadFile: (props) => obj => actions.downloadFile(props, obj),
    addMessage: (props) => obj => actions.addMessage(props, obj)
  })
)

export default withProjectActions