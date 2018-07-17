import axios from 'axios';
import { reset } from 'redux-form';
import * as humanize from 'humanize';

const billingBaseUrl = process.env.REACT_APP_BILLING_BASE_URL ?
 process.env.REACT_APP_BILLING_BASE_URL : 
 'http://admin-staging.biscuits.ph/billing/';

const billingToken = process.env.REACT_APP_BILLING_ACCESS_TOKEN 
    ? process.env.REACT_APP_BILLING_ACCESS_TOKEN  : 
    'p@h+5c6f&!8=JW=ARkXw9pGjQK9aEAWP';

const sendReceiveBaseUrl = process.env.REACT_APP_SEND_RECEIVE_BASE_URL ?
    process.env.REACT_APP_SEND_RECEIVE_BASE_URL : 
    'http://admin-staging.biscuits.ph/sendreceive/';
   
const sendReceiveToken = process.env.REACT_APP_SEND_RECEIVE_ACCESS_TOKEN 
    ? process.env.REACT_APP_SEND_RECEIVE_ACCESS_TOKEN  : 
    'xRJTs#5+&67Cnf_4NaS2=uVY-bfNz#By';

const loanBaseUrl = process.env.REACT_APP_LOAN_BASE_URL ?
    process.env.REACT_APP_LOAN_BASE_URL : 
    'http://admin-staging.biscuits.ph/loan/';

const loanToken = process.env.REACT_APP_LOAN_ACCESS_TOKEN 
    ? process.env.REACT_APP_LOAN_ACCESS_TOKEN  : 
    '5qa$Kz2CFAcRvgwMc*Zkk?*%_!G_f%k%';

const billingRequestHeaders = {
    'x-access-token': billingToken,
    'x-api-version': 2,
    'Content-Type': 'application/json'
};

const sendReceiveRequestHeaders = {
    'x-access-token': sendReceiveToken,
    'x-api-version': 2,
    'Content-Type': 'application/json'
};

const loanRequestHeaders = {
    'x-access-token': loanToken,
    'Content-Type': 'application/json'
};

export const getBills = bills => ({
    type: 'GET_BILLS',
    bills
});

export const getEstimatedPaymentEmployee = payments => ({
    type: 'GET_ESTIMATED_PAYMENTS',
    payments
});

export const clearEstimatedEmployee = () => ({
    type: 'CLEAR_ESTIMATED_EMPLOYEES'
});

export const getBill = bill => ({
    type: 'GET_BILL',
    bill
});

export const unsetBill = () => ({
    type: 'UNSET_BILL',
});

export const customMessageError = message => ({
    type: 'CUSTOM_MESSAGE_ERROR',
    error: {
        message: message
    },
});

export const getEstimatedPayment = (employeeId, settlement_date, amount) => {
    const url = `${loanBaseUrl}employee/${employeeId}/payback/remaining`;
    return axios.get(url, {
        headers: loanRequestHeaders,
        params: {
            settlement_date,
            amount
        }
    }).then(res => {
        return res.data;
    })
    .catch(err => {
        throw err;
    });
}

export const  makeOffschedulePayment = (employeeId, settlementDate, amount) => {
    const url = `${billingBaseUrl}/employee/${employeeId}/payment/offschedule`;
    const body = {
        'settlement_date': settlementDate,
        'amount': amount,
        'source': 'CASH'
    };
    return axios.post(url, body, {
        headers: billingRequestHeaders,
    }).then(res => {
        return res.data;
    })
    .catch(err => {
        throw err;
    });
}

export const getTransactionIdForOffScheduledPayment = receivableId => {
    const url = `${sendReceiveBaseUrl}receivable/${receivableId}`;
    return axios.get(url, {
        headers: sendReceiveRequestHeaders,
    }).then(res => {
        return res.data;
    })
    .catch(err => {
        throw err;
    });
}

export const recordCashPaymentForOffScheduledPayment = transactionId => {
    const url = `${sendReceiveBaseUrl}receivable/`;
    const body = {
        transaction_id: transactionId,
        source: 'CASH',
        status: 'SUCCESS'
    };
    return axios.put(url, body, {
        headers: sendReceiveRequestHeaders,
    }).then(res => {
        return res.data;
    })
    .catch(err => {
        throw err;
    });
}

export const settleOffScheduledPayment = (employeeId, settlementDate, paymentAmount, fullPayment) => {
    return dispatch => {
        return getEstimatedPayment(employeeId, settlementDate, paymentAmount) 
        .then((estimated) => {
            let amount;
    
            if (fullPayment) {
                amount = estimated.remaining_balance
            } else {
                amount = estimated.total_payback_amount
            }
            
            return makeOffschedulePayment(employeeId, settlementDate, amount);
        })
        .then((payment) => {
            if (!fullPayment && payment.amount !== paymentAmount) {
                const errMessage = `Bill amount ${payment.amount} is not equal to payment amount ${paymentAmount}`;
                dispatch(customMessageError(errMessage));
            }
    
            return getTransactionId(payment.receivable_id);
        }).then((receivable) => {
            return recordCashPayment(receivable.transaction_id);
        }).then(() => {
            const settledMessage = 'Done settling off-scheduled payment';
            dispatch(customMessageError(settledMessage));
        }).catch((err) => {
            if (err.response && err.response.data && err.response.data.message) {
                const errMessage = err.response.data.message;
                dispatch(customMessageError(''));
                dispatch(customMessageError(errMessage));
            }
        });
    } 
}

