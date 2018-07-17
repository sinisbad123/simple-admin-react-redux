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

export const getEmployeeIds = employeeIds => ({
    type: 'GET_EMPLOYEE_IDS',
    employeeIds
});

export const customMessageError = message => ({
    type: 'CUSTOM_MESSAGE_ERROR',
    error: {
        message: message
    },
})

export const attachIdTypes = data => {
    const url = `${baseUrl}idtype`;
    return dispatch => {
        axios({
            method: 'get',
            url: url,
            headers: requestHeaders,
            params: {
                'pagination.limit': Number.MAX_SAFE_INTEGER
            }
        }).then(res => {
            let employeeIdData = data;
            const idTypes = res.data.data;
            let updated_employeeIds = employeeIdData.data.map(employeeId => {
                const idData = employeeId;
                const idType = idTypes.find(function(o) {
                    return o.id === idData.type_id;
                });
                idData.idType = idType.name;
                return idData;
            });
            employeeIdData.data = updated_employeeIds;

            dispatch(getEmployeeIds(employeeIdData));

            const fetchedMessage = 'Records successfully fetched.';
            dispatch(customMessageError(fetchedMessage));
        })
        .catch(err => {
            const message = err.response && err.response.data && err.response.data.message
            ? err.response.data.message
            : 'There is a problem retrieving the records';

            dispatch(customMessageError(message));
        });
    }
}

export const fetchEmployeeIds = (statuses = []) => {
    let statusesString = Array.isArray(statuses) && statuses > 0
        ? ''
        : "PENDING";

    if (Array.isArray(statuses) && statuses.length > 0) {
        statusesString = statuses.join();
    }
    const url = `${baseUrl}idlist?status=${statusesString}`;
    return dispatch => {
        const loadingMessage = 'Loading employee IDs please wait...';
        dispatch(customMessageError(loadingMessage));

        axios({
            method: 'get',
            url: url,
            headers: requestHeaders
        }).then(res => {
            dispatch(attachIdTypes(res.data));
        })
        .catch(err => {
            const message = err.response && err.response.data && err.response.data.message
            ? err.response.data.message
            : 'There is a problem retrieving the records';

            dispatch(customMessageError(message));
        });
    }
}

export const updateEmployeeIdStatus = (id_data) => {
    const url = `${baseUrl}idlist/${id_data.id}`;
    const data = {
        status: id_data.status
    };
    return dispatch => {
        const updateMessage = 'Updating record please wait...';
        dispatch(customMessageError(updateMessage));

        axios({
            method: 'put',
            data,
            url: url,
            headers: requestHeaders
        }).then(res => {
            dispatch(fetchEmployeeIds());

            const updateMessage = 'Record successfully updated.';
            dispatch(customMessageError(updateMessage));
        })
        .catch(err => {
            const message = err.response && err.response.data && err.response.data.message
            ? err.response.data.message
            : 'There is a problem retrieving the records';

            dispatch(customMessageError(message));
        });
    }
}