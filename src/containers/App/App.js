import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Provider } from 'react-redux'
import { BrowserRouter, Route } from 'react-router-dom';

// Themeing/Styling
import { MuiThemeProvider } from "@material-ui/core/styles";
import { withStyles } from '@material-ui/core/styles';
import theme from 'theme'

//Components
import Topnav from 'containers/Navbar';
import Home from 'routes/Home';
import Login from 'routes/Login';
import Dashboard from 'routes/Dashboard';
import { Notifications } from 'modules/notification'
//import Globals from 'utils/globals'

//Stripe
import {StripeProvider} from 'react-stripe-elements';

const styles = theme => ({
  root: {
    width: '100%',
    height: '100%',
    zIndex: 1,
  },
  appFrame: {
    backgroundColor: 'white',
    height: '100%',
    display: 'flex',
    width: '100%',
  },
});

String.prototype.toProperCase = function(opt_lowerCaseTheRest) {
  return (opt_lowerCaseTheRest ? this.toLowerCase() : this)
    .replace(/(^|[\s\xA0])[^\s\xA0]/g, function(s){ return s.toUpperCase(); });
};

class AppContainer extends Component {
  static propTypes = {
    store: PropTypes.object.isRequired
  }

  constructor (props) {
    super(props);

    this.state = {
      stripe: null      
    }
  }  

  componentDidMount() {
    const stripeJs = document.createElement('script');
    stripeJs.src = 'https://js.stripe.com/v3/';
    stripeJs.async = true;
    stripeJs.onload = () => {
      this.setState({
        stripe: window.Stripe('pk_BDKgCh816ebYINLr8F5ACRNR04z2b'),
      });
    };
    document.body && document.body.appendChild(stripeJs);
  }  

  render() {
    const { store, classes } = this.props

    return (
    <BrowserRouter>
      <StripeProvider stripe={this.state.stripe}>       
        <Provider store={store}>
          <MuiThemeProvider theme={theme}>      
            <div className={classes.root}>
                <Route exact path="/" component={props => <Topnav changeColorOnScroll={{ height: 50, color:'white'}} color={'transparent'} fixed={true} />} />
                <main className={classes.appFrame}>
                  <Route exact path="/" component={Home}/>
                  <Route exact path="/account" component={Dashboard} />      
                  <Route exact path="/new-project" component={Dashboard} />                                                            
                  <Route path="/projects" component={Dashboard} />
                  <Route exact path="/dashboard" component={Dashboard} />                      
                  <Route exact path="/login" component={Login} />
                  <Route exact path="/signup" component={Login} />
                </main>
                <Notifications />
              </div>
          </MuiThemeProvider>
        </Provider>
      </StripeProvider>
    </BrowserRouter>
    )
  }
}

export default withStyles(styles)(AppContainer);