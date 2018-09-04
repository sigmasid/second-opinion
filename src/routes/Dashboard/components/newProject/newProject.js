import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Button from "@material-ui/core/Button";

//styles
import { dashContainer } from "styles/mainStyle.js";

//stripe
import { Elements } from "react-stripe-elements";

//components
import FileDetails from "./files";
import ProjectDetails from "./details";
import PaymentDetails from "./payment";
import Confirmation from "./confirmation";
import Loading from "components/loading.js";

const util = require('util'); //print an object

const styles = theme => ({
  root: {
    ...dashContainer,
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper
  },
  title: {
    paddingBottom: theme.spacing.unit * 4
  },
  typography: {
    padding: theme.spacing.unit * 3
  },
  instructions: {
    marginTop: theme.spacing.unit,
    marginBottom: theme.spacing.unit,
    textAlign: "center"
  },
  step: {
    marginTop: "50px"
  }
});

const NewProject = props => {
  const { classes, ...rest } = props;

  const steps = [
    {
      title: "Add Details",
      instructions:
        "Add details about the types of positions your are applying for",        
      component: <ProjectDetails onSubmit={props.handleCreateProject} {...rest} />
    },
    {
      title: "Add Files",
      instructions:
        "Add your latest resume and any other files that you are relevant to the job(s) you are applying for",      
      component: <FileDetails onDrop={props.handleUpload} onDelete={props.handleDelete} {...rest} />
    },
    {
      title: "Add Payment",
      instructions:
        "Enter your payment details. Don't sweat it - you are backed by our 100% satisfaction guarantee",
      component: <PaymentDetails onSubmit={props.handlePayment} {...rest} />
    },
    {
      title: "Confirmation",
      instructions: "",
      component: <Confirmation status={props.confirmationStatus} projectID={props.projectID} handleBack={props.handleBack} />
    },
  ];

  return (
    <Paper className={classes.root} elevation={0}>
      <Typography variant="title" gutterBottom className={classes.title}>
        Start New Review
      </Typography>
      <Stepper activeStep={props.activeStep}>
        {Object.values(steps).map((step, index) => {
          return (
            <Step key={index}>
              <StepLabel>{step.title}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      <Paper elevation={0} className={classes.step}>
        <Typography
          variant="subheading"
          gutterBottom
          className={classes.instructions}
        >
          {steps[props.activeStep].instructions}
        </Typography>
        {(props.projectID && !props.project) ? <Loading /> : steps[props.activeStep].component}
      </Paper>
    </Paper>
  );
};

NewProject.propTypes = {
  classes: PropTypes.object
};

export default withStyles(styles)(NewProject);
