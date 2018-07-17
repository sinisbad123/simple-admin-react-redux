
const kpiReducer = (state = {}, action) => {
    if (action && action.type) {
        switch (action.type) {
            case 'GET_REPORTS_LIST':
                const GET_REPORTS_LIST_DATA = {
                    reportsList: action.reportsList || [],
                };
                return GET_REPORTS_LIST_DATA;

            case 'GET_REPORT_DATA':
                const GET_REPORT_DATA_DATA = Object.assign({}, state);
                GET_REPORT_DATA_DATA.data = action.data;
                return GET_REPORT_DATA_DATA;

            case 'CUSTOM_MESSAGE_ERROR':
                const CUSTOM_ERROR = Object.assign({}, state);
                CUSTOM_ERROR.error = action.error;
                return CUSTOM_ERROR;
            default:
                const RESET_DATA = Object.assign({}, state); 
                return RESET_DATA;
        }
    }

    return state;
}
  
export default kpiReducer;