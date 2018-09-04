import { compose } from "redux";
import { connect } from "react-redux";
import { withHandlers } from "recompose";
import { injectStripe } from "react-stripe-elements";
import { withToggle } from "modules/toggle";
import { withFirestore, firestoreConnect, isEmpty } from "react-redux-firebase";
import { withNotifications } from "modules/notification";

const util = require("util"); //print an object

export default compose(
	injectStripe,
	withToggle,
	withFirestore,
	withNotifications,
	connect(({ firebase: { auth, profile } }) => ({ auth, profile })),
	withHandlers({
		handleSubmit: props => event => {
			event.preventDefault();
			const displayError = document.getElementById("card-errors");

			//check if the form has the correct values
			if (props.stripe) {
				props.stripe
					.createToken()
					.then(tokenObj => {
						props.handleToggle();
						//take token ID and push it to firestore ('users/{userId}/sources/{pushId}/token')
						const docRefConfig = {
							collection: "users",
							doc: `${props.auth.uid}`,
							subcollections: [
								{
									collection: "sources",
									doc: `${tokenObj.token.id}`
								}
							]
						};
						return props.firestore.set(
							docRefConfig,
							tokenObj.token
						);
						//set listener for the doc and wait to see response - if response close and refresh else error
					})
					.then(card => {
						props.showSuccess(`Added card!`);
					})
					.catch(err => {
						props.showError(err.message || err);
					});
			} else {
				props.showError("Sorry there was an error!");
			}
		}
	})
);
