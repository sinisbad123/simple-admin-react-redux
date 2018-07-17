
const categoriesReducer = (state = {}, action) => {
    if (action && action.type) {
        switch (action.type) {
            case 'GET_CATEGORIES':
                const total = action.categories
                    && action.categories.metadata
                    && action.categories.metadata.count
                        ? action.categories.metadata.count
                        : 0;
                const page = action.categories &&  action.categories.page 
                    ? action.categories.page
                    : 1;
                const GET_CATEGORIES_DATA = {
                    data: action.categories.data || [],
                    total,
                    page
                };
                return GET_CATEGORIES_DATA;

            case 'GET_CATEGORY':
                const GET_CATEGORY_DATA = Object.assign({}, state);
                GET_CATEGORY_DATA.selectedCategory = action.category;
                GET_CATEGORY_DATA.error = null; 
                return GET_CATEGORY_DATA;

            case 'CLEAR_CATEGORIES':
                return null;
            
            case 'DELETE_CATEGORY_ERROR':
            case 'ADD_CATEGORY_ERROR':
            case 'FETCH_CATEGORY_ERROR':
            case 'FETCH_CATEGORIES_ERROR':
                const CATEGORY_ERROR = Object.assign({}, state);
                CATEGORY_ERROR.error = action.error;
                return CATEGORY_ERROR;

            default:
                const RESET_DATA = Object.assign({}, state); 
                return RESET_DATA;
        }
    }

    return state;
}
  
export default categoriesReducer;