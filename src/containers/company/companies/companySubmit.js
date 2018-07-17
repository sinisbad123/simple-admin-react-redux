import { SubmissionError, reset } from 'redux-form';
import { submitCompany, updateCompany, updateCompanyLogin } from '../../../actions/company/companies';

const isValidText = text => {
    return text && text.trim() !== '';
}

const isValidPassword = password => {
    const regex = new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/);
    return regex.exec(password);
}

const isValidNumber = number => {
    return !isNaN(parseFloat(number)) && isFinite(number);
}

const isValidDateNumber = number => {
    return number && !isNaN(parseFloat(number)) && isFinite(number) && number >= 1 && number <= 31;
}

const isValidUrl = url => {
    return(url && url.match(/\.(jpeg|jpg|gif|png)$/) != null);
}

export function addCompanySubmit(values, dispatch) {
    if (!isValidText(values.name)) {
        throw new SubmissionError({
            payload: values.name,
            _error: 'Company name is required'
        })
    }

    if (!isValidText(values.short_name)) {
        throw new SubmissionError({
            payload: values.short_name,
            _error: 'Short name is required'
        })
    }

    if (!isValidPassword(values.password)) {
        throw new SubmissionError({
            payload: values.password,
            _error: 'Password should contain eight characters, at least one uppercase letter, one lowercase letter and one number'
        })
    }

    if (!isValidText(values.email)) {
        throw new SubmissionError({
            payload: values.email,
            _error: 'Email is required'
        })
    }


    if (!isValidText(values.contact_number)) {
        throw new SubmissionError({
            payload: values.contact_number,
            _error: 'Contact number is required'
        })
    }

    if (!isValidText(values.address)) {
        throw new SubmissionError({
            payload: values.address,
            _error: 'Address is required'
        })
    }

    if (!isValidNumber(values.number_of_employees)) {
        throw new SubmissionError({
            payload: values.number_of_employees,
            _error: 'Number of employees is required'
        })
    }
    
    if (!values.company_type) {
        throw new SubmissionError({
            payload: values.company_type,
            _error: 'Company type is required'
        })
    }

    if (!isValidDateNumber(values.date_one) && !isValidDateNumber(values.date_two)) {
        throw new SubmissionError({
            payload: {
                date_one: values.date_one,
                date_two: values.date_two
            },
            _error: 'Dates are required. Please make sure both are ranging from 1-31.'
        })
    }

    if (values.logo_url) {
        if (!isValidUrl(values.logo_url)) {
            throw new SubmissionError({
                payload: values.logo_url,
                _error: 'Logo URL is invalid'
            })
        }
    }

    values.date_one = parseFloat(values.date_one);
    values.date_two = parseFloat(values.date_two);
    
    const company = values;

    dispatch(submitCompany(company));
    return;
}

export function updateLoginSubmit(values, dispatch) {
    if (!isValidText(values.new_email)) {
        throw new SubmissionError({
            payload: values.new_email,
            _error: 'Email field is required'
        })
    }

    if (!isValidText(values.password) || !isValidText(values.passwordVerify)) {
        throw new SubmissionError({
            payload: {
                password: values.password,
                verify_password: values.verify_password
            },
            _error: 'Password should not be empty and should be the same.'
        })
    }

    if (values.password !== values.passwordVerify) {
        throw new SubmissionError({
            payload: {
                password: values.password,
                verify_password: values.verify_password
            },
            _error: 'Please double check your password input, they are not the same.'
        })
    }
    
    const company = {
        email: values.new_email,
        currentEmail: values.email,
        password: values.password,
        passwordVerify: values.passwordVerify,
    };

    dispatch(updateCompanyLogin(values.id, company));
    return;
}

export function updateCompanySubmit(values, dispatch) {
    if (!isValidText(values.name)) {
        throw new SubmissionError({
            payload: values.name,
            _error: 'Company name is required'
        })
    }

    if (!isValidText(values.short_name)) {
        throw new SubmissionError({
            payload: values.short_name,
            _error: 'Short name is required'
        })
    }

    if (!isValidText(values.address)) {
        throw new SubmissionError({
            payload: values.address,
            _error: 'Address is required'
        })
    }

    if (!isValidNumber(values.number_of_employees)) {
        throw new SubmissionError({
            payload: values.number_of_employees,
            _error: 'Number of employees is required'
        })
    }
    
    if (!values.company_type) {
        throw new SubmissionError({
            payload: values.company_type,
            _error: 'Company type is required'
        })
    }

    if (values.logo_url) {
        if (!isValidUrl(values.logo_url)) {
            throw new SubmissionError({
                payload: values.logo_url,
                _error: 'Logo URL is invalid'
            })
        }
    }
    
    const company = values;

    dispatch(updateCompany(company));
    reset();
    return;
}

export function updateCompanyStatusSubmit(values, dispatch) {
    if (!isValidText(values.name)) {
        throw new SubmissionError({
            payload: values.name,
            _error: 'Company name is required'
        })
    }

    if (!isValidText(values.short_name)) {
        throw new SubmissionError({
            payload: values.short_name,
            _error: 'Short name is required'
        })
    }

    if (!isValidText(values.address)) {
        throw new SubmissionError({
            payload: values.address,
            _error: 'Address is required'
        })
    }

    if (!isValidNumber(values.number_of_employees)) {
        throw new SubmissionError({
            payload: values.number_of_employees,
            _error: 'Number of employees is required'
        })
    }
    
    if (!values.company_type) {
        throw new SubmissionError({
            payload: values.company_type,
            _error: 'Company type is required'
        })
    }

    if (values.logo_url) {
        if (!isValidUrl(values.logo_url)) {
            throw new SubmissionError({
                payload: values.logo_url,
                _error: 'Logo URL is invalid'
            })
        }
    }
    
    const company = values;

    dispatch(updateCompany(company));
    reset();
    return;
}