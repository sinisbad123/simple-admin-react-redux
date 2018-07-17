import React, { Component } from 'react';
import { connect } from 'react-redux'
import * as humanize from 'humanize';
import { cancelOrder, editOrderStatus, editPrincipalAmount } from '../../../actions/shopping/orders';
import UpdateOrderForm from  './updateOrderForm';
import Alert from 'sweetalert-react';

class DisplayOrderForm extends Component {

  state = {
    selectedOrder: this.props.selectedOrder,
    page: this.props.page,
    isEditing: false,
    isChangingStatus: false,
    isChangingPrincipalAmount: false,
    selectedOrderStatus: null,
    updatePrincipalAmount: null,
    showError: false,
    errorMessage: '',
  };

  componentWillReceiveProps(nextProps){
    this.setState({
      selectedOrder: nextProps.selectedOrder,
      page: nextProps.page,
      isEditing: false,
      isChangingStatus: false,
      isChangingPrincipalAmount: false,
      showError: nextProps.fetchError.trim() !== '',
      errorMessage: nextProps.fetchError,
    });
  }

  onSaveStatusButtonClick = () => {
    const orderStatus = this.state.selectedOrderStatus;
    const orderRefNo = this.state.selectedOrder.refNumber;

    if (orderStatus
        && orderRefNo
          && this.props.editOrderStatus
            && this.state.page) {
      const data = {
        order_status: orderStatus
      };
      this.props.editOrderStatus(orderRefNo, data, this.state.page);
    }
  }

  onSavePrincipalAmountClick = () => {
    let order = this.state.selectedOrder;
    order.principalAmount = this.state.updatePrincipalAmount;

    if (order
        && this.state.updatePrincipalAmount
          && this.props.editPrincipalAmount
            && this.state.page) {
      this.props.editPrincipalAmount(order, this.state.page);
    }
  }

  onSelectedOrderStatusChange = (e) => {
    const currentState = this.state;
    currentState.selectedOrderStatus = e.target.value;
    this.setState(currentState);
  }

  onPrincipalAmountChange = (e) => {
    const currentState = this.state;
    currentState.updatePrincipalAmount = e.target.value;
    this.setState(currentState);
  }

  onEditButtonClick = () => {
    const currentState = this.state;
    currentState.isEditing = true;
    this.setState(currentState);
  }

  onEditStatusButtonClick = () => {
    const currentState = this.state;
    currentState.isChangingStatus = true;
    this.setState(currentState);
  }

  onEditPrincipalButtonClick = () => {
    const currentState = this.state;
    currentState.isChangingPrincipalAmount = true;
    currentState.updatePrincipalAmount = currentState.selectedOrder.principalAmount;
    this.setState(currentState);
  }

  onCancelOrderEditButtonClick = () => {
    const currentState = this.state;
    currentState.isChangingStatus = false;
    this.setState(currentState);
  }

  onCancelPrincipalButtonClick = () => {
    const currentState = this.state;
    currentState.isChangingPrincipalAmount = false;
    this.setState(currentState);
  }

  onCancelEditButtonClick = () => {
    const currentState = this.state;
    currentState.isEditing = false;
    this.setState(currentState);
  }

  onCancelOrderButtonClick = () => {
    const order = this.state.selectedOrder;
    if (this.props.cancelOrder) {
      this.props.cancelOrder(order.refNumber, order);
    }
  }

  renderOrderStatusDisplay = (orderStatus) => {
    if (this.state.isChangingStatus && orderStatus) {
      return (
        <div className="typo-line">
          <h5>
            <p className="category">Order status:</p>
            <select
              value={this.state.selectedOrderStatus || orderStatus}
              onChange={(e) => this.onSelectedOrderStatusChange(e)}>
              <option value="pending">Pending</option>
              <option value="purchasing">Purchasing</option>
              <option value="cancelled">Cancelled</option>
              <option value="packaging">Packaging</option>
              <option value="delivering">Delivering</option>
              <option value="delivered">Delivered</option>
              <option value="delivery_failed">Delivery failed</option>
            </select>

            <button
              type="button"
              className="btn btn-sm btn-success"
              onClick={() => this.onSaveStatusButtonClick()}>
              <span className="btn-label">
                <i className="fa fa-save"></i>
              </span>
            </button>

            &nbsp;
            &nbsp;
            &nbsp;

            <button
              type="button"
              className="btn btn-sm btn-danger"
              onClick={() => this.onCancelOrderEditButtonClick()}>
              <span className="btn-label">
                <i className="fa fa-ban"></i>
              </span>
            </button>
          </h5>
        </div>
      );
    }

    if (orderStatus) {
      return (
        <div>
          <h5>
            <p className="category">Order status: {orderStatus}
              <button
                type="button"
                className="btn btn-sm btn-info"
                onClick={() => this.onEditStatusButtonClick()}>
                <span className="btn-label">
                  <i className="fa fa-edit"></i>
                </span>
              </button>
            </p>
            
          </h5>
        </div>
      );
    }

    return null;
  }

