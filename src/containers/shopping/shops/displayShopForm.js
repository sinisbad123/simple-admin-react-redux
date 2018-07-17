import React, { Component } from 'react';
import { connect } from 'react-redux'
import UpdateShopForm from  './updateShopForm';
import AddShopForm from  './addShopForm';
import Alert from 'sweetalert-react';
import { removeShops } from '../../../actions/shopping/shops';

class DisplayShopForm extends Component {

  state = {
    selectedShop: this.props.selectedShop,
    isEditing: false,
    showError: false,
    isAdding: false,
    errorMessage: '',
    page: this.props.page
  };

  componentWillReceiveProps(nextProps){
    this.setState({
      selectedShop: nextProps.selectedShop,
      isEditing: false,
      showError: nextProps.fetchError.trim() !== '',
      errorMessage: nextProps.fetchError,
      page: nextProps.page,
      isAdding: false,
    });
  }

  onBackButtonClick = () => {
    const currentState = this.state;
    currentState.selectedShop = null;
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
    if (this.props.removeShops && this.state.selectedShop && this.state.page) {
      const shopId = this.state.selectedShop.id;
      const page = this.state.page;
      this.props.removeShops(shopId, page);
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
                        </span> Add Shop
                      </button>
                    </p>

                    <p className="text-center">
                      To update a shop, please select from the table below
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

  renderNormalDisplay = (shop) => {
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
                  <h4>Update Shop</h4>
                  <p>Edit or delete selected shop</p>
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
                      </span> Delete Shop
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
                      <p className="category">Shop name:</p>
                      {shop.name}
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

  renderUpdateFormDisplay = (shop) => {
    shop.page = this.state.page;
    return (
      <div className="row">
        <div className="col-md-12">
          <div className="card">
            <div className="header">
              <div className="row">
                <div className="col-md-4">
                  <h4>Update Shop</h4>
                  <p>Edit or delete selected shop</p>
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
            
            <UpdateShopForm
              initialValues={shop}
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
                  <h4>Add New Shop</h4>
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
            
            <AddShopForm
              initialValues={initialValues}
              dispatch={this.props.dispatch} />
          </div>
        </div>
      </div>
    );
  }

  render() {
    const selectedShop = this.state.selectedShop;
    const page = this.state.page;

    if (this.state.isAdding) {
      return this.renderAddFormDisplay(page);
    }

    if (selectedShop) {
      if (this.state.isEditing) {
        return this.renderUpdateFormDisplay(selectedShop);
      }

      return this.renderNormalDisplay(selectedShop);
    }

    return this.renderNoSelectedDisplay();
  }
}

const mapStateToProps = state => ({
  selectedShop: state.shops.selectedShop,
  page: state.shops.page,
  fetchError: state.shops.error && state.shops.error.message
    ? state.shops.error.message
    : ''
})

const mapDispatchToProps = dispatch => ({
  dispatch: dispatch,
  removeShops: (shopId, page) => dispatch(removeShops(shopId, page))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DisplayShopForm)