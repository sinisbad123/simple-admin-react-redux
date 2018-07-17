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


export const getCategory = category => ({
    type: 'GET_CATEGORY',
    category
})

export const getCategories = categories => ({
    type: 'GET_CATEGORIES',
    categories
})

export const assignBrands = brands => ({
    type: 'ASSIGN_BRANDS',
    brands
})

export const fetchCategoryError = () => ({
    type: 'FETCH_CATEGORY_ERROR',
    error: {
        message: 'There is a problem fetching the record. Please try selecting again.'
    },
})

export const fetchCategoriesError = () => ({
    type: 'FETCH_CATEGORIES_ERROR',
    error: {
        message: 'There is a problem fetching the records.'
    },
})

export const addCategoryError = () => ({
    type: 'ADD_CATEGORY_ERROR',
    error: {
        message: 'There is a problem adding the record. Please try again.'
    },
})

export const deleteCategoryError = () => ({
    type: 'DELETE_CATEGORY_ERROR',
    error: {
        message: 'There is a problem deleting the record. Please try again.'
    },
})

export const submitCategory = (category, currentPage) => {
    const url = `${baseUrl}/categories`;
    return dispatch => {
        axios.post(url, category, {
            headers: requestHeaders,
        }).then(res => {
            const categoryId = res.data.id;
            dispatch(fetchCategories(currentPage));
            dispatch(fetchCategory(categoryId));
        })
        .catch(() => {
            dispatch(addCategoryError());
        });
    }
}

export const editCategory = (categoryId, category , currentPage) => {
    const url = `${baseUrl}/categories/${categoryId}`;
    return dispatch => {
        axios.patch(url, category, {
            headers: requestHeaders,
        }).then(res => {
            const categoryId = res.data.id;
            dispatch(fetchCategories(currentPage));
            dispatch(fetchCategory(categoryId));
        })
        .catch(() => {
            dispatch(addCategoryError());
        });
    }
}

export const fetchCategory = (categoryId) => {
    const url = `${baseUrl}/categories/${categoryId}`;
    return dispatch => {
        axios.get(url, {
            headers: requestHeaders,
        }).then(res => {
            dispatch(getCategory(res.data));
        })
        .catch(() => {
            dispatch(fetchCategoryError());
        });
    }
}

export const fetchCategories = (page, itemsPerPage = 100) => {
    const url = `${baseUrl}/categories?perPage=${itemsPerPage}&page=${page}`;
    return dispatch => {
        axios.get(url, {
            headers: requestHeaders,
        }).then(res => {
            dispatch(getCategories(res.data));
        })
        .catch(() => {
            dispatch(fetchCategoriesError());
        });
    }
}

export const relayBrands = (brands) => {
    return dispatch => {
        dispatch(assignBrands(brands));
    }
}

export const removeCategory = (categoryId, page) => {
    const url = `${baseUrl}/categories/${categoryId}`;
    return dispatch => {
        axios.delete(url, {
            headers: requestHeaders,
        }).then(res => {
            dispatch(fetchCategories(page));
        })
        .catch(() => {
            dispatch(deleteCategoryError());
        });
    }
}