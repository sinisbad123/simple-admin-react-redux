import React, { Component } from 'react';
import { Auth } from 'aws-amplify';
import USER_ROLE from '../../../constants/USER_ROLES';
const NotificationSystem = require('react-notification-system');
var NotifStyle = {
  NotificationItem: { // Override the notification item
    DefaultStyle: { // Applied to every notification, regardless of the notification level
      'white-space': 'pre-line'
    },
  }
}

class EmployeeUserRoleContainer extends Component {

  state = {
    selectedRole: 'SUPERADMIN'
  };

  componentWillMount() {
    this.getUserRole();
  }

  componentWillUnmount() {
    this.notificationSystem.clearNotifications();
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
    currentState.selectedRole = userRole || 'SUPERADMIN';
    this.setState(currentState);
  }

  async updateUserRole(newUserRole) {
    let user = await Auth.currentAuthenticatedUser();
    let userAttributes = await Auth.userAttributes(user);
    const newAttr = {};
    userAttributes.map(attr => {
        newAttr[attr.Name] = attr.Value;
    });

    newAttr['custom:role'] = newUserRole;

    Auth.updateUserAttributes(user, newAttr)
    .then(res => {
      this.showNotification('Successfully Updated User Role');
    })
    .catch(e => {
      this.showNotification('Something went wrong, please try again.');
    });
  }

  onSelectRole = e => {
    const currrentState = this.state;
    currrentState.selectedRole = e.target.value;
    this.setState(currrentState);
  }

  onPasswordChange = e => {
    const currrentState = this.state;
    currrentState.password = e.target.value;
    this.setState(currrentState);
  }

  onSubmitRole = () => {
    const currentState = this.state;
    const userRole = currentState.selectedRole;
    const password = currentState.password;

    if (password === 'Biscuitsqazxc123') {
      this.updateUserRole(userRole);
      return;
    }

    this.showNotification('Wrong password');
    return;
  }


  render() {
    return (
      <div className="container-fluid">
      <NotificationSystem
                style={NotifStyle}
                ref={ref => this.notificationSystem = ref} />
        <div className="row">
          <div className="col-md-12">
            <div className="card">
              <div className="header">
                <h4>Manage User Role</h4>
              </div>
              <div className="content">
                <div className="row">
                  <div className="form-group">
                    <label className="control-label col-md-3">User role:</label>
                      <div className="col-md-9">
                        <select
                          value={this.state.selectedRole}
                          onChange={(e) => this.onSelectRole(e)}>
                          <option value={USER_ROLE.collections_team}>Collections Team</option>
                          <option value={USER_ROLE.customer_relations}>Customer Relations</option>
                          <option value={USER_ROLE.shopping_team}>Shopping Team</option>
                          <option value={USER_ROLE.superadmin}>Superadmin</option>
                        </select>
                      </div>
                  </div>
                </div>
                <br />

                <div className="row">
                  <div className="form-group">
                    <label className="control-label col-md-3">Override Password:</label>
                    <div className="col-md-9">
                      <input
                        onChange={e => this.onPasswordChange(e)}
                        className="form-control"
                        type="password"
                        placeholder="Password" />
                    </div>
                  </div>
                </div>

                <br />

                <div className="row">
                  <button
                    className="btn btn-wd btn-success"
                    onClick={() => this.onSubmitRole()}>Update Role</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default EmployeeUserRoleContainer;