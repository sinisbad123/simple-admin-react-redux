import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Collapse } from 'react-bootstrap';
import { Auth } from 'aws-amplify';
import USER_ROLE from '../../constants/USER_ROLES';

const shoppingBaseRoute = '/shopping';
const shoppingNavigation = [
  {
    route: `${shoppingBaseRoute}/manage-orders`,
    name: 'Orders'
  },
  {
    route: `${shoppingBaseRoute}/manage-products`,
    name: 'Products'
  },
  {
    route: `${shoppingBaseRoute}/manage-brands`,
    name: 'Brands'
  },
  {
    route: `${shoppingBaseRoute}/manage-categories`,
    name: 'Categories'
  },
  {
    route: `${shoppingBaseRoute}/manage-shops`,
    name: 'Shops'
  },
  {
    route: `${shoppingBaseRoute}/manage-shopping-companies`,
    name: 'Shopping Loan Eligibility'
  },
];

const companyBaseRoute = '/company';
const companyNavigation = [
  {
    route: `${companyBaseRoute}/manage-companies`,
    name: 'Manage Companies'
  },
];

const billingBaseRoute = '/billing';
const billingNavigation = [
  {
    route: `${billingBaseRoute}/manage-bills`,
    name: 'Manage Bills'
  },
  {
    route: `${billingBaseRoute}/manage-offschedule-bills`,
    name: 'Manage Resigned/Terminated Employees'
  },
];

const employeeBaseRoute = '/employee';
const employeeNavigation = [
  {
    route: `${employeeBaseRoute}/manage-employee-id`,
    name: 'Manage Employee Ids'
  },
  {
    route: `${employeeBaseRoute}/employee-list`,
    name: 'Employee List'
  },
];

const reportsBaseRoute = '/reports';
const reportsNavigation = [
  {
    route: `${reportsBaseRoute}/kpi`,
    name: 'View KPIs'
  },
];

class Nav extends Component {

  state = {};

  componentWillMount() {
    this.getUserRole();
  }

  async getUserRole() {
    let user = await Auth.currentAuthenticatedUser();
    let userAttributes = await Auth.userAttributes(user);
    let userRole = null;
    userAttributes.map(attr => {
        if (attr.Name === 'custom:role') {
          userRole = attr.Value;
        }
    });

    const currentState = this.state;
    currentState.userRole = userRole || 'SUPERADMIN';
    this.setState(currentState);
  }

  renderShoppingNavigation() {
    if (!this.state.userRole || (this.state.userRole !== USER_ROLE.shopping_team && this.state.userRole !== USER_ROLE.superadmin)) {
      return null;
    }

    const shoppingNavigationItems = shoppingNavigation.map(page => {
      return <li key={page.name} className={this.isPathActive(page.route) ? 'active' : null}>
      <Link to={`${page.route}`}>{page.name}</Link>
    </li>;
    });

    return <li className={this.isPathActive('/shopping') || this.state.shoppingMenuOpen ? 'active' : null}>
      <a onClick={() => this.setState({ shoppingMenuOpen: !this.state.shoppingMenuOpen })} data-toggle="collapse">
        <i className="pe-7s-note2"></i>
        <p>Shopping <b className="caret"></b></p>
      </a>
      <Collapse in={this.state.shoppingMenuOpen}>
        <div>
          <ul className="nav">
            {shoppingNavigationItems}
          </ul>
        </div>
      </Collapse>
    </li>;
  }

  renderBillingNavigation() {
    if (!this.state.userRole || (this.state.userRole !== USER_ROLE.collections_team && this.state.userRole !== USER_ROLE.superadmin)) {
      return null;
    }

    const billingNavigationItems = billingNavigation.map((page) => {
      return <li key={page.name} className={this.isPathActive(page.route) ? 'active' : null}>
          <Link to={`${page.route}`}>{page.name}</Link>
        </li>;
    });

    return <li className={this.isPathActive('/billing') || this.state.billingMenuOpen ? 'active' : null}>
      <a onClick={() => this.setState({ billingMenuOpen: !this.state.billingMenuOpen })} data-toggle="collapse">
        <i className="fa fa-book"></i>
        <p>Billing <b className="caret"></b></p>
      </a>
      <Collapse in={this.state.billingMenuOpen}>
        <div>
          <ul className="nav">
            {billingNavigationItems}
          </ul>
        </div>
      </Collapse>
    </li>;
  }

  renderCompanyNavigation() {
    if (!this.state.userRole || (this.state.userRole !== USER_ROLE.customer_relations && this.state.userRole !== USER_ROLE.superadmin)) {
      return null;
    }

    const companyNavigationItems = companyNavigation.map((page) => {
      return <li key={page.name} className={this.isPathActive(page.route) ? 'active' : null}>
          <Link to={`${page.route}`}>{page.name}</Link>
        </li>;
    });;

    return <li className={this.isPathActive('/company') || this.state.companyMenuOpen ? 'active' : null}>
      <a onClick={() => this.setState({ companyMenuOpen: !this.state.companyMenuOpen })} data-toggle="collapse">
        <i className="fa fa-building"></i>
        <p>Company <b className="caret"></b></p>
      </a>
      <Collapse in={this.state.companyMenuOpen}>
        <div>
          <ul className="nav">
            {companyNavigationItems}
          </ul>
        </div>
      </Collapse>
    </li>;
  }

  renderEmployeeNavigation() {
    if (!this.state.userRole || (this.state.userRole !== USER_ROLE.customer_relations && this.state.userRole !== USER_ROLE.superadmin)) {
      return null;
    }

    const employeeNavigationItems = employeeNavigation.map((page) => {
      return <li key={page.name} className={this.isPathActive(page.route) ? 'active' : null}>
          <Link to={`${page.route}`}>{page.name}</Link>
        </li>;
    });

    return <li className={this.isPathActive('/employee') || this.state.employeeMenuOpen ? 'active' : null}>
      <a onClick={() => this.setState({ employeeMenuOpen: !this.state.employeeMenuOpen })} data-toggle="collapse">
        <i className="fa fa-user"></i>
        <p>Employee <b className="caret"></b></p>
      </a>
      <Collapse in={this.state.employeeMenuOpen}>
        <div>
          <ul className="nav">
            {employeeNavigationItems}
          </ul>
        </div>
      </Collapse>
    </li>;
  }

  renderReportsNavigation() {

    const reportsNavigationItems = reportsNavigation.map((page) => {
      return <li key={page.name} className={this.isPathActive(page.route) ? 'active' : null}>
          <Link to={`${page.route}`}>{page.name}</Link>
        </li>;
    });

    return <li className={this.isPathActive('/reports') || this.state.reportsMenuOpen ? 'active' : null}>
      <a onClick={() => this.setState({ reportsMenuOpen: !this.state.reportsMenuOpen })} data-toggle="collapse">
        <i className="fa fa-clipboard"></i>
        <p>Reports <b className="caret"></b></p>
      </a>
      <Collapse in={this.state.reportsMenuOpen}>
        <div>
          <ul className="nav">
            {reportsNavigationItems}
          </ul>
        </div>
      </Collapse>
    </li>;
  }

  render() {
    return (
      <ul className="nav">
        {this.renderShoppingNavigation()}

        {this.renderCompanyNavigation()}

        {this.renderBillingNavigation()}

        {this.renderEmployeeNavigation()}
        
        {this.renderReportsNavigation()}
      </ul>
    );
  }

  isPathActive(path) {
    return this.props.location.pathname.startsWith(path);
  }
}

export default withRouter(Nav);