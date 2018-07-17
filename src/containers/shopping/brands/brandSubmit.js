import { SubmissionError, reset } from 'redux-form';
import { submitBrand, editBrand } from '../../../actions/shopping/brands';

const isValidText = text => {
    return text && text.trim() !== '';
}

export function addBrandSubmit(values, dispatch) {
    if (!isValidText(values.name)) {
        throw new SubmissionError({
            payload: values.name,
            _error: 'Brand name is required'
        })
    }
    
    const currentPage = values.page;

    const brand = {
        name: values.name,
    };

    dispatch(submitBrand(brand, currentPage));
    reset();
    return;
}

export function updateBrandSubmit(values, dispatch) {
    if (!isValidText(values.name)) {
        throw new SubmissionError({
            payload: values.name,
            _error: 'Brand name is required'
        })
    }

    const brandId = values.id;
    const currentPage = values.page;

    const brand = {
        name: values.name,
    };

    dispatch(editBrand(brandId, brand, currentPage));
    return;
}