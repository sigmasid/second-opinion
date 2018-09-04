import React from "react";
import classNames from 'classnames';

// @material-ui/icons
import withStyles from "@material-ui/core/styles/withStyles";
import Divider from '@material-ui/core/Divider';

//router

const styles = (theme) => ({
  divider: {
    width: '100%',
    display: 'flex',
    paddingTop: 10,
    paddingBottom: 10,
    justifyContent: 'space-around',
    overflow: 'hidden',
    alignItems: 'center'
  },
  dividerOr: {
    margin: '0px 10px',
    fontSize: '0.8rem'
  },
  dividerLine: {
    flexGrow: 1
  },
  paddingBottom: {
    paddingBottom: 40
  },
  paddingTop: {
    paddingTop: 40
  }  
});

function getClass(classes, paddingTop, paddingBottom) {
  if (paddingBottom && paddingTop) {
    return classNames(classes.divider, classes.paddingBottom, classes.paddingTop);
  } else if (paddingTop) {
    return classNames(classes.divider, classes.paddingTop);
  } else if (paddingBottom) {
    return classNames(classes.divider, classes.paddingBottom);
  } else {
    return classNames(classes.divider)
  }
}

const DividerSection = (props) => {
  const {classes, paddingBottom, paddingTop, text} = props;

  return (
    <div className={getClass(classes, paddingTop, paddingBottom )}>
      <Divider classes={{root: classes.dividerLine}} />
        <span className={classes.dividerOr}>{text}</span>
      <Divider classes={{root: classes.dividerLine}} />
    </div>
  );
}

DividerSection.defaultProps = {
  text: 'or'
};

export default withStyles(styles)(DividerSection);