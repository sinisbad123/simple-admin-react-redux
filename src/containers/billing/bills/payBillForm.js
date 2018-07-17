import React from 'react';
import { Field, reduxForm } from 'redux-form';
import renderField from 'components/FormInputs/renderField';
import Datepicker from 'components/FormInputs/Datepicker';
import { submitPayment } from './paymentSubmit';
import { createNumberMask } from 'redux-form-input-masks';
const currencyMask = createNumberMask({
  prefix: 'Php ',
  decimalPlaces: 2,
  locale: 'en-US',
});

const UpdateBrandForm = props => {
  const { error, handleSubmit, pristine, submitting, dispatch } = props;

  return (
    <div className="content">
      <form
        className="form-horizontal"
        onSubmit={handleSubmit(submitPayment, dispatch)}
        >

        <div className="form-group">
          <label className="control-label col-md-3">Total bill</label>
          <div className="col-md-9">
            <Field
              name="total_balance"
              type="text"
              {...currencyMask}
              disabled
              component={renderField} />
          </div>
        </div>

        <div className="form-group">
          <label className="control-label col-md-3">Balance to pay</label>
          <div className="col-md-9">
            <Field
              name="amount_to_pay"
              type="text"
              {...currencyMask}
              component={renderField} />
          </div>
        </div>

        <div className="form-group">
            <label className="control-label col-md-3">Payment Date</label>
            <div className="col-md-9">
            <Field
                name="payment_date"
                type="text"
                component={Datepicker} />
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