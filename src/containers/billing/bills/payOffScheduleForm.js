import React from 'react';
import { Field, reduxForm } from 'redux-form';
import renderField from 'components/FormInputs/renderField';
import Datepicker from 'components/FormInputs/Datepicker';
import { submitOffSchedulePayment } from './paymentSubmit';
import { createNumberMask } from 'redux-form-input-masks';
const currencyMask = createNumberMask({
  prefix: 'Php ',
  decimalPlaces: 2,
  locale: 'en-US',
});

const PayOffScheduleForm = props => {
  const { error, handleSubmit, pristine, submitting, dispatch } = props;

  return (
    <div className="content">
      <form
        className="form-horizontal"
        onSubmit={handleSubmit(submitOffSchedulePayment, dispatch)}
        >

        <div className="form-group">
          <label className="control-label col-md-3">Employee I.D.</label>
          <div className="col-md-9">
            <Field
              name="employeeId"
              type="number"
              placeholder="Employee ID"
              component={renderField} />
          </div>
        </div>

        <div className="form-group">
            <label className="control-label col-md-3">Date Settled</label>
            <div className="col-md-9">
            <Field
                name="settlementDate"
                type="text"
                component={Datepicker} />
            </div>
        </div>

        <div className="form-group">
          <label className="control-label col-md-3">Amount Paid</label>
          <div className="col-md-9">
            <Field
              name="paymentAmount"
              type="text"
              {...currencyMask}
              component={renderField} />
          </div>
        </div>

        <div className="form-group">
          <label className="control-label col-md-3">Paid in full?</label>
          <div className="col-md-9">
            <Field
              name="fullPayment"
              type="checkbox"
              component={renderField} />
          </div>
        </div>



        <div className="form-group">
          <div className="col-md-9">
            {error && <strong>{error}</strong>}
          </div>
        </div>

        <button type="submit" className="btn btn-success" disabled={pristine || submitting}>Submit</button>
      </form>
    </div>
  );
}

export default reduxForm({
  form: 'ADD_PRODUCT'
})(PayOffScheduleForm);