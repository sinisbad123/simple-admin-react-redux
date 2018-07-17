import React, { Component } from 'react';
import { connect } from 'react-redux'
import OrdersTable from '../../../pages/Shopping/ManageOrders/ordersTable';
import DisplayOrderForm from './displayOrderForm';
import { fetchOrders, fetchOrder } from '../../../actions/shopping/orders';

class OrderContainer extends Component {
  state = {
    orders: this.props.orders,
    selectedOrder: this.props.selectedOrder,
  };

  componentWillReceiveProps(nextProps){
    this.setState({
      orders: nextProps.orders,
      selectedOrder: nextProps.selectedOrder,
    });
  }

  render() {
    return (
      <div className="container-fluid">
        <DisplayOrderForm />

        <div className="row">
          <div className="col-md-12">
            <div className="card">
              <div className="header">
                <h4>List Orders</h4>
                <p>Browse and update orders</p>
              </div>
              <div className="content">
                <OrdersTable
                  orders={this.state.orders}
                  fetchOrder={this.props.fetchOrder}
                  fetchOrders={this.props.fetchOrders} />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  orders: state.orders,
})

const mapDispatchToProps = dispatch => ({
  fetchOrders: (page) => dispatch(fetchOrders(page)),
  fetchOrder: (refNo) => dispatch(fetchOrder(refNo)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OrderContainer);