import { SubmissionError, reset } from 'redux-form';
import { settleOffScheduledPayment } from '../../../actions/billing/bills';
import * as humanize from 'humanize';

const isValidNumber = number => {
    return !isNaN(parseFloat(number)) && isFinite(number);
}

export function submitOffSchedulePayment(values, dispatch) {
    if (!values.employee) {
        throw new SubmissionError({
            payload: values.employee,
            _error: 'Please select an employee'
        })
    }
    
    if (!values.settlementDate || values.settlementDate.trim() === '') {
        throw new SubmissionError({
            payload: values.settlementDate,
            _error: 'Please specify a settlement date.'
        })
    }

    if (!isValidNumber(values.paymentAmount)) {
        throw new SubmissionError({
            payload: values.paymentAmount,
            _error: 'Payment amount is required.'
        })
    }

    const payment = {...values};
    payment.fullPayment = values.fullPayment ? values.fullPayment : false;
    payment.settlementDate = humanize.date('Y-m-d', new Date(payment.settlementDate))

    dispatch(settleOffScheduledPayment(payment.employee.id, payment.settlementDate, payment.paymentAmount, payment.fullPayment));
    reset();

    return;
}