import { SubmissionError, reset } from 'redux-form';
import { submitProduct, postProduct } from '../../../actions/shopping/products';

const isValidText = text => {
    return text && text.trim() !== '';
}

const isValidNumber = number => {
    return !isNaN(parseFloat(number)) && isFinite(number);
}

const isValidUrl = url => {
    return(url && url.toLowerCase().match(/\.(jpeg|jpg|gif|png)$/) != null);
}

export function addProductSubmit(values, dispatch) {
    if (!isValidText(values.name)) {
        throw new SubmissionError({
            payload: values.name,
            _error: 'Product name is required'
        })
    }

    if (!isValidText(values.modelId)) {
        throw new SubmissionError({
            payload: values.modelId,
            _error: 'Description is required'
        })
    }

    if (!isValidText(values.description)) {
        throw new SubmissionError({
            payload: values.description,
            _error: 'Description is required'
        })
    }

    if ((!Array.isArray(values.categories)) || (Array.isArray(values.categories) && values.categories.length === 0)) {
        throw new SubmissionError({
            _error: 'Categories is required'
        })
    }

    if (!values.brands) {
        throw new SubmissionError({
            _error: 'Brand is required'
        })
    }

    if (!values.shopLists || values.shopLists.length === 0) {
        throw new SubmissionError({
            payload: values.shopLists,
            _error: 'Shop list is required'
        })
    }

    if (!isValidNumber(values.estimatedDeliveryDays)) {
        throw new SubmissionError({
            payload: values.estimatedDeliveryDays,
            _error: 'Estimated delivery days is required'
        })
    }

    if (!isValidUrl(values.thumbnail)) {
        throw new SubmissionError({
            payload: values.thumbnail,
            _error: 'Product thumbnail is required'
        })
    }

    let hasInvalidImageUrl = false;
    if (values.images.length > 0) {
        values.images.map(url => {
            if (!isValidUrl(url)) {
                hasInvalidImageUrl = true;
            }
        });

        if (hasInvalidImageUrl) {
            throw new SubmissionError({
                payload: values.images,
                _error: 'Please make sure all URLs points to their respective images.'
            })
        }
    }

    if (!isValidNumber(values.price)) {
        throw new SubmissionError({
            payload: values.price,
            _error: 'Product price is required'
        })
    }

    if (!isValidNumber(values.inventory)) {
        throw new SubmissionError({
            payload: values.inventory,
            _error: 'Inventory is required'
        })
    }
    
    const currentPage = values.page;
    const shopIds = values.shopLists.map(shop => {
        return shop._id;
    });
    const categoryIds = values.categories.map(category => {
        return category.id;
    });

    const product = {
        brand: values.brands._id,
        categories: categoryIds,
        code: values.name.toLowerCase(),
        name: values.name,
        description: values.description,
        price: parseFloat(Number(values.price).toFixed(2)),
        inventory: parseFloat(values.inventory),
        modelId: values.modelId,
        thumbnail: values.thumbnail,
        images: values.images,
        shopLists: shopIds,
        estimatedDeliveryDays: parseFloat(values.estimatedDeliveryDays)
    };

    dispatch(submitProduct(product, currentPage));
    reset();
    return;
}

export function updateProductSubmit(values, dispatch) {
    if (!isValidText(values.name)) {
        throw new SubmissionError({
            payload: values.name,
            _error: 'Product name is required'
        })
    }

    if (!isValidText(values.modelId)) {
        throw new SubmissionError({
            payload: values.modelId,
            _error: 'Model ID is required'
        })
    }

    if (!isValidText(values.description)) {
        throw new SubmissionError({
            payload: values.description,
            _error: 'Description is required'
        })
    }

    if (!values.shopLists || values.shopLists.length === 0) {
        throw new SubmissionError({
            payload: values.shopLists,
            _error: 'Shop list is required'
        })
    }

    if (!isValidNumber(values.estimatedDeliveryDays)) {
        throw new SubmissionError({
            payload: values.estimatedDeliveryDays,
            _error: 'Estimated delivery days is required'
        })
    }

    if (!isValidUrl(values.thumbnail)) {
        throw new SubmissionError({
            payload: values.thumbnail,
            _error: 'Product thumbnail is required'
        })
    }

    let hasInvalidImageUrl = false;
    if (values.images.length > 0) {
        values.images.map(url => {
            if (!isValidUrl(url)) {
                hasInvalidImageUrl = true;
            }
        });

        if (hasInvalidImageUrl) {
            throw new SubmissionError({
                payload: values.images,
                _error: 'Please make sure all URLs points to their respective images.'
            })
        }
    }

    if (!isValidNumber(values.price)) {
        throw new SubmissionError({
            payload: values.price,
            _error: 'Product price is required'
        })
    }

    if (!isValidNumber(values.inventory)) {
        throw new SubmissionError({
            payload: values.inventory,
            _error: 'Inventory is required'
        })
    }

    if (!Array.isArray(values.categories) && values.categories.length === 0) {
        throw new SubmissionError({
            payload: values.categories,
            _error: 'Categories is required'
        })
    }

    const productId = values._id;
    const shopIds = values.shopLists.map(shop => {
        return shop._id;
    });
    const categoryIds = values.categories.map(category => {
        return category.id;
    });
    const currentPage = values.page;

    const product = {
        brand: values.brand._id,
        categories: categoryIds,
        name: values.name,
        description: values.description,
        price: parseFloat(values.price),
        inventory: parseFloat(values.inventory),
        modelId: values.modelId,
        thumbnail: values.thumbnail,
        images: values.images,
        shopLists: shopIds,
        estimatedDeliveryDays: parseFloat(values.estimatedDeliveryDays)
    };

    dispatch(postProduct(productId, product, currentPage));
    return;
}

export default addProductSubmit