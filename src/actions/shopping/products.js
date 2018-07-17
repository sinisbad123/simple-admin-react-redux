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

export const getProduct = product => ({
    type: 'GET_PRODUCT',
    product
})

export const updateProduct = product => ({
    type: 'UPDATE_PRODUCT',
    product
})

export const getProducts = products => ({
    type: 'GET_PRODUCTS',
    products
})

export const fetchProductError = () => ({
    type: 'FETCH_PRODUCT_ERROR',
    error: {
        message: 'There is a problem fetching the record. Please try selecting the record again.'
    }
})

export const fetchProductsError = () => ({
    type: 'FETCH_PRODUCTS_ERROR',
    error: {
        message: 'There is a problem fetching the records.'
    }
})

export const updateProductError = () => ({
    type: 'UPDATE_PRODUCT_ERROR',
    error: {
        message: 'There is a problem updating the record. Please try again.'
    }
})

export const addProductError = () => ({
    type: 'ADD_PRODUCT_ERROR',
    error: {
        message: 'There is a problem adding the record. Please try again.'
    }
})

export const deleteProductError = () => ({
    type: 'DELETE_PRODUCT_ERROR',
    error: {
        message: 'There is a problem deleting the record. Please try again.'
    }
})

export const clearCategories = () => ({
    type: 'CLEAR_CATEGORIES'
})

export const clearBrands = () => ({
    type: 'CLEAR_BRANDS'
})

export const customMessageError = message => ({
    type: 'CUSTOM_MESSAGE_ERROR',
    error: {
        message: message
    },
})

export const submitProduct = (product, currentPage) => {
    const url = `${baseUrl}/products`;
    return dispatch => {
        axios.post(url, product, {
            headers: requestHeaders,
        }).then(res => {
            const productId = res.data._id;
            dispatch(fetchProducts(currentPage));
            dispatch(fetchProduct(productId));
        })
        .catch(() => {
            dispatch(addProductError());
        });
    }
}

export const postProduct = (productId, product, currentPage) => {
    const url = `${baseUrl}/products/${productId}`;
    return dispatch => {
        axios.patch(url, product, {
            headers: requestHeaders,
        }).then(res => {
            dispatch(fetchProduct(productId));
            dispatch(fetchProducts(currentPage));
            dispatch(updateProduct(res.data));
        })
        .catch(() => {
            dispatch(updateProductError());
        });
    }
}

export const fetchProduct = (productId) => {
    const url = `${baseUrl}/products/${productId}`;
    return dispatch => {
        axios.get(url, {
            headers: requestHeaders,
        }).then(res => {
            dispatch(getProduct(res.data));
        })
        .catch(() => {
            dispatch(fetchProductError());
        });
    }
}

export const removeProduct = (productId, page) => {
    const url = `${baseUrl}/products/${productId}`;
    return dispatch => {
        axios.delete(url, {
            headers: requestHeaders,
        }).then(res => {
            dispatch(fetchProducts(page));
        })
        .catch(() => {
            dispatch(deleteProductError());
        });
    }
}

export const searchProductByName = (page, name) => {
    const itemsPerPage = 13;
    const searchParam = name && name.trim() !== '' ? `&name=${name}` : '';
    const url = `${baseUrl}/products?perPage=${itemsPerPage}&page=${page}${searchParam}&all=true`;
    return dispatch => {
        axios.get(url, {
            headers: requestHeaders,
            
        }).then(res => {
            res.data.page = page;
            dispatch(getProducts(res.data));
        })
        .catch(() => {
            dispatch(fetchProductsError());
        });
    }
}

export const fetchProducts = (page) => {
    const itemsPerPage = 13;
    const url = `${baseUrl}/products?perPage=${itemsPerPage}&page=${page}&all=true`;
    return dispatch => {
        axios.get(url, {
            headers: requestHeaders,
            
        }).then(res => {
            res.data.page = page;
            dispatch(getProducts(res.data));
        })
        .catch(() => {
            dispatch(fetchProductsError());
        });
    }
}