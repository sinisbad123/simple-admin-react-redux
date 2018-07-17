import React, { Component } from 'react';
import { connect } from 'react-redux'
import moment from 'moment';
import PayOffScheduleForm from  './payOffScheduleForm';
import DatePicker from 'react-datepicker'
import EmployeesTable from '../../../pages/Billing/ManageOffScheduledBills/employeesTable';
import { fetchTerminatedEmployees, fetchTerminatedEmployeesByName } from '../../../actions/employee/employees';
import { fetchEstimatePayment, clearEstimatedEmployee } from '../../../actions/billing/bills';
import { BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
const NotificationSystem = require('react-notification-system');

class OffScheduleBillsContainer extends Component {

  state = {
    employees: this.props.employees,
  };

  componentWillReceiveProps(nextProps){
    if ((nextProps.fetchError && nextProps.fetchError !== '')
      && nextProps.fetchError !== this.state.fetchError) {
      this.showNotification(nextProps.fetchError);
    }

    if (nextProps.fetchError === '') {
      this.setState({
        employees: nextProps.employees,
        payments: nextProps.payments
      });
    } else {
      this.setState({
        employees: nextProps.employees,
        payments: nextProps.payments,
        fetchError: nextProps.fetchError
      });
    }
  }

  componentWillUnmount() {
    this.notificationSystem.clearNotifications();
  }

  showNotification = (message) => {
    this.notificationSystem.addNotification({
      message,
      level: 'success',
      autoDismiss: 2,
      position: 'tr'
    });
  };

  onEmployeeSelected = employee => {
    const currentState = this.state;
    currentState.selectedEmployee = employee;
    this.setState(currentState);
  }

  onCancelEditButtonClick = () => {
    const currentState = this.state;
    currentState.selectedEmployee = null;
    this.setState(currentState);

    if (this.props.clearEstimatedEmployee) {
      this.props.clearEstimatedEmployee();
    }
  }

  onChangeSettlementDate = selectedDate => {
    const currentState = this.state;
    currentState.selectedSettlementDate = moment(selectedDate).add(1, 'day').toISOString();
    this.setState(currentState);
  }

  onChangeSettlementAmount = e => {
    const currentState = this.state;
    currentState.settlementAmount = e.target.value;
    this.setState(currentState);
  }

  onClickSubmitButton = employeeId => {
    if (this.state.selectedSettlementDate && this.state.settlementAmount) {
      if (this.props.fetchEstimatePayment) {
        this.props.fetchEstimatePayment(employeeId, moment(this.state.selectedSettlementDate).format('YYYY-MM-DD'), this.state.settlementAmount);
      }
    }
  }

  renderEstimatePaymentsSummary = () => {
    const data = this.state.payments;
    if (data) {
      const total_payback_breakdown = data.total_payback_breakdown;
      return (
      <div className="card">
        <div className="header">
          <h4> Total payback summary:</h4>
        </div>
        <div className="content">
        <div className="row">
          <div className="row">
            <div className="col-sm-4">
              <div className="form-group">
                <label className="control-label col-md-6"><b>Settlement date:</b></label>
                <div className="col-md-4 col-md-offset-2">
                <label className="info">{ data.settlement_date }</label>
                </div>
              </div>
            </div>

            <div className="col-sm-4">
              <div className="form-group">
                <label className="control-label col-md-6"><b>Remaining balance:</b></label>
                <div className="col-md-4 col-md-offset-2">
                <label className="info">{ data.remaining_balance }</label>
                </div>
              </div>
            </div>

            <div className="col-sm-4">
              <div className="form-group">
                <label className="control-label col-md-6"><b>Total payback amount:</b></label>
                <div className="col-md-4 col-md-offset-2">
                <label className="info">{ data.total_payback_amount }</label>
                </div>
              </div>
            </div>
          </div>

          <br />

          <br />
          
          <div className="row">
            <div className="col-sm-4">
              <div className="form-group">
                <label className="control-label col-md-6"><b>Principal balance:</b></label>
                <div className="col-md-4 col-md-offset-2">
                <label className="info">{ total_payback_breakdown.principal_balance }</label>
                </div>
              </div>
            </div>

            <div className="col-sm-4">
              <div className="form-group">
                <label className="control-label col-md-6"><b>Min. Payback amount:</b></label>
                <div className="col-md-4 col-md-offset-2">
                <label className="info">{ total_payback_breakdown.min_payback_amount }</label>
                </div>
              </div>
            </div>

            <div className="col-sm-4">
              <div className="form-group">
                <label className="control-label col-md-6"><b>Interest amount:</b></label>
                <div className="col-md-4 col-md-offset-2">
                <label className="info">{ total_payback_breakdown.interest_amount }</label>
                </div>
              </div>
            </div>

            <div className="col-sm-4">
              <div className="form-group">
                <label className="control-label col-md-6"><b>Entry amount:</b></label>
                <div className="col-md-4 col-md-offset-2">
                <label className="info">{ total_payback_breakdown.entry_amount }</label>
                </div>
              </div>
            </div>

            <div className="col-sm-4">
              <div className="form-group">
                <label className="control-label col-md-6"><b>EE adj. amount:</b></label>
                <div className="col-md-4 col-md-offset-2">
                <label className="info">{ total_payback_breakdown.ee_adjustment_amount }</label>
                </div>
              </div>
            </div>

            <div className="col-sm-4">
              <div className="form-group">
                <label className="control-label col-md-6"><b>ER adj. amount:</b></label>
                <div className="col-md-4 col-md-offset-2">
                <label className="info">{ total_payback_breakdown.er_adjustment_amount }</label>
                </div>
              </div>
            </div>

            <div className="col-sm-4">
              <div className="form-group">
                <label className="control-label col-md-6"><b>Total balance:</b></label>
                <div className="col-md-4 col-md-offset-2">
                <label className="info">{ total_payback_breakdown.total_balance }</label>
                </div>
              </div>
            </div>

            <div className="col-sm-4">
              <div className="form-group">
                <label className="control-label col-md-6"><b>Adjustment:</b></label>
                <div className="col-md-4 col-md-offset-2">
                <label className="info">{ total_payback_breakdown.adjustment_amount }</label>
                </div>
              </div>
            </div>

            <div className="col-sm-4">
              <div className="form-group">
                <label className="control-label col-md-6"><b>Finance charge:</b></label>
                <div className="col-md-4 col-md-offset-2">
                <label className="info">{ total_payback_breakdown.finance_charge }</label>
                </div>
              </div>
            </div>

            <div className="col-sm-4">
              <div className="form-group">
                <label className="control-label col-md-6"><b>Before adj. principal amount:</b></label>
                <div className="col-md-4 col-md-offset-2">
                <label className="info">{ total_payback_breakdown.before_adjustment_principal_amount }</label>
                </div>
              </div>
            </div>

            <div className="col-sm-4">
              <div className="form-group">
                <label className="control-label col-md-6"><b>Unfixed principal amount:</b></label>
                <div className="col-md-4 col-md-offset-2">
                <label className="info">{ total_payback_breakdown.unfixed_principal_amount }</label>
                </div>
              </div>
            </div>

            <div className="col-sm-4">
              <div className="form-group">
                <label className="control-label col-md-6"><b>Principal:</b></label>
                <div className="col-md-4 col-md-offset-2">
                <label className="info">{ total_payback_breakdown.principal_amount }</label>
                </div>
              </div>
            </div>

            <div className="col-sm-4">
              <div className="form-group">
                <label className="control-label col-md-6"><b>Before adj. payback amount:</b></label>
                <div className="col-md-4 col-md-offset-2">
                <label className="info">{ total_payback_breakdown.before_adjustment_payback_amount }</label>
                </div>
              </div>
            </div>

            <div className="col-sm-4">
              <div className="form-group">
                <label className="control-label col-md-6"><b>Payback amount:</b></label>
                <div className="col-md-4 col-md-offset-2">
                <label className="info">{ total_payback_breakdown.payback_amount }</label>
                </div>
              </div>
            </div>

          </div>
          
        </div>

        </div>
        </div>
      );
    }

    return null;
  }

  renderEstimatePaymentsTable = () => {
    const data = this.state.payments;
    if (data) {
      const options = {
        sizePerPage: 13,
        prePage: 'Previous',
        nextPage: 'Next',
        firstPage: 'First',
        lastPage: 'Last',
        hideSizePerPage: true,
      };

      return (
        <div className="row">
          <div className="col-sm-12">

          <div className="variable-table-container">
          <BootstrapTable
            data={data.paybacks}
            bordered={false}
            hover={true}
            striped
            pagination={true}
            options={options}>

            <TableHeaderColumn
            isKey
            dataField='loan_id'
            width="0%"
            >
            Loan ID
            </TableHeaderColumn>

            <TableHeaderColumn
            dataField='total_balance'
            >
            Total balance
            </TableHeaderColumn>

            <TableHeaderColumn
            dataField='adjustment_amount'
            >
            Adjustment amount
            </TableHeaderColumn>

            <TableHeaderColumn
            dataField='finance_charge'
            >
            Finance charge
            </TableHeaderColumn>

            <TableHeaderColumn
            dataField='unfixed_principal_amount'
            >
            Principal
            </TableHeaderColumn>

            <TableHeaderColumn
            dataField='before_adjustment_principal_amount'
            >
            Before adjustment principal
            </TableHeaderColumn>

            <TableHeaderColumn
            dataField='unfixed_principal_amount'
            >
            Unfixed principal
            </TableHeaderColumn>

            <TableHeaderColumn
            dataField='before_adjustment_payback_amount'
            >
            Before adjustment payback
            </TableHeaderColumn>

            <TableHeaderColumn
            dataField='payback_amount'
            >
            Payback amount
            </TableHeaderColumn>

            <TableHeaderColumn
            dataField='status'
            >
            Status
            </TableHeaderColumn>

            <TableHeaderColumn
            dataField='skip_count'
            >
            Skip count
            </TableHeaderColumn>

            <TableHeaderColumn
            dataField='from_date'
            >
            From
            </TableHeaderColumn>

            <TableHeaderColumn
            dataField='due_date'
            >
            Due at
            </TableHeaderColumn>

            <TableHeaderColumn
            dataField='principal_balance'
            >
            Principal
            </TableHeaderColumn>

            <TableHeaderColumn
            dataField='min_payback_amount'
            >
            Min. Payback
            </TableHeaderColumn>

            <TableHeaderColumn
            dataField='interest_amount'
            >
            Interest
            </TableHeaderColumn>

            <TableHeaderColumn
            dataField='entry_amount'
            >
            Entry amount
            </TableHeaderColumn>

            <TableHeaderColumn
            dataField='ee_adjustment_amount'
            >
            EE adj. amount
            </TableHeaderColumn>

            <TableHeaderColumn
            dataField='er_adjustment_amount'
            >
            ER adj. amount
            </TableHeaderColumn>
            

          </BootstrapTable>
          </div>
          </div>
        </div>
      );
    }

    return null;
  }

  renderOffScheduleForm = employee => {
    const data = {
      employee,
      settlementDate: moment().toISOString()
    };

    if (employee) {
      return (
        <div className="row">
          <div className="card">
            <div className="header">
              <div className="row">
                <div className="col-md-4">
                  <h4>Pay Off-scheduled Bill</h4>
                </div>
                <div className="col-md-4"></div>
                <div className="col-md-4">
                  <div className="buttons-with-margin pull-right">
                    <button
                      type="button"
                      className="btn btn-wd btn-sm btn-danger"
                      onClick={() => this.onCancelEditButtonClick()}>
                      <span className="btn-label">
                        <i className="fa fa-times"></i>
                      </span> Back
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <PayOffScheduleForm
              initialValues={data}
              dispatch={this.props.dispatch}
            />
          </div>

          { this.renderEstimatePaymentsSummary() }

          <div className="card">
            <div className="header">
              <div className="col-md-4">
                <h4>Payback breakdown</h4>
                <p>Please fill up the fields below to preview estimate payments</p>
              </div>
            </div>

            <div className="content">
              <div className="row">
                <div className="col-sm-5">
                  <div className="form-group">
                    <label className="control-label col-md-3">Settlement Date:</label>
                    <div className="col-md-9">
                      <DatePicker
                      selected={this.state.selectedSettlementDate ? moment(this.state.selectedSettlementDate, 'YYYY-MM-DD') : null}
                      onChange={this.onChangeSettlementDate} />
                    </div>
                  </div>
                </div>

                <div className="col-sm-5">
                  <div className="form-group">
                    <label className="control-label col-md-3">Amount:</label>
                    <div className="col-md-9">
                      <input type="number" onChange={e =>this.onChangeSettlementAmount(e) } />
                    </div>
                  </div>
                </div>

                <div className="col-sm-2">
                  <button className="btn btn-flat btn-info"
                    onClick={() => this.onClickSubmitButton(employee.id)}>Submit</button>
                </div>
              </div>

              <br />

              {this.renderEstimatePaymentsTable()}
              
            </div>

          </div>
        </div>
      );
    }

    return null;
  }

  renderEmployeeBillingRemovalPanel = employee => {
    if (employee) {
      return (
        <div className="card">
          <div className="header">
            <h4>Remove Employee from Billing</h4>
            <p>Please provide the date of the billing statement</p>
          </div>
          <div className="content">
          </div>
        </div>
      );
    }

    return null;
  }

  renderEmployeeTable = () => {
    const employee = this.state.selectedEmployee;

    if (!employee) {
      return (
        <div className="card">
          <div className="header">
            <h4>Select an employee</h4>
            <p>Select a terminated employee to pay his/her off-scheduled balance</p>
          </div>
          <div className="content">
            <EmployeesTable 
              onEmployeeSelected={this.onEmployeeSelected}
              employees={this.state.employees}
              fetchTerminatedEmployees={this.props.fetchTerminatedEmployees}
              fetchTerminatedEmployeesByName={this.props.fetchTerminatedEmployeesByName} />
          </div>
        </div>
      );
    }

    return null;
  }

  render() {
    const employee = this.state.selectedEmployee;
    return (
      <div className="container-fluid">
      <NotificationSystem
                  ref={ref => this.notificationSystem = ref} />
        <div className="row">
          <div className="col-md-12">
            {this.renderOffScheduleForm(employee)}
          </div>
        </div>

        <div className="row">
          <div className="col-md-12">
            {this.renderEmployeeTable()}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  employees: state.employees,
  payments: state.bills.payments,
  fetchError: state.employees.error && state.employees.error.message
    ? state.employees.error.message
    : '',
})

const mapDispatchToProps = dispatch => ({
  fetchTerminatedEmployees: (page) => dispatch(fetchTerminatedEmployees(page)),
  fetchTerminatedEmployeesByName: (page, searchText) => dispatch(fetchTerminatedEmployeesByName(page, searchText)),
  fetchEstimatePayment: (employeeId, settlementDate, amount) => dispatch(fetchEstimatePayment(employeeId, settlementDate, amount)),
  clearEstimatedEmployee: () => dispatch(clearEstimatedEmployee()),
  dispatch: dispatch,
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OffScheduleBillsContainer);