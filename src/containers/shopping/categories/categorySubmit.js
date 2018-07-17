import { SubmissionError, reset } from 'redux-form';
import { submitCategory, editCategory } from '../../../actions/shopping/categories';

const isValidText = text => {
    return text && text.trim() !== '';
}

const isValidNumber = number => {
    return !isNaN(parseFloat(number)) && isFinite(number);
}

const isValidUrl = url => {
    return(url && url.toLowerCase().match(/\.(jpeg|jpg|gif|png)$/) != null);
}

export function addCategorySubmit(values, dispatch) {
    if (!isValidText(values.name)) {
        throw new SubmissionError({
            payload: values.name,
            _error: 'Category name is required'
        })
    }

    if (!isValidUrl(values.image)) {
        throw new SubmissionError({
            payload: values.image,
            _error: 'Image URL is not correct'
        })
    }

    if (values.brands && values.brands.length === 0) {
        throw new SubmissionError({
            payload: values.images,
            _error: 'Please select at least a brand that belongs to this category.'
        })
    }

    if (values.priority && !isValidNumber(values.priority)) {
        throw new SubmissionError({
            payload: values.priority,
            _error: 'Please provide a valid number for priority.'
        })
    }
    
    const currentPage = values.page;
    const priority = values.priority || 0;
    const brands = values.brands.map(brand => {
        return brand._id;
    });

    const category = {
        name: values.name,
        image: values.image,
        brands,
        specFilter: [],
        code: values.name.toLowerCase().replace(' ', '_'),
        priority
    };

    dispatch(submitCategory(category, currentPage));
    reset();
    return;
}

export function updateCategorySubmit(values, dispatch) {
    if (!isValidText(values.name)) {
        throw new SubmissionError({
            payload: values.name,
            _error: 'Category name is required'
        })
    }

    if (!isValidUrl(values.image)) {
        throw new SubmissionError({
            payload: values.image,
            _error: 'Image URL is not correct'
        })
    }

    if (values.priority && !isValidNumber(values.priority)) {
        throw new SubmissionError({
            payload: values.priority,
            _error: 'Please provide a valid number for priority.'
        })
    }

    const categoryId = values.id;
    const priority = values.priority || 0;
    const brands = values.brands.map(brand => {
        return brand._id;
    });
    const currentPage = values.page;

    const category = {
        name: values.name,
        image: values.image,
        brands,
        specFilter: [],
        code: values.name.toLowerCase().replace(' ', '_'),
        priority
    };

    dispatch(editCategory(categoryId, category, currentPage));
    return;
}

export default addCategorySubmit