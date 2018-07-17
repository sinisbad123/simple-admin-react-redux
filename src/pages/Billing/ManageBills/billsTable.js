import React, { Component } from 'react';
import { BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import * as humanize from 'humanize';
import moment from 'moment';

class CompaniesTable extends Component {

  state = {
    bills: this.props.bills,
  };

  componentWillReceiveProps(nextProps){
    this.setState({
      bills: nextProps.bills,
    });
  }

  componentWillMount() {
    if (this.props.fetchBills) {
      this.props.fetchBills();
    }
  }

  onRowSelect = (row, isSelected, e) => {
    if (row && isSelected) {
      const dayDiff = moment().diff(moment(row.due_date), 'days');
      if (dayDiff >= -6) {
        if (this.props.fetchBill) {
          this.props.fetchBill(row);
          return;
        }
      }

      if (this.props.showNotification) {
        this.props.showNotification('Bills can be settled 6 days before the due date');
      }
    }
  }

  onRowSelectBgColor = (row, isSelect) => {
    if (isSelect) {
      return '#7777772b';
    }
    return null;
  }

  render() {
    let bills = this.state.bills ? this.state.bills : [];
    const formattedBills = bills.map(bill => {
      bill.formatted_due_date = humanize.date('m-d-Y', new Date(bill.due_date));
      bill.formatted_total_balance = `P ${humanize.numberFormat(bill.total_balance, 2, '.', ',')}`;
      return bill;
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

    return (
        <BootstrapTable
            selectRow={selectRowProp}
            data={formattedBills}
            bordered={false}
            hover={true}
            striped
            pagination={true}
            options={options}>

            <TableHeaderColumn
            dataField='id'
            isKey
            width="0%"
            >
            ID
            </TableHeaderColumn>

            <TableHeaderColumn
            dataField='formatted_due_date'
            width="25%"
            >
            Due Date
            </TableHeaderColumn>

            <TableHeaderColumn
            dataField='formatted_total_balance'
            width="25%"
            >
            Total Balance
            </TableHeaderColumn>

            
        </BootstrapTable>
    );
  }
}

export default CompaniesTable