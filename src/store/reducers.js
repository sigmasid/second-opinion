import { combineReducers } from 'redux'
import { firestoreReducer as firestore } from 'redux-firestore'
import { firebaseStateReducer as firebase } from 'react-redux-firebase'
import { reducer as form } from 'redux-form'
import { reducer as notifications } from 'modules/notification'
import { reducer as users } from 'modules/users'

export const makeRootReducer = asyncReducers => {
  return combineReducers({
    // Add sync reducers here
    firebase,
    firestore,
    form,
    notifications,
    users,
    ...asyncReducers
  })
}

export const injectReducer = (store, { key, reducer }) => {
  store.asyncReducers[key] = reducer
  store.replaceReducer(makeRootReducer(store.asyncReducers))
}

export default makeRootReducer
