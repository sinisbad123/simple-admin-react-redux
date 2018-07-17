import React, { Component } from 'react';
import { BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';

class CompaniesTable extends Component {

  state = {
    companies: this.props.companies,
  };

  componentWillReceiveProps(nextProps){
    this.setState({
      companies: nextProps.companies,
    });
  }

  componentWillMount() {
    if (this.props.fetchCompanies) {
      this.props.fetchCompanies();
    }
  }

  onRowSelect = (row, isSelected, e) => {
    if (row && isSelected) {
      if (this.props.fetchBills) {
        this.props.fetchBills(row);
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
    const companies = this.state.companies ? this.state.companies : [];

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
            data={companies}
            bordered={false}
            search={ true }
            hover={true}
            striped
            pagination={true}
            options={options}>

            <TableHeaderColumn
            dataField='name'
            isKey
            width="25%"
            >
            Company name
            </TableHeaderColumn>

            <TableHeaderColumn
            dataField='contact_number'
            width="25%"
            >
            Company type
            </TableHeaderColumn>

            <TableHeaderColumn
            dataField='email'
            width="25%"
            >
            Email
            </TableHeaderColumn>

            <TableHeaderColumn
            dataField='status'
            width="25%"
            >
            Status
            </TableHeaderColumn>

            
        </BootstrapTable>
    );
  }
}

export default CompaniesTable