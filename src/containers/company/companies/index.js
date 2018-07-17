import React, { Component } from 'react';
import { connect } from 'react-redux'
import CompaniesTable from '../../../pages/Company/ManageCompanies/companiesTable';
import DisplayCompanyForm from './displayCompanyForm';
import { fetchCompany, fetchCompanies } from '../../../actions/company/companies';

class CompanyContainer extends Component {

  state = {
    companies: this.props.companies,
  };

  componentWillReceiveProps(nextProps){
    this.setState({
      companies: nextProps.companies,
    });
  }

  onAccountCreated = accounts => {
    const currentState = this.state;
    currentState.accounts = accounts;
    this.setState(currentState);
  };

  onCloseAccountCreatedModal = index => {
    const currentState = Object.assign({}, this.state);
    currentState.accounts.splice(index, 1);
    this.setState(currentState);
    return;
  }

  renderAccountCreatedCards = () => {
    const accounts = this.state.accounts;
    if (accounts && Array.isArray(accounts) && accounts.length > 0) {
      const accountItems = accounts.map((account, idx) => {
        return (
          <div id={idx} className="panel panel-success">
            <div className="panel-heading">
              <p>Account Created!</p>
            </div>
  
            <div className="panel-body">
              <div className="row">
                <div className="col-md-12">
                  <p style={{ whiteSpace: 'pre-line' }}>{account}</p>
                  <p className="pull-right">
                    <button className="btn btn-wd btn-sm btn-info"
                      onClick={() => this.onCloseAccountCreatedModal(idx)}>
                      Close
                    </button>
                  </p>
                </div>
              </div>
            </div>
          </div>
        );
      });
      return (
        <div className="row">
          <div className="col-md-12">
            {accountItems}
          </div>
        </div>
      );
    }

    return null;
  }

  render() {
    return (
      <div className="container-fluid">
        
        {this.renderAccountCreatedCards()}

        <DisplayCompanyForm
          onAccountCreated={this.onAccountCreated}
          />

        <div className="row">
          <div className="col-md-12">

            <div className="card">
              <div className="header">
                <h4>Manage Companies</h4>
                <p>Edit or delete brands</p>
              </div>
              <div className="content">
                <CompaniesTable
                  companies={this.state.companies}
                  fetchCompany={this.props.fetchCompany}
                  fetchCompanies={this.props.fetchCompanies} />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  companies: state.companies.data,
})

const mapDispatchToProps = dispatch => ({
  fetchCompanies: () => dispatch(fetchCompanies()),
  fetchCompany: (companyId) => dispatch(fetchCompany(companyId)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CompanyContainer);