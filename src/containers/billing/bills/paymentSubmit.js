import { SubmissionError, reset } from 'redux-form';
import { makeBillPayment, settleOffScheduledPayment } from '../../../actions/billing/bills';
import * as humanize from 'humanize';

const isValidNumber = number => {
    return !isNaN(parseFloat(number)) && isFinite(number);
}

export function submitPayment(values, dispatch) {
    if (!isValidNumber(values.amount_to_pay)) {
        throw new SubmissionError({
            payload: values.amount_to_pay,
            _error: 'Please input a valid amount'
        })
    }
    
    if (values.amount_to_pay < values.total_balance) {
        throw new SubmissionError({
            payload: values.amount_to_pay,
            _error: 'Payment must be settled in one go.'
        })
    }

    const paymentBody = values;
    paymentBody.total_balance = values.amount_to_pay;

    dispatch(makeBillPayment(paymentBody));
    reset();
    return;
}

export function submitOffSchedulePayment(values, dispatch) {
    if (!isValidNumber(values.employeeId)) {
        throw new SubmissionError({
            payload: values.employeeId,
            _error: 'Employee number is required.'
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

    dispatch(settleOffScheduledPayment(payment.employeeId, payment.settlementDate, payment.paymentAmount, payment.fullPayment));
    reset();
    return;
}