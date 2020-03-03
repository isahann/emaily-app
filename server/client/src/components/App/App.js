import React, { Component } from 'react';
// import './App.css';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../../actions';

import Header from '../Header/Header';
import Landing from '../Landing/Landing';
import Dashboard from '../Dashboard/Dashboard';
import SurveyNew from '../Surveys/SurveyNew';

class App extends Component {
  // Best place for initial ajax request
  componentDidMount() {
    this.props.fetchUser();
  }

  render() {
    return (
      <BrowserRouter>
        <div className="container">
          <Header />
          <Route exact path="/" component={Landing} />
          <Route exact path="/surveys" component={Dashboard} />
          <Route path="/surveys/new" component={SurveyNew} />
        </div>
      </BrowserRouter>
    );
  }
}

export default connect(
  null,
  actions
)(App);
