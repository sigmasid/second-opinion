import { compose } from 'redux'

//Components
import { spinnerWhileLoading } from 'utils/components'

import { connect } from 'react-redux'
import { withHandlers, withState, pure } from 'recompose'
import { withFirebase, firebaseConnect, isLoaded, isEmpty, populate } from 'react-redux-firebase'
import {reset} from 'redux-form';
import { withProjectActions } from 'modules/projectActions'

import axios from 'axios';

const util = require('util') //print an object

export default compose(
  pure
  //spinnerWhileLoading(['messages'])
);