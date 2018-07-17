import React, { Component } from 'react';
import { connect } from 'react-redux'
import CompaniesTable from '../../../pages/Billing/ManageBills/companiesTable';
import PayOffScheduleForm from './payOffScheduleForm';

class DisplayCompanyForm extends Component {

  state = {
    companies: this.props.companies,
    isEditing: false,
    isAdding: false,
    isPayingOffschedulePayment: false,
  };

  componentWillReceiveProps(nextProps){
    this.setState({
      selectedCompany: nextProps.selectedCompany,
      companies: nextProps.companies,
      isEditing: false,
      isAdding: false,
      isPayingOffschedulePayment: nextProps.isPayingOffschedulePayment
    });
  }

  onOffSchedulePaymentClick = () => {
    if (this.props.onOffSchedulePaymentButtonClick) {
      this.props.onOffSchedulePaymentButtonClick();
    }
  }

  onCancelOffSchedule = () => {
    if (this.props.onCancelOffSchedule) {
      this.props.onCancelOffSchedule();
    }
  }

  renderTable = () => {
    return (
      <div className="row">
        <div className="col-md-12">
          <div className="card">
            <div className="header">
              <div className="row">
                <h4>Select Company</h4>
                <p>Select a company to view its unpaid bills at the panel below</p>
              </div>
            </div>
            <div className="content">
              <div className="row">
                <div className="col-md-12">
                  <CompaniesTable
                    fetchBills={this.props.fetchBills}
                    fetchCompanies={this.props.fetchCompanies}
                    companies={this.state.companies}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  renderOffSchedulePaymentForm = () => {
    const dispatch = this.props.dispatch;
    return (
      <div className="row">
        <div className="col-md-12">
          <div className="card">
            <div className="header">
              <div className="row">
                <div className="col-md-4">
                  <h4>Off-schedule payment</h4>
                  <p>Please fill-up the form below to proceed with payment</p>
                </div>

                <div className="col-md-2 col-md-offset-6">
                  <button className="btn btn-wd btn-sm btn-danger"
                    onClick={() => this.onCancelOffSchedule()}>
                    <span className="btn-label">
                        <i className="fa fa-times"></i>
                      </span> Cancel
                  </button>
                </div>
              </div>
            </div>
            <div className="content">
              <div className="row">
                <div className="col-md-12">
                  <PayOffScheduleForm
                    dispatch={dispatch}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  render() {
    if (this.state.isPayingOffschedulePayment) {
      return this.renderOffSchedulePaymentForm();
    }

    return this.renderTable();
  }
}

const mapStateToProps = state => ({
})

const mapDispatchToProps = dispatch => ({
  dispatch: dispatch,
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DisplayCompanyForm)