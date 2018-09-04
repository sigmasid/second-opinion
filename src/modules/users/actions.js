import { REQUEST_USER, RECEIVE_USER } from "./actionTypes";
const util = require('util') //print an object

function requestUser(id) {
  return {
    type: REQUEST_USER,
    id
  };
}

function receiveUser(id, profile) {
  //console.log('got user with '+util.inspect(id)+' profile is '+util.inspect(profile));
  return {
    type: RECEIVE_USER,
    id,
    profile: profile
  };
}

function fetchUser(uid, getFirestore) {
  const firestore = getFirestore()
  return dispatch => {
    dispatch(requestUser(uid));
    return firestore
      .get({ collection: "users", doc: `${uid}` })
      .then(doc => doc.data())
      .then(user => dispatch(receiveUser(uid, user)));
  };
}

function shouldFetchUser(state, uid) {
  const user = state.users[uid];
  if (!user) {
    return true;
  } else if (user.isFetching) {
    return false;
  } else {
    return false;
  }
}

export function fetchUsersIfNeeded(uids) {
  return (dispatch, getState, getFirestore) => {
    uids.forEach(uid => {
      if (shouldFetchUser(getState(), uid)) {
        return dispatch(fetchUser(uid, getFirestore));
      }
    });
  };
}
