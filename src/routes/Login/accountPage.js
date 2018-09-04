import React from "react";

// @material-ui/icons
import withStyles from "@material-ui/core/styles/withStyles";

//components
import Login from "./components/login";
import Signup from "./components/signup";

//styles
import { containerFluid, container } from "styles/mainStyle.js";

const styles = (theme) => ({
  root: {
    ...containerFluid,
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    minHeight: 'calc(100vh - 120px)'
  },
  content: {
    ...container
  },
  card: {
    marginTop: 50,
    padding: 50
  },
  cardHeader: {
    fontSize: '1rem'
  },
});

const AccountPage = (props) => {
  var { classes, toggle:loginToggle, handleToggle:handleLoginToggle, ...rest } = props;
  return (
    <div className={classes.root}>
      { loginToggle 
        ? <Login handleLoginToggle={handleLoginToggle} {...rest} /> 
        : <Signup handleLoginToggle={handleLoginToggle} {...rest} />
      }
    </div>
  );
}

export default withStyles(styles)(AccountPage);
