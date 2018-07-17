import axios from 'axios';

const baseUrl = process.env.REACT_APP_EMPLOYEE_BASE_URL ?
 process.env.REACT_APP_EMPLOYEE_BASE_URL : 
 'http://admin-staging.biscuits.ph/employee/';

const token = process.env.REACT_APP_EMPLOYEE_ACCESS_TOKEN 
    ? process.env.REACT_APP_EMPLOYEE_ACCESS_TOKEN  : 
    'mvBMWa#$G6q9NCFfp9!+#64p6t-ssk%B';

const requestHeaders = {
    'x-access-token': token,
    'Content-Type': 'application/json'
};

export const getEmployees = employees => ({
    type: 'GET_EMPLOYEE_LIST',
    employees
});

export const getEmployeeById = employee => ({
    type: 'GET_EMPLOYEE_BY_ID',
    employee
});

export const customMessageError = message => ({
    type: 'CUSTOM_MESSAGE_ERROR',
    error: {
        message: message
    },
})

export const fetchTerminatedEmployees = (page = 0) => {
    const url = baseUrl;
    return dispatch => {
        axios({
            method: 'get',
            url: url,
            headers: requestHeaders,
            params: {
                offset: page,
                'pagination.limit': 13,
                terminated: true,
            }
        }).then(res => {
            const data = res.data;
            data.page = page;
            dispatch(getEmployees(data));
        })
        .catch(err => {
            const message = err.response && err.response.data && err.response.data.message
            ? err.response.data.message
            : 'There is a problem retrieving the records';

            dispatch(customMessageError(message));
        });
    }
}

export const fetchEmployees = (page = 0) => {
    const url = baseUrl;
    return dispatch => {
        axios({
            method: 'get',
            url: url,
            headers: requestHeaders,
            params: {
                offset: page,
                'pagination.limit': 13,
            }
        }).then(res => {
            const data = res.data;
            data.page = page;
            dispatch(getEmployees(data));
        })
        .catch(err => {
            const message = err.response && err.response.data && err.response.data.message
            ? err.response.data.message
            : 'There is a problem retrieving the records';

            dispatch(customMessageError(message));
        });
    }
}

export const fetchEmployeeById = employeeId => {
    const url = `${baseUrl}${employeeId}`;
    return dispatch => {
        axios({
            method: 'get',
            url: url,
            headers: requestHeaders,
        }).then(res => {
            const employee = res.data;
            dispatch(getEmployeeById(employee));
        })
        .catch(err => {
            const message = err.response && err.response.data && err.response.data.message
            ? err.response.data.message
            : 'There is a problem retrieving the records';

            dispatch(customMessageError(message));
        });
    }
}

export const fetchTerminatedEmployeesByName = (page = 0, searchText) => {
    const url = baseUrl;
    return dispatch => {
        axios({
            method: 'get',
            url: url,
            headers: requestHeaders,
            params: {
                offset: page,
                'pagination.limit': 13,
                terminated: true,
                name: searchText.trim()
            }
        }).then(res => {
            const data = res.data;
            data.page = page;
            dispatch(getEmployees(data));
        })
        .catch(err => {
            const message = err.response && err.response.data && err.response.data.message
            ? err.response.data.message
            : 'There is a problem retrieving the records';

            dispatch(customMessageError(message));
        });
    }
}

export const fetchEmployeesByName = (page = 0, searchText) => {
    const url = baseUrl;
    return dispatch => {
        axios({
            method: 'get',
            url: url,
            headers: requestHeaders,
            params: {
                offset: page,
                'pagination.limit': 13,
                name: searchText.trim()
            }
        }).then(res => {
            const data = res.data;
            data.page = page;
            dispatch(getEmployees(data));
        })
        .catch(err => {
            const message = err.response && err.response.data && err.response.data.message
            ? err.response.data.message
            : 'There is a problem retrieving the records';

            dispatch(customMessageError(message));
        });
    }
}