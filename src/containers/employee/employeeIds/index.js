import React, { Component } from 'react';
import { connect } from 'react-redux'
import ReactImageMagnify from 'react-image-magnify';
import EmployeeIdsTable from '../../../pages/Employee/ManageEmployeeId/employeeIdsTable';
import { fetchEmployeeIds, updateEmployeeIdStatus } from '../../../actions/employee/employeeIds';
const NotificationSystem = require('react-notification-system');
var NotifStyle = {
  NotificationItem: { // Override the notification item
    DefaultStyle: { // Applied to every notification, regardless of the notification level
      'white-space': 'pre-line'
    },
  }
}

class EmployeeIdsContainer extends Component {

  state = {
    employeeIds: this.props.employeeIds,
    errorMessage: '',
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.fetchError || nextProps.fetchError !== '') {
      if (Array.isArray(nextProps.fetchError)) {
        nextProps.fetchError.map(message => {
          this.showNotification(message);
          return null;
        });
      } else {
        this.showNotification(nextProps.fetchError);
      }
    }

    this.setState({
      errorMessage: nextProps.fetchError,
      employeeIds: nextProps.employeeIds,
    });
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

  fetchIdSelected = data => {
    const currentState = this.state;
    currentState.selectedId = data;
    this.setState(currentState);
  }

  renderIdDetailsPanel = () => {
    const idData = this.state.selectedId;

    if (idData) {
      return (
        <div>
          <div className="row">
            <div className="col-sm-6">
            <ReactImageMagnify {...{
                  smallImage: {
                      alt: idData.raw,
                      isFluidWidth: true,
                      src: idData.raw,
                  },
                  largeImage: {
                      src: idData.raw,
                      width: 1500,
                      height: 500
                  }
              }} />
            </div>
          </div>

          <br />

          <div className="row">
            <div className="col-sm-6">
              <label className="control-label">Employee #</label>
            </div>

            <div className="col-sm-6">
              <p>{idData.employee_id}</p>
            </div>
          </div>

          <div className="row">
            <div className="col-sm-6">
              <label className="control-label">I.D. #</label>
            </div>

            <div className="col-sm-6">
              <p>{idData.card_number}</p>
            </div>
          </div>
        </div>
      );
    }

    return null;
  }

  render() {
    return (
      <div className="container-fluid">
        <div className="row">
          <NotificationSystem
                  style={NotifStyle}
                  ref={ref => this.notificationSystem = ref} />

          <div className="row">
            <div className="col-md-12">
              <div className="card">
                <div className="header">
                  <h4>I.D. Details Panel</h4>
                  <p>You can view the details of the selected I.D. in this panel</p>
                </div>
                <div className="content">
                  {this.renderIdDetailsPanel()}
                </div>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-md-12">
              <div className="card">
                <div className="header">
                  <h4>Manage Employee I.D. Submissions</h4>
                  <p>You can type in the filter by status using the dropdown below</p>
                  <p>You can also click on the thumbnail of the IDs in order to show the full size of the image</p>
                </div>
                <div className="content">
                  <EmployeeIdsTable
                    employeeIds={this.state.employeeIds}
                    fetchEmployeeIds={this.props.fetchEmployeeIds}
                    fetchIdSelected={this.fetchIdSelected}
                    updateEmployeeIdStatus={this.props.updateEmployeeIdStatus} />
                </div>
              </div>
            </div>
          </div>

          
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  employeeIds: state.employeeIds.data,
  fetchError: state.employeeIds.error && state.employeeIds.error.message
    ? state.employeeIds.error.message
    : ''
})

const mapDispatchToProps = dispatch => ({
  fetchEmployeeIds: statuses => dispatch(fetchEmployeeIds(statuses)),
  updateEmployeeIdStatus: data => dispatch(updateEmployeeIdStatus(data))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EmployeeIdsContainer);