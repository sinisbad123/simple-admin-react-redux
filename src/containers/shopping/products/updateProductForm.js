import React from 'react';
import { Field, FieldArray, reduxForm } from 'redux-form';
import renderField from 'components/FormInputs/renderField';
import BrandsDropdown from './brandsDropdown';
import ShopsMultiSelect from './shopsMultiselect';
import CategoriesMultiSelect from './categoriesMultiselect';
import { updateProductSubmit } from './productSubmit';

const isValidUrl = url => {
  return(url && url.toLowerCase().match(/\.(jpeg|jpg|gif|png)$/) != null);
}

const productName = name => {
  return !name || name.trim() === '' ? 'Product name is required' : undefined;
}

const modelId = text => {
  return !text || text.trim() === '' ? 'Model ID is required' : undefined;
}

const categories = categories => {
  return !categories || !Array.isArray(categories) || categories.length === 0 ? 'Categories are required' : undefined;
}

const brand = item => {
  return !item ? 'Brand is required' : undefined;
}

const shops = items => {
  return !items || !Array.isArray(items) || items.length === 0 ? 'Shops are required' : undefined;
}

const thumbnail = url => {
  return !url || url.toLowerCase().match(/\.(jpeg|jpg|gif|png)$/) === null ? 'Thumbnail URL is required' : undefined;
}

const productDescription = description => {
  return !description || description.trim() === '' ? 'Product description is required' : undefined;
}

const productImages = images => {
  if (images && Array.isArray(images) && images.length !== 0) {
    let hasInvalidUrl = false;
    images.map(image => {
      if (isValidUrl(image)) {
        return null;
      }

      hasInvalidUrl = true;
      return null;
    });

    if (hasInvalidUrl) {
      return 'Please make sure all image URLs are correct';
    }
  }

  return undefined;
}

const productPrice = price => {
  return !price || isNaN(price) ? 'Product price is required' : undefined;
}

const estimatedDeliveryDays = days => {
  return !days || isNaN(days) ? 'Esitmate delivery days is required' : undefined;
}

const inventory = stock => {
  return !stock || isNaN(stock) ? 'Inventory is required' : undefined;
}

const UpdateProductForm = props => {
  const { error, handleSubmit, pristine, submitting, dispatch } = props;
  return (
    <div className="content">
      <form
        className="form-horizontal"
        onSubmit={handleSubmit(updateProductSubmit, dispatch)}
        >
        <div className="form-group">
          <label className="control-label col-md-3">Product Name</label>
          <div className="col-md-9">
            <Field
              name="name"
              type="text"
              placeholder="Product name"
              validate={[productName]}
              component={renderField} />
          </div>
        </div>

        <div className="form-group">
          <label className="control-label col-md-3">Model ID</label>
          <div className="col-md-9">
            <Field
              name="modelId"
              type="text"
              validate={[modelId]}
              placeholder="e.g. GTX 1050, MT5000"
              component={renderField} />
          </div>
        </div>

        <div className="form-group">
          <label className="control-label col-md-3">Category</label>
          <div className="col-md-9">
          <Field
              name="categories"
              valueField="id"
              textField="name"
              type="text"
              validate={[categories]}
              component={CategoriesMultiSelect} />
          </div>
        </div>

        <div className="form-group">
          <label className="control-label col-md-3">Brands</label>
          <div className="col-md-9">
            <Field
              name="brand"
              valueField="_id"
              textField="name"
              type="text"
              validate={[brand]}
              forAdding={true}
              component={BrandsDropdown} />
          </div>
        </div>

        <div className="form-group">
          <label className="control-label col-md-3">Shops</label>
          <div className="col-md-9">
            <Field
              name="shopLists"
              valueField="_id"
              textField="name"
              type="text"
              validate={[shops]}
              component={ShopsMultiSelect} />
          </div>
        </div>

        <div className="form-group">
          <label className="control-label col-md-3">Product thumbnail</label>
          <div className="col-md-9">
            <Field
              name="thumbnail"
              type="text"
              validate={[thumbnail]}
              placeholder="Product thumbnail URL"
              component={renderField} />
          </div>
        </div>

        <div className="form-group">
          <label className="control-label col-md-3">Image URLs</label>
          <div className="col-md-9">
            <FieldArray name="images" validate={[productImages]} component={renderImageUrls} />
          </div>
        </div>

        <div className="form-group">
          <label className="control-label col-md-3">Product Description</label>
          <div className="col-md-9">
            <Field
              name="description"
              type="textarea"
              validate={[productDescription]}
              component={renderField} />
          </div>
        </div>

        <div className="form-group">
          <label className="control-label col-md-3">Product Price</label>
          <div className="col-md-9">
            <Field
              name="price"
              validate={[productPrice]}
              type="number"
              component={renderField} />
          </div>
        </div>

        <div className="form-group">
          <label className="control-label col-md-3">Estimated Delivery Timeframe</label>
          <div className="col-md-9">
            <Field
              name="estimatedDeliveryDays"
              type="number"
              validate={[estimatedDeliveryDays]}
              component={renderField} />
          </div>
        </div>

        <div className="form-group">
          <label className="control-label col-md-3">Inventory</label>
          <div className="col-md-9">
            <Field
              name="inventory"
              type="number"
              validate={[inventory]}
              component={renderField} />
          </div>
        </div>

        <div className="form-group">
          <div className="col-md-9">
            {error && <strong>{error}</strong>}
          </div>
        </div>

        <button type="submit" className="btn btn-info" disabled={pristine || submitting}>Submit</button>
      </form>
    </div>
  );
}

const renderError = (error) => {
  if (error) {
      return (
          <label className="error">{error}</label>
      );
  }

  return null;
}

const renderImageUrls = ({fields, meta: {error, submitFailed}}) => {
  const errorMessage = renderError(error);

  return (
    <div>
      <button
        type="button"
        className="btn btn-default"
        onClick={() => fields.push(null)}>
        Add URL
      </button>
      {fields.map((url, idx) => (
        <div key={idx} className="row">
          <div className="col-md-10">
            <Field
              name={`${url ? url : ''}`}
              type="text"
              component={renderField} />
          </div>
          <div className="col-md-2">
            <button
              type="button"
              className="btn btn-danger"
              onClick={() => fields.remove(idx)}>
              <i className="fa fa-trash"></i>
            </button>
          </div>
        </div>
      ))}

      {errorMessage}
    </div>
  );
}

export default reduxForm({
  form: 'ADD_PRODUCT'
})(UpdateProductForm);