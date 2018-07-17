import React, { Component } from 'react';
import { BootstrapTable, TableHeaderColumn, pagin} from 'react-bootstrap-table';
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';

class ShoppingCompaniesTable extends Component {

  state = {
    shoppingCompanies: this.props.shoppingCompanies,
  };

  componentWillReceiveProps(nextProps){
    this.setState({
      shoppingCompanies: nextProps.shoppingCompanies,
    });
  }

  componentWillMount() {
    if (this.props.fetchShoppingCompanies) {
      this.props.fetchShoppingCompanies(1);
    }
  }

  onRowSelect = (row, isSelected, e) => {
    if (row && isSelected) {
      if (this.props.fetchShoppingCompany) {
        this.props.fetchShoppingCompany(row.id);
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
    if (this.props.fetchShoppingCompanies) {
      this.props.fetchShoppingCompanies(page);
    }
  }

  renderPaginationPanel = (props) => {
    return (
      <div>
        <div>{ props.components.pageList }</div>
      </div>
    );
  }

  render() {
    const shoppingCompanies = this.state.shoppingCompanies.data ? this.state.shoppingCompanies.data : [];
    const count = this.state.shoppingCompanies.total ? this.state.shoppingCompanies.total : 0;
    const page = this.state.shoppingCompanies.page ? this.state.shoppingCompanies.page : 1;
    let shoppingCompanyDataSet = [];
    for (let i = 0; i < count; i++) {
      shoppingCompanyDataSet.push({});
    }

    shoppingCompanyDataSet.splice((page * 13) - 13, shoppingCompanies.length, ...shoppingCompanies);

    const options = {
      sizePerPage: 13,
      prePage: '<',
      nextPage: '>',
      firstPage: 'First',
      lastPage: 'Last',
      hideSizePerPage: true,
      onPageChange: this.onPageChange,
      paginationPanel: this.renderPaginationPanel
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
            data={shoppingCompanyDataSet}
            bordered={false}
            hover={true}
            striped
            pagination={true}
            options={options}>

            <TableHeaderColumn
            dataField='id'
            isKey
            width="0%"
            >
            ID
            </TableHeaderColumn>

            <TableHeaderColumn
            dataField='name'
            width="50%"
            >
            Company name
            </TableHeaderColumn>

            
        </BootstrapTable>
    );
  }
}

export default ShoppingCompaniesTable