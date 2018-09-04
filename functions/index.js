const functions = require('firebase-functions')
const admin = require('firebase-admin')

const express = require('express')
const cors = require('cors')({ origin: true })
const app = express()
const util = require('util') //print an object

// TODO: Remember to set token using >> firebase functions:config:set stripe.token="SECRET_STRIPE_TOKEN_HERE"
const stripe = require('stripe')(functions.config().stripe.token)
const defaultCurrency = functions.config().stripe.currency || 'USD'
stripe.setApiVersion('2018-07-27')

//initialize firebase
admin.initializeApp(functions.config().firebase)
const db = admin.firestore()
const settings = { timestampsInSnapshots: true }
db.settings = settings

function createOrder(customerID) {
  return stripe.orders.create({
    currency: 'usd',
    items: [
      {
        type: 'sku',
        parent: 'sku_DNK2eTElPWDyyY'
      }
    ],
    customer: customerID,
    email: 'jenny.rosen@example.com'
  })
}


function getSource(invoice) {
  return new Promise((resolve, reject) => {
    if (invoice.newCard) {
      stripe.customers
        .createSource(invoice.stripeID, {
          source: invoice.source
        })
        .then(card => {
          return resolve(card.id)
        })
        .catch(err => {
          return reject(err)
        })
    } else {
      return resolve(invoice.source)
    }
  })
}

// Also need to monitor path for updates 
// Add a payment source (card) for a user by writing a stripe payment source token to Firestore
exports.createCharge = functions.firestore
  .document('projects/{projectID}/billing/{orderID}')
  .onCreate((snap, context) => {
    var invoice = snap.data()
    if (invoice === undefined) {
      return null
    }

    var projectID = context.params.projectID
    var orderID = context.params.orderID
    //also need this to fire on update and check if the source has changed
    return getSource(invoice)
      .then(source => {
        return stripe.charges.create({
          amount: invoice.amount,
          currency: invoice.currency || defaultCurrency,
          description: projectID,
          customer: invoice.stripeID,
          source: source
        })
      })
      .then(charge => {
        //add order to firestore, update project billing and change the project status to inprogress
        var batch = db.batch()
        var billingRef = db.doc(`/projects/${projectID}/billing/${orderID}`)
        batch.set(billingRef, { paid: true, charge: charge }, { merge: true })

        var projectRef = db.doc(`/projects/${projectID}`)
        batch.set(projectRef, { status: 'in progress' }, { merge: true })

        var userRef = db.doc(`/users/${invoice.customerID}/orders/${orderID}`)
        var orderInvoice = charge
        orderInvoice.created = admin.firestore.FieldValue.serverTimestamp()
        orderInvoice.status = "in progress"
        batch.set(userRef, orderInvoice, { merge: true })

        var userProjectRef = db.doc(
          `/users/${invoice.customerID}/projects/${projectID}`
        )
        batch.set(userProjectRef, { status: 'in progress' }, { merge: true })

        return batch.commit()
      })
      .catch(error => {
        return db
          .doc(`/projects/${projectID}/billing/${orderID}`)
          .set({ error: userFacingMessage(error) }, { merge: true })
      })
  })

function send(res, code, body) {
  res.set('Access-Control-Allow-Origin', '*')
  res.set('Access-Control-Allow-Methods', 'GET, POST')

  res.send({
    statusCode: code,
    body: JSON.stringify(body)
  })
}

// When a user is created, register them with Stripe
exports.createStripeCustomer = functions.auth.user().onCreate(user => {
  return stripe.customers
    .create({
      email: user.email
    })
    .then(customer => {
      return db
        .collection('users')
        .doc(user.uid)
        .set({ stripeID: customer.id }, { merge: true })
    })
})

// Delete a payment source (card) for a user by deleting the reference in Firestore
exports.removePaymentSource = functions.firestore
  .document('users/{userId}/cards/{cardID}')
  .onDelete((snap, context) => {
    const source = snap.data()
    if (source === undefined) {
      return null
    }

    var stripeID = ''

    return db
      .doc(`/users/${context.params.userId}`)
      .get()
      .then(doc => {
        return doc.data()
      })
      .then(customer => {
        stripeID = customer.stripeID
        return stripe.customers.deleteCard(
          customer.stripeID,
          context.params.cardID
        )
      })
      .then(confirmation => {
        return stripe.customers.retrieve(stripeID)
        //db.doc(`/users/${context.params.userId}/sources/${context.params.tokenID}`).set({response: userFacingMessage(error)});
      })
      .then(customer => {
        var batch = db.batch()
        var sources = customer.sources.data

        Object.keys(sources).map(key => {
          var card = sources[key]
          var dbRef = db.doc(`/users/${context.params.userId}/cards/${card.id}`)
          batch.set(dbRef, card)
        })
        return batch.commit()
      })
      .catch(error => {
        return db
          .doc(
            `/users/${context.params.userId}/notifications/${context.params
              .cardID}`
          )
          .set({ response: userFacingMessage(error) })
      })
    /**
      .then(() => {
        return reportError(error, {user: context.params.userId});
      }); **/
  })

// Add a payment source (card) for a user by writing a stripe payment source token to Firestore
exports.addPaymentSource = functions.firestore
  .document('users/{userId}/sources/{tokenID}')
  .onCreate((snap, context) => {
    const source = snap.data()
    if (source === undefined) {
      return null
    }

    return db
      .doc(`/users/${context.params.userId}`)
      .get()
      .then(doc => {
        return doc.data()
      })
      .then(customer => {
        return stripe.customers.createSource(customer.stripeID, {
          source: context.params.tokenID
        })
      })
      .then(card => {
        return stripe.customers.retrieve(card.customer)
      })
      .then(customer => {
        var batch = db.batch()
        var sources = customer.sources.data

        Object.keys(sources).map(key => {
          var card = sources[key]
          var dbRef = db.doc(`/users/${context.params.userId}/cards/${card.id}`)
          batch.set(dbRef, card)
        })
        return batch.commit()
      })
      .catch(error => {
        return db
          .doc(
            `/users/${context.params.userId}/notifications/${context.params
              .tokenID}`
          )
          .set({ response: userFacingMessage(error) })
      })
    /**
    .then(() => {
      return reportError(error, {user: context.params.userId});
    }); **/
  })

// To keep on top of errors, we should raise a verbose error report with Stackdriver rather
// than simply relying on console.error. This will calculate users affected + send you email
// alerts, if you've opted into receiving them.
// [START reporterror]
function reportError(err, context = {}) {
  // This is the name of the StackDriver log stream that will receive the log
  // entry. This name can be any valid log stream name, but must contain "err"
  // in order for the error to be picked up by StackDriver Error Reporting.
  const logName = 'errors'
  const log = logging.log(logName)

  // https://cloud.google.com/logging/docs/api/ref_v2beta1/rest/v2beta1/MonitoredResource
  const metadata = {
    resource: {
      type: 'cloud_function',
      labels: { function_name: process.env.FUNCTION_NAME }
    }
  }

  // https://cloud.google.com/error-reporting/reference/rest/v1beta1/ErrorEvent
  const errorEvent = {
    message: err.stack,
    serviceContext: {
      service: process.env.FUNCTION_NAME,
      resourceType: 'cloud_function'
    },
    context: context
  }

  // Write the error log entry
  return new Promise((resolve, reject) => {
    log.write(log.entry(metadata, errorEvent), error => {
      if (error) {
        return reject(error)
      }
      return resolve()
    })
  })
}
// [END reporterror]

// Sanitize the error message for the user
function userFacingMessage(error) {
  return error.type
    ? error.message
    : 'An error occurred, developers have been alerted'
}
