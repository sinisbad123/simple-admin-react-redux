
const companyReducer = (state = {}, action) => {
    if (action && action.type) {
        switch (action.type) {
            case 'GET_COMPANIES':
                const GET_COMPANIES_DATA = {
                    data: action.companies || [],
                    selectedCompany: null,
                };
                return GET_COMPANIES_DATA;
            case 'GET_COMPANIES_SELECT_NEW':
                const GET_COMPANIES_AND_NEW_COMNPANY_DATA = {
                    data: action.companies || [],
                    selectedCompany: action.companies[action.companies.length - 1],
                };
                return GET_COMPANIES_AND_NEW_COMNPANY_DATA;
                
            case 'GET_COMPANY':
                const GET_COMPANY_DATA = Object.assign({}, state);
                GET_COMPANY_DATA.selectedCompany = action.company;
                GET_COMPANY_DATA.newCompany = null;
                return GET_COMPANY_DATA;
            
            case 'ADD_COMPANY':
                const ADD_COMPANY_DATA = Object.assign({}, state);
                ADD_COMPANY_DATA.error = action.error; 
                return ADD_COMPANY_DATA;

            case 'FETCH_COMPANY_ERROR':
            case 'FETCH_COMPANIES_ERROR':
            case 'ADD_COMPANY_ERROR':
            case 'CUSTOM_MESSAGE_ERROR':
                const COMPANY_ERROR = Object.assign({}, state);
                COMPANY_ERROR.error = action.error;
                return COMPANY_ERROR;
            default:
                const RESET_DATA = Object.assign({}, state); 
                return RESET_DATA;
        }
    }

    return state;
}
  
export default companyReducer;