import axios from 'axios';

const baseUrl = process.env.REACT_APP_KPI_BASE_URL ?
 process.env.REACT_APP_KPI_BASE_URL : 
 'https://1ek70j2vli.execute-api.ap-northeast-1.amazonaws.com/prod/reports';

// const token = process.env.REACT_APP_EMPLOYEE_ACCESS_TOKEN 
//     ? process.env.REACT_APP_EMPLOYEE_ACCESS_TOKEN  : 
//     'mvBMWa#$G6q9NCFfp9!+#64p6t-ssk%B';

const requestHeaders = {
    // 'x-access-token': token,
    'Content-Type': 'application/json'
};

export const getReportList = reportsList => ({
    type: 'GET_REPORTS_LIST',
    reportsList
});

export const getReportData = data => ({
    type: 'GET_REPORT_DATA',
    data
});

export const customMessageError = message => ({
    type: 'CUSTOM_MESSAGE_ERROR',
    error: {
        message: message
    },
})

export const fetchReportList = () => {
    const url = baseUrl;
    return dispatch => {
        axios({
            method: 'get',
            url: url,
            headers: requestHeaders
        }).then(res => {
            const data = res.data;
            dispatch(getReportList(data.reports));
        })
        .catch(err => {
            const message = err.response && err.response.data && err.response.data.message
            ? err.response.data.message
            : 'There is a problem retrieving the records';

            dispatch(customMessageError(message));
        });
    }
}

export const fetchReportData = type => {
    const url = `${baseUrl}/${type}`;
    return dispatch => {
        axios({
            method: 'get',
            url: url,
            headers: requestHeaders
        }).then(res => {
            const data = res.data && res.data.report && res.data.report.data ? res.data.report.data : null;
            dispatch(getReportData(data))
        })
        .catch(err => {
            const message = err.response && err.response.data && err.response.data.message
            ? err.response.data.message
            : 'There is a problem retrieving the records';

            dispatch(customMessageError(message));
        });
    }
}