import React from 'react';
import { Field, reduxForm } from 'redux-form';
import renderField from 'components/FormInputs/renderField';
import { updateLoginSubmit } from './companySubmit';

const UpdateEmailForm = props => {
  const { error, handleSubmit, pristine, submitting, dispatch } = props;

  return (
    <div className="content">
      <form
        className="form-horizontal"
        onSubmit={handleSubmit(updateLoginSubmit, dispatch)}
        >

        <div className="form-group">
          <label className="control-label col-md-3">Current email</label>
          <div className="col-md-9">
            <Field
              name="email"
              disabled
              type="email"
              placeholder="sample@google.com"
              component={renderField} />
          </div>
        </div>

        <div className="form-group">
          <label className="control-label col-md-3">New email</label>
          <div className="col-md-9">
            <Field
              name="new_email"
              type="email"
              placeholder="sample@google.com"
              component={renderField} />
          </div>
        </div>

        <div className="form-group">
          <label className="control-label col-md-3">Password</label>
          <div className="col-md-9">
            <Field
              name="password"
              type="password"
              component={renderField} />
          </div>
        </div>

        <div className="form-group">
          <label className="control-label col-md-3">Verify Password</label>
          <div className="col-md-9">
            <Field
              name="passwordVerify"
              type="password"
              component={renderField} />
          </div>
        </div>

        <div className="form-group">
          <div className="col-md-9">
            {error && <strong>{error}</strong>}
          </div>
        </div>

        <button type="submit" className="btn btn-info" disabled={pristine || submitting}>Submit</button>
      </form>
    </div>
  );
}

export default reduxForm({
  form: 'ADD_PRODUCT'
})(UpdateEmailForm);