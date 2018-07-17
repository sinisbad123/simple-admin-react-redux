import React, { Component } from 'react';
import { BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';

class ShoppingEmployeesTable extends Component {

  state = {
    shoppingEmployees: this.props.shoppingEmployees,
  };

  componentWillReceiveProps(nextProps){
    this.setState({
      shoppingEmployees: nextProps.shoppingEmployees,
    });
  }

  onRowSelectBgColor = (row, isSelect) => {
    if (isSelect) {
      return '#7777772b';
    }
    return null;
  }

  onPageChange = (page, sizePerPage) => {
    if (this.props.fetchShoppingEmployees) {
      this.props.fetchShoppingEmployees(page);
    }
  }

  render() {
    const shoppingEmployees = this.state.shoppingEmployees.data ? this.state.shoppingEmployees.data : [];
    const count = this.state.shoppingEmployees.total ? this.state.shoppingEmployees.total : 0;
    const page = this.state.shoppingEmployees.page ? this.state.shoppingEmployees.page : 1;
    let shoppingEmployeesDataSet = [];
    for (let i = 0; i < count; i++) {
      shoppingEmployeesDataSet.push({});
    }

    shoppingEmployeesDataSet.splice((page * 13) - 13, shoppingEmployees.length, ...shoppingEmployees);

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
            data={shoppingEmployeesDataSet}
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
            Company name
            </TableHeaderColumn>

            
        </BootstrapTable>
    );
  }
}

export default ShoppingEmployeesTable