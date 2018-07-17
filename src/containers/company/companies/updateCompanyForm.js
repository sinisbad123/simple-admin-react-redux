import React from 'react';
import { Field, reduxForm } from 'redux-form';
import renderField from 'components/FormInputs/renderField';
import RenderSelect from '../../../components/FormInputs/Select';
import { updateCompanySubmit } from './companySubmit';

const UpdateCompanyForm = props => {
  const { error, handleSubmit, pristine, submitting, dispatch } = props;

  return (
    <div className="content">
      <form
        className="form-horizontal"
        onSubmit={handleSubmit(updateCompanySubmit, dispatch)}
        >

        <div className="form-group">
          <label className="control-label col-md-3">Company Name</label>
          <div className="col-md-9">
            <Field
              name="name"
              type="text"
              placeholder="Company name"
              component={renderField} />
          </div>
        </div>

        <div className="form-group">
          <label className="control-label col-md-3">Short Name</label>
          <div className="col-md-9">
            <Field
              name="short_name"
              type="text"
              placeholder="Short name"
              component={renderField} />
          </div>
        </div>

        <div className="form-group">
          <label className="control-label col-md-3">Company Type:</label>
          <div className="col-md-9">
          <Field name="company_type" component={RenderSelect}>
            <option value="" selected>--Choose--</option>
            <option name="CORPORATION" value="CORPORATION">Corporation</option>
            <option name="SOLO_PROPRIETORSHIP" value="SOLO_PROPRIETORSHIP">Sole Proprietorship</option>
            <option name="PARTNERSHIP" value="PARTNERSHIP">Partnership</option>
          </Field>
          </div>
        </div>

        <div className="form-group">
          <label className="control-label col-md-3">Contact Number</label>
          <div className="col-md-9">
            <Field
              name="contact_number"
              type="text"
              component={renderField} />
          </div>
        </div>

        <div className="form-group">
          <label className="control-label col-md-3">Address</label>
          <div className="col-md-9">
            <Field
              name="address"
              type="textarea"
              component={renderField} />
          </div>
        </div>

        <div className="form-group">
          <label className="control-label col-md-3">Logo URL</label>
          <div className="col-md-9">
            <Field
              name="logo_url"
              type="text"
              placeholder="https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png"
              component={renderField} />
          </div>
          <label className="control-label text-success col-md-3">optional</label>
        </div>

        <div className="form-group">
          <label className="control-label col-md-3">Number of employees</label>
          <div className="col-md-9">
            <Field
              name="number_of_employees"
              type="number"
              min="1"
              component={renderField} />
          </div>
        </div>

        <div className="form-group">
          <label className="control-label col-md-3">Mobile Number</label>
          <div className="col-md-9">
            <Field
              name="mobile_phone_number"
              type="number"
              component={renderField} />
          </div>
          <label className="control-label text-success col-md-3">optional</label>
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
})(UpdateCompanyForm);