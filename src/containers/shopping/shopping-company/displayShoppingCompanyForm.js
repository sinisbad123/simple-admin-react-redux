import React, { Component } from 'react';
import { connect } from 'react-redux'
import ShoppingCompaniesTable from '../../../pages/Shopping/ManageShoppingCompanies/shoppingCompaniesTable';
import { 
  enableShoppingCompany,
  disableShoppingCompany,
  fetchShoppingCompanies,
  fetchShoppingCompany }
from '../../../actions/shopping/shopping-companies';
const NotificationSystem = require('react-notification-system');

class DisplayBrandForm extends Component {

  state = {
    shoppingCompanies: this.props.shoppingCompanies,
    selectedShoppingCompany: this.props.selectedShoppingCompany,
    isEditing: false,
    showError: false,
    isAdding: false,
    errorMessage: '',
    page: this.props.page
  };

  componentWillReceiveProps(nextProps){
    if (nextProps.fetchError || nextProps.fetchError !== '') {
      this.showNotification(nextProps.fetchError);
    }

    this.setState({
      shoppingCompanies: nextProps.shoppingCompanies,
      selectedShoppingCompany: nextProps.selectedShoppingCompany,
      isEditing: false,
      showError: nextProps.fetchError.trim() !== '',
      errorMessage: nextProps.fetchError,
      page: nextProps.page,
      isAdding: false,
    });
  }

  componentWillUnmount() {
    this.notificationSystem.clearNotifications();
  }

  onEditButtonClick = () => {
    const currentState = this.state;
    currentState.isEditing = true;
    this.setState(currentState);
  }

  onEnableDisableButtonClick = () => {
    const company = this.state.selectedShoppingCompany;

    if (company) {
      if (company.disabled) {
        if (this.props.enableShoppingCompany) {
          this.props.enableShoppingCompany(company.id);
        }
      }
  
      if (!company.disabled) {
        if (this.props.disableShoppingCompany) {
          this.props.disableShoppingCompany(company.id);
        }
      }
    }
  }

  showNotification = (message) => {
    this.notificationSystem.addNotification({
      message,
      level: 'success',
      autoDismiss: 2,
      position: 'tr',
    });
  };

  renderDisplay = () => {
    const company = this.state.selectedShoppingCompany;
    return (
      <div className="row">
        <div className="col-md-12">
          <div className="card">
            <div className="header">
              <p>To see a company's info, select a company below.</p> 
            </div>
            <div className="content">
              <NotificationSystem
                ref={ref => this.notificationSystem = ref} />

                <div className="row">
                  <div className="col-md-6">
                    <ShoppingCompaniesTable
                      shoppingCompanies={this.state.shoppingCompanies}
                      fetchShoppingCompany={this.props.fetchShoppingCompany}
                      fetchShoppingCompanies={this.props.fetchShoppingCompanies} />
                  </div>
                  <div className="col-md-6">
                    { this.renderCompanyInformation(company) }
                  </div>
                </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  renderCompanyInformation = (company, page) => {
    if (!company) {
      return null;
    }

    return (
      <div className="row">
        <div className="row">
          <div className="col-md-6">
            <NotificationSystem
                ref={ref => this.notificationSystem = ref} />
          </div>
          <div className="col-md-6">
            <div className="buttons-with-margin pull-right">
              <button
                type="button"
                className={`btn btn-wd btn-sm ${company.disabled ? 'btn-info' : 'btn-danger'}`}
                onClick={() => this.onEnableDisableButtonClick()}>
                <span className="btn-label">
                  <i className="fa fa-edit"></i>
                </span> {company.disabled ? 'Enable' : 'Disable'}
              </button>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-md-12">
            <h4>Company Information</h4>
            <div className="typo-line">
              <h5>
                <p className="category">Company name:</p>
                {company.name}
              </h5>
            </div>
          </div>
        </div>
      </div>
    );
  }

  render() {
    return this.renderDisplay();
  }
}

const mapStateToProps = state => ({
  shoppingCompanies: state.shoppingCompanies,
  selectedShoppingCompany: state.shoppingCompanies.selectedShoppingCompany,
  page: state.shoppingCompanies.page,
  fetchError: state.shoppingCompanies.error && state.shoppingCompanies.error.message
    ? state.shoppingCompanies.error.message
    : ''
})

const mapDispatchToProps = dispatch => ({
  enableShoppingCompany: (shoppingCompanyId) => dispatch(enableShoppingCompany(shoppingCompanyId)),
  disableShoppingCompany: (shoppingCompanyId) => dispatch(disableShoppingCompany(shoppingCompanyId)),
  fetchShoppingCompanies: (page) => dispatch(fetchShoppingCompanies(page)),
  fetchShoppingCompany: (shoppingCompanyId) => dispatch(fetchShoppingCompany(shoppingCompanyId)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DisplayBrandForm)