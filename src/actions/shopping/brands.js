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

export const getBrands = brands => ({
    type: 'GET_BRANDS',
    brands
})

export const getBrandsWithCategory = brands => ({
    type: 'GET_BRANDS_WITH_CATEGORY',
    brands
})

export const getBrand = brand => ({
    type: 'GET_BRAND',
    brand
})

export const fetchBrandError = () => ({
    type: 'FETCH_BRAND_ERROR',
    error: {
        message: 'There is a problem fetching the record. Please try selecting again.'
    },
})

export const fetchBrandsError = () => ({
    type: 'FETCH_BRANDS_ERROR',
    error: {
        message: 'There is a problem fetching the records. Please try selecting again.'
    },
})

export const addBrandError = () => ({
    type: 'ADD_BRAND_ERROR',
    error: {
        message: 'There is a problem adding the record. Please try again.'
    },
})

export const editBrandError = () => ({
    type: 'EDIT_BRAND_ERROR',
    error: {
        message: 'There is a problem updating the record. Please try again.'
    },
})

export const deleteBrandError = () => ({
    type: 'DELETE_BRAND_ERROR',
    error: {
        message: 'There is a problem deleting the record. Please try again.'
    },
})

export const submitBrand = (brand, currentPage) => {
    const url = `${baseUrl}/brands`;
    return dispatch => {
        axios.post(url, brand, {
            headers: requestHeaders,
        }).then(res => {
            const categoryId = res.data.id;
            dispatch(fetchBrands(currentPage));
            dispatch(fetchBrand(categoryId));
        })
        .catch(() => {
            dispatch(addBrandError());
        });
    }
}

export const editBrand = (brandId, brand , currentPage) => {
    const url = `${baseUrl}/brands/${brandId}`;
    return dispatch => {
        axios.patch(url, brand, {
            headers: requestHeaders,
        }).then(res => {
            dispatch(fetchBrands(currentPage));
            dispatch(fetchBrand(brandId));
        })
        .catch(() => {
            dispatch(editBrandError());
        });
    }
}

export const fetchBrand = (brandId) => {
    const url = `${baseUrl}/brands/${brandId}`;
    return dispatch => {
        axios.get(url, {
            headers: requestHeaders,
        }).then(res => {
            dispatch(getBrand(res.data));
        })
        .catch(() => {
            dispatch(fetchBrandError());
        });
    }
}

export const fetchBrands = (page) => {
    const itemsPerPage = 13;
    const url = `${baseUrl}/brands?all=true&perPage=${itemsPerPage}&page=${page}`;
    return dispatch => {
        axios.get(url, {
            headers: requestHeaders,
        }).then(res => {
            res.data.page = page;
            dispatch(getBrands(res.data));
        })
        .catch(() => {
            dispatch(fetchBrandsError());
        });
    }
}

export const fetchBrandsWithCategory = (page) => {
    const itemsPerPage = 100;
    const url = `${baseUrl}/brands?page=${page}&perPage=${itemsPerPage}`;
    return dispatch => {
        axios.get(url, {
            headers: requestHeaders,
        }).then(res => {
            res.data.page = page;
            dispatch(getBrandsWithCategory(res.data));
        })
        .catch(() => {
            dispatch(fetchBrandsError());
        });
    }
}

export const fetchAllBrands = () => {
    const url = `${baseUrl}/brands?all=true&perPage=${Number.MAX_SAFE_INTEGER}`;
    return dispatch => {
        axios.get(url, {
            headers: requestHeaders,
        }).then(res => {
            dispatch(getBrands(res.data));
        })
        .catch(() => {
            dispatch(fetchBrandsError());
        });
    }
}

export const removeBrand = (brandId, page) => {
    const url = `${baseUrl}/brands/${brandId}`;
    return dispatch => {
        axios.delete(url, {
            headers: requestHeaders,
        }).then(res => {
            dispatch(fetchBrands(page));
        })
        .catch(() => {
            dispatch(deleteBrandError());
        });
    }
}