export const fetchBills = (companyId) => {
    const url = `${billingBaseUrl}`;
    return dispatch => {
        const fetchingMessage = 'Fetching company bills, please wait...';
        dispatch(customMessageError(fetchingMessage));
        axios.get(url, {
            headers: billingRequestHeaders,
            params: {
                entity_type: 'COMPANY',
                entity_id: companyId,
                'include.payments': 1,
                sort: 'due_date',
                status: 'UNPAID'
            }
        }).then(res => {
            const fetchedMessage = 'Bills fetched, please scroll down to see unpaid bills.';
            dispatch(customMessageError(fetchedMessage));
            dispatch(getBills(res.data));
        })
        .catch(() => {
            const fetchErrorMessage = 'Problem fetching bills, please try again.';
            dispatch(customMessageError(fetchErrorMessage));
        });
    }
}

export const fetchEstimatePayment = (employeeId, settlementDate, amount) => {
    if (!isNaN(employeeId)) {
        const url = `${loanBaseUrl}employee/${employeeId}/payback/remaining`;
        return dispatch => {
            const fetchingMessage = 'Fetching estimate payments, please wait...';
            dispatch(customMessageError(fetchingMessage));
            axios.get(url, {
                headers: loanRequestHeaders,
                params: {
                    settlement_date: settlementDate,
                    amount: amount,
                    'include.paybacks': 1,
                }
            }).then(res => {
                const data = res.data;
                dispatch(getEstimatedPaymentEmployee(data));
            })
            .catch(() => {
                const fetchErrorMessage = 'Problem fetching estimate payments, please try again.';
                dispatch(customMessageError(fetchErrorMessage));
            });
        }
    }
}

export const makeBillPayment = (paymentBody) => {
    const url = `${billingBaseUrl}company/${paymentBody.company.id}/payment`;
    return dispatch => {
        const processingPaymentMessage = 'Processing payment...';
        dispatch(customMessageError(processingPaymentMessage));
        const body = {
            due_date: humanize.date('Y-m-d', new Date(paymentBody.due_date)),
            source: 'CASH'
        };
        axios.post(url, body, {
            headers: billingRequestHeaders,
        }).then(res => {
            dispatch(getTransactionId(res.data));
        })
        .catch(err => {
            const response = err.response.data;
            dispatch(customMessageError(response.message));
        });
    }
}

export const getTransactionId = paymentResponse => {
    const receivableId = paymentResponse.receivable_id;
    const url = `${sendReceiveBaseUrl}receivable/${receivableId}`;
    return dispatch => {
        const validationMessage = 'Validating Transaction...';
        dispatch(customMessageError(validationMessage));
        axios.get(url, {
            headers: sendReceiveRequestHeaders,
        }).then(res => {
            paymentResponse.transaction_id = res.data.transaction_id;
            dispatch(recordCashPayment(paymentResponse));
        })
        .catch(() => {
            const fetchErrorMessage = 'Problem validating transaction, please try again.';
            dispatch(customMessageError(fetchErrorMessage));
        });
    }
}

export const recordCashPayment = paymentResponse => {
    const url = `${sendReceiveBaseUrl}receivable`;
    return dispatch => {
        const markingProcessingMessage = 'Marking as paid...';
        dispatch(customMessageError(markingProcessingMessage));
        const body = {
            transaction_id: paymentResponse.transaction_id,
            source: 'CASH',
            status: 'SUCCESS'
        };
        axios.put(url, body, {
            headers: sendReceiveRequestHeaders,
        }).then(res => {
            const successMessage = 'Payment successful.';
            dispatch(customMessageError(successMessage));

            const entity_id = parseFloat(paymentResponse.entity_id);
            dispatch(fetchBills(entity_id));

            reset();
        })
        .catch(() => {
            const fetchErrorMessage = 'Problem marking payment, please try again.';
            dispatch(customMessageError(fetchErrorMessage));
        });
    }
}

export const removeEmployeeFromBilling = (employeeId, billingDate) => {
    const url = `${billingBaseUrl}/employee/${employeeId}/payback`;
    return axios.delete(url, {
        headers: billingRequestHeaders,
        params: {
            from_date: billingDate
        }
    }).then(res => {
        return res.data;
    })
    .catch(err => {
        throw err;
    });
}

export const fetchBill = bill => {
    return dispatch => {
        dispatch(getBill(bill));
    }
}

export const unselectBill = () => {
    return dispatch => {
        dispatch(unsetBill());
    }
}