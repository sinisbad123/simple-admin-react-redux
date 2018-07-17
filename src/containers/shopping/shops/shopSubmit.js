import { SubmissionError, reset } from 'redux-form';
import { submitShop, editShop } from '../../../actions/shopping/shops';

const isValidText = text => {
    return text && text.trim() !== '';
}

export function addShopSubmit(values, dispatch) {
    if (!isValidText(values.name)) {
        throw new SubmissionError({
            payload: values.name,
            _error: 'Shop name is required'
        })
    }
    
    const currentPage = values.page;

    const shop = {
        name: values.name,
        code: values.name.trim().replace(' ', '-').toLowerCase(),
        city: isValidText(values.city) ? values.city : '-',
        address: isValidText(values.address) ? values.address : '-',
        tel: isValidText(values.tel) ? values.tel : '-',
        poc: isValidText(values.poc) ? values.poc : '-',
        memo: values.memo,
    };

    dispatch(submitShop(shop, currentPage));
    reset();
    return;
}

export function updateShopSubmit(values, dispatch) {
    if (!isValidText(values.name)) {
        throw new SubmissionError({
            payload: values.name,
            _error: 'Shop name is required'
        })
    }
    
    const currentPage = values.page;
    const shopId = values.id;

    const shop = {
        name: values.name,
        code: values.name.trim().replace(' ', '-').toLowerCase(),
        city: isValidText(values.city) ? values.city : '-',
        address: isValidText(values.address) ? values.address : '-',
        tel: isValidText(values.tel) ? values.tel : '-',
        poc: isValidText(values.poc) ? values.poc : '-',
        memo: values.memo,
    };

    dispatch(editShop(shopId, shop, currentPage));
    reset();
    return;
}