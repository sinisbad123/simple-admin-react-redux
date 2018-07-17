import React, { Component } from 'react';
import { connect } from 'react-redux'
import BrandTable from '../../../pages/Shopping/ManageBrands/brandsTable';
import DisplayBrandForm from './displayBrandForm';
import { fetchBrand, fetchBrands } from '../../../actions/shopping/brands';

class BrandsContainer extends Component {

  state = {
    brands: this.props.brands,
  };

  componentWillReceiveProps(nextProps){
    this.setState({
      brands: nextProps.brands,
    });
  }

  render() {
    return (
      <div className="container-fluid">
        <DisplayBrandForm />

        <div className="row">
          <div className="col-md-12">
            <div className="card">
              <div className="header">
                <h4>Manage Brands</h4>
                <p>Edit or delete brands</p>
              </div>
              <div className="content">
                <BrandTable
                  brands={this.state.brands}
                  fetchBrand={this.props.fetchBrand}
                  fetchBrands={this.props.fetchBrands} />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  brands: state.brands,
})

const mapDispatchToProps = dispatch => ({
  fetchBrands: (page) => dispatch(fetchBrands(page)),
  fetchBrand: (brandId) => dispatch(fetchBrand(brandId)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BrandsContainer);