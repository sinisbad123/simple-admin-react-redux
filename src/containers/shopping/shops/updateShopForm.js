import React from 'react';
import { Field, FieldArray, reduxForm } from 'redux-form';
import renderField from 'components/FormInputs/renderField';
import { updateShopSubmit } from './shopSubmit';

const shopName = name => {
  return !name || name.trim() === '' ? 'Shop name is required' : undefined;
}

const city = text => {
  return !text || text.trim() === '' ? 'City is required' : undefined;
}

const address = text => {
  return !text || text.trim() === '' ? 'Address is required' : undefined;
}

const phoneNumber = text => {
  return !text || text.trim() === '' ? 'Phone number is required' : undefined;
}

const pointOfContact = text => {
  return !text || text.trim() === '' ? 'Point of contact is required' : undefined;
}

const UpdateBrandForm = props => {
  const { error, handleSubmit, pristine, submitting, dispatch } = props;
  return (
    <div className="content">
      <form
        className="form-horizontal"
        onSubmit={handleSubmit(updateShopSubmit, dispatch)}
        >

        <div className="form-group">
          <label className="control-label col-md-3">Shop Name</label>
          <div className="col-md-9">
            <Field
              name="name"
              type="text"
              validate={[shopName]}
              placeholder="Shop name"
              component={renderField} />
          </div>
        </div>

        <div className="form-group">
          <label className="control-label col-md-3">City</label>
          <div className="col-md-9">
            <Field
              name="city"
              type="text"
              validate={[city]}
              placeholder="Manila, Quezon City, Caloocan City, Pasig etc."
              component={renderField} />
          </div>
        </div>

        <div className="form-group">
          <label className="control-label col-md-3">Address</label>
          <div className="col-md-9">
            <Field
              name="address"
              type="textarea"
              validate={[address]}
              component={renderField} />
          </div>
        </div>

        <div className="form-group">
          <label className="control-label col-md-3">Phone Number</label>
          <div className="col-md-9">
            <Field
              name="tel"
              type="number"
              validate={[phoneNumber]}
              component={renderField} />
          </div>
        </div>

        <div className="form-group">
          <label className="control-label col-md-3">Point of Contact</label>
          <div className="col-md-9">
            <Field
              name="poc"
              type="text"
              validate={[pointOfContact]}
              component={renderField} />
          </div>
        </div>

        <div className="form-group">
          <label className="control-label col-md-3">Memo/s</label>
          <div className="col-md-9">
            <FieldArray name="memo" component={renderMemoItems} />
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

const renderMemoItems = ({fields, meta: {error, submitFailed}}) => {
  return (
    <div>
      <button
        type="button"
        className="btn btn-default"
        onClick={() => fields.push(null)}>
        Add Memo
      </button>
      {fields.map((text, idx) => (
        <div key={idx} className="row">
          <div className="col-md-10">
            <Field
              name={`${text ? text : ''}`}
              type="text"
              component={renderField} />
          </div>
          <div className="col-md-2">
            <button
              type="button"
              className="btn btn-danger"
              onClick={() => fields.remove(idx)}>
              <i className="fa fa-trash"></i>
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default reduxForm({
  form: 'ADD_PRODUCT'
})(UpdateBrandForm);