  renderPrincipalAmount = principalAmount => {
    if (this.state.isChangingPrincipalAmount && principalAmount) {
      return (
        <div className="typo-line">
          <h5>
            <p className="category">Total Amount:</p>
            <input
              type="number"
              onChange={(e) => this.onPrincipalAmountChange(e)}
              value={this.state.updatePrincipalAmount ? this.state.updatePrincipalAmount : ''}
              />

            <button
              type="button"
              className="btn btn-sm btn-success"
              onClick={() => this.onSavePrincipalAmountClick()}>
              <span className="btn-label">
                <i className="fa fa-save"></i>
              </span>
            </button>

            &nbsp;
            &nbsp;
            &nbsp;

            <button
              type="button"
              className="btn btn-sm btn-danger"
              onClick={() => this.onCancelPrincipalButtonClick()}>
              <span className="btn-label">
                <i className="fa fa-ban"></i>
              </span>
            </button>
          </h5>
        </div>
      );
    }

    if (principalAmount) {
      return (
        <div>
          <h5>
            <p className="category">Total Amount: {`P ${humanize.numberFormat(principalAmount, 2, '.', ',')}`}
              <button
                type="button"
                className="btn btn-sm btn-info"
                onClick={() => this.onEditPrincipalButtonClick()}>
                <span className="btn-label">
                  <i className="fa fa-edit"></i>
                </span>
              </button>
            </p>
            
          </h5>
        </div>
      );
    }

    return null;
  }

  renderNoSelectedDisplay = () => {
    return (
      <div className="row">
        <div className="col-md-12">
          <div className="card">
            <div className="header">
              <h4>Update Order</h4>
              <p>Please select an order to update in the table below</p>
            </div>
            <div className="content">
              <Alert
                title=""
                show={this.state.showError}
                text={this.state.errorMessage}
                onConfirm={() => this.setState({ showError: false })} />
            </div>
          </div>
        </div>
      </div>
    );
  }

  renderNormalDisplay = (order) => {
    const product = order && order.products && order.products[0] ? order.products[0].name : '';
    return (
      <div className="row">
        <div className="col-md-12">
          <div className="card">
            <div className="header">
              <div className="row">
                <div className="col-md-4">
                  <h4>Update Order</h4>
                  <p>Edit or delete selected order</p>
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

                    {/* <button
                      type="button"
                      className="btn btn-wd btn-sm btn-danger"
                      onClick={() => this.onCancelOrderButtonClick()}>
                      <span className="btn-label">
                        <i className="fa fa-times"></i>
                      </span> Cancel Order
                    </button> */}
                  </div>
                </div>
              </div>
            </div>
            <div className="content">
              <div className="row">
                <div className="col-md-6">
                  <div className="typo-line">
                    <h5>
                      <p className="category">Reference no.:</p>
                      {order.refNumber}
                    </h5>
                  </div>

                  <div className="typo-line">
                    <h5>
                      <p className="category">Delivery address:</p>
                      {order.deliveryAddress}
                    </h5>
                  </div>

                  <div className="typo-line">
                    <h5>
                      <p className="category">Delivery date:</p>
                      {humanize.date('m-d-Y', new Date(order.deliveryDate))}
                    </h5>
                  </div>

                  <div className="typo-line">
                    <h5>
                      <p className="category">Product:</p>
                      {product}
                    </h5>
                  </div>

                  <div className="typo-line">
                    <h5>
                      <p className="category">Notes:</p>
                      {order.notes}
                    </h5>
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="typo-line">
                    <h5>
                      <p className="category">No. of paybacks:</p>
                      {order.paymentDuration}
                    </h5>
                  </div>

                  <div className="typo-line">
                    <h5>
                      <p className="category">$$$ per payback:</p>
                      {`P ${humanize.numberFormat(order.installmentAmount, 2, '.', ',')}`}
                    </h5>
                  </div>

                  { this.renderOrderStatusDisplay(order.status) }

                  { this.renderPrincipalAmount(order.principalAmount) }
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  renderFormDisplay = (order) => {
    return (
      <div className="row">
        <div className="col-md-12">
          <div className="card">
            <div className="header">
              <div className="row">
                <div className="col-md-4">
                  <h4>Update Order</h4>
                  <p>Edit or delete selected order</p>
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
                      </span> Cancel Edit
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
            
            <UpdateOrderForm
              initialValues={order}
              dispatch={this.props.dispatch} />
          </div>
        </div>
      </div>
    );
  }

  render() {
    const selectedOrder = this.state.selectedOrder;

    if (selectedOrder) {
      if (this.state.isEditing) {
        return this.renderFormDisplay(selectedOrder)
      }

      return this.renderNormalDisplay(selectedOrder)
    }

    return this.renderNoSelectedDisplay();
  }
}

const mapStateToProps = state => ({
  selectedOrder: state.orders.selectedOrder,
  page: state.orders.page,
  fetchError: state.orders.error && state.orders.error.message
    ? state.orders.error.message
    : ''
})

const mapDispatchToProps = dispatch => ({
  dispatch: dispatch,
  cancelOrder: (refNumber) => dispatch(cancelOrder(refNumber)),
  editOrderStatus: (refNumber, status, page) => dispatch(editOrderStatus(refNumber, status, page)),
  editPrincipalAmount: (order, page) => dispatch(editPrincipalAmount(order, page))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DisplayOrderForm)