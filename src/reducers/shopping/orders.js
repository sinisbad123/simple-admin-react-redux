
const orderReducer = (state = {}, action) => {
    if (action && action.type) {
        switch (action.type) {
            case 'GET_ORDERS':
                const total = action.orders
                    && action.orders.metadata
                    && action.orders.metadata.count
                        ? action.orders.metadata.count
                        : 0;
                const page = action.orders &&  action.orders.page 
                    ? action.orders.page
                    : 1;
                const GET_ORDERS_DATA = {
                    data: action.orders.data || [],
                    total,
                    page,
                };
                return GET_ORDERS_DATA;
            case 'GET_ORDER':
                const GET_ORDER_DATA = Object.assign({}, state);
                GET_ORDER_DATA.selectedOrder = action.order;
                GET_ORDER_DATA.error = null;
                return GET_ORDER_DATA;
            case 'FETCH_ORDER_ERROR':
                const FETCH_ORDER_ERROR = Object.assign({}, state);
                FETCH_ORDER_ERROR.error = action.error;
                return FETCH_ORDER_ERROR;
            case 'UPDATE_ORDER_ERROR':
                const UPDATE_ORDER_ERROR = Object.assign({}, state);
                UPDATE_ORDER_ERROR.error = action.error;
                return UPDATE_ORDER_ERROR;
            case 'FETCH_ORDERS_ERROR':
                const FETCH_ORDERS_ERROR = Object.assign({}, state);
                FETCH_ORDERS_ERROR.error = action.error;
                return FETCH_ORDERS_ERROR;
            case 'UPDATE_ORDER':
                const UPDATE_ORDER_DATA = Object.assign({}, state);
                UPDATE_ORDER_DATA.data = UPDATE_ORDER_DATA.data.map(order => {
                    if (action.order.id === order.id) {
                        return action.order;
                    }

                    return order;
                });

                return UPDATE_ORDER_DATA;
            default:
                const RESET_DATA = Object.assign({}, state); 
                return RESET_DATA;
        }
    }

    return state;
}
  
export default orderReducer;