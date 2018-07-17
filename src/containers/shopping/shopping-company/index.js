import React, { Component } from 'react';
import { connect } from 'react-redux'
import DisplayShoppingCompanyForm from './displayShoppingCompanyForm';
import ShoppingEmployeesTable from '../../../pages/Shopping/ManageShoppingCompanies/shoppingCompanyEmployeesTable';
import { fetchShoppingCompanyEmployees, toggleShoppingEmployeeAccess } from '../../../actions/shopping/shopping-companies';

class ShoppingCompanyContainer extends Component {

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

  render() {
    return (
      <div className="container-fluid">
        <DisplayShoppingCompanyForm />

        <div className="row">
          <div className="col-md-12">
            <div className="card">
              <div className="header">
                <h4>Manage Employee Access</h4>
                <p>To disable/enable an employee, please select a company and select the desired employee.</p>
              </div>
              <div className="content">
                <ShoppingEmployeesTable 
                  employees={this.state.employees}
                  selectedShoppingCompany={this.state.selectedShoppingCompany}
                  toggleShoppingEmployeeAccess={this.props.toggleShoppingEmployeeAccess}
                  fetchShoppingCompanyEmployees={this.props.fetchShoppingCompanyEmployees}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}


const mapStateToProps = state => ({
  employees: state.shoppingCompanies.employees,
  selectedShoppingCompany: state.shoppingCompanies.selectedShoppingCompany,
  fetchError: state.shoppingCompanies.error && state.shoppingCompanies.error.message
    ? state.shoppingCompanies.error.message
    : ''
})

const mapDispatchToProps = dispatch => ({
  fetchShoppingCompanyEmployees: (companyId, page) => dispatch(fetchShoppingCompanyEmployees(companyId, page)),
  toggleShoppingEmployeeAccess: (employeeData, page) => dispatch(toggleShoppingEmployeeAccess(employeeData, page)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ShoppingCompanyContainer);