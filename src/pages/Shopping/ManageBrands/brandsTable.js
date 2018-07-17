import React, { Component } from 'react';
import { BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';

class BrandsTable extends Component {

  state = {
    brands: this.props.brands,
  };

  componentWillReceiveProps(nextProps){
    this.setState({
      brands: nextProps.brands,
    });
  }

  componentWillMount() {
    if (this.props.fetchBrands) {
      this.props.fetchBrands(1);
    }
  }

  onRowSelect = (row, isSelected, e) => {
    if (row && isSelected) {
      if (this.props.fetchBrand) {
        this.props.fetchBrand(row.id);
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
    if (this.props.fetchBrands) {
      this.props.fetchBrands(page);
    }
  }

  render() {
    const brands = this.state.brands.data ? this.state.brands.data : [];
    const count = this.state.brands.total ? this.state.brands.total : 0;
    const page = this.state.brands.page ? this.state.brands.page : 1;
    let brandDataSet = [];
    for (let i = 0; i < count; i++) {
      brandDataSet.push({});
    }

    brandDataSet.splice((page * 13) - 13, brands.length, ...brands);

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
            data={brandDataSet}
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
            Brand name
            </TableHeaderColumn>

            
        </BootstrapTable>
    );
  }
}

export default BrandsTable