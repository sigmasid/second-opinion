import { combineReducers } from 'redux'
import { REQUEST_USER, RECEIVE_USER } from './actionTypes'
const util = require('util') //print an object

function user(
  state = {
    isFetching: false,
    profile: {}
  },
  action
) {
  switch (action.type) {
    case REQUEST_USER:
      return Object.assign({}, state, {
        isFetching: true
      })
    case RECEIVE_USER:
      return Object.assign({}, state, {
        isFetching: false,
        profile: action.profile,
      })
    default:
      return state
  }
}

const getProjectUsers = (state = {}, action) => {
  //console.log("action is "+util.inspect(action));
  switch (action.type) {
    case RECEIVE_USER:
    case REQUEST_USER:
      return {
        [action.uid]: user(state[action.uid], action)
      }
    default:
      return state
  }
}


/**
const allIds = (state = [], action) => {
  switch (action.type) {
    case RECEIVE_USER:
    case REQUEST_USER:
      return [...state, action.payload.id]
    default:
      return state
  }
} **/


export const getUsers = combineReducers({ getProjectUsers })

export default getUsers