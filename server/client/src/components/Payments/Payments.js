import React, { Component } from 'react';
import StripeCheckout from 'react-stripe-checkout';
import {connect} from 'react-redux';
import * as actions from '../../actions';

class Payments extends Component {
  render() {
    return (
      // TOKEN expects one callback function after payment is processed by stripe
      <StripeCheckout
        name="Emaily"
        description="$5 for five e-mail credits"
        amount={500}
        token={token => this.props.handleToken(token)}
        stripeKey={process.env.REACT_APP_STRIPE_KEY}
      >
        <button className="btn">ADD CREDITS</button>
      </StripeCheckout>
    );
  }
}

export default connect(null, actions)(Payments);