import React from 'react';
import { Field, Form, reduxForm } from 'redux-form';
import renderField from 'components/FormInputs/renderField';
import Datepicker from 'components/FormInputs/Datepicker';
import submit from './orderSubmit';
import moment from 'moment'

const address = text => {
    return !text || text.trim() === '' ? 'Please provide an address' : undefined;
}

const deliveryDate = date => {
    const momentDate = moment(date);
    return !momentDate.isValid() ? 'Please provide a valid date' : undefined;
}

const receiptUrl = url => {
    return url && url.toLowerCase().match(/\.(jpeg|jpg|gif|png)$/) === null ? 'Please provide a valid image URL' : undefined;
}

const UpdateOrderForm = props => {
  const { error, handleSubmit, pristine, submitting, dispatch } = props;
  return (
    <div className="content">
        <div className="row">
            <Form
                className="form-horizontal"
                onSubmit={handleSubmit(submit, dispatch)}
                >

                <div className="form-group">
                    <label className="control-label col-md-3">Delivery Date</label>
                    <div className="col-md-9">
                    <Field
                        name="deliveryDate"
                        type="text"
                        validate={[deliveryDate]}
                        component={Datepicker} />
                    </div>
                </div>

                <div className="form-group">
                    <label className="control-label col-md-3">Delivery address</label>
                    <div className="col-md-9">
                    <Field
                        name="deliveryAddress"
                        type="textarea"
                        validate={[address]}
                        component={renderField} />
                    </div>
                </div>

                <div className="form-group">
                    <label className="control-label col-md-3">Receipt URL</label>
                    <div className="col-md-9">
                        <Field
                        name="receipt"
                        type="text"
                        validate={[receiptUrl]}
                        placeholder="https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png"
                        component={renderField} />
                    </div>
                    <label className="control-label text-success col-md-3">optional</label>
                </div>

                <div className="form-group">
                    <label className="control-label col-md-3">Notes</label>
                    <div className="col-md-9">
                    <Field
                        name="notes"
                        type="textarea"
                        component={renderField} />
                    </div>
                </div>

                <div className="form-group">
                    <div className="col-md-9">
                    {error && <strong>{error}</strong>}
                    </div>
                </div>

                <button type="submit" className="btn btn-info" disabled={pristine || submitting}>Submit</button>
            </Form>
        </div>
    </div>
  );
}

export default reduxForm({
    form: 'UPDATE_ORDER',
})(UpdateOrderForm);