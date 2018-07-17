import { SubmissionError } from 'redux-form'
import { postOrder } from '../../../actions/shopping/orders';
import moment from 'moment'

const isValidText = text => {
    return text && text.trim() !== '';
}

const isValidDate = date => {
    const momentDate = moment(date);
    return momentDate.isValid();
}

const isValidUrl = url => {
    return(url && url.toLowerCase().match(/\.(jpeg|jpg|gif|png)$/) != null);
}

function submit(values, dispatch) {
    if (!isValidDate(values.deliveryDate)) {
        throw new SubmissionError({
            payload: values.deliveryDate,
            _error: 'Date is either empty or invalid'
        })
    }

    if (!isValidText(values.deliveryAddress)) {
        throw new SubmissionError({
            payload: values.deliveryAddress,
            _error: 'Address is required'
        })
    }

    if (values.receipt && !isValidUrl(values.receipt)) {
        throw new SubmissionError({
            payload: values.receipt,
            _error: 'URL must be an image'
        })
    }

    const refNo = values.refNumber;
    const productIds = values.products.map(product => {
        return product._id;
    });
    const order = {
        deliveryAddress: values.deliveryAddress,
        deliveryDate: values.deliveryDate,
        products: productIds,
        notes: values.notes,
        receipt: values.receipt
    };

    dispatch(postOrder(refNo, order));
}

export default submit