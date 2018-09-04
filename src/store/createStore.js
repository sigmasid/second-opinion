import { applyMiddleware, compose, createStore } from 'redux'
import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/database'
import 'firebase/auth'
import 'firebase/storage'
import { reduxFirestore } from 'redux-firestore'
import { reactReduxFirebase } from 'react-redux-firebase'
import { getFirestore } from 'redux-firestore'
import makeRootReducer from './reducers'
import thunk from 'redux-thunk';
import { firebase as fbConfig, reduxFirebase as reduxConfig } from 'config'
import { version } from '../../package.json'

export default (initialState = {}) => {
  // ======================================================
  // Window Vars Config
  // ======================================================
  window.version = version

  // ======================================================
  // Middleware Configuration
  // ======================================================
  const middleware = [
    thunk.withExtraArgument(getFirestore) // Pass getFirebase function as extra argument
    // This is where you add other middleware like redux-observable
  ]

  // ======================================================
  // Store Enhancers
  // ======================================================
  const enhancers = []
  if (__DEV__) {
    const devToolsExtension = window.devToolsExtension
    if (typeof devToolsExtension === 'function') {
      enhancers.push(devToolsExtension())
    }
  }

  firebase.initializeApp(fbConfig)
  firebase.firestore().settings({ timestampsInSnapshots: true })

  // ======================================================
  // Store Instantiation and HMR Setup
  // ======================================================
  const store = createStore(
    makeRootReducer(),
    initialState,
    compose(
      applyMiddleware(...middleware),
      reduxFirestore(firebase, reduxConfig),
      reactReduxFirebase(firebase, reduxConfig), // used for auth/profile
      ...enhancers
    )
  )
  store.asyncReducers = {}

  if (module.hot) {
    module.hot.accept('./reducers', () => {
      const reducers = require('./reducers').default
      store.replaceReducer(reducers(store.asyncReducers))
    })
  }

  return store
}
