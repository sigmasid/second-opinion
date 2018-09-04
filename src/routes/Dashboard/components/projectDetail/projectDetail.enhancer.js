import { connect } from 'react-redux'
import PropTypes from 'prop-types';
import { firebaseConnect, firestoreConnect } from 'react-redux-firebase'
import { withRouter } from 'react-router-dom'
import { withHandlers, lifecycle } from 'recompose'
import {reset} from 'redux-form';
import { spinnerWhileLoading } from 'utils/components'
import { withProjectActions } from 'modules/projectActions'
import { fetchUsersIfNeeded } from 'modules/users'
import {
  compose,
  withState,
  pure
} from 'recompose'

const merge = require('lodash');
const util = require('util') //print an object

const mergeUsers = (messages, users) => {
  return messages.map(message => {
    var userSummary = {};

    var _user = users[message.value.senderID];
    userSummary['displayName'] = _user && _user.displayName;
    userSummary['photoURL'] = _user && _user.photoURL;

    var newMessage = _.merge(message.value, {sender: userSummary});
    return newMessage;
  })
  //take team obj - check userID in users obj and merge the two
}

export default compose(
  withRouter,
  withProjectActions,
  withState('projectID', null, props => props.match.params.projectID),
  withState('success', 'setSuccess', null),    
  withState('dropzoneRef', 'setDropzoneRef', null),
  withState('limitToLast', 'setLimitTo', 5),
  withState('scrollTo', 'setScrollTo', 'bottom'),    
  firestoreConnect((props) => [
  	{ collection: 'projects', doc: props.projectID } // or `todos/${props.todoId}`
 	]),
  connect(({ firestore }, props) => {
    return { 
      project: firestore.data && firestore.data.projects && firestore.data.projects[props.projectID],
      users: firestore.data && firestore.data.users
    };
  }),
  firebaseConnect((props) => {
    return [{ path: `projectMessages/${props.projectID}`, queryParams: [`limitToLast=${props.limitToLast}`, `startAt=${0}`, 'orderByChild=timestamp']}]
  }),
  connect(({ firebase: { ordered } }, props) => {
    return { 
      messages: ordered.projectMessages && ordered.projectMessages[props.projectID] && props.users && mergeUsers(ordered.projectMessages[props.projectID], props.users)
    };
  }),  
  withHandlers({
    onGetMore: props => () => {
      props.setLimitTo(props.limitToLast + 5);
      props.setScrollTo('top');
    },
    onMessageSubmit: props => (message) => {
      props.addMessage({projectID: props.projectID, message})
      .then(() => {
        props.setSuccess(true);
        props.setScrollTo('bottom');
        setTimeout(() => { props.setSuccess(undefined)}, 1000);
        return props.dispatch(reset('MESSAGE_FORM'));  // requires form name
      })
      .catch(error => {
        props.setSuccess(false); 
        props.setScrollTo('bottom');
        setTimeout(() => { props.setSuccess(undefined) }, 1000);
      })
    },
    onDownload: (props) => (file) => {
      props.downloadFile({projectID: props.projectID, file})
    },
    onDrop: props => (files) => {
      props.uploadFiles({projectID: props.projectID, files});
    }
  }), 
  lifecycle({
    componentDidUpdate(prevProps) {
      const { dispatch, project } = this.props;

      if (project && project.team && (!prevProps.project || !prevProps.project.team || (project.team !== prevProps.project.team))) {
        dispatch(fetchUsersIfNeeded(project.team))
      }
    }
  }),
  spinnerWhileLoading(['project']),
  pure
);