
const productReducer = (state = {}, action) => {
    if (action && action.type) {
        switch (action.type) {
            case 'GET_PRODUCTS':
                const total = action.products
                    && action.products.metadata
                    && action.products.metadata.count
                        ? action.products.metadata.count
                        : 0;
                const page = action.products &&  action.products.page 
                    ? action.products.page
                    : 1;
                const GET_PRODUCTS_DATA = {
                    data: action.products.data || [],
                    total,
                    page,
                    selectedProduct: null,
                };
                return GET_PRODUCTS_DATA;
            case 'GET_PRODUCT':
                const GET_PRODUCT_DATA = Object.assign({}, state);
                action.product.page = state.page;
                GET_PRODUCT_DATA.selectedProduct = action.product;
                GET_PRODUCT_DATA.error = null;
                return GET_PRODUCT_DATA;
            case 'CUSTOM_MESSAGE_ERROR':
            case 'FETCH_PRODUCT_ERROR':
            case 'FETCH_PRODUCTS_ERROR':
            case 'UPDATE_PRODUCT_ERROR':
            case 'DELETE_PRODUCT_ERROR':
                const CUSTOM_MESSAGE_ERROR = Object.assign({}, state);
                CUSTOM_MESSAGE_ERROR.error = action.error;
                return CUSTOM_MESSAGE_ERROR;
            case 'UPDATE_PRODUCT':
                const UPDATE_PRODUCT_DATA = Object.assign({}, state);
                UPDATE_PRODUCT_DATA.error = null;
                UPDATE_PRODUCT_DATA.data = UPDATE_PRODUCT_DATA.data.map(product => {
                    if (action.product.id === product.id) {
                        return action.product;
                    }

                    return product;
                });

                return UPDATE_PRODUCT_DATA;
            default:
                const RESET_DATA = Object.assign({}, state); 
                return RESET_DATA;
        }
    }

    return state;
}
  
export default productReducer;