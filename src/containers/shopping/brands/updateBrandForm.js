import React from 'react';
import { Field, reduxForm } from 'redux-form';
import renderField from 'components/FormInputs/renderField';
import { updateBrandSubmit } from './brandSubmit';

const brandName = name => {
  return !name || name.trim() === '' ? 'Brand name is required' : undefined;
}

const UpdateBrandForm = props => {
  const { error, handleSubmit, pristine, submitting, dispatch } = props;
  return (
    <div className="content">
      <form
        className="form-horizontal"
        onSubmit={handleSubmit(updateBrandSubmit, dispatch)}
        >

        <div className="form-group">
          <label className="control-label col-md-3">Brand Name</label>
          <div className="col-md-9">
            <Field
              name="name"
              type="text"
              validate={[brandName]}
              placeholder="Brand name"
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
})(UpdateBrandForm);