import React, { Component } from 'react';
import { BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import * as humanize from 'humanize';

class OrdersTable extends Component {

  state = {
    orders: this.props.orders,
  };

  componentWillReceiveProps(nextProps){
    this.setState({
      orders: nextProps.orders,
    });
  }

  componentWillMount() {
    if (this.props.fetchOrders) {
      this.props.fetchOrders(1);
    }
  }

  onRowSelect = (row, isSelected, e) => {
    if (row && isSelected) {
      if (this.props.fetchOrder) {
        this.props.fetchOrder(row.refNumber);
      }
    }
  }

  onRowSelectBgColor = (row, isSelect) => {
    if (isSelect) {
      return '#7777772b';
    }
    return null;
  }

  onPageChange = (page, sizePerPage) => {
    if (this.props.fetchOrders) {
      this.props.fetchOrders(page);
    }
  }

  render() {
    const orders = this.state.orders.data ? this.state.orders.data : [];
    const count = this.state.orders.total ? this.state.orders.total : 0;
    const page = this.state.orders.page ? this.state.orders.page : 1;
    let orderDataSet = [];
    for (let i = 0; i < count; i++) {
      orderDataSet.push({});
    }

    const formattedOrders = orders.map(order => {
        order.formattedPrincipalAmount = `P ${humanize.numberFormat(order.principalAmount, 2, '.', ',')}`;
        order.formattedInstallmentAmount = `P ${humanize.numberFormat(order.installmentAmount, 2, '.', ',')}`;
        order.formattedDeliveryDate = humanize.date('m-d-Y', new Date(order.deliveryDate));
        return order;
    });

    orderDataSet.splice((page * 13) - 13, formattedOrders.length, ...formattedOrders);

    const options = {
      sizePerPage: 13,
      prePage: 'Previous',
      nextPage: 'Next',
      firstPage: 'First',
      lastPage: 'Last',
      hideSizePerPage: true,
      onPageChange: this.onPageChange
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
            data={orderDataSet}
            bordered={false}
            hover={true}
            striped
            pagination={true}
            options={options}>

            <TableHeaderColumn
            dataField='refNumber'
            isKey
            width="10%"
            >
            Ref No.
            </TableHeaderColumn>

            <TableHeaderColumn
            dataField='employeeId'
            width="15%"
            >
            Employee ID
            </TableHeaderColumn>

            <TableHeaderColumn
            dataField='paymentDuration'
            width="18%"
            >
            x Paybacks
            </TableHeaderColumn>

            <TableHeaderColumn
            dataField='formattedPrincipalAmount'
            width="18.75%"
            >
            Total Amount
            </TableHeaderColumn>

            <TableHeaderColumn
            dataField='formattedInstallmentAmount'
            width="18.75%"
            >
            Amount per payback
            </TableHeaderColumn>

            <TableHeaderColumn
            dataField='formattedDeliveryDate'
            width="9.75%"
            >
            Delivery Date
            </TableHeaderColumn>

            <TableHeaderColumn
            dataField='status'
            width="9.75%"
            >
            Status
            </TableHeaderColumn>
        </BootstrapTable>
    );
  }
}

export default OrdersTable