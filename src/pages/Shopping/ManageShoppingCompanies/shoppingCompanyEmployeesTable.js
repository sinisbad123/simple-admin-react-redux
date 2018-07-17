import React, { Component } from 'react';
import { BootstrapTable, TableHeaderColumn, pagin} from 'react-bootstrap-table';
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';

class ShoppingCompanyEmployeesTable extends Component {

  state = {
    employees: this.props.employees,
    selectedShoppingCompany: this.props.selectedShoppingCompany
  };

  componentWillReceiveProps(nextProps){
    this.setState({
      employees: nextProps.employees,
      selectedShoppingCompany: nextProps.selectedShoppingCompany
    });
  }

  onPageChange = (page, sizePerPage) => {
    if (this.props.fetchShoppingCompanyEmployees && this.state.selectedShoppingCompany) {
      const companyId = this.state.selectedShoppingCompany.id;
      this.props.fetchShoppingCompanyEmployees(companyId, page);
    }
  }

  onToggleButtonClick = (employeeData) => {
    if (this.props.toggleShoppingEmployeeAccess && this.state.employees) {
      const page = this.state.employees.page;
      this.props.toggleShoppingEmployeeAccess(employeeData, page);
    }
  }

  renderToggleButton = (active, rowdata) => {
    if (rowdata && rowdata.id) {
      if (!rowdata.disabled) {
        return (
          <button className="btn btn-rectangle btn-fill btn-danger"
            onClick={() => this.onToggleButtonClick(rowdata)}>
            Disable
          </button>
        );
      }
  
      return (
        <button className="btn btn-rectangle btn-fill btn-success"
            onClick={() => this.onToggleButtonClick(rowdata)}>
          Enable
        </button>
      );
    }

    return null;
  }

  activeFormatter = (cell, row) => {
    return this.renderToggleButton(cell, row);
  }

  render() {
    if (!this.state.selectedShoppingCompany || !this.state.employees) {
      return null;
    }

    const employees = this.state.employees.data ? this.state.employees.data : [];
    const count = this.state.employees.total ? this.state.employees.total : 0;
    const page = this.state.employees.page ? this.state.employees.page : 1;
    let employeesDataSet = [];
    for (let i = 0; i < count; i++) {
      employeesDataSet.push({});
    }

    employeesDataSet.splice((page * 13) - 13, employees.length, ...employees);

    const options = {
      sizePerPage: 13,
      prePage: 'Previous',
      nextPage: 'Next',
      firstPage: 'First',
      lastPage: 'Last',
      hideSizePerPage: true,
      onPageChange: this.onPageChange,
    };

    return (
        <BootstrapTable
            data={employeesDataSet}
            bordered={false}
            hover={true}
            striped
            pagination={true}
            options={options}>

            <TableHeaderColumn
            dataField='name'
            isKey
            width="80%"
            >
            Name
            </TableHeaderColumn>

            <TableHeaderColumn
            dataField='disabled'
            width="20%"
            dataFormat={ this.activeFormatter }
            >
            
            </TableHeaderColumn>

            
        </BootstrapTable>
    );
  }
}

export default ShoppingCompanyEmployeesTable