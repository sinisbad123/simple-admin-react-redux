
const billReducer = (state = {}, action) => {
    if (action && action.type) {
        switch (action.type) {
            case 'GET_BILLS':
                const GET_BILLS_DATA = {
                    data: action.bills.data || [],
                    selectedCompany: null,
                    error: null,
                };
                return GET_BILLS_DATA;

            case 'GET_ESTIMATED_PAYMENTS':
                const GET_ESTIMATED_PAYMENTS_DATA = Object.assign({}, state);
                GET_ESTIMATED_PAYMENTS_DATA.payments = action.payments;
                return GET_ESTIMATED_PAYMENTS_DATA;

            case 'CLEAR_ESTIMATED_EMPLOYEES':
                const CLEAR_ESTIMATED_EMPLOYEES_DATA = Object.assign({}, state);
                CLEAR_ESTIMATED_EMPLOYEES_DATA.payments = null;
                return CLEAR_ESTIMATED_EMPLOYEES_DATA;

            case 'GET_BILL':
                const GET_BILL_DATA = Object.assign({}, state);
                GET_BILL_DATA.selectedBill = action.bill;
                GET_BILL_DATA.error = null;
                return GET_BILL_DATA;

            case 'UNSET_BILL':
                const UNSET_BILL_DATA = Object.assign({}, state);
                UNSET_BILL_DATA.selectedBill = null;
                UNSET_BILL_DATA.error = null;
                return UNSET_BILL_DATA;
                
            case 'CUSTOM_MESSAGE_ERROR':
                const CUSTOM_MESSAGE_ERROR = Object.assign({}, state);
                CUSTOM_MESSAGE_ERROR.error = action.error;
                return CUSTOM_MESSAGE_ERROR;
            default:
                const RESET_DATA = Object.assign({}, state); 
                return RESET_DATA;
        }
    }

    return state;
}
  
export default billReducer;