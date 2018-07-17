import axios from 'axios';

const baseUrl = process.env.REACT_APP_SHOPPING_BASE_URL ?
 process.env.REACT_APP_COMPANY_BASE_URL : 
 'http://admin-staging.biscuits.ph/company/';

const token = process.env.REACT_APP_COMPANY_ACCESS_TOKEN 
    ? process.env.REACT_APP_COMPANY_ACCESS_TOKEN  : 
    '@6*r+VSGxX#Ez2De-4VDML*y#=t@=9^e';

const requestHeaders = {
    'x-access-token': token,
    'Content-Type': 'application/json'
};

export const getCompanies = companies => ({
    type: 'GET_COMPANIES',
    companies
});

export const getCompaniesAndSelectNewCompany = companies => ({
    type: 'GET_COMPANIES_SELECT_NEW',
    companies
});

export const getCompany = company => ({
    type: 'GET_COMPANY',
    company
})

export const addCompany = messages => ({
    type: 'ADD_COMPANY',
    error: {
        message: messages,
    }
})

export const fetchCompanyError = () => ({
    type: 'FETCH_COMPANY_ERROR',
    error: {
        message: 'There is a problem fetching the record. Please try selecting again.'
    },
})

export const fetchCompaniesError = () => ({
    type: 'FETCH_COMPANIES_ERROR',
    error: {
        message: 'There is a problem fetching the records. Please try selecting again.'
    },
});

export const addCompanyError = () => ({
    type: 'ADD_COMPANY_ERROR',
    error: {
        message: 'There is a problem adding the record. Please try again.'
    },
})

export const customMessageError = message => ({
    type: 'CUSTOM_MESSAGE_ERROR',
    error: {
        message: message
    },
})

export const updateCompany = company => {
    if (company) {
        const url = `${baseUrl}${company.id}`;
        return dispatch => {
            const updatingMessage = 'Updating company, please wait...';
            dispatch(customMessageError(updatingMessage));
            axios.put(url, company, {
                headers: requestHeaders,
            }).then(res => {
                const companyId = res.data.id;
                dispatch(fetchCompany(companyId, company));
                const updatingMessage = 'Company updated';
                dispatch(customMessageError(updatingMessage));
            })
            .catch(err => {
                const errData = err.response.data;
                if (errData && errData.code && errData.message) {
                    dispatch(customMessageError(errData.message));
                    return;
                }
                dispatch(addCompanyError());
            });
        }
    }
}

export const updateCompanyLogin = (companyId, company) => {
    if (company) {
        const url = `${baseUrl}${companyId}/user`;
        return dispatch => {
            const updatingMessage = 'Updating company log-in details, please wait...';
            dispatch(customMessageError(updatingMessage));
            axios.put(url, company, {
                headers: requestHeaders,
            }).then(res => {
                const companyId = res.data.company_id;
                dispatch(fetchCompany(companyId, company));
                const updatingMessage = 'Company log-in details updated';
                dispatch(customMessageError(updatingMessage));
            })
            .catch(err => {
                const errData = err.response.data;
                if (errData && errData.code && errData.message) {
                    dispatch(customMessageError(errData.message));
                    return;
                }
                dispatch(addCompanyError());
            });
        }
    }
}



export const submitCompany = (company) => {
    const url = `${baseUrl}`;
    return dispatch => {
        const addingMessage = 'Adding new company, please wait...';
        dispatch(customMessageError(addingMessage));
        axios.post(url, company, {
            headers: requestHeaders,
        }).then(res => {
            const companyId = res.data.id;
            dispatch(submitCompanyForCognito(companyId, company));
        })
        .catch(err => {
            const errData = err.response.data;
            if (errData && errData.code && errData.message) {
                dispatch(customMessageError(errData.message));
                return;
            }
            dispatch(addCompanyError());
        });
    }
}

export const submitCompanyForCognito = (companyId, company) => {
    const url = `${baseUrl}${companyId}/details`;
    const data = {
        "company": {
            "company_id": companyId,
            "company_type": company.company_type,
            "short_name": company.short_name,
            "number_of_employees": company.number_of_employees
        },
        "payback_settings": {
            "date_one": company.date_one === 31 ? null : company.date_one,
            "date_two": company.date_two === 31 ? null : company.date_two
        },
        "cognito_accounts": [{
            "email": company.email,
            "password": company.password,
            "role": "ADMIN"
        },
        {
            "email": `admin+${companyId}@biscuits.ph`,
            "role": "SUPERADMIN"
        }]
    };
    return dispatch => {
        return axios(url, {
            method: 'PUT',
            data,
            headers: requestHeaders,
          })
        .then(response => {
            const responseData = response.data;
            const accounts = responseData.cognito_accounts;
            const messages = accounts.map(account => {
                let message = `Please save this account:`;
                message += `\nUsername: ${account.email}`;
                message += `\nPassword: ${account.password}`;
                message += `\nRole: ${account.role}`;
                return message;
            });
            dispatch(addCompany(messages));
            dispatch(fetchCompany(responseData.company.id));
        })
        .catch(err => {
            dispatch(fetchAddedCompany());
        });
    }
}

export const fetchAddedCompany = () => {
    return dispatch => {
        dispatch(fetchCompaniesAndReturnAddedCompany());
    }
}

export const submitCompanyForCompanyUsers = (companyId, company) => {
    const url = `${baseUrl}${companyId}/user/`;
    const data = {
        name: company.name,
        email: company.email,
        company_id: companyId,
        role: 'ADMIN',
        position: 'ADMIN'
    };
    return dispatch => {
        axios.post(url, data, {
            headers: requestHeaders
        })
        .then(res => {
            const message = 'Company successfully added.';
            dispatch(fetchCompanies());
            dispatch(fetchCompany(companyId));
            dispatch(customMessageError(message));
        });
    }
}

export const fetchCompany = (companyId) => {
    const url = `${baseUrl}${companyId}`;
    return dispatch => {
        axios.get(url, {
            headers: requestHeaders,
        }).then(res => {
            dispatch(getCompany(res.data));
        })
        .catch(() => {
            dispatch(fetchCompanyError());
        });
    }
}

export const fetchCompanies = (page = 0, itemsPerPage = Number.MAX_SAFE_INTEGER) => {
    const url = `${baseUrl}?pagination.limit=${itemsPerPage}&pagination.offset=${page}`;
    return dispatch => {
        axios.get(url, {
            headers: requestHeaders,
        }).then(res => {
            dispatch(getCompanies(res.data));
        })
        .catch(() => {
            dispatch(fetchCompaniesError());
        });
    }
}

export const fetchCompaniesAndReturnAddedCompany = (page = 0, itemsPerPage = Number.MAX_SAFE_INTEGER) => {
    const url = `${baseUrl}?pagination.limit=${itemsPerPage}&pagination.offset=${page}`;
    return dispatch => {
        axios.get(url, {
            headers: requestHeaders,
        }).then(res => {
            const message = 'Company successfully added';
            dispatch(getCompaniesAndSelectNewCompany(res.data));
            dispatch(customMessageError(message));
        })
        .catch(() => {
            dispatch(fetchCompaniesError());
        });
    }
}