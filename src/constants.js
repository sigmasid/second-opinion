export const LIST_PATH = '/projects'
export const DETAIL_PATH = '/projects/:projectID'
export const ACCOUNT_PATH = '/account'
export const LOGIN_PATH = '/login'
export const SIGNUP_PATH = '/signup'
export const DASHBOARD_PATH = '/projects'

export const ACCOUNT_FORM_NAME = 'account'
export const LOGIN_FORM_NAME = 'login'
export const SIGNUP_FORM_NAME = 'signup'
export const PHONE_FORM_NAME = 'phone'
export const NEW_PROJECT_FORM_NAME = 'newProject'
export const RECOVER_CODE_FORM_NAME = 'recoverCode'
export const RECOVER_EMAIL_FORM_NAME = 'recoverEmail'

export const formNames = {
  account: ACCOUNT_FORM_NAME,
  signup: SIGNUP_FORM_NAME,
  login: LOGIN_FORM_NAME,
  phone: PHONE_FORM_NAME,
  recoverCode: RECOVER_CODE_FORM_NAME,
  recoverEmail: RECOVER_EMAIL_FORM_NAME,
}

export const paths = {
  projects: LIST_PATH,
  account: ACCOUNT_PATH,
  projectDetail: DETAIL_PATH,
  login: LOGIN_PATH,
  signup: SIGNUP_PATH,
  dashboard: DASHBOARD_PATH  
}

export default { ...paths, ...formNames }