import React, { Component } from 'react';
import { connect } from 'react-redux'
import { fetchEmployeeById } from '../../../actions/employee/employees';
import * as humanize from 'humanize';
const NotificationSystem = require('react-notification-system');

class EmployeeDetailsContainer extends Component {

  state = {
    employees: this.props.employees,
  };

  componentWillMount() {
    if (this.props.employeeId && this.props.fetchEmployeeById) {
      this.props.fetchEmployeeById(this.props.employeeId);
    }
  }

  componentWillReceiveProps(nextProps){
    if ((nextProps.fetchError && nextProps.fetchError !== '')) {
      this.showNotification(nextProps.fetchError);
    }

    this.setState({
      selectedEmployee: nextProps.selectedEmployee,
      fetchError: nextProps.fetchError
    });
  }

  componentWillUnmount() {
    this.notificationSystem.clearNotifications();
  }

  showNotification = (message) => {
    this.notificationSystem.addNotification({
      message,
      level: 'success',
      autoDismiss: 0,
      position: 'tr'
    });
  };

  renderEmployeeInformation = () => {
    const employee = this.state.selectedEmployee;

    if (employee) {
      return (
        <div className="card">
          <div className="header">
            <div className="row">
              <div className="col-sm-12">
                <h4>Employee Information</h4>
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

    return (
      <div className="card">
        <div className="header">
          <h4>Please wait...</h4>
        </div>
      </div>
    );
  }

  render() {
    return (
      <div className="container-fluid">
      <NotificationSystem
                  ref={ref => this.notificationSystem = ref} />
        <div className="row">
          <div className="col-md-12">
            {this.renderEmployeeInformation()}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  selectedEmployee: state.employees.selectedEmployee,
  fetchError: state.employees.error && state.employees.error.message
    ? state.employees.error.message
    : '',
})

const mapDispatchToProps = dispatch => ({
  fetchEmployeeById: (employeeId) => dispatch(fetchEmployeeById(employeeId)),
  dispatch: dispatch,
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EmployeeDetailsContainer);