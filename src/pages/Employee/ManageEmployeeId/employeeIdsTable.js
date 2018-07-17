import React, { Component } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import Multiselect from 'react-widgets/lib/Multiselect';
import 'react-widgets/dist/css/react-widgets.css';
import * as humanize from 'humanize';
import Alert from 'sweetalert-react';

const EMPLOYEE_ID_STATUS = [
  {
    name: "Approved",
    value: "APPROVED"
  },
  {
    name: "Disapproved",
    value: "DISAPPROVED"
  },
  {
    name: "Pending",
    value: "PENDING"
  },
];

class EmployeeIdsTable extends Component {

  state = {
    employeeIds: this.props.employeeIds,
    showError: false,
    selectedEmployeeId: null,
    isLoadingImage: null
  };

  componentWillReceiveProps(nextProps){
    this.setState({
      employeeIds: nextProps.employeeIds,
      showError: false,
      selectedEmployeeId: null,
      isLoadingImage: null,
      isFetching: false,
    });
  }

  componentWillMount() {
    if (this.props.fetchEmployeeIds) {
      this.props.fetchEmployeeIds();
    }
  }

  onSubmitPendingId = id_data => {
    const data = {
      id: id_data.id,
      status: 'PENDING'
    };

    if (this.props.updateEmployeeIdStatus) {
      this.props.updateEmployeeIdStatus(data)
    }
  }

  onSubmitApproveId = id_data => {
    const data = {
      id: id_data.id,
      status: 'APPROVED'
    };

    if (this.props.updateEmployeeIdStatus) {
      this.props.updateEmployeeIdStatus(data)
    }
  }

  onSubmitDisapprove = id_data => {
    const data = {
      id: id_data.id,
      status: 'DISAPPROVED'
    };

    if (this.props.updateEmployeeIdStatus) {
      this.props.updateEmployeeIdStatus(data)
    }
  }

  onMultiSelectStatusChange = data => {
    if (Array.isArray(data) && data.length > 0) {
      if (!this.state.isFetching) {
        const currentState = this.state;
        currentState.isFetching = true;
        this.setState(currentState);
        const selectedStatus = data.map(status => {
          return status.value;
        });

        if (this.props.fetchEmployeeIds) {
          this.props.fetchEmployeeIds(selectedStatus);
          return;
        }
      }
    }
  }

  onImageClick = image => {
    const currentState = this.state;
    currentState.selectedEmployeeId = image.raw;
    currentState.showError = true;
    currentState.isLoadingImage = 'loading';
    this.setState(currentState);
  }

  onOutsideModalClick = () => {
    const currentState = this.state;
    currentState.showError = false;
    this.setState(currentState);
  }

  onRowSelect = (row, isSelected, e) => {
    if (row && isSelected) {
      if (this.props.fetchIdSelected) {
        this.props.fetchIdSelected(row);
      }
    }
  }

  onRowSelectBgColor = (row, isSelect) => {
    if (isSelect) {
      return '#7777772b';
    }
    return null;
  }

  renderStatusButtons = (e, rowdata) => {
    const that = this;
    if (rowdata && rowdata.id) {
      if (rowdata.status === 'PENDING') {
        return that.renderPending(rowdata);
      }
      return null;
    }

    return null;
  }

  activeFormatter = (cell, row) => {
    return this.renderStatusButtons(cell, row);
  }

  renderPending = data => {
    return (
      <div>
        <button className="btn btn-success"
            onClick={() => this.onSubmitApproveId(data)}>
            <span className="fa fa-check"></span>
        </button>
        &nbsp;
        <button className="btn btn-danger"
            onClick={() => this.onSubmitDisapprove(data)}>
            <span className="fa fa-times"></span>
        </button>
      </div>
    );
  }

  renderImage = (cell, row) => {
    if (row.thumbnail) {
      return (
        <img src={row.thumbnail} alt={row.thumbnail}
          onClick={ () => this.onImageClick(row) }
        />
      );
    }

    return null;
  }

  renderImageForModal = src => {
    return <img src={src} alt={src} className="img-thumbnail" />;
  }

  render() {
    const employeeIds = this.state.employeeIds ? this.state.employeeIds : [];
    const formattedData = employeeIds.map(id => {
      const formatted_date_created = humanize.date('m-d-Y', new Date(id.date_created));
      id.formatted_date_created = formatted_date_created;
      return id;
    });

    const options = {
      sizePerPage: 13,
      prePage: 'Previous',
      nextPage: 'Next',
      firstPage: 'First',
      lastPage: 'Last',
      hideSizePerPage: true,
    };

    const selectRowProp = {
      mode: 'radio',
      clickToSelect: true,
      bgColor: this.onRowSelectBgColor,
      onSelect: this.onRowSelect,
    };

    let selectedEmployeeId = null
    if (this.state.selectedEmployeeId) {
      selectedEmployeeId = this.renderImageForModal(this.state.selectedEmployeeId);
    }

    return (
        <div>
          <div className="row">
            <Alert
                title=""
                show={this.state.showError}
                html
                text={selectedEmployeeId ? renderToStaticMarkup(selectedEmployeeId) : null}
                onConfirm={() => this.setState({ showError: false })}
                onOutsideClick={() => this.onOutsideModalClick()} />
          </div>
          <div className="row">
            <div className="col-sm-offset-8 col-sm-4">
              <Multiselect
                data={EMPLOYEE_ID_STATUS}
                valueField="value"
                placeholder="Filter by type"
                textField="name"
                onChange={(data) => this.onMultiSelectStatusChange(data)} />
            </div>
          </div>

          <br />

          <div className="row">
            <BootstrapTable
                selectRow={selectRowProp}
                data={formattedData}
                bordered={false}
                hover={true}
                search={ true }
                striped
                pagination={true}
                options={options}>

                <TableHeaderColumn
                dataField='id'
                isKey
                searchable={false}
                width="0%"
                >
                ID
                </TableHeaderColumn>

                <TableHeaderColumn
                dataField='card_number'
                width="20%"
                >
                ID Number
                </TableHeaderColumn>

                <TableHeaderColumn
                dataField='idType'
                width="20%"
                >
                ID Type
                </TableHeaderColumn>

                <TableHeaderColumn
                dataField='status'
                searchable={false}
                width="15%"
                >
                Status
                </TableHeaderColumn>

                <TableHeaderColumn
                dataField='formatted_date_created'
                searchable={false}
                width="20%"
                >
                Created Date
                </TableHeaderColumn>

                <TableHeaderColumn
                dataField='status'
                width="25%"
                dataFormat={ this.activeFormatter }
                >
                Actions
                </TableHeaderColumn>
            </BootstrapTable>
          </div>
        </div>
    );
  }
}

export default EmployeeIdsTable