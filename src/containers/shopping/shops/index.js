import React, { Component } from 'react';
import { connect } from 'react-redux'
import ShopTable from '../../../pages/Shopping/ManageShops/shopsTable';
import DisplayShopForm from './displayShopForm';
import { fetchShop, fetchShops } from '../../../actions/shopping/shops';

class ShopsContainer extends Component {

  state = {
    shops: this.props.shops,
  };

  componentWillReceiveProps(nextProps){
    this.setState({
      shops: nextProps.shops,
    });
  }

  render() {
    return (
      <div className="container-fluid">
        <DisplayShopForm />

        <div className="row">
          <div className="col-md-12">
            <div className="card">
              <div className="header">
                <h4>Manage Shops</h4>
                <p>Edit or delete shops</p>
              </div>
              <div className="content">
                <ShopTable
                  shops={this.state.shops}
                  fetchShop={this.props.fetchShop}
                  fetchShops={this.props.fetchShops} />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  shops: state.shops,
})

const mapDispatchToProps = dispatch => ({
  fetchShops: (page, itemsPerPage) => dispatch(fetchShops(page, itemsPerPage)),
  fetchShop: (shopId) => dispatch(fetchShop(shopId)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ShopsContainer);