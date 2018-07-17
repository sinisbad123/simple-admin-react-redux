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

export const getOrder = order => ({
    type: 'GET_ORDER',
    order
})

export const updateOrder = order => ({
    type: 'UPDATE_ORDER',
    order
})

export const getOrders = orders => ({
    type: 'GET_ORDERS',
    orders
})

export const fetchOrderError = () => ({
    type: 'FETCH_ORDER_ERROR',
    error: {
        message: 'There is a problem fetching the record. Please try selecting again.'
    },
})

export const updateOrderError = () => ({
    type: 'UPDATE_ORDER_ERROR',
    error: {
        message: 'There is a problem updating the record. Please try selecting again.'
    },
})

export const fetchOrdersError = () => ({
    type: 'FETCH_ORDERS_ERROR',
    error: {
        message: 'There is a problem fetching the records. Please hit the refresh button and try again.'
    },
})

export const cancelOrder = (refNo, order) => {
    const url = `${baseUrl}/orders/${refNo}/cancel`;
    return dispatch => {
        axios.post(url, order, {
            headers: requestHeaders,
        }).then(res => {
            dispatch(getOrder(res.data));
        })
        .catch(err => {
            console.log(err);
        });
    }
}

export const editOrderStatus = (refNo, status, page) => {
    const url = `${baseUrl}/orders/${refNo}/status`;
    return dispatch => {
        axios.patch(url, status, {
            headers: requestHeaders,
        }).then(res => {
            dispatch(fetchOrder(refNo));
            dispatch(fetchOrders(page));
        })
        .catch(err => {
            console.log(err);
        });
    }
}

export const postOrder = (refNo, order) => {
    const url = `${baseUrl}/orders/${refNo}`;
    return dispatch => {
        axios.patch(url, order, {
            headers: requestHeaders,
        }).then(res => {
            dispatch(getOrder(res.data));
            dispatch(updateOrder(res.data));
        })
        .catch(() => {
            dispatch(updateOrderError());
        });
    }
}

export const fetchOrder = (refNo) => {
    const url = `${baseUrl}/orders/${refNo}`;
    return dispatch => {
        axios.get(url, {
            headers: requestHeaders,
        }).then(res => {
            dispatch(getOrder(res.data));
        })
        .catch(() => {
            dispatch(fetchOrderError());
        });
    }
}

export const fetchOrders = (page) => {
    const itemsPerPage = 13;
    const url = `${baseUrl}/orders?perPage=${itemsPerPage}&page=${page}`;
    return dispatch => {
        axios.get(url, {
            headers: requestHeaders,
        }).then(res => {
            res.data.page = page;
            dispatch(getOrders(res.data));
        })
        .catch(() => {
            dispatch(fetchOrdersError());
        });
    }
}

export const editPrincipalAmount = (order, page) => {
    const url = `${baseUrl}/orders/${order.refNumber}/price`;
    return dispatch => {
        const data = {
            orderId: order.id,
            principalAmount: order.principalAmount
        };
        axios.put(url, data, {
            headers: requestHeaders,
        }).then(res => {
            dispatch(fetchOrder(order.refNumber));
            dispatch(fetchOrders(page));
        })
        .catch(err => {
            console.log(err);
        });
    }
}