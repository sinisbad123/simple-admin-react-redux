import React, { Component } from 'react';
import { BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';

class ShopsTable extends Component {

  state = {
    shops: this.props.shops,
  };

  componentWillReceiveProps(nextProps){
    this.setState({
      shops: nextProps.shops,
    });
  }

  componentWillMount() {
    if (this.props.fetchShops) {
      this.props.fetchShops(1);
    }
  }

  onRowSelect = (row, isSelected, e) => {
    if (row && isSelected) {
      if (this.props.fetchShop) {
        this.props.fetchShop(row._id);
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
    if (this.props.fetchShops) {
      this.props.fetchShops(page, 13);
    }
  }

  render() {
    const shops = this.state.shops.data ? this.state.shops.data : [];
    const count = this.state.shops.total ? this.state.shops.total : 0;
    const page = this.state.shops.page ? this.state.shops.page : 1;
    let shopDataSet = [];
    for (let i = 0; i < count; i++) {
      shopDataSet.push({});
    }

    shopDataSet.splice((page * 13) - 13, shops.length, ...shops);

    const options = {
      sizePerPage: 13,
      prePage: 'Previous',
      nextPage: 'Next',
      firstPage: 'First',
      lastPage: 'Last',
      hideSizePerPage: true,
      onPageChange: this.onPageChange
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
            data={shopDataSet}
            bordered={false}
            hover={true}
            striped
            pagination={true}
            options={options}>

            <TableHeaderColumn
            dataField='name'
            isKey
            width="50%"
            >
            Shop name
            </TableHeaderColumn>
            
        </BootstrapTable>
    );
  }
}

export default ShopsTable