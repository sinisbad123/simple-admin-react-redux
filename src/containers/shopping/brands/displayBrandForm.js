import React, { Component } from 'react';
import { connect } from 'react-redux'
import UpdateBrandForm from  './updateBrandForm';
import AddBrandForm from  './addBrandForm';
import Alert from 'sweetalert-react';
import { removeBrand } from '../../../actions/shopping/brands';

class DisplayBrandForm extends Component {

  state = {
    selectedBrand: this.props.selectedBrand,
    isEditing: false,
    showError: false,
    isAdding: false,
    errorMessage: '',
    page: this.props.page
  };

  componentWillReceiveProps(nextProps){
    this.setState({
      selectedBrand: nextProps.selectedBrand,
      isEditing: false,
      showError: nextProps.fetchError.trim() !== '',
      errorMessage: nextProps.fetchError,
      page: nextProps.page,
      isAdding: false,
    });
  }

  onBackButtonClick = () => {
    const currentState = this.state;
    currentState.selectedBrand = null;
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

  onDeleteButtonClick = () => {
    if (this.props.removeBrand && this.state.selectedBrand && this.state.page) {
      const brandId = this.state.selectedBrand.id;
      const page = this.state.page;
      this.props.removeBrand(brandId, page);
    }
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

  renderNoSelectedDisplay = () => {
    return (
      <div className="row">
        <div className="col-md-12">
          <div className="card">
            <div className="header">
              <Alert
                title=""
                show={this.state.showError}
                text={this.state.errorMessage}
                onConfirm={() => this.setState({ showError: false })} />

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
                        </span> Add Brand
                      </button>
                    </p>

                    <p className="text-center">
                      To update a brand, please select from the table below
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

  renderNormalDisplay = (brand) => {
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
                  <h4>Update Brand</h4>
                  <p>Edit or delete selected brand</p>
                </div>
                <div className="col-md-4">
                  <Alert
                    title=""
                    show={this.state.showError}
                    text={this.state.errorMessage}
                    onConfirm={() => this.setState({ showError: false })} />
                </div>
                <div className="col-md-4">
                  <div className="buttons-with-margin pull-right">
                    <button
                      type="button"
                      className="btn btn-wd btn-sm btn-info"
                      onClick={() => this.onEditButtonClick()}>
                      <span className="btn-label">
                        <i className="fa fa-edit"></i>
                      </span> Edit
                    </button>

                    <button
                      type="button"
                      className="btn btn-wd btn-sm btn-danger"
                      onClick={() => this.onDeleteButtonClick()}>
                      <span className="btn-label">
                        <i className="fa fa-times"></i>
                      </span> Delete Brand
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
                      <p className="category">Brand name:</p>
                      {brand.name}
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

  renderUpdateFormDisplay = (brand) => {
    brand.page = this.state.page;
    return (
      <div className="row">
        <div className="col-md-12">
          <div className="card">
            <div className="header">
              <div className="row">
                <div className="col-md-4">
                  <h4>Update Brand</h4>
                  <p>Edit or delete selected brand</p>
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

              <div className="row">
                <Alert
                    title=""
                    show={this.state.showError}
                    text={this.state.errorMessage}
                    onConfirm={() => this.setState({ showError: false })} />
              </div>
            </div>
            
            <UpdateBrandForm
              initialValues={brand}
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
                  <h4>Add New Brand</h4>
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

              <div className="row">
                <Alert
                    title=""
                    show={this.state.showError}
                    text={this.state.errorMessage}
                    onConfirm={() => this.setState({ showError: false })} />
              </div>
            </div>
            
            <AddBrandForm
              initialValues={initialValues}
              dispatch={this.props.dispatch} />
          </div>
        </div>
      </div>
    );
  }

  render() {
    const selectedBrand = this.state.selectedBrand;
    const page = this.state.page;

    if (this.state.isAdding) {
      return this.renderAddFormDisplay(page);
    }

    if (selectedBrand) {
      if (this.state.isEditing) {
        return this.renderUpdateFormDisplay(selectedBrand);
      }

      return this.renderNormalDisplay(selectedBrand);
    }

    return this.renderNoSelectedDisplay();
  }
}

const mapStateToProps = state => ({
  selectedBrand: state.brands.selectedBrand,
  page: state.brands.page,
  fetchError: state.brands.error && state.brands.error.message
    ? state.brands.error.message
    : ''
})

const mapDispatchToProps = dispatch => ({
  dispatch: dispatch,
  removeBrand: (brandId, page) => dispatch(removeBrand(brandId, page))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DisplayBrandForm)