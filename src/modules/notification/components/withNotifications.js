import { compose, withHandlers } from 'recompose'
import { withStore } from 'utils/components'
import * as actions from '../actions'
const util = require('util') //print an object

const withNotifications = compose(
  withStore,
  withHandlers({
    showError: ({ store }) => msg => actions.showError(msg)(store.dispatch),
    showSuccess: ({ store }) => msg => { actions.showSuccess(msg)(store.dispatch) },
    showLoading: ({ store }) => msg => { actions.showLoading(msg)(store.dispatch) },    
    showInfo: ({ store }) => msg => { actions.showInfo(msg)(store.dispatch) },        
    dismissNotification: ({ store }) => id =>
      actions.dismissNotification(id)(store.dispatch)
  })
)

export default withNotifications