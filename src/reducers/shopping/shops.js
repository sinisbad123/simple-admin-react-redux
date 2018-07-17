
const shopsReducer = (state = {}, action) => {
    if (action && action.type) {
        switch (action.type) {
            case 'GET_SHOPS':
                const total = action.shops
                    && action.shops.metadata
                    && action.shops.metadata.count
                        ? action.shops.metadata.count
                        : 0;
                const page = action.shops &&  action.shops.page 
                    ? action.shops.page
                    : 1;
                const GET_SHOPS_DATA = {
                    data: action.shops.data || [],
                    total,
                    page
                };
                return GET_SHOPS_DATA;

            case 'GET_SHOP':
                const GET_SHOP_DATA = Object.assign({}, state);
                GET_SHOP_DATA.selectedShop = action.shop;
                GET_SHOP_DATA.error = null; 
                return GET_SHOP_DATA;
            
            case 'FETCH_SHOP_ERROR':
            case 'FETCH_SHOPS_ERROR':
            case 'ADD_SHOP_ERROR':
            case 'EDIT_SHOP_ERROR':
            case 'DELETE_SHOP_ERROR':
                const SHOPS_ERROR = Object.assign({}, state);
                SHOPS_ERROR.error = action.error;
                return SHOPS_ERROR;

            default:
                const RESET_DATA = Object.assign({}, state); 
                return RESET_DATA;
        }
    }

    return state;
}
  
export default shopsReducer;