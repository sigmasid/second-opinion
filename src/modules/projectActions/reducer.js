import { UPLOAD_FILES, DELETE_FILE, DOWNLOAD_FILE, ADD_MESSAGE } from './actionTypes'

const projectActions = (state = {}, action) => {
  switch (action.type) {
    case UPLOAD_FILES:
      return action.payload
    case DELETE_FILE:
      return action.payload
    case DOWNLOAD_FILE:
      return action.payload
    case ADD_MESSAGE:
      return action.payload
    default:
      return state
  }
}

export default projectActions