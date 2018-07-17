import React, { Component } from 'react';
import { connect } from 'react-redux'
import BillsTable from '../../../pages/Billing/ManageBills/billsTable';
import DisplayCompanyForm from './displayCompanyForm';
import { fetchCompany, fetchCompanies } from '../../../actions/company/companies';
import { fetchBills, fetchBill, unselectBill } from '../../../actions/billing/bills';
import PayBillForm from './payBillForm';
const NotificationSystem = require('react-notification-system');

class BillsContainer extends Component {

  state = {
    companies: this.props.companies,
    bills: this.props.bills,
  };

  componentWillReceiveProps(nextProps) {
    if ((nextProps.fetchError && nextProps.fetchError !== '') && nextProps.fetchError !== this.state.fetchError) {
      this.showNotification(nextProps.fetchError);
    }

    this.setState({
      selectedBill: nextProps.selectedBill,
      companies: nextProps.companies,
      bills: nextProps.bills,
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
      autoDismiss: 2,
      position: 'tr'
    });
  };

  onFetchBills = company => {
    const currentState = this.state;
    currentState.selectedCompany = company;
    this.setState(currentState);

    if (this.props.fetchBills) {
      this.props.fetchBills(company.id);
    }
  }

  onOffSchedulePaymentButtonClick = () => {
    const currentState = this.state;
    currentState.isPayingOffschedulePayment = true;
    this.setState(currentState);
  }

  onCancelOffSchedule = () => {
    const currentState = this.state;
    currentState.isPayingOffschedulePayment = false;
    this.setState(currentState);
  }

  onCancelEditButtonClick = () => {
    if (this.props.unselectBill) {
      this.props.unselectBill();
    }
  }

  renderPayBillForm = bill => {
    bill.company = this.state.selectedCompany;
    return (
      <div className="row">
        <div className="col-md-12">
          <div className="card">
            <div className="header">
              <div className="row">
                <div className="col-md-4">
                  <h4>Pay bill</h4>
                  <p>Specify amount and date for bill payment</p>
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
                      </span> I don't want to edit anymore
                    </button>
                  </div>
                </div>
              </div>
            </div>
            
            <PayBillForm
              initialValues={bill}
              dispatch={this.props.dispatch} />
          </div>
        </div>
      </div>
    );
  }

  renderBillTable = () => {
    return (
      <div className="row">
        <div className="col-md-12">
          <div className="card">
            <div className="header">
              <h4>Manage Bills</h4>
              <p>Please select a company above to view its unpaid bills</p>
            </div>
            <div className="content">
              <BillsTable
                fetchBill={this.props.fetchBill}
                showNotification={this.showNotification}
                bills={this.state.bills} />
            </div>
          </div>
        </div>
      </div>
    );
  }

  renderBottomPanel = () => {
    if (!this.state.isPayingOffschedulePayment) {
      const selectedBill = this.state.selectedBill;
      if (selectedBill) {
        return this.renderPayBillForm(selectedBill);
      }

      return this.renderBillTable();
    }

    return null;
  }

  render() {
    return (
      <div className="container-fluid">
        <NotificationSystem
                  ref={ref => this.notificationSystem = ref} />
        <DisplayCompanyForm
          isPayingOffschedulePayment={this.state.isPayingOffschedulePayment}
          onOffSchedulePaymentButtonClick={this.onOffSchedulePaymentButtonClick}
          onCancelOffSchedule={this.onCancelOffSchedule}
          companies={this.state.companies}
          fetchCompanies={this.props.fetchCompanies}
          fetchCompany={this.props.fetchCompany}
          fetchBills={this.onFetchBills} />

        {this.renderBottomPanel()}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  selectedBill: state.bills.selectedBill,
  companies: state.companies.data,
  bills: state.bills.data,
  fetchError: state.companies.error && state.companies.error.message
    ? state.companies.error.message
    : '',
})

const mapDispatchToProps = dispatch => ({
  fetchCompanies: () => dispatch(fetchCompanies()),
  fetchCompany: (companyId) => dispatch(fetchCompany(companyId)),
  fetchBills: (companyId) => dispatch(fetchBills(companyId)),
  fetchBill: (bill) => dispatch(fetchBill(bill)),
  unselectBill: () => dispatch(unselectBill()),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BillsContainer);