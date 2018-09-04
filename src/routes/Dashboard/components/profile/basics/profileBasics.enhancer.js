import { compose } from 'redux'
import { connect } from 'react-redux'
import { withHandlers, withState } from 'recompose'
import { withFirebase } from 'react-redux-firebase'
import { withRouter } from 'react-router-dom';

import { withNotifications } from 'modules/notification'
import { getFirebase } from 'react-redux-firebase';

const util = require('util') //print an object

export default compose(
  withRouter,
  withNotifications,
  withFirebase,
  withState('editMode', 'setEditMode', undefined),
  withHandlers({
    updateName: ({ firebase, setEditMode, ...props }) => data => {
      props.showLoading('Updating profile...');      
      firebase
        .updateProfile({ displayName: data.firstName + ' ' + data.lastName})
        .then(() => {
          var user = firebase.auth().currentUser;
          return user.updateProfile({
            displayName: data.firstName + ' ' + data.lastName
          })
        })
        .then(() => {
          props.showSuccess('Profile successfully updated!');
          setEditMode(undefined);
        })
        .catch(error => {
          props.showError('Error updating profile: ', error.message || error)
          return Promise.reject(error)
        })
    },
    updatePassword: ({ firebase, ...props }) => data => {
      var user = firebase.auth().currentUser;
      
      var credential = firebase.auth.EmailAuthProvider.credential(user.email, data.oldPassword);

      if (!user) {
        props.showError('Error authenticating credentials!')
      }

      props.showLoading('Updating password...');      
      user.reauthenticateAndRetrieveDataWithCredential(credential)
      .then(() => {
        user.updatePassword(data.newPassword);
      })
      .then(() => {
        props.showSuccess('Password updated!');
        props.setEditMode(undefined);
      })
      .catch(error => {
        props.showError('Error: '+(error.message || error));
      });
    },
    handleEdit: props => (value) => {
      props.setEditMode(value);
    },
    handleClose: props => (event, value) => {
      props.setEditMode(undefined);
    },
    handleUpload: ({ firebase, ...props }) => (file) => {
      props.showLoading("Uploading image");
      var photoURL = "";

      firebase
      .uploadFile(`${props.auth.uid}`, file)
      .then(response => {
        //get the downloadURL
        props.showLoading("Updating profile");
        props.setEditMode(undefined);
        const storageRef = firebase.storage().ref(`${props.auth.uid}/${file.name}`);
        return storageRef.getDownloadURL()
      })
      .then(url => {
        photoURL = url;
        return firebase.updateProfile({ photoURL: url });
      })
      .then(() => {
        props.showSuccess("Saved!");
        var user = firebase.auth().currentUser;
        if (user) {
          user.updateProfile({
            photoURL: photoURL
          });
        }
      })
      .catch(err => {
        props.showError(err.message || err);
      })
    }
  })
);