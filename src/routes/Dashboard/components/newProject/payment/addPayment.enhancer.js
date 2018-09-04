import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { reset } from "redux-form";
import { withNotifications } from "modules/notification";
import { spinnerWhileLoading } from "utils/components";
import { injectStripe } from "react-stripe-elements";
import { withToggle } from "modules/toggle";
import { firestoreConnect, isEmpty } from "react-redux-firebase";
import { reduxForm } from 'redux-form'

import { compose, withState, withHandlers } from "recompose";

const util = require("util"); //print an object

export default compose(
	//injectStripe,
	withState("selectedCard", "setSelectedCard", undefined),
	withToggle,
	reduxForm({
  	form: 'ADD_PAYMENT',
  	asyncBlurFields: []
	}),
	firestoreConnect(props => {
		return [
			{
				collection: "users",
				doc: props.auth.uid,
				subcollections: [{ collection: "cards" }],
				storeAs: 'paymentCards'
			}
		];
	}),
  connect(({ firestore: { data }}, props ) => {
		return {
			cards: data.paymentCards,
			defaultCard: data.paymentCards && data.paymentCards[Object.keys(data.paymentCards)[0]]
		};
	}),
	withHandlers({
		handleSelectCard: ({ setSelectedCard, cards, ...props }) => cardID => {
			setSelectedCard(cards[cardID]);
			props.change('selectedCard',cardID); //sets the value for the redux form field without actually having a field
			props.showSuccess("Updated card!");
			props.handleToggle();
		}
	}),
	spinnerWhileLoading(["cards", "defaultCard"])
);
