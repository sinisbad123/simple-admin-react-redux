import React from 'react';
import { Field, reduxForm } from 'redux-form';
import renderField from 'components/FormInputs/renderField';
import BrandsMultiSelect from './brandsMultiselect';
import { updateCategorySubmit } from './categorySubmit';

const categoryName = name => {
  return !name || name.trim() === '' ? 'Category name is required' : undefined;
}

const brandsListValidate = brands => {
  console.log('brands', brands);
  return !brands || !Array.isArray(brands) || brands.length === 0 ? 'Brands are required' : undefined;
}

const imageUrl = url => {
  return !url || url.toLowerCase().match(/\.(jpeg|jpg|gif|png)$/) === null ? 'Image URL is not correct' : undefined;
}


const UpdateBrandForm = props => {
  const { error, handleSubmit, pristine, submitting, dispatch } = props;
  return (
    <div className="content">
      <form
        className="form-horizontal"
        onSubmit={handleSubmit(updateCategorySubmit, dispatch)}
        >

        <div className="form-group">
          <label className="control-label col-md-3">Category Name</label>
          <div className="col-md-9">
            <Field
              name="name"
              type="text"
              placeholder="Category name"
              validate={[categoryName]}
              component={renderField} />
          </div>
        </div>

        <div className="form-group">
          <label className="control-label col-md-3">Brands</label>
          <div className="col-md-9">
            <Field
              name="brands"
              type="text"
              validate={[brandsListValidate]}
              component={BrandsMultiSelect} />
          </div>
        </div>

        <div className="form-group">
          <label className="control-label col-md-3">Image URL</label>
          <div className="col-md-9">
            <Field
              name="image"
              type="text"
              validate={[imageUrl]}
              placeholder="Image URL"
              component={renderField} />
          </div>
        </div>

        <div className="form-group">
          <label className="control-label col-md-3">Priority</label>
          <div className="col-md-9">
            <Field
              name="priority"
              type="number"
              component={renderField} />
          </div>
          <label className="control-label text-success col-md-3">optional</label>
          <p>* Note: The higher the number of priority, it will have more priority to be displayed within the app.</p>
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

export default reduxForm({
  form: 'ADD_PRODUCT'
})(UpdateBrandForm);