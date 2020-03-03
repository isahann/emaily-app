import React from 'react';
import { Link } from 'react-router-dom';
import { reduxForm, Field } from 'redux-form';
import _ from 'lodash';

import SurveyField from './SurveyField';

import validateEmails from '../../utils/validators/validateEmails';

import formFields from './formFields';

// Displays a form for our user to add input
class SurveyForm extends React.Component {
  renderFields() {
    // The map function iterates through the formFields array.
    // It returns a single object from the array, but as long as we are using
    // only the label and name properties from the object, we can directly get them
    // by specifying them inside curly braces.
    return _.map(formFields, ({ name, label }) => {
      return (
        <Field
          component={SurveyField}
          type="text"
          key={name}
          name={name}
          label={label}
        />
      );
    });
  }

  render() {
    return (
      <div>
        <form onSubmit={this.props.handleSubmit(this.props.onSurveySubmit)}>
          {this.renderFields()}
          <Link to="/surveys" className="red btn-flat left white-text">
            Cancel
          </Link>
          <button type="submit" className="teal btn-flat right white-text">
            Review survey
            <i className="material-icons right">done</i>
          </button>
        </form>
      </div>
    );
  }
}

function validate(values) {
  const errors = {};

  errors.recipients = validateEmails(values.recipients || '');

  _.each(formFields, ({ name, noValueError }) => {
    if (!values[name]) {
      errors[name] = noValueError;
    }
  });

  return errors;
}

export default reduxForm({
  validate,
  form: 'surveyForm',
  destroyOnUnmount: false
})(SurveyForm);
