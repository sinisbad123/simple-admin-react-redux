import React, { Component, ReactDOM } from 'react';
import { BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import * as humanize from 'humanize';

class EmployeesTable extends Component {

  state = {
    employees: this.props.employees,
  };

  componentWillReceiveProps(nextProps){
    this.setState({
      employees: nextProps.employees,
    });
  }

  componentWillMount() {
    if (this.props.fetchEmployees) {
      this.props.fetchEmployees();
    }
  }

  onRowSelect = (row, isSelected, e) => {
    if (row && isSelected) {
      if (this.props.onEmployeeSelected) {
        this.props.onEmployeeSelected(row);
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
    if (this.props.fetchEmployees) {
      if (this.state.searchKeyword && this.state.searchKeyword.trim() !== '') {
        this.props.fetchEmployeesByName(page, this.state.searchKeyword);
        return;
      }

      this.props.fetchEmployees(page);
      return;
    }
  }

  onSearchKeyUp = e => {
    const keyword = e.target.value;
    const currentState = this.state;
    currentState.searchKeyword = keyword;
    this.setState(currentState);
  }

  onSearchKeyDown = e => {
    if (e.keyCode === 13) {
      this.onSearchButtonClick();
    }
  }

  onSearchButtonClick = () => {
    if (this.props.fetchEmployeesByName) {
        const keyword = this.state.searchKeyword;
        if (keyword && keyword.trim().length !== 0) {
            this.props.fetchEmployeesByName(1, keyword);
            return;
        }

        if (!keyword || keyword.trim() === '') {
            this.props.fetchEmployees(1);
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
            placeholder="Search Employee"
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
    const employees = this.state.employees && this.state.employees.data ? this.state.employees.data : [];
    const count = this.state.employees && this.state.employees.total ? this.state.employees.total : 0;
    const page = this.state.employees && this.state.employees.page ? this.state.employees.page : 1;
    let employeeDataSet = [];
    for (let i = 0; i < count; i++) {
      employeeDataSet.push({});
    }

    const formattedEmployees = employees.map(employee => {
      employee.full_name = `${employee.last_name}, ${employee.first_name}`;
      employee.formatted_employment_date = humanize.date('m-d-Y', new Date(employee.employment_date));
      employee.formatted_termination_date = humanize.date('m-d-Y', new Date(employee.termination_date));
      return employee;
    });

    employeeDataSet.splice((page * 13) - 13, formattedEmployees.length, ...formattedEmployees);

    const options = {
      sizePerPage: 13,
      prePage: 'Previous',
      nextPage: 'Next',
      firstPage: 'First',
      lastPage: 'Last',
      onPageChange: this.onPageChange,
      searchField: props => this.renderSearchField(props),
      hideSizePerPage: true,
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
            data={employeeDataSet}
            bordered={false}
            hover={true}
            search={ true }
            striped
            pagination={true}
            options={options}>

            <TableHeaderColumn
            dataField='full_name'
            isKey
            width="25%"
            >
            Employee name
            </TableHeaderColumn>

            <TableHeaderColumn
            dataField='mobile_number'
            width="25%"
            >
            Contact Number
            </TableHeaderColumn>

            <TableHeaderColumn
            dataField='formatted_employment_date'
            width="25%"
            >
            Date employed
            </TableHeaderColumn>

            <TableHeaderColumn
            dataField='formatted_termination_date'
            width="25%"
            >
            Date terminated/resigned
            </TableHeaderColumn>

            <TableHeaderColumn
            dataField='gender'
            width="25%"
            >
            Gender
            </TableHeaderColumn>

            
        </BootstrapTable>
    );
  }
}

export default EmployeesTable