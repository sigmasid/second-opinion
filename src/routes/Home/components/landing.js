import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import backgroundImage from 'static/background.jpg';

// @material-ui/icons

// core components
import Grid from '@material-ui/core/Grid';
import Button from "@material-ui/core/Button";

const styles = {
  root: {
    width: '100%',
    backgroundImage: `url(${backgroundImage})`,
    backgroundPosition: 'right top',
    backgroundSize: 'contain',
    background: '#e3eefc',
    backgroundRepeat: 'no-repeat',
    minHeight: 800,
    display: 'flex'
  },
  grid: {
    alignSelf: 'center',
    textAlign: 'left',
    color: 'black'
  },
  title: {
    color: 'black'
  },
  button: {
    marginTop: 75
  }
};

class LandingPage extends React.Component {
  render() {
    const { classes } = this.props;
    return (
    <Card className={classes.root}>
      <Grid container spacing={24} className={classes.grid}>
        <Grid item sm={2}></Grid>
        <Grid item xs={12} sm={12} md={4}>
          <Typography variant="display2" gutterBottom>Get Professional Help</Typography>
          <Typography variant="body1" gutterBottom>Affordable college application and essay support from handpicked ivy league graduates and admissions counselors</Typography>
          <Button variant="outlined" className={classes.button}>Get Started</Button>
        </Grid>
      </Grid>
    </Card>
    );
  }
}

export default withStyles(styles)(LandingPage);
