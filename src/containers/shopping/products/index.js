import React, { Component } from 'react';
import { connect } from 'react-redux'
import ProductsTable from '../../../pages/Shopping/ManageProducts/productsTable';
import DisplayProductForm from './displayProductForm';
import { fetchProduct, fetchProducts, searchProductByName } from '../../../actions/shopping/products';
const NotificationSystem = require('react-notification-system');

class ProductContainer extends Component {

  state = {
    products: this.props.products,
    isSearching: this.props.isSearching,
  };

  componentWillReceiveProps(nextProps){
    if ((nextProps.fetchError && nextProps.fetchError !== '' && this.state.fetchError !== nextProps.fetchError)) {
      this.showNotification(nextProps.fetchError);
    }

    this.setState({
      products: nextProps.products,
      isSearching: nextProps.isSearching,
      fetchError: nextProps.fetchError
    });
  }

  componentWillUnmount() {
    this.notificationSystem.clearNotifications();
  }

  showNotification = (message) => {
    this.notificationSystem.addNotification({
      message,
      level: 'success',
      autoDismiss: 2,
      position: 'tr'
    });
  };

  render() {
    return (
      <div className="container-fluid">
      <NotificationSystem
                  ref={ref => this.notificationSystem = ref} />
        <DisplayProductForm />

        <div className="row">
          <div className="col-md-12">
            <div className="card">
              <div className="header">
                <h4>Manage Products</h4>
                <p>Edit or delete products</p>
              </div>
              <div className="content">
                <ProductsTable
                  products={this.state.products}
                  isSearching={this.state.isSearching}
                  fetchProduct={this.props.fetchProduct}
                  fetchProducts={this.props.fetchProducts}
                  searchProductByName={this.props.searchProductByName} />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  products: state.products,
  isSearching: state.products.isSearching,
  fetchError: state.products.error && state.products.error.message
    ? state.products.error.message
    : '',
})

const mapDispatchToProps = dispatch => ({
  fetchProducts: (page) => dispatch(fetchProducts(page)),
  searchProductByName: (page, searchText) => dispatch(searchProductByName(page, searchText)),
  fetchProduct: (productId) => dispatch(fetchProduct(productId)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductContainer);