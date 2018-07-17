import React, { Component } from 'react';
import { connect } from 'react-redux'
import * as humanize from 'humanize';
import UpdateProductForm from  './updateProductForm';
import AddProductForm from  './addProductForm';
import { removeProduct } from '../../../actions/shopping/products';

class DisplayProductForm extends Component {

  state = {
    selectedProduct: this.props.selectedProduct,
    isEditing: false,
    showError: false,
    isAdding: false,
    errorMessage: '',
    page: this.props.page
  };

  componentWillReceiveProps(nextProps){
    this.setState({
      selectedProduct: nextProps.selectedProduct,
      isEditing: false,
      showError: nextProps.fetchError.trim() !== '',
      errorMessage: nextProps.fetchError,
      page: nextProps.page,
      isAdding: false,
    });
  }

  onBackButtonClick = () => {
    const currentState = this.state;
    currentState.selectedProduct = null;
    this.setState(currentState);
  }

  onAddButtonClick = () => {
    const currentState = this.state;
    currentState.isAdding = true;
    this.setState(currentState);
  }

  onEditButtonClick = () => {
    const currentState = this.state;
    currentState.isEditing = true;
    this.setState(currentState);
  }

  onCancelAddButtonClick = () => {
    const currentState = this.state;
    currentState.isAdding = false;
    this.setState(currentState);
  }

  onCancelEditButtonClick = () => {
    const currentState = this.state;
    currentState.isEditing = false;
    this.setState(currentState);
  }

  onDeleteProductClick = () => {
    if (this.props.removeProduct && this.state.selectedProduct && this.state.page) {
      const productId = this.state.selectedProduct._id;
      const page = this.state.page;
      this.props.removeProduct(productId, page);
    }
  }

  renderNoSelectedDisplay = () => {
    return (
      <div className="row">
        <div className="col-md-12">
          <div className="card">
            <div className="header">
                <div className="row">
                  <div className="col-md-4"></div>
                  <div className="col-md-4">
                    <p className="text-center">
                      <button
                        type="button"
                        onClick={() => this.onAddButtonClick()}
                        className="btn btn-wd btn-sm btn-success">
                        <span className="btn-label">
                          <i className="fa fa-plus"></i>
                        </span> Add Product
                      </button>
                    </p>

                    <p className="text-center">
                      To update a product, please select from the table below
                    </p>
                  </div>
                  <div className="col-md-4"></div>
                </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  renderNormalDisplay = (product) => {
    return (
      <div className="row">
        <div className="col-md-12">
          <div className="card">
            <div className="header">
              <div className="row">
                <div className="col-md-4">
                  <button
                    type="button"
                    className="btn btn-wd btn-sm btn-default"
                    onClick={() => this.onBackButtonClick()}>
                    <span className="btn-label">
                      <i className="fa fa-angle-left"></i>
                    </span> Back
                  </button>
                  <h4>Update Product</h4>
                  <p>Edit or delete selected product</p>
                </div>
                <div className="col-md-offset-5 col-md-3">
                  <div className="buttons-with-margin pull-right">
                    <button
                      type="button"
                      className="btn btn-wd btn-sm btn-info"
                      onClick={() => this.onEditButtonClick()}>
                      <span className="btn-label">
                        <i className="fa fa-edit"></i>
                      </span> Edit
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="content">
              <div className="row">
                <div className="col-md-6">
                  <div className="typo-line">
                    <h5>
                      <p className="category">Product ID:</p>
                      {product._id}
                    </h5>
                  </div>

                  <div className="typo-line">
                    <h5>
                      <p className="category">Product name:</p>
                      {product.name}
                    </h5>
                  </div>

                  <div className="typo-line">
                    <h5>
                      <p className="category">Product price:</p>
                      {`P ${humanize.numberFormat(product.price, 2, '.', ',')}`}
                    </h5>
                  </div>

                  <div className="typo-line">
                    <h5>
                      <p className="category">Brand:</p>
                      {product.brand && product.brand.name
                        ? product.brand.name
                        : ''}
                    </h5>
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="typo-line">
                    <h5>
                      <p className="category">Delivery days:</p>
                      {product.estimatedDeliveryDays ? `${product.estimatedDeliveryDays} day/s` : ''}
                    </h5>
                  </div>

                  <div className="typo-line">
                    <h5>
                      <p className="category">Inventory:</p>
                      {product.inventory}
                    </h5>
                  </div>

                  <div className="typo-line">
                    <h5>
                      <p className="category">Sold:</p>
                      {product.sold}
                    </h5>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  renderUpdateFormDisplay = (product) => {
    return (
      <div className="row">
        <div className="col-md-12">
          <div className="card">
            <div className="header">
              <div className="row">
                <div className="col-md-4">
                  <h4>Update Product</h4>
                  <p>Edit or delete selected product</p>
                </div>
                <div className="col-md-4"></div>
                <div className="col-md-4">
                  <div className="buttons-with-margin pull-right">
                    <button
                      type="button"
                      className="btn btn-wd btn-sm btn-danger"
                      onClick={() => this.onCancelEditButtonClick()}>
                      <span className="btn-label">
                        <i className="fa fa-times"></i>
                      </span> I don't want to edit anymore
                    </button>
                  </div>
                </div>
              </div>
            </div>
            
            <UpdateProductForm
              initialValues={product}
              dispatch={this.props.dispatch} />
          </div>
        </div>
      </div>
    );
  }

  renderAddFormDisplay = (page) => {
    const initialValues = {
      page
    };
    return (
      <div className="row">
        <div className="col-md-12">
          <div className="card">
            <div className="header">
              <div className="row">
                <div className="col-md-4">
                  <h4>Add New Product</h4>
                </div>
                <div className="col-md-4"></div>
                <div className="col-md-4">
                  <div className="buttons-with-margin pull-right">
                    <button
                      type="button"
                      className="btn btn-wd btn-sm btn-danger"
                      onClick={() => this.onCancelAddButtonClick()}>
                      <span className="btn-label">
                        <i className="fa fa-times"></i>
                      </span> I don't want to add anymore
                    </button>
                  </div>
                </div>
              </div>
            </div>
            
            <AddProductForm
              initialValues={initialValues}
              dispatch={this.props.dispatch} />
          </div>
        </div>
      </div>
    );
  }

  render() {
    const selectedProduct = this.state.selectedProduct;
    const page = this.state.page;

    if (this.state.isAdding) {
      return this.renderAddFormDisplay(page);
    }

    if (selectedProduct) {
      if (this.state.isEditing) {
        return this.renderUpdateFormDisplay(selectedProduct);
      }

      return this.renderNormalDisplay(selectedProduct);
    }

    return this.renderNoSelectedDisplay();
  }
}

const mapStateToProps = state => ({
  selectedProduct: state.products.selectedProduct,
  page: state.products.page,
  fetchError: state.products.error && state.products.error.message
    ? state.products.error.message
    : ''
})

const mapDispatchToProps = dispatch => ({
  dispatch: dispatch,
  removeProduct: (productId, page) => dispatch(removeProduct(productId, page))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DisplayProductForm)