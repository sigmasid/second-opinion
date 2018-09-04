import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Landing from './components/landing.js';
import Pricing from './components/pricing.js';

import { withStyles } from '@material-ui/core/styles';

const styles = (theme) => ({
  root: {
    width: '100%',
    margin: '0 auto',
    marginTop: -100,
    [theme.breakpoints.down('md')]: {
      maxWidth: '100%',
      marginTop: 0
    }
  },
});

class Home extends React.Component {
  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
      	<Landing />
      	<Pricing />
      </div>
    );
  }
}

Home.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Home);