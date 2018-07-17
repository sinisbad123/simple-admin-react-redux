import React from 'react';
import { Route } from 'react-router-dom';
import ManageCompanies from './ManageCompanies';
import { Auth } from 'aws-amplify';
import USER_ROLE from '../../constants/USER_ROLES';

class Company extends React.Component {
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

  render() {
    if (!this.state.userRole || (this.state.userRole !== USER_ROLE.customer_relations && this.state.userRole !== USER_ROLE.superadmin)) {
      return null;
    }

    const match = this.props.match;

    return (
      <div className="content">
        <Route path={`${match.url}/manage-companies`} component={ManageCompanies} />
      </div>
    );
  }
}

export default Company;