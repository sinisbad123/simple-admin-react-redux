
const employeesReducer = (state = {}, action) => {
    if (action && action.type) {
        switch (action.type) {
            case 'GET_EMPLOYEE_LIST':
                const total = action.employees
                    && action.employees.total
                        ? action.employees.total
                        : 0;
                const page = action.employees &&  action.employees.page 
                    ? action.employees.page
                    : 1;
                const GET_EMPLOYEE_LIST_DATA = {
                    data: action.employees.data || [],
                    total,
                    page
                };
                return GET_EMPLOYEE_LIST_DATA;

            case 'GET_EMPLOYEE_BY_ID':
                const GET_EMPLOYEE_BY_ID_DATA = Object.assign({}, state);
                GET_EMPLOYEE_BY_ID_DATA.selectedEmployee = action.employee;
                return GET_EMPLOYEE_BY_ID_DATA;

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
  
export default employeesReducer;