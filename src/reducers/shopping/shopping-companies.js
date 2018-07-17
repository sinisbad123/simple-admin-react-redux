
const shoppingCompaniesReducer = (state = {}, action) => {
    if (action && action.type) {
        switch (action.type) {
            case 'GET_SHOPPING_COMPANIES':
                const GET_SHOPPING_COMPANIES_total = action.shoppingCompanies
                    && action.shoppingCompanies.metadata
                    && action.shoppingCompanies.metadata.count
                        ? action.shoppingCompanies.metadata.count
                        : 0;
                const GET_SHOPPING_COMPANIES_page = action.shoppingCompanies &&  action.shoppingCompanies.page 
                    ? action.shoppingCompanies.page
                    : 1;
                const GET_SHOPPING_COMPANIES_DATA = {
                    data: action.shoppingCompanies.data || [],
                    total: GET_SHOPPING_COMPANIES_total,
                    page: GET_SHOPPING_COMPANIES_page,
                    selectedShoppingCompany: null,
                };
                return GET_SHOPPING_COMPANIES_DATA;

            case 'GET_SHOPPING_COMPANY_EMPLOYEES':
                const GET_SHOPPING_COMPANY_EMPLOYEES_DATA = Object.assign({}, state);
                const GET_SHOPPING_COMPANY_EMPLOYEES_total = action.employees
                    && action.employees.metadata
                    && action.employees.metadata.count
                        ? action.employees.metadata.count
                        : 0;
                const GET_SHOPPING_COMPANY_EMPLOYEES_page = action.employees &&  action.employees.page 
                    ? action.employees.page
                    : 1;
                GET_SHOPPING_COMPANY_EMPLOYEES_DATA.employees = {
                    page: GET_SHOPPING_COMPANY_EMPLOYEES_page,
                    total: GET_SHOPPING_COMPANY_EMPLOYEES_total,
                    data: action.employees.data || [],
                };
                return GET_SHOPPING_COMPANY_EMPLOYEES_DATA;
            
            case 'GET_SHOPPING_COMPANY':
                const GET_SHOPPING_COMPANY_DATA = Object.assign({}, state);
                GET_SHOPPING_COMPANY_DATA.selectedShoppingCompany = action.shoppingCompany;
                GET_SHOPPING_COMPANY_DATA.employees = null;
                GET_SHOPPING_COMPANY_DATA.error = null; 
                return GET_SHOPPING_COMPANY_DATA;

            case 'FETCH_SHOPPING_COMPANIES_ERROR':
            case 'FETCH_SHOPPING_COMPANY_EMPLOYEES_ERROR':
            case 'FETCH_SHOPPING_COMPANY_ERROR':
            case 'ENABLE_SHOPPING_COMPANY_ERROR':
            case 'DISABLE_SHOPPING_COMPANY_ERROR':
            case 'TOGGLE_SHOPPING_EMPLOYEE_ACCESS_ERROR':
            case 'CUSTOM_MESSAGE_ERROR':
                const SHOPPING_COMPANIES_ERROR = Object.assign({}, state);
                SHOPPING_COMPANIES_ERROR.error = action.error;
                return SHOPPING_COMPANIES_ERROR;
            default:
                const RESET_DATA = Object.assign({}, state); 
                return RESET_DATA;
        }
    }

    return state;
}
  
export default shoppingCompaniesReducer;