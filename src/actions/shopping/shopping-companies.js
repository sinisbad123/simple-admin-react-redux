import axios from 'axios';
const baseUrl = process.env.REACT_APP_SHOPPING_BASE_URL ?
 process.env.REACT_APP_SHOPPING_BASE_URL : 
 'https://shopping.apidev.biscuits.ph/v1';

const token = process.env.REACT_APP_SHOPPING_ACCESS_TOKEN 
    ? process.env.REACT_APP_SHOPPING_ACCESS_TOKEN  : 
    'hjQAAvninQzwbwGVRTNvR9Gd';
const requestHeaders = {
    'x-access-token': token,
    'Content-Type': 'application/json'
};

export const getShoppingCompanies = shoppingCompanies => ({
    type: 'GET_SHOPPING_COMPANIES',
    shoppingCompanies
})

export const getShoppingCompanyEmployees = employees => ({
    type: 'GET_SHOPPING_COMPANY_EMPLOYEES',
    employees
})

export const getShoppingCompany = shoppingCompany => ({
    type: 'GET_SHOPPING_COMPANY',
    shoppingCompany
})

export const fetchShoppingCompanyError = () => ({
    type: 'FETCH_SHOPPING_COMPANY_ERROR',
    error: {
        message: 'There is a problem fetching the record. Please try selecting again.'
    },
})

export const fetchShoppingCompaniesError = () => ({
    type: 'FETCH_SHOPPING_COMPANIES_ERROR',
    error: {
        message: 'There is a problem fetching the records. Please try selecting again.'
    },
})

export const fetchShoppingCompanyEmployeesError = () => ({
    type: 'FETCH_SHOPPING_COMPANY_EMPLOYEES_ERROR',
    error: {
        message: 'There is a problem fetching the records. Please try selecting again.'
    },
})

export const enableShoppingCompanyError = () => ({
    type: 'ENABLE_SHOPPING_COMPANY_ERROR',
    error: {
        message: 'There is a problem enabling the record. Please try selecting again.'
    },
})

export const disableShoppingCompanyError = () => ({
    type: 'DISABLE_SHOPPING_COMPANY_ERROR',
    error: {
        message: 'There is a problem disabling the record. Please try selecting again.'
    },
})

export const toggleShoppingEmployeeAccessError = () => ({
    type: 'TOGGLE_SHOPPING_EMPLOYEE_ACCESS_ERROR',
    error: {
        message: 'There is a problem updating the record. Please try again.'
    },
})

export const customMessageError = message => ({
    type: 'CUSTOM_MESSAGE_ERROR',
    error: {
        message
    },
})

export const fetchShoppingCompanies = (page) => {
    const itemsPerPage = 13;
    const url = `${baseUrl}/companies?perPage=${itemsPerPage}&page=${page}`;
    return dispatch => {
        axios.get(url, {
            headers: requestHeaders,
        }).then(res => {
            res.data.page = page;
            dispatch(getShoppingCompanies(res.data));
        })
        .catch(() => {
            dispatch(fetchShoppingCompaniesError());
        });
    }
}

export const fetchShoppingCompanyEmployees = (companyId, page) => {
    const itemsPerPage = 13;
    const url = `${baseUrl}/companies/${companyId}/employees?perPage=${itemsPerPage}&page=${page}`;
    return dispatch => {
        axios.get(url, {
            headers: requestHeaders,
        }).then(res => {
            res.data.page = page;
            dispatch(getShoppingCompanyEmployees(res.data));
        })
        .catch(() => {
            dispatch(fetchShoppingCompanyEmployeesError());
        });
    }
}

export const toggleShoppingEmployeeAccess = (employeeData, page) => {
    const toggleWord = employeeData.disabled ? 'enable' : 'disable';
    const companyId  = employeeData.company.companyId;
    const data = {};
    const url = `${baseUrl}/companies/${companyId}/employees/${employeeData.id}/${toggleWord}`;
    return dispatch => {
        const updatingMessage = 'Toggling employee access please wait...';
        dispatch(customMessageError(updatingMessage));
        return axios({
            url,
			headers: requestHeaders,
            timeout: 20000,
            method: "post",
            data,
            responseType: "json"
        }).then(res => {
            res.data.page = page;
            dispatch(fetchShoppingCompanyEmployees(companyId, page));
        })
        .catch(() => {
            dispatch(toggleShoppingEmployeeAccessError());
        });
    }
}

export const fetchShoppingCompany = (shoppingCompanyId) => {
    const url = `${baseUrl}/companies/${shoppingCompanyId}`;
    return dispatch => {
        const fetchingMessage = 'Fetching company data please wait...';
        dispatch(customMessageError(fetchingMessage));
        axios.get(url, {
            headers: requestHeaders,
        }).then(res => {
            dispatch(getShoppingCompany(res.data));
            dispatch(fetchShoppingCompanyEmployees(shoppingCompanyId, 1));
        })
        .catch(() => {
            dispatch(fetchShoppingCompanyError());
        });
    }
}

export const enableShoppingCompany = (shoppingCompanyId) => {
    const url = `${baseUrl}/companies/${shoppingCompanyId}/enable`;
    return dispatch => {
        const enablingMessage = 'Enabling company please wait...';
        dispatch(customMessageError(enablingMessage));
        axios.post(url, null , {
            headers: requestHeaders,
        }).then(res => {
            dispatch(fetchShoppingCompany(shoppingCompanyId));
        })
        .catch(() => {
            dispatch(fetchShoppingCompanyError());
        });
    }
}

export const disableShoppingCompany = (shoppingCompanyId) => {
    const url = `${baseUrl}/companies/${shoppingCompanyId}/disable`;
    return dispatch => {
        const disablingMessage = 'Disabling company please wait...';
        dispatch(customMessageError(disablingMessage));
        axios.post(url, null ,{
            headers: requestHeaders,
        }).then(res => {
            dispatch(fetchShoppingCompany(shoppingCompanyId));
        })
        .catch(() => {
            dispatch(fetchShoppingCompanyError());
        });
    }
}
