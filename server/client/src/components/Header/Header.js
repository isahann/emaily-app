import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import Payments from '../Payments/Payments';

class Header extends Component {
  renderContent() {
    switch (this.props.auth) {
      case null:
        return 'Loading...';
      case false:
        return (
          <li>
            <a href="/auth/google">Login with Google</a>
          </li>
        );
      default:
        return [
          <li key="payments">
            <Payments />
          </li>,

          <li key="credits">
            <span style={{ margin: '0 10px' }}>
              You have<strong> {this.props.auth.credits} </strong>
              credits.
            </span>
          </li>,
          <li key="logout">
            <a href="/api/logout">Logout</a>
          </li>
        ];
    }
  }

  render() {
    return (
      <nav>
        <div className="nav-wrapper">
          <Link
            to={this.props.auth ? '/surveys' : '/'}
            className="left brand-logo"
          >
            Emaily
          </Link>
          <ul className="right">{this.renderContent()}</ul>
        </div>
      </nav>
    );
  }
}

function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(mapStateToProps)(Header);
