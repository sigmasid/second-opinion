import { compose } from 'redux'
import { connect } from 'react-redux'
import { withHandlers, withState, pure, lifecycle } from 'recompose'
import { withFirestore, firestoreConnect } from 'react-redux-firebase'
import { withNotifications } from 'modules/notification'
import { withProjectActions } from 'modules/projectActions'
import { injectStripe } from "react-stripe-elements";
import { spinnerWhileLoading } from 'utils/components'

const util = require('util'); //print an object

const createChargeObj = (source, amount, currency, customerID, stripeID, created, newCard) =>  {
  var chargeObj = {amount, currency, source, customerID, stripeID, created};
  chargeObj.paid = false;
  
  if (newCard) {
    chargeObj.newCard = true;
  }

  return chargeObj;
}

const getProjectObj = (props, details) => {
  var projectObj = {};
  var detailsObj = {}
  var needsUpdate = false;

  if (!props.projectID) {
    needsUpdate = true;    

    projectObj.created=props.firestore.FieldValue.serverTimestamp(); 
    projectObj.status = 'draft';

  } else if (props.project && ((details.company && details.company !== props.project.details.company) 
                              || (details.position && details.position !== props.project.details.position) 
                              || (details.additional && details.additional !== props.project.details.additional))) {
    needsUpdate = true;
  }

  if (needsUpdate) {
    detailsObj.company = details.company || (props.project && props.project.details.company) || null;
    detailsObj.position = details.position || (props.project && props.project.details.position) || null;
    detailsObj.additional = details.additional || (props.project && props.project.details.additional) || null;
    projectObj.details = detailsObj;
  }

  return needsUpdate ? projectObj : undefined;
}

const createListenerObj = (projectID, orderID) => {
  if (!projectID) {
    return [];
  }

  var listenerObj = [{ collection: 'projects', doc: projectID }, 
                     { collection: 'projects', doc: projectID, subcollections: [{ collection: 'files' }], storeAs: 'projectFiles' }]

  if (orderID) {
    listenerObj.push({ collection: 'projects', doc: projectID, subcollections: [{ collection: 'billing', doc: orderID }], storeAs: 'projectBilling'});
    return listenerObj;
  } else {
    return listenerObj
  }
}

const getSource = (stripe, card) => {
  return new Promise((resolve, reject) => {
    if (card.selectedCard) {
      return resolve(card.selectedCard)
    } else {
      stripe
      .createToken()
      .then(tokenObj => {
        return resolve(tokenObj.token.id)
      })
      .catch(err => {
        return reject(err)
      })
    }
  });
}

const getConfirmationStatus = (orderID, order) => {
  var obj = {};

  obj.current = "processing";
  obj.message = "Processing request...";    

  if (!orderID) {
    obj.message = "Processing request...";
  } else if (orderID && !order) {
    obj.message = "Creating your project...";    
  } else if (orderID && order && order.paid) {
    obj.message = "Success!";
    obj.current = "success"
  } else if (orderID && order && order.error) {
    obj.message = order.error;
    obj.current = "error"       
  } else if (orderID && order && !order.paid) {
    obj.message = "Processing payment...";     
  }
  return obj;     
}

export default compose(
  withFirestore,
	withNotifications,
  withProjectActions,
  injectStripe,
  withState('activeStep', 'setActiveStep', 0),
  withState('projectID', 'setProjectID', (props) => { return props.draftID }),
  withState('orderID', 'setOrderID', undefined), 
  firestoreConnect((props) => {
    return createListenerObj(props.projectID, props.orderID);
  }),
  connect(({ firestore: { data }}, props ) => {
    return { 
      project: data.projects && data.projects[props.projectID],
      projectFiles: data.projectFiles,
      projectBilling: data.projectBilling,
      confirmationStatus: getConfirmationStatus(props.orderID, data.projectBilling)
    };
  }),
  connect(({ firebase: { profile, auth } }) => {
    return {
      profile,
      auth
    }
  }),  
  withHandlers({
    handleNext: props => () => {
      props.setActiveStep(props.activeStep + 1);    
    },
    handleBack: props => () => {      
      props.setActiveStep(props.activeStep - 1);
    }
  }),
  withHandlers({
    handleCreateProject: props => (details) => {

      var projectObj = getProjectObj(props, details);
      if (!projectObj) {
        return props.handleNext();
      }

      var projectRef = props.projectID 
                        ? props.firestore.collection('projects').doc(props.projectID) 
                        : props.firestore.collection('projects').doc();

      projectRef.set(projectObj, { merge: true })
      .then(() => {
        props.showSuccess('Project draft '+(props.projectID ? 'updated' : 'saved!'));
        props.setProjectID(projectRef.id);
        props.handleNext();
      })
      .catch(err => {
        props.showError(err.message || err);
      }); 
    },
    handlePayment: props => (data) => {
      props.showLoading('Processing request...')
      getSource(props.stripe, data)
      .then(source => {
        var invoice = createChargeObj(source, 75, 'usd', props.auth.uid, props.profile.stripeID, props.firestore.FieldValue.serverTimestamp(), !data.selectedCard && true);
        var projectRef = props.firestore.collection(`projects/${props.projectID}/billing`)
        return props.orderID 
                ? projectRef.doc(props.orderID).update({source: invoice.source, error: props.firebase.firestore.FieldValue.delete()}) 
                : projectRef.add(invoice)
      })
      .then((ref) => {
        props.handleNext();
        ref && props.setOrderID(ref.id)
      })
      .catch(err => {
        console.log("error is "+util.inspect(err));
        props.showError(err.message || err)
      })

      //push order to functions, functions creates new order and adds to customer orders, in projects changes status to 'in progress'
    },
    handleUpload: props => (files) => {
      props.uploadFiles({projectID: props.projectID, files});
    },
    handleDelete: props => (file) => {
      props.deleteFile({projectID: props.projectID, file});
    }
  }),
  pure
);