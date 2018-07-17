import React from 'react';
import { Field, reduxForm } from 'redux-form';
import renderField from 'components/FormInputs/renderField';
import Datepicker from 'components/FormInputs/Datepicker';
import { submitOffSchedulePayment } from './offScheduleSubmit';
import { createNumberMask } from 'redux-form-input-masks';
import moment from 'moment';
const currencyMask = createNumberMask({
  prefix: 'Php ',
  decimalPlaces: 2,
  locale: 'en-US',
});

const amountPaid = number => {
  return isNaN(parseFloat(number)) || !isFinite(number) || number === 0 ? 'Payment amount is required' : undefined;
}

const settlementDate = date => {
  const momentDate = moment(date);
  return !momentDate.isValid() ? 'Please provide a valid date' : undefined;
}

const PayOffScheduleForm = props => {
  const { error, handleSubmit, pristine, submitting, dispatch } = props;

  return (
    <div className="content">
      <form
        className="form-horizontal"
        onSubmit={handleSubmit(submitOffSchedulePayment, dispatch)}
        >

        <div className="form-group">
          <label className="control-label col-md-3">Employee</label>
          <div className="col-md-9">
            <Field
              name="employee.full_name"
              disabled
              type="text"
              component={renderField} />
          </div>
        </div>

        <div className="form-group">
            <label className="control-label col-md-3">Date Settled</label>
            <div className="col-md-9">
            <Field
                name="settlementDate"
                type="text"
                validate={[settlementDate]}
                component={Datepicker} />
            </div>
        </div>

        <div className="form-group">
          <label className="control-label col-md-3">Amount Paid</label>
          <div className="col-md-9">
            <Field
              name="paymentAmount"
              type="text"
              validate={[amountPaid]}
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