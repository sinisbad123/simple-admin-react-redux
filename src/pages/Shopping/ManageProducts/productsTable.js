import React, { Component, ReactDOM } from 'react';
import { BootstrapTable, TableHeaderColumn, SearchField } from 'react-bootstrap-table';
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import * as humanize from 'humanize';

class ProductsTable extends Component {

  state = {
    products: this.props.products,
    isSearching: this.props.isSearching,
  };

  componentWillReceiveProps(nextProps){
    this.setState({
      products: nextProps.products,
      isSearching: nextProps.isSearching,
    });
  }

  componentWillMount() {
    if (this.props.fetchProducts) {
      this.props.fetchProducts(1);
    }
  }

  onRowSelect = (row, isSelected, e) => {
    if (row && isSelected) {
      if (this.props.fetchProduct) {
        this.props.fetchProduct(row._id);
      }
    }
  }

  onRowSelectBgColor = (row, isSelect) => {
    if (isSelect) {
      return '#7777772b';
    }
    return null;
  }

  onPageChange = (page, sizePerPage) => {
    if (this.props.fetchProducts) {
      if (this.state.searchKeyword && this.state.searchKeyword.trim() !== '') {
        this.props.searchProductByName(page, this.state.searchKeyword);
        return;
      }

      this.props.fetchProducts(page);
      return;
    }
  }

  onSearchKeyUp = e => {
    if (this.props.fetchProducts && !this.state.isSearching) {
      const keyword = e.target.value;
      const currentState = this.state;
      currentState.searchKeyword = keyword;
      this.setState(currentState);
    }
  }

  onSearchKeyDown = e => {
    if (e.keyCode === 13) {
      this.onSearchButtonClick();
    }
  }

  onSearchButtonClick = () => {
    if (this.props.searchProductByName) {
        const keyword = this.state.searchKeyword;
        if (keyword && keyword.length !== 0) {
            this.props.searchProductByName(1, keyword);
            return;
        }

        if (!keyword && keyword.trim() === '') {
            this.props.fetchProducts(1);
            return;
        }
    }
  }

  getValue() {
    return ReactDOM.findDOMNode(this).value;
  }

  // It's necessary to implement setValue
  setValue(value) {
    ReactDOM.findDOMNode(this).value = value;
  }

  renderSearchField = props => {
    return (
      <div className="row">
        <div className="col-sm-8">
          <input
            className={ `form-control` }
            type='text'
            defaultValue={ props.defaultValue }
            placeholder="Search Products"
            onKeyDown={ this.onSearchKeyDown }
            onKeyUp={ this.onSearchKeyUp }/>
        </div>

        <div className="col-sm-4">
          <button type="button" className="btn btn-rectangle btn-sm"
            onClick={() => this.onSearchButtonClick()}>
            Search
          </button>
        </div>
      </div>
    );
  }

  render() {
    const products = this.state.products && this.state.products.data ? this.state.products.data : [];
    const count = this.state.products && this.state.products.total ? this.state.products.total : 0;
    const page = this.state.products && this.state.products.page ? this.state.products.page : 1;
    let productDataSet = [];
    for (let i = 0; i < count; i++) {
      productDataSet.push({});
    }

    const formattedProducts = products.map(product => {
      product.formattedPrice = `P ${humanize.numberFormat(product.price, 2, '.', ',')}`;
      product.brandName = product.brand && product.brand.name ? product.brand.name : '';
      product.formattedDeliveryDays = product.estimatedDeliveryDays ? `${product.estimatedDeliveryDays} day/s` : '';
      return product;
    });

    productDataSet.splice((page * 13) - 13, formattedProducts.length, ...formattedProducts);

    const options = {
      sizePerPage: 13,
      prePage: 'Previous',
      nextPage: 'Next',
      firstPage: 'First',
      lastPage: 'Last',
      hideSizePerPage: true,
      onPageChange: this.onPageChange,
      searchField: props => this.renderSearchField(props),
      searchDelayTime: 3000
    };

    const selectRowProp = {
      mode: 'radio',
      clickToSelect: true,
      bgColor: this.onRowSelectBgColor,
      onSelect: this.onRowSelect,
    };

    return (
        <BootstrapTable
            selectRow={selectRowProp}
            data={productDataSet}
            bordered={false}
            hover={true}
            striped
            pagination={true}
            search
            options={options}>

            <TableHeaderColumn
            dataField='_id'
            isKey
            width="0%"
            >
            Ref No.
            </TableHeaderColumn>

            <TableHeaderColumn
            dataField='name'
            width="15%"
            >
            Name
            </TableHeaderColumn>

            <TableHeaderColumn
            dataField='formattedPrice'
            width="18%"
            >
            Price
            </TableHeaderColumn>

            <TableHeaderColumn
            dataField='brandName'
            width="18.75%"
            >
            Brand Name
            </TableHeaderColumn>

            <TableHeaderColumn
            dataField='formattedDeliveryDays'
            width="18.75%"
            >
            Delivery days
            </TableHeaderColumn>

            <TableHeaderColumn
            dataField='inventory'
            width="9.75%"
            >
            Inventory
            </TableHeaderColumn>

            <TableHeaderColumn
            dataField='sold'
            width="9.75%"
            >
            Sold
            </TableHeaderColumn>
        </BootstrapTable>
    );
  }
}

export default ProductsTable