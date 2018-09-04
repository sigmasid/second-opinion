import {
  UPLOAD_FILES,
  DELETE_FILE,
  ADD_MESSAGE,
  DOWNLOAD_FILE,
} from "./actionTypes";

import axios from 'axios';

const util = require("util"); //print an object

/**
 * @description Upload file(s) and then update firestore and show notification and add message to project
 * the notification will be auto dismissed after the given period.
 * @param {Object} payload.files - Object containing all the files
 * @param {Object} payload.projectID - Project to save files to
 */
export const uploadFiles = (props, payload) => {
  var files = payload.files;
  var projectID = payload.projectID;

  files.forEach(file => {
    var metadata = {};
    props.showLoading("Uploading file: " + file.name);
    props.firebase
      .uploadFile(`${projectID}`, file)
      .then(response => {
        const {
          uploadTaskSnapshot: {
            metadata: {
              bucket,
              generation,
              name,
              size,
              timeCreated,
              updated,
              fullPath,
              contentType
            }
          }
        } = response;
        metadata = {
          bucket,
          generation,
          name,
          size,
          timeCreated,
          updated,
          fullPath,
          contentType
        };
        metadata["createdBy"] = props.auth.uid;
        return props.firestore.add(
          {
            collection: "projects",
            doc: `${projectID}`,
            subcollections: [{ collection: "files" }]
          },
          metadata
        );
      })
      .then(res => {
        //add message to stream and show success
        var message = {};
        message["message"] = "New file added to project!";
        message["files"] = metadata;

        return addMessage(
          props,
          Object.assign({ message }, payload)
        );
      })
      .then(res => {
        props.showSuccess("File uploaded!");
      })
      .catch(err => {
        props.showError("Upload failed:", err.message || err);
      });
  });
};

/**
 * @description Dismiss a notification by the given id.
 * @param {Number} id - notification id
 */
export const addMessage = (props, payload) => {
  var messageObj = {};
  messageObj["timestamp"] = props.firebase.database.ServerValue.TIMESTAMP;
  messageObj["body"] = payload.message.message;
  messageObj["projectID"] = payload.projectID;
  messageObj["senderID"] = props.auth.uid;

  if (payload.message.files) {
    messageObj["files"] = payload.message.files;
  }

  return props.firebase.push(
    `projectMessages/${payload.projectID}`,
    messageObj
  );
};

/**
 * @description Dismiss a notification by the given id.
 * @param {Number} id - notification id
 */
export const deleteFile = (props, payload) => {
  var projectID = payload.projectID;
  var file = payload.file;
  props.showLoading('Deleting file!');
  props.firebase
    .deleteFile(`${projectID}/${file.name}`)
    .then(() => {
      return props.firestore.get({
        collection: "projects",
        doc: `${projectID}`,
        subcollections: [
          { collection: "files", where: ["fullPath", "==", file.fullPath] }
        ]
      });
    })
    .then(snapshot => {
      snapshot.forEach(function(doc) {
        return props.firestore.delete({
          collection: "projects",
          doc: `${projectID}`,
          subcollections: [{ collection: "files", doc: `${doc.id}` }]
        });
      });
    })
    .then(() => {
      props.showSuccess("File deleted!");
    })
    .catch(err => {
      props.showError("Error: "+(err || err.message));
    });
};

/**
 * @description Dismiss a notification by the given id.
 * @param {Number} id - notification id
 */
export const downloadFile = (props, payload) => {
  var projectID = payload.projectID;
  var file = payload.file;

  props.showLoading('Downloading files...');      
  const storageRef = props.firebase.storage().ref(`${projectID}/${file.name}`);

    storageRef.getDownloadURL()
    .then(url => {
      return axios({
        url: url,
        method: 'GET',
        responseType: 'blob', // important
      })
    })
    .then(response => {
      //returns a blob
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');

      link.href = url;
      link.setAttribute('download', file.name);
      document.body.appendChild(link);
      link.click();
    }) 
    .catch(error => {
      switch (error.code) {
      case 'storage/object-not-found':
        props.showError('Uh oh! File not found!');
        break;
      case 'storage/unauthorized':
        props.showError('Uh oh! You are not authorized to view this file');
        break;
      case 'storage/canceled':
        props.showError('Request canceled');
        break;
      default:
        props.showError('Sorry there was an error');
        break;
      }
    });
}
