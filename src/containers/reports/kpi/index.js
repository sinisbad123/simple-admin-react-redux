import React, { Component } from 'react';
import { connect } from 'react-redux'
import { fetchReportList, fetchReportData } from '../../../actions/reports/kpi';
import { BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
const NotificationSystem = require('react-notification-system');

class KPIContainer extends Component {

  state = {
  };

  componentWillMount() {
    if (this.props.fetchReportList) {
      this.props.fetchReportList();
    }
  }

  componentWillReceiveProps(nextProps){
    if ((nextProps.fetchError && nextProps.fetchError !== '')) {
      this.showNotification(nextProps.fetchError);
    }

    if (!this.state.kpiList && nextProps.kpiList) {
      if (this.props.fetchReportData) {
        this.props.fetchReportData(nextProps.kpiList[0].key);
      }
    }

    this.setState({
      fetchError: nextProps.fetchError,
      kpiList: nextProps.kpiList,
      kpiData: nextProps.kpiData,
    });
  }

  componentWillUnmount() {
    this.notificationSystem.clearNotifications();
  }

  showNotification = (message) => {
    this.notificationSystem.addNotification({
      message,
      level: 'success',
      autoDismiss: 0,
      position: 'tr'
    });
  };

  onKpiSelect = e => {
    const currentState = this.state;
    currentState.selectedKpiType = e.target.value;
    this.setState(currentState);

    if (this.props.fetchReportData) {
      this.props.fetchReportData(e.target.value);
    }
  }

  renderKpiContent = () => {
    const data = this.state.kpiData;

    if (data) {
      if (Array.isArray(data)) {
        return this.renderKpiAsArray(data);
      }

      return this.renderKpiAsObjectTable(data);
    }

    return null;
  }

  renderKpiAsObject = data => {
    const kpiItems = Object.keys(data).map((item, idx) => {
      const label = item.replace(/_/g, ' ');
      return (
        <div key={idx} className="col-sm-6">
          <p><b>{label}:</b></p>
          <p>{data[item]}</p>
        </div>
      );
    });

    return (
      <div className="row">
        {kpiItems}
      </div>
    );
  }

  renderKpiAsObjectTable = data => {
    const keys = Object.keys(data);
    const formattedData = keys.map((item, idx) => {
      return {
        label: item.replace(/_/g, ' '),
        value: data[item]
      };
    });

    const options = {
      sizePerPage: 13,
      prePage: 'Previous',
      nextPage: 'Next',
      firstPage: 'First',
      lastPage: 'Last',
      hideSizePerPage: true,
    };

    return (
      <BootstrapTable
            data={formattedData}
            bordered={false}
            hover={true}
            search={ true }
            striped
            pagination={true}
            options={options}>
          <TableHeaderColumn
          dataField="label"
          isKey={true}
          >
          KPI
          </TableHeaderColumn>

          <TableHeaderColumn
          dataField="value"
          >
          </TableHeaderColumn>
        </BootstrapTable>
    );
  }

  renderKpiAsArray = data => {
    const formattedData = data.map((item, idx) => {
      item.idx = idx;
      return item;
    });
    const keys = Object.keys(formattedData[0]);

    const columns = keys.map((item, idx) => {
      return (
        <TableHeaderColumn
          key={idx}
          width="100%"
          isKey={item === 'idx'}
          dataField={item}
          >
          {item.replace(/_/g, ' ')}
          </TableHeaderColumn>
      );
    });

    const options = {
      sizePerPage: 13,
      prePage: 'Previous',
      nextPage: 'Next',
      firstPage: 'First',
      lastPage: 'Last',
      hideSizePerPage: true,
    };

    return (
      <div className="variable-table-container">
        <BootstrapTable
            data={formattedData}
            bordered={false}
            hover={true}
            search={ true }
            striped
            pagination={true}
            options={options}>
          {columns}
        </BootstrapTable>
      </div>
    );
  }

  renderKpiPanel = () => {
    return (
      <div className="card">
        <div className="header">
          <h4>Select a KPI to display</h4>
          <p>Please select a KPI from the dropdown box above to proceed</p>
        </div>
        <div className="content">
          {this.renderKPIList()}
          <br />
          {this.renderKpiContent()}
        </div>
      </div>
    );
  }

  renderKPIList = () => {
    if (this.state.kpiList && Array.isArray(this.state.kpiList) && this.state.kpiList.length !== 0) {
      const kpiItems = this.state.kpiList.map((kpi, idx) => {
        return (
          <option key={idx} value={kpi.key}>{kpi.label}</option>
        );
      });
      return (
        <select onChange={(e) => this.onKpiSelect(e)}>{kpiItems}</select>
      );
    }

    return null;
  }

  render() {
    return (
      <div className="container-fluid">
      <NotificationSystem
                  ref={ref => this.notificationSystem = ref} />
        <div className="row">
          <div className="col-md-12">
            {this.renderKpiPanel()}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  fetchError: state.employees.error && state.kpi.error.message
    ? state.kpi.error.message
    : '',
  kpiList: state.kpi.reportsList,
  kpiData: state.kpi.data,
})

const mapDispatchToProps = dispatch => ({
  fetchReportList: () => dispatch(fetchReportList()),
  fetchReportData: type => dispatch(fetchReportData(type)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(KPIContainer);