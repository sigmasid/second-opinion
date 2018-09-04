import { connect } from 'react-redux'
import PropTypes from 'prop-types';
import { withHandlers, withState } from 'recompose'
import { withNotifications } from 'modules/notification'
const util = require('util'); //print an object

import {
  compose,
  pure
} from 'recompose'

export default compose(
  withNotifications,
  withState('profilePic', 'setProfilePic', undefined),
  withState('profilePicFile', 'setProfilePicFile', undefined),  
  withHandlers({
    onDrop: props => (file) => {
      const reader = new FileReader();
      reader.readAsDataURL(file[0]);

      reader.onload = () => {
        const fileResult = reader.result;
        props.setProfilePic(fileResult);
        props.setProfilePicFile(file[0]);        
      };
      reader.onabort = () => props.showError('Error reading file');
      reader.onerror = () => props.showError('Error reading file');
    },
    onDragEnter: props => () => {
      props.showInfo('Drop image files to change profile pic');
    },
    onDropRejected: props => () => {
      props.showError('Invalid Format! Image files only');
    }
	})  
);