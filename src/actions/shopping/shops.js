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

export const getShops = shops => ({
    type: 'GET_SHOPS',
    shops
});

export const getShop = shop => ({
    type: 'GET_SHOP',
    shop
})

export const fetchShopError = () => ({
    type: 'FETCH_SHOP_ERROR',
    error: {
        message: 'There is a problem fetching the record. Please try selecting again.'
    },
})

export const fetchShopsError = () => ({
    type: 'FETCH_SHOPS_ERROR',
    error: {
        message: 'There is a problem fetching the records. Please try selecting again.'
    },
});

export const addShopError = () => ({
    type: 'ADD_SHOP_ERROR',
    error: {
        message: 'There is a problem adding the record. Please try again.'
    },
})

export const editShopError = () => ({
    type: 'EDIT_SHOP_ERROR',
    error: {
        message: 'There is a problem updating the record. Please try again.'
    },
})

export const deleteShopError = () => ({
    type: 'DELETE_SHOP_ERROR',
    error: {
        message: 'There is a problem deleting the record. Please try again.'
    },
})

export const submitShop = (shop, currentPage) => {
    const url = `${baseUrl}/shops`;
    return dispatch => {
        axios.post(url, shop, {
            headers: requestHeaders,
        }).then(res => {
            const shopId = res.data.id;
            dispatch(fetchShops(currentPage));
            dispatch(fetchShop(shopId));
        })
        .catch(() => {
            dispatch(addShopError());
        });
    }
}

export const editShop = (shopId, shop , currentPage) => {
    const url = `${baseUrl}/shops/${shopId}`;
    return dispatch => {
        axios.patch(url, shop, {
            headers: requestHeaders,
        }).then(res => {
            dispatch(fetchShops(currentPage));
            dispatch(fetchShop(shopId));
        })
        .catch(() => {
            dispatch(editShopError());
        });
    }
}

export const fetchShop = (shopId) => {
    const url = `${baseUrl}/shops/${shopId}`;
    return dispatch => {
        axios.get(url, {
            headers: requestHeaders,
        }).then(res => {
            dispatch(getShop(res.data));
        })
        .catch(() => {
            dispatch(fetchShopError());
        });
    }
}

export const fetchShops = (page, itemsPerPage = 100) => {
    const url = `${baseUrl}/shops?perPage=${itemsPerPage}&page=${page}`;
    return dispatch => {
        axios.get(url, {
            headers: requestHeaders,
        }).then(res => {
            res.data.page = page;
            dispatch(getShops(res.data));
        })
        .catch(() => {
            dispatch(fetchShopsError());
        });
    }
}

export const removeShops = (shopId, page) => {
    const url = `${baseUrl}/shops/${shopId}`;
    return dispatch => {
        axios.delete(url, {
            headers: requestHeaders,
        }).then(res => {
            dispatch(fetchShops(page));
        })
        .catch(() => {
            dispatch(deleteShopError());
        });
    }
}