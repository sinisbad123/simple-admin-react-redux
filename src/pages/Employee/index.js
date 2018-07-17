import React from 'react';
import { Route } from 'react-router-dom';
import ManageEmployeeId from './ManageEmployeeId';
import ManageUserRole from './ManageUserRole';
import ListEmployees from './ListEmployees';
import EmployeeDetails from './EmployeeDetails';
import { Auth } from 'aws-amplify';
import USER_ROLE from '../../constants/USER_ROLES';

class Employee extends React.Component {
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
    const match = this.props.match;
    if (!this.state.userRole || (this.state.userRole !== USER_ROLE.customer_relations && this.state.userRole !== USER_ROLE.superadmin)) {
      return (
        <div className="content">
          <Route path={`${match.url}/manage-user-role`} component={ManageUserRole} />
        </div>
      );
    }

    return (
      <div className="content">
        <Route path={`${match.url}/id/:id`} component={EmployeeDetails} />
        <Route path={`${match.url}/manage-employee-id`} component={ManageEmployeeId} />
        <Route path={`${match.url}/manage-user-role`} component={ManageUserRole} />
        <Route path={`${match.url}/employee-list`} component={ListEmployees} />
      </div>
    );
  }
}

export default Employee;