import React, { Component } from 'react';
import { connect } from 'react-redux'
import EmployeesTable from '../../../pages/Employee/ListEmployees/employeesTable';
import { fetchEmployees, fetchEmployeesByName, fetchEmployeeById } from '../../../actions/employee/employees';
import * as humanize from 'humanize';
const NotificationSystem = require('react-notification-system');

class EmployeeListContainer extends Component {

  state = {
    employees: this.props.employees,
  };

  componentWillReceiveProps(nextProps){
    if ((nextProps.fetchError && nextProps.fetchError !== '')) {
      this.showNotification(nextProps.fetchError);
    }

    this.setState({
      employees: nextProps.employees,
      selectedEmployee: nextProps.selectedEmployee,
      fetchError: nextProps.fetchError
    });
  }

  showNotification = (message) => {
    this.notificationSystem.addNotification({
      message,
      level: 'success',
      autoDismiss: 0,
      position: 'tr'
    });
  };

  componentWillUnmount() {
    this.notificationSystem.clearNotifications();
  }

  onEmployeeSelected = employee => {
    const currentState = this.state;
    currentState.selectedEmployee = employee;
    this.setState(currentState);
  }

  onBackButtonClick = () => {
    const currentState = this.state;
    currentState.selectedEmployee = null;
    this.setState(currentState);
  }

  renderEmployeeTable = () => {
    const employee = this.state.selectedEmployee;

    if (!employee) {
      return (
        <div className="card">
          <div className="header">
            <h4>Select an employee</h4>
            <p>Select an employee to view his/her information</p>
          </div>
          <div className="content">
            <EmployeesTable 
              onEmployeeSelected={this.onEmployeeSelected}
              employees={this.state.employees}
              fetchEmployees={this.props.fetchEmployees}
              fetchEmployeesByName={this.props.fetchEmployeesByName} />
          </div>
        </div>
      );
    }

    return null;
  }

  renderEmployeeInformation = () => {
    const employee = this.state.selectedEmployee;

    if (employee) {
      return (
        <div className="card">
          <div className="header">
            <div className="row">
              <div className="col-sm-4">
                <h4>Employee Information</h4>
              </div>

              <div className="col-sm-4 col-sm-offset-4">
                <div className="buttons-with-margin pull-right">
                  <button
                    type="button"
                    className="btn btn-wd btn-sm btn-default"
                    onClick={() => this.onBackButtonClick()}>
                    <span className="btn-label">
                      <i className="fa fa-chevron-left"></i>
                    </span> Back
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="content">
            <div className="row">
              <div className="col-sm-6">
                <div className="typo-line">
                  <h5>
                    <p className="category">Employee name:</p>
                    {`${employee.last_name}, ${employee.first_name} ${employee.middle_name ? employee.middle_name : ''}`}
                  </h5>
                </div>

                <div className="typo-line">
                  <h5>
                    <p className="category">Address:</p>
                    {`${employee.address1}\n ${employee.address2}\n ${employee.city}`}
                  </h5>
                </div>

                <div className="typo-line">
                  <h5>
                    <p className="category">Mobile no.:</p>
                    {employee.mobile_number}
                  </h5>
                </div>
              </div>

              <div className="col-sm-6">
                <div className="typo-line">
                  <h5>
                    <p className="category">Birthdate:</p>
                    {humanize.date('Y-m-d', new Date(employee.birthdate))}
                  </h5>
                </div>
              </div>
            </div>

            <div className="row">

              <div className="col-sm-6">
                <div className="typo-line">
                  <h5>
                    <p className="category">SSS Number:</p>
                    {employee.sss_number}
                  </h5>
                </div>

                <div className="typo-line">
                  <h5>
                    <p className="category">Philhealth Number:</p>
                    {employee.philhealth_number ? employee.philhealth_number : 'None'}
                  </h5>
                </div>

              </div>

              <div className="col-sm-6">

                <div className="typo-line">
                  <h5>
                    <p className="category">Pag-ibig Number:</p>
                    {employee.pagibig_number ? employee.pagibig_number : 'None'}
                  </h5>
                </div>

                <div className="typo-line">
                  <h5>
                    <p className="category">Status:</p>
                    {employee.status}
                  </h5>
                </div>

              </div>
            </div>

            <div className="row">
              <div className="col-sm-12">
                <div className="typo-line">
                  <h5>
                    <p className="category">Notes:</p>
                    <textarea />
                  </h5>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return null;
  }

  render() {
    return (
      <div className="container-fluid">
      <NotificationSystem
                  ref={ref => this.notificationSystem = ref} />
        <div className="row">
          <div className="col-md-12">
            {this.renderEmployeeInformation()}

            {this.renderEmployeeTable()}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  employees: state.employees,
  selectedEmployee: state.employees.selectedEmployee,
  fetchError: state.employees.error && state.employees.error.message
    ? state.employees.error.message
    : '',
})

const mapDispatchToProps = dispatch => ({
  fetchEmployees: (page) => dispatch(fetchEmployees(page)),
  fetchEmployeeById: (employeeId) => dispatch(fetchEmployeeById(employeeId)),
  fetchEmployeesByName: (page, searchText) => dispatch(fetchEmployeesByName(page, searchText)),
  dispatch: dispatch,
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EmployeeListContainer);