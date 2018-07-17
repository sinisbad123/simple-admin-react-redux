import React from 'react';
import { Route } from 'react-router-dom';
import KPI from './kpi';
import { Auth } from 'aws-amplify';
import USER_ROLE from '../../constants/USER_ROLES';

class Reports extends React.Component {
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
    if (!this.state.userRole || (this.state.userRole !== USER_ROLE.collections_team && this.state.userRole !== USER_ROLE.superadmin)) {
      return null;
    }

    return (
      <div className="content">
          <Route path={`${match.url}/kpi`} component={KPI} />
      </div>
    );
  }
}

export default Reports;