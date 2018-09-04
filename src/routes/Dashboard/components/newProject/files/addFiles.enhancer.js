import { connect } from 'react-redux'
import PropTypes from 'prop-types';
import { firestoreConnect } from 'react-redux-firebase'
import { withRouter } from 'react-router-dom'
import { withHandlers } from 'recompose'
import {reset} from 'redux-form';
import { withNotifications } from 'modules/notification'
import { spinnerWhileLoading } from 'utils/components';

import {
  compose,
  withState,
  pure
} from 'recompose'

export default compose(
  withNotifications,
  withState('dropzoneRef', 'setDropzoneRef', null),
  withHandlers({
    onDragEnter: props => () => {
      props.showInfo('Drop files to add to project!');
    },
    onDropRejected: props => () => {
      props.showError('Invalid Format! Word or pdf files only');
    }
	})  
);