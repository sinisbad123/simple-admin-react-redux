
const employeeIdsReducer = (state = {}, action) => {
    if (action && action.type) {
        switch (action.type) {
            case 'GET_EMPLOYEE_IDS':
                const GET_EMPLOYEE_IDS_DATA = {
                    data: action.employeeIds.data || [],
                };
                return GET_EMPLOYEE_IDS_DATA;

            case 'CUSTOM_MESSAGE_ERROR':
                const EMPLOYEE_ERROR = Object.assign({}, state);
                EMPLOYEE_ERROR.error = action.error;
                return EMPLOYEE_ERROR;
            default:
                const RESET_DATA = Object.assign({}, state); 
                return RESET_DATA;
        }
    }

    return state;
}
  
export default employeeIdsReducer;