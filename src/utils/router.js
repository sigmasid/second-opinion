import createHistory from "history/createBrowserHistory"
import { LIST_PATH } from 'constants'
import Loading from '../components/loading'

import locationHelperBuilder from 'redux-auth-wrapper/history4/locationHelper'
import { connectedRouterRedirect } from 'redux-auth-wrapper/history4/redirect'
import connectedAuthWrapper from 'redux-auth-wrapper/connectedAuthWrapper'

const AUTHED_REDIRECT = 'AUTHED_REDIRECT';
const UNAUTHED_REDIRECT = 'UNAUTHED_REDIRECT';
const history = createHistory();
const util = require('util') //print an object

const locationHelper = locationHelperBuilder({})

const userIsAuthenticatedDefaults = {
  wrapperDisplayName: 'UserIsAuthenticated',
  authenticatedSelector: ({ firebase: { auth } }) => { 
    //doesn't work without return
    return auth.isEmpty
  },
  authenticatingSelector: ({ firebase: { auth, isInitializing } }) =>
    !auth.isLoaded || isInitializing,
}

export const userIsAuthenticated = connectedAuthWrapper(userIsAuthenticatedDefaults)

export const userIsAuthenticatedRedir = connectedRouterRedirect({
  ...userIsAuthenticatedDefaults,
  redirectPath: '/account',
  AuthenticatingComponent: Loading,
})


const userIsNotAuthenticatedDefaults = {
  // Want to redirect the user when they are done loading and authenticated
  authenticatedSelector: ({ firebase: { auth } }) => { 
    //doesn't work without return
    return !auth.isEmpty
  },
  authenticatingSelector: ({ firebase: { auth, isInitializing } }) =>
    !auth.isLoaded || isInitializing,  
  wrapperDisplayName: 'UserIsNotAuthenticated',
}

export const userIsNotAuthenticated = connectedAuthWrapper(userIsNotAuthenticatedDefaults)

export const userIsNotAuthenticatedRedir = connectedRouterRedirect({
  ...userIsNotAuthenticatedDefaults,
  AuthenticatingComponent: Loading,
  redirectPath: '/login'
})