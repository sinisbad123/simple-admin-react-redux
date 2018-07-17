import React, { Component } from 'react';
import { connect } from 'react-redux'
import UpdateCompanyForm from  './updateCompanyForm';
import UpdateCompanyLogin from  './updateCompanyLogin';
import AddCompanyForm from  './addCompanyForm';
import { updateCompany } from '../../../actions/company/companies';
import SweetAlert from 'sweetalert-react';
const NotificationSystem = require('react-notification-system');
var NotifStyle = {
  NotificationItem: { // Override the notification item
    DefaultStyle: { // Applied to every notification, regardless of the notification level
      'white-space': 'pre-line'
    },
  }
}

class DisplayCompanyForm extends Component {

  state = {
    selectedCompany: this.props.selectedCompany,
    isEditing: false,
    isEditingEmail: false,
    isAdding: false,
    errorMessage: '',
    page: this.props.page,
  };

  componentWillReceiveProps(nextProps){
    if (nextProps.fetchError || nextProps.fetchError !== '') {
      if (Array.isArray(nextProps.fetchError)) {
        if (this.props.onAccountCreated) {
          this.props.onAccountCreated(nextProps.fetchError);
        }
      } else {
        this.showNotification(nextProps.fetchError);
      }
    }

    this.setState({
      selectedCompany: nextProps.selectedCompany,
      page: nextProps.page,
      isEditing: false,
      isEditingEmail: false,
      errorMessage: nextProps.fetchError,
      isAdding: false,
    });
  }

  componentWillUnmount() {
    this.notificationSystem.clearNotifications();
  }

  onBackButtonClick = () => {
    const currentState = this.state;
    currentState.selectedCompany = null;
    this.setState(currentState);
  }

  onAddButtonClick = () => {
    console.log('is adding');
    const currentState = this.state;
    currentState.isAdding = true;
    this.setState(currentState);
  }

  onEditButtonClick = () => {
    const currentState = this.state;
    currentState.isEditing = true;
    this.setState(currentState);
  }

  onDisableCompanyClick = () => {
    const currentState = this.state;
    if (currentState.selectedCompany) {
      let company = currentState.selectedCompany;
      company.status = 'SUSPENDED';

      if (this.props.dispatch) {
        this.props.dispatch(updateCompany(company));
      }
    }
  }

  onActivateCompanyClick = () => {
    const currentState = this.state;
    if (currentState.selectedCompany) {
      let company = currentState.selectedCompany;
      company.status = 'EXCELLENT';

      if (this.props.dispatch) {
        this.props.dispatch(updateCompany(company));
      }
    }
  }

  onEditEmailButtonClick = () => {
    const currentState = this.state;
    currentState.isEditingEmail = true;
    this.setState(currentState);
  }

  onCancelAddButtonClick = () => {
    const currentState = this.state;
    currentState.show = true;
    this.setState(currentState);
  }

  onConfirmCancel = () => {
    const currentState = this.state;
    currentState.isAdding = false;
    currentState.isEditing = false;
    currentState.show = false;
    this.setState(currentState);
  }

  onCancelEditButtonClick = () => {
    const currentState = this.state;
    currentState.show = true;
    this.setState(currentState);
  }

  onCancelEditEmailButtonClick = () => {
    const currentState = this.state;
    currentState.isEditingEmail = false;
    this.setState(currentState);
  }

  showNotification = (message) => {
    this.notificationSystem.addNotification({
      message,
      level: 'success',
      autoDismiss: 2,
      position: 'tr',
      dismissible: 'button'
    });
  };

  renderCompanyAccessButton = () => {
    const company = this.state.selectedCompany;
    if (company && company.status !== 'TRANSFERRED') {
      if (company.status && (company.status === 'EXCELLENT' || company.status === 'GOOD')) {
        return (
          <button
              type="button"
              className="btn btn-wd btn-sm btn-danger"
              onClick={() => this.onDisableCompanyClick()}>
              Disable company access
          </button>
        );
      }

      return (
        <button
            type="button"
            className="btn btn-wd btn-sm btn-success"
            onClick={() => this.onActivateCompanyClick()}>
            Enable company access
        </button>
      );
    }

    return null;
  }

