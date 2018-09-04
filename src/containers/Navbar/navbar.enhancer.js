import { connect } from 'react-redux'
import {
  withHandlers,
  compose,
  withProps,
  flattenProp,
  withStateHandlers,
  lifecycle
} from 'recompose'
import { withFirebase, isEmpty, isLoaded } from 'react-redux-firebase'
import { ACCOUNT_PATH, DASHBOARD_PATH } from 'constants'
import { spinnerWhileLoading } from 'utils/components'
import { withRouter } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles';

const util = require('util') //print an object
const styles = (theme) => ({
  appBar: {
    display: "flex",
    border: "0",
    width: "100%",
    background: "none",
    transition: "all 150ms ease 0s",    
    position: "fixed",
    zIndex: "1100"
  },
   white: {
    border: "0",
    padding: "0.625rem 0",
    marginBottom: "20px",
    color: "#555",
    backgroundColor: "#fff !important",
    boxShadow:
      "0 4px 18px 0px rgba(0, 0, 0, 0.12), 0 7px 10px -5px rgba(0, 0, 0, 0.15)"
  }, 
  buttonRoot: {

  },
  transparent: {
    backgroundColor: "transparent !important",
    boxShadow: "none",
    color: "#FFFFFF"
  },  
  toolbar: {
    flex: 1,
    display: "flex",
    flexWrap: "nowrap"
  },
  flex: {
    flexGrow: 1
  }
})


export default compose(
  connect(({ firebase: { auth, profile } }) => ({
    auth,
    profile
  })),
  withStyles(styles),
  // Wait for auth to be loaded before going further
  withStateHandlers(
    ({ accountMenuOpenInitially = false }) => ({
      accountMenuOpen: accountMenuOpenInitially,
      anchorEl: null
    }),
    {
      closeAccountMenu: ({ accountMenuOpen }) => () => ({
        anchorEl: null
      }),
      handleMenu: () => event => ({
        anchorEl: event.target
      })
    }
  ),
  // Add props.router (used in handlers)
  withRouter,
  // Add props.firebase (used in handlers)
  withFirebase,
  // Handlers
  withHandlers({
    headerColorChange: props => () => {    
      const { classes, color, changeColorOnScroll } = props;
      const windowsScrollTop = window.pageYOffset;
      if (windowsScrollTop > changeColorOnScroll.height) {
        document.body
          .getElementsByTagName("header")[0]
          .classList.remove(classes[color]);
        document.body
          .getElementsByTagName("header")[0]
          .classList.add(classes[changeColorOnScroll.color]);
      } else {
        document.body
          .getElementsByTagName("header")[0]
          .classList.add(classes[color]);
        document.body
          .getElementsByTagName("header")[0]
          .classList.remove(classes[changeColorOnScroll.color]);
      }
    },
    handleLogout: props => () => {
      props.firebase.logout()
      props.history.push('/')
      props.closeAccountMenu()
    },
    goToDashboard: props => () => {
      props.router.history.push(DASHBOARD_PATH)
      props.closeAccountMenu()
    },    
    goToAccount: props => () => {
      props.router.history.push(ACCOUNT_PATH)
      props.closeAccountMenu()
    }
  }),
  withProps(({ auth, profile }) => ({
    authExists: isLoaded(auth) && !isEmpty(auth)
  })),
  lifecycle({
    //listener for changing transparent
    componentDidMount() {
      window.addEventListener("scroll", this.props.headerColorChange);
    }
  }),
  // Flatten profile so that avatarUrl and displayName are available
  flattenProp('profile')
)