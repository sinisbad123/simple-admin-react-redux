
const brandReducer = (state = {}, action) => {
    if (action && action.type) {
        switch (action.type) {
            case 'GET_BRANDS':
                const GET_BRANDS_total = action.brands
                    && action.brands.metadata
                    && action.brands.metadata.count
                        ? action.brands.metadata.count
                        : 0;
                const GET_BRANDS_page = action.brands &&  action.brands.page 
                    ? action.brands.page
                    : 1;
                const GET_BRANDS_DATA = {
                    data: action.brands.data || [],
                    total: GET_BRANDS_total,
                    page: GET_BRANDS_page,
                    selectedBrand: null,
                };
                return GET_BRANDS_DATA;

            case 'GET_BRANDS_WITH_CATEGORY':
                const GET_BRANDS_WITH_CATEGORY_total = action.brands
                    && action.brands.metadata
                    && action.brands.metadata.count
                        ? action.brands.metadata.count
                        : 0;
                const GET_BRANDS_WITH_CATEGORY_page = action.brands &&  action.brands.page 
                    ? action.brands.page
                    : 1;
                const GET_BRANDS_WITH_CATEGORY_DATA = {
                    data: action.brands || null,
                    total: GET_BRANDS_WITH_CATEGORY_total,
                    page: GET_BRANDS_WITH_CATEGORY_page
                };
                return GET_BRANDS_WITH_CATEGORY_DATA;

            case 'GET_BRAND':
                const GET_BRAND_DATA = Object.assign({}, state);
                GET_BRAND_DATA.selectedBrand = action.brand;
                GET_BRAND_DATA.error = null; 
                return GET_BRAND_DATA;

            case 'ASSIGN_BRANDS':
                const ASSIGN_BRANDS = Object.assign({}, state);
                ASSIGN_BRANDS.data = action.brands;
                return ASSIGN_BRANDS;

            case 'CLEAR_BRANDS':
                return null;

            case 'FETCH_BRAND_ERROR':
            case 'FETCH_BRANDS_ERROR':
            case 'ADD_BRAND_ERROR':
            case 'EDIT_BRAND_ERROR':
            case 'DELETE_BRAND_ERROR':
                const BRANDS_ERROR = Object.assign({}, state);
                BRANDS_ERROR.error = action.error;
                return BRANDS_ERROR;
            default:
                const RESET_DATA = Object.assign({}, state); 
                return RESET_DATA;
        }
    }

    return state;
}
  
export default brandReducer;