  renderNoSelectedDisplay = () => {
    return (
      <div className="row">
      <NotificationSystem
                style={NotifStyle}
                ref={ref => this.notificationSystem = ref} />
        <div className="col-md-12">
          <div className="card">
            <div className="header">
                <div className="row">
                  <div className="col-md-4"></div>
                  <div className="col-md-4">
                    <p className="text-center">
                      <button
                        type="button"
                        onClick={() => this.onAddButtonClick()}
                        className="btn btn-wd btn-sm btn-success">
                        <span className="btn-label">
                          <i className="fa fa-plus"></i>
                        </span> Add Company
                      </button>
                    </p>

                    <p className="text-center">
                      To update a company, please select from the table below
                    </p>
                  </div>
                  <div className="col-md-4"></div>
                </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  renderNormalDisplay = (company) => {
    return (
      <div className="row">
        <NotificationSystem
                style={NotifStyle}
                ref={ref => this.notificationSystem = ref} />
        <div className="col-md-12">
          <div className="card">
            <div className="header">
              <div className="row">
                <div className="col-md-4">
                  <button
                    type="button"
                    className="btn btn-wd btn-sm btn-default"
                    onClick={() => this.onBackButtonClick()}>
                    <span className="btn-label">
                      <i className="fa fa-angle-left"></i>
                    </span> Back
                  </button>
                  <h4>Update Company</h4>
                  <p>Edit or delete selected company</p>
                </div>
                <div className="col-md-2">
                </div>
                <div className="col-md-6">
                  <div className="buttons-with-margin pull-right">
                    <button
                      type="button"
                      className="btn btn-wd btn-sm btn-info"
                      onClick={() => this.onEditButtonClick()}>
                      <span className="btn-label">
                        <i className="fa fa-edit"></i>
                      </span> Edit
                    </button>

                    <button
                      type="button"
                      className="btn btn-wd btn-sm btn-success"
                      onClick={() => this.onEditEmailButtonClick()}>
                      <span className="btn-label">
                        <i className="fa fa-key"></i>
                      </span> Update Log-in Account
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="content">
              <div className="row">
                <div className="col-md-6">
                  <div className="typo-line">
                    <h5>
                      <p className="category">Company name:</p>
                      {company.name}
                    </h5>
                  </div>

                  <div className="typo-line">
                    <h5>
                      <p className="category">Company type:</p>
                      {company.company_type}
                    </h5>
                  </div>

                  <div className="typo-line">
                    <h5>
                      <p className="category">Address:</p>
                      {company.address}
                    </h5>
                  </div>

                  {this.renderCompanyAccessButton()}
                </div>

                <div className="col-md-6">
                  <div className="typo-line">
                    <h5>
                      <p className="category">Contact Number:</p>
                      {company.contact_number}
                    </h5>
                  </div>

                  <div className="typo-line">
                    <h5>
                      <p className="category">Email:</p>
                      {company.email}
                    </h5>
                  </div>

                  <div className="typo-line">
                    <h5>
                      <p className="category">Status:</p>
                      {company.status}
                    </h5>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  renderUpdateFormDisplay = (company) => {
    return (
      <div className="row">
        <NotificationSystem
                style={NotifStyle}
                ref={ref => this.notificationSystem = ref} />
        <div className="col-md-12">
          <div className="card">
            <div className="header">
              <div className="row">
                <div className="col-md-4">
                  <h4>Update Company</h4>
                  <p>Edit or delete selected company</p>
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
            
            <UpdateCompanyForm
              initialValues={company}
              dispatch={this.props.dispatch} />
          </div>
        </div>
      </div>
    );
  }

  renderUpdateLoginDisplay = (company) => {
    return (
      <div className="row">
        <NotificationSystem
                style={NotifStyle}
                ref={ref => this.notificationSystem = ref} />
        <div className="col-md-12">
          <div className="card">
            <div className="header">
              <div className="row">
                <div className="col-md-4">
                  <h4>Update Company Login-in</h4>
                  <p>Update company email and log-in for Biscuits Work</p>
                </div>
                <div className="col-md-4"></div>
                <div className="col-md-4">
                  <div className="buttons-with-margin pull-right">
                    <button
                      type="button"
                      className="btn btn-wd btn-sm btn-danger"
                      onClick={() => this.onCancelEditEmailButtonClick()}>
                      <span className="btn-label">
                        <i className="fa fa-times"></i>
                      </span> I don't want to edit anymore
                    </button>
                  </div>
                </div>
              </div>
            </div>
            
            <UpdateCompanyLogin
              initialValues={company}
              dispatch={this.props.dispatch} />
          </div>
        </div>
      </div>
    );
  }

  renderAddFormDisplay = () => {
    return (
      <div className="row">
        <NotificationSystem
                style={NotifStyle}
                ref={ref => this.notificationSystem = ref} />
        <div className="col-md-12">
          <div className="card">
            <div className="header">
              <div className="row">
                <div className="col-md-4">
                  <h4>Add New Company</h4>
                </div>
                <div className="col-md-4"></div>
                <div className="col-md-4">
                  <div className="buttons-with-margin pull-right">
                    <button
                      type="button"
                      className="btn btn-wd btn-sm btn-danger"
                      onClick={() => this.onCancelAddButtonClick()}>
                      <span className="btn-label">
                        <i className="fa fa-times"></i>
                      </span> I don't want to add anymore
                    </button>
                  </div>
                </div>
              </div>
            </div>
            
            <AddCompanyForm
              dispatch={this.props.dispatch} />
          </div>
        </div>
      </div>
    );
  }

  renderMainComponent = () => {
    const selectedCompany = this.state.selectedCompany;

    if (this.state.isAdding) {
      return this.renderAddFormDisplay();
    }

    if (selectedCompany) {
      if (this.state.isEditing) {
        return this.renderUpdateFormDisplay(selectedCompany);
      }

      if (this.state.isEditingEmail) {
        return this.renderUpdateLoginDisplay(selectedCompany);
      }

      return this.renderNormalDisplay(selectedCompany);
    }

    return this.renderNoSelectedDisplay();
  }

  render() {
    

    return (
      <div>
        <SweetAlert
          show={this.state.show}
          title="Discard changes"
          text="Changes will not be saved, continue?"
          showCancelButton
          onConfirm={() => this.onConfirmCancel()}
          onCancel={() => {
            this.setState({ show: false });
          }}
        />
        {this.renderMainComponent()}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  selectedCompany: state.companies.selectedCompany,
  page: state.companies.page,
  fetchError: state.companies.error && state.companies.error.message
    ? state.companies.error.message
    : ''
})

const mapDispatchToProps = dispatch => ({
  dispatch: dispatch,
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DisplayCompanyForm)